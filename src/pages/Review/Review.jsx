import { Box, Flex, TextArea } from "@radix-ui/themes";
import "./Review.css";
export default function Review() {
  return (
    <div className="review-box--whole">
      <span>We would love to hear from you..</span>
      <Box>
        <TextArea size={"3"} placeholder="Write a review" />
      </Box>
      <button className="review-button--submit">Submit review</button>
    </div>
  );
}
