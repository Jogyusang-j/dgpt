import { Box, HStack, Spinner, Text } from "@chakra-ui/react";
import "../../styles/Chatbot.css";
import { Delete } from "../../assets";
import axios from "axios";
import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { TimeIcon } from "@chakra-ui/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "lodash";
import { convertTime } from "../../utils.js";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export const ChatHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [threads, setThreads] = useState<Array<any>>([]);
  const [userId, setUserId] = useState<string | undefined>("");
  const [page, setPage] = useState(1); // Track current page
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      if (context) {
        const userID = context.userObjectId;
        setUserId(userID);
        loadThreads(userID);
      } else {
        console.log("App is not running inside Microsoft Teams");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadThreads = (userId: any) => {
    setLoading(true);
    getThreads(userId);
  };

  const getThreads = (userId: any) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/threads?page=${page}`, {
        headers: {
          "x-api-key": userId,
        },
      })
      .then((response) => {
        setTotalRows(response?.data?.data?.count);
        setTotalPages(Math.ceil(response?.data?.data?.count / 10));
        const newThreads = response?.data?.data?.rows || [];
        setThreads((prevThreads) => [...prevThreads, ...newThreads]);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
        setPageLoading(false);
        setPage(page + 1);
      });
  };

  const deleteThread = (threadId: any) => {
    setLoading(true);
    const payload = {
      ids: [threadId],
    };
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/thread`, {
        headers: {
          "x-api-key": userId,
        },
        data: payload,
      })
      .then((response) => {
        const status = response?.data?.status;
        if (status) {
          const updatedThreads = threads.filter((t) => t.id !== threadId);
          setThreads(updatedThreads);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box className="chat-widget" overflowY={"hidden"}>
      <Box mb={4} marginLeft={"12px"}>
        <Text fontSize="2xl" fontWeight="bold">
          Chat History
        </Text>
      </Box>
      {loading && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          h={"100vh"}
        >
          <Spinner color="blue" size="xl" />
        </Box>
      )}
      {threads?.length > 0 ? (
        <InfiniteScroll
          dataLength={threads.length} // Length of the threads array
          next={() => {
            if (page <= totalPages && threads.length <= totalRows) {
              setPageLoading(true);
              getThreads(userId);
            }
          }} // Function to call for loading more threads
          hasMore={page <= totalPages} // Condition to check if more data needs to be loaded
          loader={
            pageLoading && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner color="blue" />
              </Box>
            )
          }
          scrollableTarget="threads-container" // The ID of the scrollable div
        >
          <div
            id="threads-container"
            style={{
              width: "100%",
              maxHeight: "calc(100% - 70px)",
              height: "calc(100% - 70px)",
              overflow: "scroll",
            }}
          >
            {threads.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #E4EBF0",
                  borderRadius: "6px",
                  padding: "20px",
                  marginLeft: "20px",
                  marginRight: "35px",
                  marginBottom: "20px",
                  maxWidth: "calc(100% - 55px)", // Adjusted to prevent horizontal overflow
                  boxSizing: "border-box",
                  transition: "background-color 0.1s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0"; // Light gray on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white"; // Revert to original color
                }}
                onClick={() => navigate(`/chatbot/${item?.id}`)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <HStack>
                      <TimeIcon color="gray.shineGrayText" />
                      <Text color="gray.graytText" fontSize="sm">
                        {convertTime(item?.updatedAt || item?.createdAt) +
                          ` ago`}
                      </Text>
                    </HStack>

                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      {item?.name}
                    </div>
                  </div>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default action
                      e.stopPropagation(); // Stop click event from bubbling up
                      deleteThread(item?.id);
                    }}
                  >
                    <Delete color="red" />
                  </Box>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          h={"100vh"}
          color={"gray.300"}
        >
          No Previous Chat History.
        </Box>
      )}
    </Box>
  );
};
