import React from 'react'
import Context from './Context'
import { useEffect,useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

function Data(props) {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const productsData = [];
        const querySnapshot = await getDocs(collection(db, "shops"));
      
        for (const doc of querySnapshot.docs) {
          const shopId = doc.id; 
          const productsCollectionRef = collection(doc.ref, "products");
          const productsQuerySnapshot = await getDocs(productsCollectionRef);
          productsQuerySnapshot.forEach((productDoc) => {
            const { title, url, price, category, description, productId } = productDoc.data();
            productsData.push({ shopId, title, url, price, category, description, productId });
          });
        }
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      
  };
  return (
    <Context.Provider value={products}>
        {props.children}
    </Context.Provider>
  )
}

export default Data