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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductListing.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          const { title, url, price, category, description, productId } =
            productDoc.data();
          productsData.push({
            shopId,
            title,
            url,
            price,
            category,
            description,
            productId,
          });
        });
      }

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [sliderValueInitial, setSliderValueInitial] = useState(0); // Initial value of the slider
  const [sliderValueFinal, setSliderValueFinal] = useState(100); // Initial value of the slider

  const [ratingfilter, setRatingfilter] = useState(1);
  const sortPriceAscendingFn = (a, b) => {
    if (a.price > b.price) return 1;
    else if (a.price < b.price) return -1;
    return 0;
  };
  const sortPriceDescendingFn = (a, b) => {
    if (a.price > b.price) return -1;
    else if (a.price < b.price) return 1;
    return 0;
  };
  const handleSearch = async () => {
    
    if (!searchQuery.trim()) {
      await fetchProducts();
      return;
    }

    
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
    setSearchQuery('')
  };
  return (
    <div>
    <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{width:'auto',height:'auto'}}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
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
              <RadioGroup.Root defaultValue="0">
                <RadioGroup.Item
                  value="0"
                  style={{ visibility: "hidden" }}
                ></RadioGroup.Item>

                <RadioGroup.Item
                  color="indigo"
                  value="1"
                  onClick={() => {
                    setProducts([...products.sort(sortPriceAscendingFn)]);
                  }}
                >
                  Price Ascending
                </RadioGroup.Item>

                <RadioGroup.Item
                  color="indigo"
                  value="2"
                  onClick={() => {
                    setProducts([...products.sort(sortPriceDescendingFn)]);
                  }}
                >
                  Price Descending
                </RadioGroup.Item>
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
          {/*<div>
            <Box pl={"5"} pb={"2"}>
              Rating
            </Box>
            <Flex pl={"8"} direction="column" gap="2">
              <Box width="100px">
                <Button color="orange" variant="soft">
                  4 and above
                </Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">
                  3 to 4
                </Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">
                  2 to 3
                </Button>
              </Box>
              <Box width="100px">
                <Button color="orange" variant="soft">
                  1 to 2
                </Button>
              </Box>
            </Flex>
              </div>*/}
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
                  return (
                    <div>
                      <div>
                        <Link
                          to={{
                            pathname: `/product/${product.shopId}/${product.productId}`, // Use index or product ID as a unique identifier for the product
                            state: { product }, // Pass product data as state
                          }}
                          key={product.productId}
                        >
                          <ProductCard product={product} />
                        </Link>
                      </div>
                    </div>
                  );
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
