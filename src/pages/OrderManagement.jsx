import React, { useState, useEffect } from "react";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

const OrderManagement = () => {
  const [customisationRequests, setCustomisationRequests] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Pagination states
  const [customisationPage, setCustomisationPage] = useState(1);
  const [cartPage, setCartPage] = useState(1);
  const customisationPerPage = 5;
  const cartPerPage = 5;

  // Payment form fields
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const fetchCustomisationRequests = async () => {
      try {
        const userId = auth.currentUser.uid;

        // Fetch customisation requests
        const customisationRef = collection(
          db,
          "customisation",
          userId,
          "customisationRequests"
        );
        const customisationSnapshot = await getDocs(customisationRef);
        const fetchedCustomisationRequests = [];

        customisationSnapshot.forEach((doc) => {
          const shopId = doc.id;
          console.log(shopId);
          const customisationData = doc.data();
          const requestIdMap = customisationData;

          Object.keys(requestIdMap).forEach((requestId) => {
            const requestData = requestIdMap[requestId];
            const image =
              requestData.images[0] ||
              "https://creativepaint.com/cdn/shop/products/oc-9-balletwhite_2000x_97180483-e3a9-4c57-a40a-384f63156f4f_400x.png";
            fetchedCustomisationRequests.push({
              shopId,
              requestId,
              image,
              name: requestData.productName,
              status: requestData.status,
              replyDescription: requestData.replyDescription,
              cost: requestData.cost,
              costBreakupDescription: requestData.costBreakupDescription,
              rejectionReason: requestData.rejectionReason,
            });
          });
        });

        setCustomisationRequests(fetchedCustomisationRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customisation requests:", error);
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      try {
        const userId = auth.currentUser.uid;
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const fetchedCartItems = [];
        querySnapshot.forEach((doc) => {
          const cartData = doc.data();
          const products = cartData.products || [];
          fetchedCartItems.push(...products);
        });
        setCartItems(fetchedCartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shopping cart items:", error);
        setLoading(false);
      }
    };

    fetchCustomisationRequests();
    fetchCartItems();
  }, []);

  const handleViewReply = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handlePaymentSubmit = async () => {
    try {
      const userId = auth.currentUser.uid;
      const requestId = selectedRequest.requestId;
      const shopId = selectedRequest.shopId;

      // Update payment status to 'paid' in the requestId map
      const customisationRef = doc(
        db,
        "customisation",
        userId,
        "customisationRequests",
        shopId
      );

      const customisationDoc = await getDoc(customisationRef);
      const customisationData = customisationDoc.data();

      if (!customisationData) {
        throw new Error("Customisation data not found");
      }

      const requestMap = customisationData[requestId];

      if (!requestMap) {
        throw new Error("Request ID not found in customisation data");
      }

      // Update the payment status for the specific request ID
      requestMap.paymentStatus = "paid";

      // Update the document with the modified data
      await setDoc(customisationRef, customisationData);

      // Reset payment form fields
      setFullName("");
      setContactNo("");
      setShippingAddress("");
      setCardNumber("");
      setExpiryDate("");
      setCVV("");
      setPaymentStatus("paid");

      alert("Payment successful");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
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

  const indexOfLastCustomisation = customisationPage * customisationPerPage;
  const indexOfFirstCustomisation =
    indexOfLastCustomisation - customisationPerPage;
  const currentCustomisationRequests = customisationRequests.slice(
    indexOfFirstCustomisation,
    indexOfLastCustomisation
  );

  const indexOfLastCart = cartPage * cartPerPage;
  const indexOfFirstCart = indexOfLastCart - cartPerPage;
  const currentCartItems = cartItems.slice(indexOfFirstCart, indexOfLastCart);

  const paginateCustomisation = (pageNumber) => {
    setCustomisationPage(pageNumber);
  };

  const paginateCart = (pageNumber) => {
    setCartPage(pageNumber);
  };

  return (
    <div>
      <h2>Order Management</h2>
      <div>
        {currentCustomisationRequests.length > 0 && (
          <div>
            <h3>Customisation Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomisationRequests.map((request, index) => (
                  <tr key={`customisation-${index}`}>
                    <td>
                      <img
                        src={request.image}
                        alt={`Customisation ${index}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{request.name}</td>
                    <td>{request.status}</td>
                    <td>
                      {(request.status === "accepted" ||
                        request.status === "rejected") && (
                        <button onClick={() => handleViewReply(request)}>
                          View Reply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          {customisationRequests.length > customisationPerPage && (
            <ul>
              {Array(
                Math.ceil(customisationRequests.length / customisationPerPage)
              )
                .fill()
                .map((_, index) => (
                  <li key={index} style={{ display: "inline" }}>
                    <button
                      onClick={() => paginateCustomisation(index + 1)}
                      style={{ width: "auto" }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Reply Details</h3>
            {selectedRequest.status === "accepted" && (
              <>
                <p>Reply Description: {selectedRequest.replyDescription}</p>
                <p>Cost: {selectedRequest.cost}</p>
                <p>Cost Breakup: {selectedRequest.costBreakupDescription}</p>
                <div>
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
                  <button onClick={handlePaymentSubmit}>Pay Now</button>
                </div>
              </>
            )}
            {selectedRequest.status === "rejected" && (
              <p>Rejection Reason: {selectedRequest.rejectionReason}</p>
            )}
            <button
              onClick={handleCloseModal}
              style={{ width: "auto", marginLeft: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div>
        <h3>Shopping Cart Items</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentCartItems.map((order, index) => (
              <tr key={`cart-item-${index}`}>
                <td>
                  <img
                    src={order.product.url}
                    alt={order.product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{order.product.title}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {cartItems.length > cartPerPage && (
            <ul>
              {Array(Math.ceil(cartItems.length / cartPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index} style={{ display: "inline" }}>
                    <button
                      onClick={() => paginateCart(index + 1)}
                      style={{ width: "auto" }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
