import React, { useState, useEffect } from "react";
import {
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { FaTrash } from "react-icons/fa";
import Navbar from "./navbar";

const ShopDashboard = () => {
  const [shopDetails, setShopDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [editableShopDetails, setEditableShopDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditableShopDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditShopDetails = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "shops", userId);
      await updateDoc(userDocRef, editableShopDetails);
      alert("Shop details updated successfully");

      const updatedShopDocSnapshot = await getDoc(userDocRef);
      const updatedShopData = updatedShopDocSnapshot.data();
      setShopDetails(updatedShopData);

      setEditableShopDetails({});
    } catch (error) {
      console.error("Error updating shop details:", error);
    }
  };
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const userId = auth.currentUser.uid;

        const userDocRef = doc(db, "shops", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const shopData = userDocSnapshot.data();
          setShopDetails(shopData);
          console.log(shopData);

          const productsQuerySnapshot = await getDocs(
            collection(userDocRef, "products")
          );
          const shopProducts = productsQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(shopProducts);
        } else {
          console.log("Shop details not found.");
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    fetchShopDetails();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const productDocRef = doc(
        db,
        "shops",
        auth.currentUser.uid,
        "products",
        productId
      );

      await deleteDoc(productDocRef);

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="content" style={{ marginLeft: "250px" }}>
        {/* Product list */}
        {products.length > 0 && (
          <div>
            <br />
            <h2>Products</h2>
            <hr />
            <br />
            <table style={{ width: "100%" }}>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ padding: "10px", border: "none" }}>
                      <img
                        src={product.url}
                        alt={product.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>

                    <td style={{ padding: "10px", border: "none" }}>
                      {product.title}
                    </td>

                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        border: "none",
                      }}
                    >
                      <button
                        onClick={() => deleteProduct(product.id)}
                        style={{
                          border: "none",
                          cursor: "pointer",
                          width: "auto",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Shop details */}
        <h2>Shop Profile</h2>
        <hr />
        <br />
        {shopDetails && (
          <div>
            <label htmlFor="shopName">Shop Name:</label>
            <input
              type="text"
              name="shopName"
              placeholder={shopDetails.shopName || ""}
              value={editableShopDetails.shopName || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="shopName">Tagline:</label>
            <input
              type="text"
              name="tagline"
              placeholder={shopDetails.tagline || ""}
              value={editableShopDetails.tagline || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="shopName">Shop Address:</label>
            <input
              type="text"
              name="shopAddress"
              placeholder={shopDetails.shopAddress || ""}
              value={editableShopDetails.shopAddress || ""}
              onChange={handleInputChange}
            />

            <button onClick={handleEditShopDetails}>Save Changes</button>
          </div>
        )}
        {!shopDetails && <p>No shop details found.</p>}
      </div>
    </div>
  );
};

export default ShopDashboard;
