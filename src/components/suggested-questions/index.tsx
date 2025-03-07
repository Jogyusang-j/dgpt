import { useEffect, useState } from "react";
import { QuestionCard } from "../question-card";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";
import { KoreanLanguage } from "../../utils.js";
import { useNavigate } from "react-router-dom";

export const SuggestedQuestions = ({
  userId,
  userInput,
  setUserInput,
  setLoading,
}: any) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<any>([]);

  const getSuggestedQuestions = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/suggestion-questions`, {
        headers: {
          "x-api-key": userId,
          Language: KoreanLanguage,
        },
      })
      .then((response) => {
        setSuggestedQuestions(response?.data?.data?.rows);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (userId) getSuggestedQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        marginTop: "30px",
      }}
    >
      {loader ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "120px",
          }}
        >
          <Spinner color="blue" />
        </Box>
      ) : (
        suggestedQuestions?.map((questionObj: any, index: number) => (
          <div
            key={questionObj.id} // Move key here
            onClick={() => {
              navigate({
                pathname: "/messages",
                search: questionObj?.question,
              });
            }}
          >
            <QuestionCard question={questionObj.question} index={index} />
          </div>
        ))
      )}
    </div>
  );
};
