import { useState } from 'react';
import { storage, db, auth } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Navbar from './navbar';
import './styles/AddProduct.css';

export const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);

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
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);

            await addDoc(collection(db, `shops/${userId}/products`), {
                title,
                description,
                price: Number(price),
                quantity: Number(quantity), // Added quantity
                url
            });

            setSuccessMsg('Product added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setQuantity(''); // Clear quantity field
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
                    <label>Product Quantity</label> {/* Added quantity input field */}
                    <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
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
