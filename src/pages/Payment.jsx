import React, { useState } from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handlePayment = () => {
    // Simulate payment processing (validate card details, etc.)
    // For demonstration purposes, we'll assume payment is successful after a brief delay
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handlePayment}>
        <label>
          Card Number:
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Expiry Date:
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </label>
        <br />
        <label>
          CVV:
          <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </label>
        <br />
        <label>
          Billing Address:
          <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Pay Now" />
      </form>
    </div>
  );
};

export default Payment;
