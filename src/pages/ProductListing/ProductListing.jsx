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

import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductListing.css";
import { useEffect, useState } from "react";

export default function ProductListing() {
  let products = [
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 400,
      rating: 3,
    },
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 1500,
      rating: 4.5,
    },
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 1000,
      rating: 4.5,
    },
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 1200,
      rating: 4.5,
    },
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 1000,
      rating: 4.5,
    },
    {
      name: "wooden pot",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/7/NK/QZ/AW/132970306/handicraft-items-500x500.jpg",
      price: 1000,
      rating: 3,
    },
    // Add other products similarly
  ];

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
