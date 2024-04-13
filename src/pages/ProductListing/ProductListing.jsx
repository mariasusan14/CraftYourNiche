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

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = [];
      const querySnapshot = await getDocs(collection(db, "shops"));

      for (const doc of querySnapshot.docs) {
        const productsCollectionRef = collection(doc.ref, "products");
        const productsQuerySnapshot = await getDocs(productsCollectionRef);
        productsQuerySnapshot.forEach((productDoc) => {
          const { title, url, price } = productDoc.data();
          productsData.push({ title, url, price });
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
  console.log(products);
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

                <RadioGroup.Item color="indigo" value="3">
                  Customer Rating
                </RadioGroup.Item>

                <RadioGroup.Item color="indigo" value="4">
                  Purchases
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
          <div>
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
