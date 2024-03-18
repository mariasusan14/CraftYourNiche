import { useState } from 'react';
import { storage, db, auth } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import Navbar from './navbar';
import './styles/AddProduct.css';

export const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState('');

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            } else {
                setImage(null);
                setImageError('Please select a valid image file type (png or jpg)');
            }
        } else {
            console.log('Please select your file');
        }
    };

    const handleAddProducts = async (e) => {
        e.preventDefault();

        if (!image) {
            setImageError('Please select an image');
            return;
        }

        const storageRef = ref(storage, `product-images/${image.name}`);
        const userId = auth.currentUser.uid;

        try {
            // Upload image to storage
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);

            // Add product to Firestore
            const productRef = doc(collection(db, `shops/${userId}/products`)); // Reference to new document
            await setDoc(productRef, {
                productId: productRef.id, // Assigning product ID as document ID
                title,
                description,
                price: Number(price),
                quantity: Number(quantity),
                category: category === 'Other' ? otherCategory : category,
                url
            });

            setSuccessMsg('Product added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setCategory('');
            setOtherCategory('');
            document.getElementById('file').value = '';
            setImageError('');
            setUploadError('');
            setTimeout(() => {
                setSuccessMsg('');
            }, 3000);
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <div className="container">
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
                        required
                    >
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
                    <label>Upload Product Image</label>
                    <input type="file" id="file" className="form-control" required onChange={handleProductImg} />
                    {imageError && (
                        <>
                            <br />
                            <div className="error-msg">{imageError}</div>
                        </>
                    )}
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
