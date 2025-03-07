import {
  Box,
  Card,
  Grid,
  GridItem,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PinIcon,
  QuestionIcon,
  QuestionSingleIcon,
  UnpinIcon,
} from "../../assets";
import { MoreVertical16Filled } from "@fluentui/react-icons";
import { OBJECT, checkType, extractMonthAndDay } from "../../utils.js";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breakpoints from "../mediaQuery";

const ThreadList = ({
  searchQuery,
  threads,
  setThreads,
  currentPage,
  totalPages,
  totalRows,
  isLoading,
  showSidebar,
  showMore, // Only for pinned threads
  setShowMore, // Only for pinned threads
  loader,
  selectedThread,
  setSelectedThread,
  menuSelected,
  setMenuSelected,
  getThreads,
  toggleThread,
  userId,
  isPinned,
  emptyMessage,
  setIsOpen,
  threadLoader,
  threadChatCountFlag,
}: any) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { sm } = Breakpoints();

  const renderQuestionIcon = (item: any, selectedThread: any) => {
    const isSelected = selectedThread?.id === item?.id;
    const fillColor = isSelected ? "#0C2340" : "#E2EBF6";
    const textColor = isSelected ? "white" : "#0C2340";

    if (item?.chatCount === 1) {
      return (
        <QuestionSingleIcon
          fill={fillColor}
          text={textColor}
          width={sm ? "34" : "48"}
          height={sm ? "34" : "48"}
        />
      );
    } else {
      return (
        <QuestionIcon
          fill={fillColor}
          text={textColor}
          width={sm ? "34" : "48"}
          height={sm ? "34" : "48"}
        />
      );
    }
  };

  const getThreadTitle = (item: any) => {
    if (checkType(item?.name) === OBJECT) {
      try {
        return JSON.parse(item?.name)?.issue_title || "";
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return "";
      }
    }
    return item?.name || "";
  };

  // useEffect(() => {
  //   const data = [...threads];
  //   const index = data?.findIndex(
  //     (item: any) => item.id == threadChatCountFlag
  //   );
  //   if (index !== -1 && data[index].chatCount === 1) {
  //     // Create a new object with updated chatCount and replace the old object in the array
  //     data[index] = { ...data[index], chatCount: 2 };
  //     setThreads(data);
  //   }
  // }, [threadChatCountFlag]);

  return (
    <div
      style={{
        display:
          !showSidebar && menuSelected === (isPinned ? "ALL" : "PINNED")
            ? "none"
            : "flex",
      }}
      className="thread-list-container"
    >
      {threadLoader ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "180px",
          }}
        >
          <Spinner color="blue" />
        </Box>
      ) : threads?.length > 0 ? (
        <InfiniteScroll
          dataLength={threads.length}
          next={() => {
            if (currentPage <= totalPages && threads?.length <= totalRows) {
              getThreads(userId, isPinned, currentPage, searchQuery, false);
            }
          }}
          hasMore={currentPage <= totalPages}
          loader={
            isLoading && (
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
          scrollableTarget={isPinned ? "pinned-threads" : "un-pinned-threads"}
        >
          <div
            className="thread-list"
            id={isPinned ? "pinned-threads" : "un-pinned-threads"}
            style={{
              maxHeight:
                //  !showSidebar
                //   ? "480px"
                //   :
                // isPinned && showSidebar ? "280px" : "calc(100vh - 600px)",
                isPinned && showSidebar ? "280px" : "calc(100vh - 180px)",
              overflow: "auto",
            }}
          >
            {((isPinned && showMore) || menuSelected
              ? threads
              : isPinned
              ? threads.slice(0, 3)
              : threads
            ).map((item: any) => (
              <Card
                key={item.id}
                marginTop={"10px"}
                height={"75px"}
                border={"1px solid #E2EBF6"}
                borderRadius={"10"}
                cursor={"pointer"}
                onClick={() => {
                  setMenuSelected("");
                  setSelectedThread(item);
                  navigate(`/messages/${item?.id}`);
                  setIsOpen && setIsOpen(false);
                }}
                backgroundColor={
                  item?.id === selectedThread?.id ? "#E2EBF6" : ""
                }
                boxShadow={"none"}
              >
                <Grid
                  templateColumns="repeat(12, 1fr)"
                  alignItems="center"
                  gap={4}
                >
                  <GridItem colSpan={2} style={{ paddingLeft: "10px" }}>
                    {renderQuestionIcon(item, selectedThread)}
                  </GridItem>
                  <GridItem colSpan={sm ? 7 : 8}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        marginLeft: sm ? "16px" : "10px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {getThreadTitle(item)}
                    </div>
                  </GridItem>
                  <GridItem
                    colSpan={sm ? 3 : 2}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Menu isLazy>
                      <MenuButton onClick={(e) => e.stopPropagation()}>
                        {loader?.id === item?.id ? (
                          <Spinner size={"sm"} style={{ marginTop: "10px" }} />
                        ) : (
                          <MoreVertical16Filled
                            height={20}
                            style={{
                              marginTop: "12px",
                              marginLeft: "15px",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </MenuButton>
                      <MenuList
                        style={{ backgroundColor: "white" }}
                        border="none"
                        boxShadow={"lg"}
                        minWidth={"140px"}
                        maxWidth={"140px"}
                      >
                        <MenuItem
                          style={{ backgroundColor: "white" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleThread(item, !isPinned);
                          }}
                          minWidth={"140px"}
                          maxWidth={"140px"}
                        >
                          {isPinned ? <UnpinIcon /> : <PinIcon />}
                          <span
                            style={{ marginLeft: "10px", fontSize: "12px" }}
                          >
                            {isPinned
                              ? t("sidebar.unpinChat")
                              : t("sidebar.pinChat")}
                          </span>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <div
                      style={{
                        color: "#798692",
                        fontSize: "12px",
                        marginTop: "20px",
                      }}
                    >
                      {extractMonthAndDay(item?.createdAt)}
                    </div>
                  </GridItem>
                </Grid>
              </Card>
            ))}

            {isPinned && threads.length > 3 && (
              <div
                style={{
                  display: showSidebar ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#0C2340",
                  fontSize: "12px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? t("sidebar.showLess") : t("sidebar.showMore")}
                {showMore ? (
                  <ChevronUpIcon style={{ marginLeft: "5px" }} />
                ) : (
                  <ChevronDownIcon style={{ marginLeft: "5px" }} />
                )}
              </div>
            )}
            {isLoading && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                h={200}
              >
                <Spinner color="blue" />
              </Box>
            )}
          </div>
        </InfiniteScroll>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          h={"100"}
          width={"100%"}
          color={"gray.300"}
        >
          {emptyMessage}
        </Box>
      )}
    </div>
  );
};

export default ThreadList;
