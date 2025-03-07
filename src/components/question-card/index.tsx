import { Card } from "@chakra-ui/react";
import { BlackQuestionIcon } from "../../assets";
import Breakpoints from "../mediaQuery";

export const QuestionCard = ({ question, index }: any) => {
  const { sm, md, lg } = Breakpoints();
  return (
    <Card
      maxW={sm ? 240 : md ? 300 : lg ? 340 : 206.67}
      minH={sm || md || lg ? 70 : 114}
      backgroundColor={"#E2EBF6"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={sm || md || lg ? "" : "center"}
      flexDirection={sm || md || lg ? "row" : "column"}
      marginTop={sm || md || lg ? "10px" : "0px"}
      cursor={"pointer"}
    >
      <div
        style={{
          marginTop: "15px",
          marginLeft: sm || md || lg ? "10px" : "0px",
        }}
      >
        <BlackQuestionIcon />
      </div>
      <div
        style={{
          color: "#18191B",
          fontSize: "12px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        {question}
        {index === 0 ? "" : "?"}
      </div>
    </Card>
  );
};
