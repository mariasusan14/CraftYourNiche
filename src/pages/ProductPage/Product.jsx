import React, { useState, useEffect, useContext } from "react";
import { useParams,Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Text, Flex, Progress, DataList } from "@radix-ui/themes";
import Context from "../../Context/Context";
import "./Product.css";
import "./CustomerReview.css";
import Review from "../../components/Review/Review";
import Magnifier from "../../components/Magnifier/Magnifier";
import { auth, db } from "../../config/firebase"; // Import your Firestore instance
import { collection, doc,setDoc,getDoc } from "firebase/firestore";

export default function Product() {
  const [magnifierOn, setMagnifierOn] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPurchased, setPurchased] = useState(true);
  const [quantity, setQuantity] = useState(0); // Unconditionally initialized
  const { shopId, productId } = useParams();
  const products = useContext(Context);
  console.log(products);
  const product = products.find((product) => product.productId === productId);

  // Initialize product details
  let productName = "";
  let productPrice = 0;
  let productDescription = "";
  let productImages = [];
  let customisation='';
  if (product) {
    productName = product.title;
    productPrice = product.price;
    productDescription = product.description;
    productImages = [product.url];
    customisation=product.addCustomisation;
  }
  const [mainimg, setMainimg] = useState(productImages[0]); 
  if (!product) {
    return <div>Loading...</div>;
  }

  var reviews = [
    {
      avatar:
        "https://miro.medium.com/v2/resize:fit:250/1*ljSnRGg9vPVQwTg-sj5_0Q.jpeg",
      username: "Zyzz",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
      rating: 4.2,
    },
    {
      // avatar: ,
      username: "Melon Musk",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
      rating: 5,
    },
  ];

  const ratingSummary = (reviews) => {
    let noOfRat = [0, 0, 0, 0, 0];
    let totRat;
    reviews.map((review) => {
      if (review.rating >= 1 && review.rating < 3) noOfRat[0]++;
      else if (review.rating >= 2 && review.rating < 3) noOfRat[1]++;
      else if (review.rating >= 3 && review.rating < 4) noOfRat[2]++;
      else if (review.rating >= 4 && review.rating < 5) noOfRat[3]++;
      else if (review.rating == 5) noOfRat[4]++;
    });
    totRat = noOfRat.reduce((a, b) => a + b, 0);

    let ratVals = [0, 1, 2, 3, 4]; //percentages rating
    ratVals = ratVals.map((ratVal) => {
      return (noOfRat[ratVal] / totRat) * 100;
    });
    return { ratings: noOfRat, percentageRating: ratVals };
  };

  let ratSummary = ratingSummary(reviews);

  const handleMouseMove = (e) => {
    const { left, top } = e.target.getBoundingClientRect();
    setPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleAddToCart = async (product, quantity) => {
    try {
        // Ensure product, quantity, and currentUser are defined
        const userId = auth.currentUser.uid;
        if (!product || !quantity || !userId) {
            console.error('Product, quantity, or current user is undefined');
            return;
        }

        // Get a reference to the cart document for the current user
        const cartDocRef = doc(db, 'cart', userId);

        // Check if the cart collection exists
        const cartDocSnapshot = await getDoc(cartDocRef);
        if (!cartDocSnapshot.exists()) {
            // If the cart collection doesn't exist, create it
            await setDoc(cartDocRef, {});
        }

        // Get the current cart data
        const cartSnapshot = await getDoc(cartDocRef);
        const currentCartData = cartSnapshot.data();
        const updatedProductArray = currentCartData && currentCartData.products ? [...currentCartData.products] : [];

        // Create an object with the product and its quantity
        const productWithQuantity = { product: product, quantity: quantity,status:"order received" };

        // Push the productWithQuantity object into the updatedProductArray
        
            updatedProductArray.push(productWithQuantity);
       

        // Update the cart document with the new product array
        await setDoc(cartDocRef, { products: updatedProductArray });

        alert('Product added to cart successfully!');
    } catch (error) {
        console.error('Error adding product to cart: ', error);
    }
};


  

  const handleBuyNow = async () => {
    try {
      // Add logic to initiate purchase process
      console.log('Buying product: ', product);
    } catch (error) {
      console.error('Error buying product: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <div className="product-container">
        <div className="product-details">
          <div className="product-images">
            <div className="product-mainimg--container">
              <img
                src={mainimg}
                className="product-mainimg"
                onMouseMove={(e) => {
                  setMagnifierOn(true);
                  handleMouseMove(e);
                  console.log(`${position.x} ${position.y}`);
                }}
                onMouseLeave={() => setMagnifierOn(false)}
              />
            </div>
            Magnifier
            {magnifierOn && <Magnifier imgSrc={mainimg} mousepos={position} />}
            <div className="product-subimg--list">
              {productImages.map((img) => (
                <div className="product-subimg--container" key={img}>
                  <img
                    src={img}
                    className={
                      img === mainimg
                        ? "product-subimg--active"
                        : "product-subimg"
                    }
                    onMouseEnter={() => {
                      setMainimg(img);
                    }}
                    alt={`Product ${img}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details--basic">
            <span className="product-details--heading">{productName}</span>
            <div className="product-details--price">Rs. {productPrice}</div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <Flex direction={"row"} align={"center"} gap={"7"} pt={"5"}>
            <button className="product-atc--button" onClick={() => handleAddToCart(product, quantity)}>
              Add to cart
            </button>

              <button className="product-buy--button" onClick={handleBuyNow}>
                Buy
              </button>
            </Flex>
            {customisation === 'Yes' && (
             <Link
                   to={`/customisation/${shopId}/${productId}`}
                   className="product-customise--button">
                 <button className="customise-button">Customise</button>
             </Link>
            )}
  
            <Box width={"700px"} pt={"8"}>
              <Text as="p" wrap={"pretty"}>
                {productDescription}
              </Text>
            </Box>


            <Box pt={"7"}>
              <DataList.Root>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px" color="black">
                    Material
                  </DataList.Label>
                  <DataList.Value>
                    <span>hlo</span>
                  </DataList.Value>
                </DataList.Item>

                <DataList.Item align="center">
                  <DataList.Label minWidth="88px" color="black">
                    Size
                  </DataList.Label>
                  <DataList.Value>
                    <span>M</span>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Box>
          </div>
        </div>
        <Flex className="product-reviewrating" direction={"row"}>
          {/* rating card for product */}
          <Flex direction={"column"}>
            <span>Customer Rating</span>
            <RatingCardItem rating={5} ratSummary={ratSummary} />
            <RatingCardItem rating={4} ratSummary={ratSummary} />
            <RatingCardItem rating={3} ratSummary={ratSummary} />
            <RatingCardItem rating={2} ratSummary={ratSummary} />
            <RatingCardItem rating={1} ratSummary={ratSummary} />
          </Flex>
          {/* product review section */}
          <div className="product-review--section">
            {hasPurchased && <Review />}
            <CustomerReviews reviews={reviews} />
          </div>
        </Flex>
      </div>
    </div>
  );
}

function RatingCardItem({ rating, ratSummary }) {
  let { ratings, percentageRating } = ratSummary;

  return (
    <Flex direction={"row"} align={"center"} gap={"2"}>
      <Flex direction={"row"} align={"center"}>
        <Box width={"10px"}>{rating}</Box> <span>&#9733;</span>
      </Flex>
      <Progress
        className="product-rating--progressbar"
        value={percentageRating[rating - 1]}
        size={1}
      />
      <span>{ratings[rating - 1]}</span>
    </Flex>
  );
}

function CustomerReviews({ reviews }) {
  reviews = reviews;

  return (
    <div className="creview">
      <span className="creview-title">Customer Reviews</span>
      {reviews.map((review, index) => (
        <div className="creview-container" key={index}>
          <div className="creview-cdetails">
            <div className="creview-avatar--container">
              <img src={review.avatar} className="creview-avatar" alt={`Avatar of ${review.username}`} />
            </div>
            <span className="creview-username">{review.username}</span>
          </div>
          <p className="creview-review">{review.review}</p>
        </div>
      ))}
    </div>
  );
}

