import {
  Box,
  Flex,
  Text,
  Slider,
  Button,
  DropdownMenu,
  RadioGroup,
} from "@radix-ui/themes";
import Navbar from "../../components/Navbar/Navbar";
import { collection,getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductListing.css";
import { useEffect, useState } from "react";

export default function ProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const productsData = [];
        const querySnapshot = await getDocs(collection(db, 'shops'));
        for (const doc of querySnapshot.docs) {
          const productsCollectionRef = collection(doc.ref, 'products');
          const productsQuerySnapshot = await getDocs(productsCollectionRef);
          productsQuerySnapshot.forEach((productDoc) => {
            const { title, url, price } = productDoc.data();
            productsData.push({ title, url, price });
          });
        }
        console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    

  const [sliderValueInitial, setSliderValueInitial] = useState(0); // Initial value of the slider
  const [sliderValueFinal, setSliderValueFinal] = useState(100); // Initial value of the slider

  const [ratingfilter, setRatingfilter] = useState(1);

  return (
    <div>
      <Navbar />
      <Flex direction="row">
        {/* Filters: */}
        <div className="productlisting-filters">
          <Flex direction={"row"} p={"5"}>
            <span>Filters</span>
            <div className="productlisting-filtericon--container">
              <img
                className="productlisting-filtericon"
                src="https://t3.ftcdn.net/jpg/03/20/78/84/360_F_320788475_nEiLVViOBewea7taZWqNUR0lJAMTAaSo.jpg"
              />
            </div>
          </Flex>

          {/* Sort */}
          <Flex pb="3" direction={"column"}>
            <Box pl={"4"} pb={"2"}>
              <Text>Sort by:</Text>
            </Box>
            <Box pl={"7"}>
            <RadioGroup.Root defaultValue="1" name="example">
              <RadioGroup.Item color="indigo" value="1">Price</RadioGroup.Item>
              <RadioGroup.Item color="indigo" value="2">Customer Rating</RadioGroup.Item>
              <RadioGroup.Item color="indigo" value="3">Purchases</RadioGroup.Item>
            </RadioGroup.Root>
            </Box>
          </Flex>
          <div className="productlisting-filters--price">
            {/* Slider for price filter */}
            <div className="productlisting-filters--price---slider">
              <Slider
                defaultValue={[0, 100]}
                value={[sliderValueInitial, sliderValueFinal]}
                onValueChange={([u, v]) => {
                  setSliderValueInitial(u);
                  setSliderValueFinal(v);
                }}
                size={"2"}
                color="tomato"
              />
            </div>
            <span>
              <Text>
                Price {sliderValueInitial} to {sliderValueFinal}
              </Text>
            </span>
          </div>
          <div>
            <Box pl={"5"} pb={"2"}>
              Rating
            </Box>
            <Flex pl={"8"} direction="column" gap="2">
              <Box width="100px">
                <Button color="orange" variant="soft">4 and above</Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">3 to 4</Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">2 to 3</Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">1 to 2</Button>
              </Box>
            </Flex>
          </div>
        </div>

        <div className="productlisting-filters--separator" />

        <div>
          <Flex direction={"column"}>
            <div>items</div>
            <div className="productlisting-grid">
              {products.map((product) => {
                if (
                  product.price >= (sliderValueInitial / 100) * 1500 &&
                  product.price <= (sliderValueFinal / 100) * 1500
                ) {
              
                  return <ProductCard product={product} />;
                }
              })}
            </div>

            <div></div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

// import {
//   Box,
//   Flex,
//   Text,
//   Slider,
//   Button,
//   RadioGroup,
// } from "@radix-ui/themes";
// import Navbar from "../../components/Navbar/Navbar";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import "./ProductListing.css";
// import { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export default function ProductListing() {
//   const [products, setProducts] = useState([]);
//   const [sliderValueInitial, setSliderValueInitial] = useState(0);
//   const [sliderValueFinal, setSliderValueFinal] = useState(100);
//   const [ratingFilter, setRatingFilter] = useState(null);
//   const [sortOption, setSortOption] = useState("price");

//   useEffect(() => {
//     fetchProducts();
//   }, [sliderValueInitial, sliderValueFinal, ratingFilter, sortOption]);

//   const fetchProducts = async () => {
//     try {
//       const shopCollectionRef = collection(db, "shops");
//       const shopSnapshot = await getDocs(shopCollectionRef);
//       const shopData = [];

//       for (const doc of shopSnapshot.docs) {
//         const productsCollectionRef = collection(doc.ref, "products");
//         const productsSnapshot = await getDocs(productsCollectionRef);

//         productsSnapshot.forEach((productDoc) => {
//           const productData = productDoc.data();
//           shopData.push({
//             name: productData.title,
//             image: productData.url,
//             price: productData.price,
//             rating: productData.rating,
//           });
//         });
//       }

//       applyFiltersAndSort(shopData);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const applyFiltersAndSort = (data) => {
//     let filteredData = data;

//     // Apply price range filter
//     filteredData = filteredData.filter(
//       (product) =>
//         product.price >= (sliderValueInitial / 100) * 1500 &&
//         product.price <= (sliderValueFinal / 100) * 1500
//     );

//     // Apply rating filter
//     if (ratingFilter !== null) {
//       filteredData = filteredData.filter(
//         (product) => product.rating >= ratingFilter
//       );
//     }

//     // Apply sorting
//     if (sortOption === "price") {
//       filteredData.sort((a, b) => a.price - b.price);
//     } else if (sortOption === "rating") {
//       filteredData.sort((a, b) => b.rating - a.rating);
//     }

//     setProducts(filteredData);
//   };

//   const handleSortChange = (value) => {
//     setSortOption(value);
//   };

//   const handleRatingFilterChange = (value) => {
//     setRatingFilter(parseFloat(value));
//   };

//   return (
//     <div>
//       <Navbar />
//       <Flex direction="row">
//         <div className="productlisting-filters">
//           {/* Filters */}
//           <Flex direction={"row"} p={"5"}>
//             <span>Filters</span>
//             <div className="productlisting-filtericon--container">
//               {/* Filter icon */}
//             </div>
//           </Flex>

//           {/* Sort */}
//           <Flex pb="3" direction={"column"}>
//             <Box pl={"4"} pb={"2"}>
//               <Text>Sort by:</Text>
//             </Box>
//             <Box pl={"7"}>
//               <RadioGroup.Root
//                 defaultValue="price"
//                 name="sort-options"
//                 onValueChange={handleSortChange}
//               >
//                 <RadioGroup.Item color="indigo" value="price">
//                   Price
//                 </RadioGroup.Item>
//                 <RadioGroup.Item color="indigo" value="rating">
//                   Customer Rating
//                 </RadioGroup.Item>
//               </RadioGroup.Root>
//             </Box>
//           </Flex>

//           {/* Price range filter */}
//           <div className="productlisting-filters--price">
//             <div className="productlisting-filters--price---slider">
//               <Slider
//                 defaultValue={[0, 100]}
//                 value={[sliderValueInitial, sliderValueFinal]}
//                 onValueChange={([u, v]) => {
//                   setSliderValueInitial(u);
//                   setSliderValueFinal(v);
//                 }}
//                 size={"2"}
//                 color="tomato"
//               />
//             </div>
//             <span>
//               <Text>
//                 Price {sliderValueInitial} to {sliderValueFinal}
//               </Text>
//             </span>
//           </div>

//           {/* Rating filter */}
//           <div>
//             <Box pl={"5"} pb={"2"}>
//               Rating
//             </Box>
//             <Flex pl={"8"} direction="column" gap="2">
//               <Box width="100px">
//                 <Button
//                   color="orange"
//                   variant="soft"
//                   onClick={() => handleRatingFilterChange(4)}
//                 >
//                   4 and above
//                 </Button>
//               </Box>
//               {/* Add other rating filters similarly */}
//             </Flex>
//           </div>
//         </div>

//         <div className="productlisting-filters--separator" />

//         <div>
//           <Flex direction={"column"}>
//             <div>Items</div>
//             <div className="productlisting-grid">
//               {products.map((product, index) => (
//                 <ProductCard key={index} product={product} />
//               ))}
//             </div>
//             <div></div>
//           </Flex>
//         </div>
//       </Flex>
//     </div>
//   );
// }
