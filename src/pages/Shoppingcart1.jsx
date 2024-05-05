import React, { useState, useEffect } from "react";
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { FaTrash } from "react-icons/fa";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [showForm, setShowForm] = useState(false);
  const shippingChargePercentage = 0.02;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "user", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setFullName(userData.fullName || "");
          setContactNo(userData.phoneNumber || "");
          setShippingAddress(userData.shippingAddress || "");
        } else {
          console.log("User document does not exist for the user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const cartDocRef = doc(db, "cart", userId);

        const cartDocSnapshot = await getDoc(cartDocRef);
        if (cartDocSnapshot.exists()) {
          const cartData = cartDocSnapshot.data();
          const fetchedCartItems = cartData.products || [];
          setCartItems(fetchedCartItems);
          let totalPrice = fetchedCartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          );

          totalPrice += totalPrice * shippingChargePercentage;
          setTotal(totalPrice);
        } else {
          console.log("Cart document does not exist for the user.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shopping cart items:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (productId) => {
    try {
      const userId = auth.currentUser.uid;
      const cartDocRef = doc(db, "cart", userId);
      const cartDocSnapshot = await getDoc(cartDocRef);
      const currentCartData = cartDocSnapshot.data();
      const index = currentCartData.products.findIndex(
        (item) => item.product.productId === productId
      );
      currentCartData.products.splice(index, 1);
      await setDoc(cartDocRef, { products: currentCartData.products });
      setCartItems(currentCartData.products);
      let totalPrice = currentCartData.products.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      totalPrice += totalPrice * shippingChargePercentage;
      setTotal(totalPrice);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      if (!cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all payment details.");
        return;
      }
      // Perform additional validation for cardNumber, expiryDate, and cvv here if needed

      const userId = auth.currentUser.uid;
      const orderCollectionRef = collection(db, "orders");
      const orderData = {
        userId,
        fullName,
        contactNo,
        shippingAddress,
        total,
        products: cartItems,
        paymentStatus: "paid",
      };
      await addDoc(orderCollectionRef, orderData);

      const cartDocRef = doc(db, "cart", userId);
      await setDoc(cartDocRef, { products: [] });

      setCartItems([]);
      setTotal(0);
      setFullName("");
      setContactNo("");
      setShippingAddress("");
      setCardNumber("");
      setExpiryDate("");
      setCVV("");
      setShowForm(false);
      alert("Order placed");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <tr key={item.product.productId}>
        <td>
          <img
            src={item.product.url}
            alt={item.product.title}
            style={{ width: "50px", height: "50px" }}
          />
        </td>
        <td>{item.product.title}</td>
        <td>{item.quantity}</td>
        <td>Rs{item.product.price * item.quantity}</td>
        <td>
          <button
            onClick={() => handleDeleteItem(item.product.productId)}
            style={{ width: "auto" }}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  };

  const handleCardNumberChange = (e) => {
    const formattedInput = e.target.value.replace(/\D/g, "");
    const formattedCardNumber = formattedInput
      .replace(/(.{4})/g, "$1 ")
      .substr(0, 19)
      .trim();
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    const formattedInput = e.target.value.replace(/\D/g, "");
    const formattedExpiryDate = formattedInput
      .replace(/^(\d{2})/, "$1/")
      .substr(0, 5);
    setExpiryDate(formattedExpiryDate);
  };

  const handleCvvChange = (e) => {
    const formattedInput = e.target.value.replace(/\D/g, "");
    const formattedCvv = formattedInput.substr(0, 3);
    setCVV(formattedCvv);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead style={{ width: "auto" }}>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            renderCartItems()
          ) : (
            <tr>
              <td colSpan="4">Your cart is empty</td>
            </tr>
          )}
          {total > 0 && (
            <tr>
              <td colSpan="3">Shipping Charge (2%):</td>
              <td>Rs{(total * shippingChargePercentage).toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td colSpan="3">
              <strong>Total:</strong>
            </td>
            <td>
              <strong>Rs{total.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      {showForm ? (
        <form onSubmit={handleBuy}>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contact Number:
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </label>
          <br />
          <label>
            Shipping Address:
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </label>
          <br />
          <label>
            Card Number:
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength="19"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </label>
          <br />
          <label>
            Expiry Date:
            <input
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
          </label>
          <br />
          <label>
            CVV:
            <input
              type="password"
              placeholder="***"
              maxLength="3"
              value={cvv}
              onChange={handleCvvChange}
            />
          </label>
          <br />
          <input type="submit" value="Pay Now" />
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Buy</button>
      )}
    </div>
  );
};

export default ShoppingCart;
