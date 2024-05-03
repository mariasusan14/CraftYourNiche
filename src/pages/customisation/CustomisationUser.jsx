


import React, { useState } from 'react';
import { auth, storage } from '../../config/firebase';
import { db } from '../../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomisationComponent = () => {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');
  const [engraving, setEngraving] = useState('');
  const [design, setDesign] = useState('');
  const [addOns, setAddOns] = useState('');
  const [customizationInstructions, setCustomizationInstructions] = useState('');
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { shopId, productId } = useParams();
  const userId = auth.currentUser.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      // Create a document with userId as document ID
      const userCustomisationRef = doc(db, `customisation/${userId}`);
      await setDoc(userCustomisationRef, {});

      // Create a document with shopId as document ID under the user's customisation
      const customisationRef = doc(userCustomisationRef, `customisationRequests/${shopId}`);

      // Get the existing customisation requests
      const customisationDoc = await getDoc(customisationRef);
      const existingRequests = customisationDoc.data() || {};

      // Update the document with customisation details and image URLs
      await setDoc(customisationRef, {
        ...existingRequests,
        [productId]: {
          color,
          size,
          material,
          engraving,
          design,
          addOns,
          customizationInstructions,
          images,
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
      setImages([]);
      setError('');
      console.log('Customisation request submitted successfully!');
    } catch (error) {
      console.error('Error submitting customisation request:', error);
      setError('Failed to submit customisation request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const files = e.target.files;
      console.log('Files:', files); // Log the files to check if they are defined
      if (!files) return; // Check if files is defined, if not, return early

      const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG'];
      const uploadPromises = Array.from(files).map(async (imageFile) => {
        if (!types.includes(imageFile.type)) {
          setError(`File '${imageFile.name}' is not a valid image file type.`);
          return null;
        }
        
        const storageRef = ref(storage, `customisation/${userId}/${productId}/${imageFile.name}`);
        try {
          await uploadBytes(storageRef, imageFile);
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Download URL:', downloadURL); // Log the download URL
          return downloadURL; // Return the download URL
        } catch (error) {
          console.error('Error uploading image:', error);
          return null; // Return null if there's an error
        }
      });

      // Wait for all upload promises to resolve
      const uploadedImages = await Promise.all(uploadPromises);
      
      console.log('Uploaded Images:', uploadedImages); // Log the uploaded image URLs array

      // Filter out null values (URLs for failed uploads)
      const validImages = uploadedImages.filter(url => url !== null);

      // Concatenate the new URLs with the existing images array
      setImages(prevImages => [...prevImages, ...validImages]);
    } catch (error) {
      console.error('Error handling image upload:', error);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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
        
        <label htmlFor="images">Upload Images:</label>
        <input type="file" id="images" onChange={handleImageUpload} multiple />

        <div>
          {images.map((imageUrl, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={imageUrl} alt={`Image ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Customization Request'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CustomisationComponent;
