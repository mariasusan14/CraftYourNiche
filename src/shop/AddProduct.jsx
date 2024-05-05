import React, { useState } from 'react';
import { storage, db, auth } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, setDoc,doc, Timestamp } from 'firebase/firestore';
import Navbar from './navbar';
import './styles/AddProduct.css';

export const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState('');
    const [addCustomisation, setAddCustomisation] = useState('');

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e) => {
        let selectedFiles = e.target.files;
        let selectedImages = [];

        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i] && types.includes(selectedFiles[i].type)) {
                    selectedImages.push(selectedFiles[i]);
                } else {
                    setImageError('Please select valid image file types (png or jpg)');
                    return;
                }
            }
            setImages([...images, ...selectedImages]);
            setImageError('');
        } else {
            console.log('Please select your file');
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleAddProducts = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            setImageError('Please select at least one image');
            return;
        }
        const userId = auth.currentUser.uid;

        try {
            const url = [];
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const storageRef = ref(storage, `product-images/${userId}/${image.name}`);
                await uploadBytes(storageRef, image);
                const imgurl = await getDownloadURL(storageRef);
                url.push(imgurl);
            }

            // Add product to Firestore

            const productRef =  doc(collection(db, `shops/${userId}/products`));
               await setDoc(productRef,{ title,
                productId: productRef.id,
                description,
                price: Number(price),
                quantity: Number(quantity),
                category: category === 'Other' ? otherCategory : category,
                addCustomisation,
                url,
                createdAt: Timestamp.fromDate(new Date())
            });
     
            setSuccessMsg('Product added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setCategory('');
            setOtherCategory('');
            setAddCustomisation('');
            setImages([]);
            setImageError('');
            setUploadError('');
            setTimeout(() => {
                setSuccessMsg('');
            }, 3000);
            alert('Product added successfully');
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <div className="addprod-container">
            <Navbar />
            <div className="addprod">
                <br />
                <br />
                <h1>Add Products</h1>
                <hr />
                {successMsg && (
                    <>
                        <div className="success-msg">{successMsg}</div>
                        <br />
                    </>
                )}
                <form autoComplete="off" className="form-group" onSubmit={handleAddProducts}>
                <label>Product Title</label>
                    <input type="text" className="form-control" required onChange={(e) => setTitle(e.target.value)} value={title} />
                    <br />
                    <label>Product Description</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <br />
                    <label>Product Price</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                    <br />
                    <label>Product Quantity</label> 
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
                    <br />
                    <label>Product Category</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required>
                        <option value="">Select Category</option>
                        <option value="Handmade Jewelry">Handmade Jewelry</option>
                        <option value="Phone Cases">Phone Cases</option>
                        <option value="Embroidery Art">Embroidery Art</option>
                        <option value="Paintings">Paintings</option>
                        <option value="Pot Art">Pot Art</option>
                        <option value="Pottery">Pottery</option>
                        <option value="Handmade Soaps">Handmade Soaps</option>
                        <option value="Handmade Candles">Handmade Candles</option>
                        <option value="Handmade Clothing">Handmade Clothing</option>
                        <option value="Woodwork">Woodwork</option>
                        <option value="Metalwork">Metalwork</option>
                        <option value="Glass Art">Glass Art</option>
                        <option value="Leather Goods">Leather Goods</option>
                        <option value="Paper Crafts">Paper Crafts</option>
                        <option value="Textile Crafts">Textile Crafts</option>
                        <option value="Other">Other</option>
                    </select>
                    {category === 'Other' && (
                        <>
                            <br />
                            <label>Custom Category</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={otherCategory}
                                onChange={(e) => setOtherCategory(e.target.value)}
                            />
                        </>
                    )}
                    <br />
                    <label>Add Customisation</label>
                    <select
                        className="form-control"
                        value={addCustomisation}
                        onChange={(e) => setAddCustomisation(e.target.value)}
                        required
                    >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <br />

                    <label>Upload Product Images</label>
                    <input type="file" multiple className="form-control" required onChange={handleProductImg} />
                    {imageError && (
                        <>
                            <br />
                            <div className="error-msg">{imageError}</div>
                        </>
                    )}
                    <div className="uploaded-images">
                        {images.map((image, index) => (
                            <div key={index} className="uploaded-image">
                                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }}/>
                                <button type="button" onClick={() => removeImage(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-success btn-md">
                            SUBMIT
                        </button>
                    </div>
                </form>
                {uploadError && (
                    <>
                        <br />
                        <div className="error-msg">{uploadError}</div>
                    </>
                )}
            </div>
        </div>
    );
};
