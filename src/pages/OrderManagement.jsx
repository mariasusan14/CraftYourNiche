import React, { useState, useEffect } from "react";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
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
          const customisationData = doc.data();
          const requestIdMap = customisationData;

          Object.keys(requestIdMap).forEach((requestId) => {
            const requestData = requestIdMap[requestId];
            const image =
              requestData.images[0] ||
              "https://creativepaint.com/cdn/shop/products/oc-9-balletwhite_2000x_97180483-e3a9-4c57-a40a-384f63156f4f_400x.png";
            fetchedCustomisationRequests.push({
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
        {currentCustomisationRequests.length>0 && <div>
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
        </div>}

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
                <button style={{ width: "auto" }}>Pay Now</button>
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
