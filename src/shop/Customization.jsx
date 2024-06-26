import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import Navbar from "./navbar";

// import './styles/Customization.css'
const CustomizationShop = () => {
  const [customisationRequests, setCustomisationRequests] = useState([]);

  useEffect(() => {
    fetchCustomisationRequests();
  }, []);

  const fetchCustomisationRequests = async () => {
    try {
      const customisationRequestsData = [];
      const querySnapshot = await getDocs(collection(db, "customisation"));
      const requestsPromises = [];
      querySnapshot.forEach((userDoc) => {
        const userId = userDoc.id;
        const customisationRequestsRef = collection(
          userDoc.ref,
          "customisationRequests"
        );
        requestsPromises.push(
          getDocs(customisationRequestsRef).then(
            (customisationRequestsSnapshot) => {
              customisationRequestsSnapshot.forEach((requestDoc) => {
                if (auth.currentUser.uid === requestDoc.id) {
                  const shopId = requestDoc.id;
                  const requestData = requestDoc.data();

                  Object.keys(requestData).forEach((requestId) => {
                    customisationRequestsData.push({
                      userId,
                      shopId,
                      requestId,
                      ...requestData[requestId],
                    });
                  });
                }
              });
            }
          )
        );
      });

      await Promise.all(requestsPromises);

      setCustomisationRequests(customisationRequestsData);
    } catch (error) {
      console.error("Error fetching customisation requests:", error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div style={{marginLeft:'250px'}}>
        <h2>Customisation Requests</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {customisationRequests.map((request) => (
            <div
              key={request.requestId}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                width: "300px",
              }}
            >
              <p>
                <strong>Product :</strong> {request.productName}
              </p>

              <p>
                <strong>Request ID:</strong> {request.requestId}
              </p>
              <p>
                <strong>User ID:</strong> {request.userId}
              </p>
              <p>
                <strong>Payment Status:</strong> {request.paymentStatus}
              </p>

              <div>
                <Link
                  to={`/viewCustReq/${request.userId}/${request.shopId}/${request.requestId}`}
                >
                  <button>View Request</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationShop;
