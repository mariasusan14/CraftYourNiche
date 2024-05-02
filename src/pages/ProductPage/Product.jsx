import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Text, Flex, Progress, DataList } from "@radix-ui/themes";
import Context from "../../Context/Context";
import "./Product.css";
import "./CustomerReview.css";
import Review from "../../components/Review/Review";
import Magnifier from "../../components/Magnifier/Magnifier";
import { db } from "../../config/firebase"; // Import your Firestore instance

export default function Product() {
  const [magnifierOn, setMagnifierOn] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPurchased, setPurchased] = useState(true);
  const { shopId, productId } = useParams();
  const products = useContext(Context);
  const product = products.find((product) => product.productId === productId);

  useEffect(() => {
    // Add logic to check if the user has purchased the product
    // Set the hasPurchased state based on the logic
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title: productName, price: productPrice, url: productUrl, description: productDescription } = product;
  const productImages = [productUrl];
  const [mainimg, setMainimg] = useState(productImages[0]);

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
      avatar:
        "data:image/webp;base64,UklGRv4IAABXRUJQVlA4IPIIAACwMwCdASrkAJ4APoFAm0klJCKhJtWJwKAQCWdu4XCA3IUizKOm2aqyoVnlvEjTftNEBM4yYVy3gdNM4lRXhkvBvO4quNFugpeqvronNdbf/crtyvOCt7cuTBqTNf6nDf3BY/xiNkDRUlh8iCNmIWeIdfkalzaTIC9M/Mom/2vskz8qkWieDOHJaMys3+gpxkxK4BWpni6PnLc5ngLorpUZWFVvNidRu6N7RXfvblyYFV25ZV58r6YfPWpeF8V5SR1WdG7vxQ5xeItmBYXl3004237JhZdMAt9Gk/+3+cuX3a+Xxauiz8Ube5WZ9+xo+Z0Jo38fR7m3LBqJTNb58F5AfblwU0cPq9R1u8VjzvTfVa9Yqb9+3z/aluJDL9ueIgO6oom/agQqtd7DCwOqsbQ9g+hq2QUiSFdNNhaRN9zyfI/v+SmhJmAds9qKUR3cR4EPYTL7PwA9jhJkTB9F5/dOMIlyHWxXR6BI4bzGkxsYIhvirxy0x8qH5LsRIYGWXcGIEiV4cQ7hCYon1iQoDNhZOhtYbaEbag/W2/M2jisjo10M6/r0AAD+/wgrp7/0WZNa3BcbKSNH5p6hEsQiWHABFQjdU5G7HR05LSq1A2syyL6XQHYO10Gj6DybfWX3ui/cPybpBUbqXqY8ZSgjSFA/apQErO4LO8teOG6EtQhu57TA396CE1AJXFM9yAeR+8WsoYWphl9jEusa3F8iVgpKpTKRMTmlEfgUFb9s92xKGOTOIPqVEX3bOlhFy5K7Yjr7eQgVDaz23sQC4igYJGRA4+2Uk52wbYPKZu3zQ1W5W4OqQWRPOiG6QovNeHL5f7XW0T9HwHzNE+gzBWFOvifTo8OqgOUTKtWbrR+XYNw8bX6Jm3eCPaj0wb8HRk2EcSR78EtxygZaEdqi714UgZrDsp8h4SV3hpqjPQaF19zz7CyhExRZ8EEidisY5TqSJQHYmBXPosfykCNkZ53kKUdKER+gZQgfeeNW0KdETFWliKFjW9myw9LtsaHghatxntKX22uTz+qXzd5G8BO/fTCUsosabZMy5fX9dhfm4ivrxkqIDevlGwh7o282UWwRHAumIgY8a50HwcJd2Pbfxror+t90PRIHq+tsvZVwSJM2hS9tyA8RnFEDimwRH/bScQSBraTQDMfv06XaxTnbGPxF4ETYjpm+YsZAz28e3xxx0UM1NCTdqasPVxpY3bfY3gCWfdczS1y8x2Ly3clWIdsdGgY6m6jJGgK9CxGAur/WKEcdfJgionbkxBvDNVOLE5Hxwfw1wCgZRoelIIUFoeaSeDAKne0Ek74vzMrWF73VCPLp5ljly76Dt5PLunkAJTtkoKyO5NavrsolatkEM3IzrO3tpSpkDrMjX+5BQwoDpLG2TdKgHTQ0ETKSu3IGThtLKrLj4uMVWtR5JReH5RK/7u7KKZSCN0em7vltmwrnIQHSstBpwd1tj+4K9cmsd+6cbz+6E3GgZoeVzP+Y6XwXJaSqt7d56x63+9nYpZHf7OSq/p61ZohcU2/ira77ZfPYllS8REdZx61uPT+Ai8yN1uWp5gYoHfATn5BxU/06EevRC/wf/kd0k8Mg2rj0Mat1w3YbDFRep9JCr7lCTriImYPB/hVUWDNiQTtYVpw+4p1fR9POa/2khVeHHd6YqvWyLAzebbczr3PYc3ZizwX8gag+9fi/h8rJvwauI5/p8dIhmFMbiA0ZQAe0fv6+gry0K0rkE7stVtB3pbPy49FbMjP8EESL/V3AqVVtgsXM0goY3JqaCGS2hh9dVlZyuVjTVCd1EDqzBQxYOLV7RoXzBy2LQtwZHmYutqEdXhQouH07SmOsCuYStJ2+Cw2C0jlN+W7I3lI8CsiPIu04eE5+kNTXORWK4I9nBKlUcz1DHtbNWwUzKTT0dcIiqKuIvgmmClgdzwrumlCjgBI6rpYw8Nko89NLfeqbpfYEhq4GhRvnK05JRQ6gEIhanF2bUdQcxSpMbI7TIL7P8nef4UK6P5coHOQYnj+SxDiakSCwKMOoifgkbLFtgv5/3o315mSsA45RCv/Y05envshfVi2YVW+DzmCucls2NidHYX1PcfXhd+4h8fcXnhB1GJJO2mczGj9GTDQG2G5vT4O6QmS5TdZys/mi5mG5RM5KjSUy0yAuSRDmVJbWq6kKLL+iLfsgN+FQ+6/X001zKU+n/cnGhk7viejDP2WmatPQ2EkEDwPocrK/cnSlXWNA5zyvSEaOF2xHI9KZ8Nhu3dOAgo9Eb7IhVbUhpWarfLIy1KMnMp/3hXUTAjIJE2L9MVNay91ZeyOI7USCreXXDbdH+vKIykR+lpyCt6OeXXYXffE6R1hUq5jbt+DpCcoQaaNCVFyOo+x3lEhDbbLve/ZHed7o1JnYuJHxWScdmcw3pQySTmsubq6y2Eb+JMafiuzhKvxuGHXHVAySdNuLIqH+SoleAf1n1ggOk/9QHnqJj3ETvlr3cPpi4AWbGvoZ3lAEyCrgfrkuezaYxjox90GZtWJLPPIzzxEOpG8xiOgAWZ+FjHWcEEs5iwuIben3F+D/lgm9sRvi1L8HjjZR250G6C0fHRobjgBJhThSbaIOsFumV9nwxJP+EwQGDn1RSwC6fo7BoGC6xaAu3NScMOZ8QkytaeiXosf5TPchaHDP2lMnAeJk5ag3VepKSMzACs4dZddFkN6VPYzX/z/3f0z04SNKU45snAX6g/mM3ucpNhSMZpDY3aioEqRaH/EknZhKpSnuoGwV6YIsS/yUy5SAGy9Bv7NbjhU8/CNaXEot3vi68o8ZOzEZJe/Pc/DBeJnrqn+BjkIliUl2ZDWv51wEtHqZMvM7ejI+LY66H01n4CDuH4Qh5gsjVYwI1RU2Y4mmiJhMjKTbRupJ23ai/azfQFWh3v9uFU/6X4K5Ru+B4MYt0WsxT5KEWAPfDq0jEAsWmF5sO+kCLJUilx8P7pKdwA47PCibHhd1yEIRg347kqa+UPq5PQJs7QjRDXMfUh03qqxTnz0LHRIKRzq2PM7EoMiqJuTS/X89KXaZT189IK1AAAAA",
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

  const handleAddToCart = async () => {
    try {
      // Add logic to add product to Firestore shopping cart
      await db.collection('customers').doc(currentUser.uid).collection('shoppingcart').add(product);
      console.log('Product added to cart successfully!');
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
            <Flex direction={"row"} align={"center"} gap={"7"} pt={"5"}>
              <button className="product-atc--button" onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className="product-buy--button" onClick={handleBuyNow}>
                Buy
              </button>
            </Flex>
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
