// CustomisationComponent.jsx
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const CustomisationComponent = ({ shopId, productId }) => {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');
  const [engraving, setEngraving] = useState('');
  const [design, setDesign] = useState('');
  const [addOns, setAddOns] = useState('');
  const [customizationInstructions, setCustomizationInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const userId = auth.currentUser.uid;
      const customisationRef = doc(db, `customers/${userId}/customisationRequests`, shopId);
      await setDoc(customisationRef, {
        [productId]: {
          color,
          size,
          material,
          engraving,
          design,
          addOns,
          customizationInstructions,
        },
      });
      // Reset form fields after submission
      setColor('');
      setSize('');
      setMaterial('');
      setEngraving('');
      setDesign('');
      setAddOns('');
      setCustomizationInstructions('');
      setError('');
      console.log('Customisation request submitted successfully!');
    } catch (error) {
      console.error('Error submitting customisation request:', error);
      setError('Failed to submit customisation request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Customisation Options</h2>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="color">Color:</label>
        <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
        
        <label htmlFor="size">Size:</label>
        <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} />

        <label htmlFor="material">Material:</label>
        <input type="text" id="material" value={material} onChange={(e) => setMaterial(e.target.value)} />

        <label htmlFor="engraving">Engraving:</label>
        <input type="text" id="engraving" value={engraving} onChange={(e) => setEngraving(e.target.value)} />

        <label htmlFor="design">Design:</label>
        <input type="text" id="design" value={design} onChange={(e) => setDesign(e.target.value)} />

        <label htmlFor="addOns">Add-Ons:</label>
        <input type="text" id="addOns" value={addOns} onChange={(e) => setAddOns(e.target.value)} />

        <label htmlFor="customizationInstructions">Customization Instructions:</label>
        <textarea
          id="customizationInstructions"
          value={customizationInstructions}
          onChange={(e) => setCustomizationInstructions(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Customization Request'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CustomisationComponent;




