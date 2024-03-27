import Navbar from "../components/Navbar/Navbar";
import { Flex, Text, Button, TextField, TextArea, Box } from "@radix-ui/themes";

export default function CustomerSupport() {
  return (
    <div>
      <Navbar />
      <Box width="800px" height="500px" pl={"9"} pt={"9"}>
      <Flex direction={"column"}>
        <Text>Your Name:</Text>
        <TextField.Root size="2" placeholder="" />
        <Text>Your Email:</Text>
        <TextField.Root size="2" placeholder="" />
        <Text>Your Phone no:</Text>
        <TextField.Root size="2" placeholder="" />
        <Text>Your Message:</Text>
        <TextArea size="2" placeholder="" />
        <Button variant="surface"> Submit </Button>
      </Flex>
      </Box>
    </div>
  );
}
