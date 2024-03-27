import ProductCard from "../ProductCard/ProductCard";

import "./Productlist.css"


export default function Productlist({product}){
    const products = product;
    return (
        <div className='productlist'>
            {products.map(product => (
        <ProductCard product={product}/>
            ))} 
        </div>
        
    )
}





