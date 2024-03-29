import Navbar from "../../components/Navbar/Navbar";

import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import "./Product.css";
import "./CustomerReview.css";
import Review from "../../components/Review/Review";
import { useState } from "react";


export default function Product() {
    const [hasPurchased,setPurchased] = useState(true)
  //below variables need to be added as props
  var productName = "Bamboo Lamp";
  var productPrice = 250;
  var productName = "Bamboo Lamp";
  var mainimg = image1;
  var subImages = [image2, image3];
  return (
    <div>
      <Navbar />
      <hr />
      <div className="product-container">
        <div className="product-details">
          <div className="product-images">
            <div className="product-mainimg--container">
              <img src={mainimg} className="product-mainimg" />
            </div>
            <div className="product-subimg--list">
              {subImages.map((img) => (
                <div className="product-subimg--container">
                  <img src={img} className="product-subimg" />
                </div>
              ))}
            </div>
          </div>
          <div className="product-details--basic">
            <span className="product-details--heading">{productName}</span>
            <div className="product-details--price">Rs. {productPrice}</div>
          </div>
        </div>
        <CustomisationForm/>
        {hasPurchased && <Review/>}
        <CustomerReviews/>
      </div>
    </div>
  );
}

function CustomerReviews(){
    //variables given below are to be added as props
    var reviews = [
        {
            avatar:"https://miro.medium.com/v2/resize:fit:250/1*ljSnRGg9vPVQwTg-sj5_0Q.jpeg",
            username: "Zyzz",
            review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
            rating: 4.2
        },
        {
            avatar:"data:image/webp;base64,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",
            username:"Melon Musk",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
            rating: 5
        }
    ]
    return (
        <div>
            <span>Customer Reviews</span>
            {
                reviews.map(review=>(
                    <div className="creview-container">
                        <div className="creview-cdetails">
                            <div className="creview-avatar--container"><img src={review.avatar} className="creview-avatar"/></div>
                            <span className="creview-username">{review.username}</span>
                        </div>
                        <p className="creview-review">{review.review}</p>
                    </div>
                ))
            }
            
        </div>
    )
}

function CustomisationForm(){
  //to be given as props:
  let customisations = [
    {
      img : "",
      details: [
        {
          param1 :"",
          param2 :"",
          param3 :"",
        }
      ]
    }
  ] 
}

/*Alternate Approach:
function CustomisationForm(){
  //to be given as props (the customisations available for the product set by the seller)
  //of the format: [{type(as in formtype):,title:,choices:[choice1,choice2,..also can be null]}]
  //currently available formtypes :
  //radio,checkboxes,dropdown
  let customisations = [{type:"radio",title:}]
  return()
}
*/