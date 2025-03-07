import { Box, Button } from "@chakra-ui/react";
import { DgptLogo, PinIcon, MessageIcon, ArrowRight } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import axios from "axios";
import { ALL, DEBOUNCE_DELAY, PINNED } from "../../utils.js";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import SideMenu from "../sideMenu";
import SidebarHeader from "../sidebarHeader";
import SearchBar from "../searchBar";
import ThreadHeader from "../threadHeader";
import ThreadList from "../threadList";
import Breakpoints from "../mediaQuery";
import { PlusSign } from "../../assets/icons";
import Emitter from "../../services/emitter";
import useThreads from "../../hooks/useThreads";
import { useThreadContext } from "../../context/thread-context";

export const Sidebar = ({
  setIsOpen,
  threadChatCountFlag,
  toggleThreadChatCount,
}: any) => {
  const { t } = useTranslation("common");
  const { sm, md, lg } = Breakpoints();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    getThreads,
    loading,
    pinnedTotalPages,
    unPinnedTotalPages,
    currentPinnedPage,
    currentUnpinnedPage,
    threadLoader,
    pinnedPageLoading,
    unPinnedPageLoading,
    pinnedThreads,
    unPinnedThreads,
    pinnedTotalRows,
    unPinnedTotalRows,
    setPinnedThreads,
    setUnPinnedThreads,
    setPinnedTotalRows,
    setUnPinnedTotalRows,
    setLoading,
    setPinnedLoader,
    setUnPinnedLoader,
    setCurrentPinnedPage,
    setCurrentUnpinnedPage,
    setThreadLoader,
    setNewChatThread,
    newChatThread,
    beforeThreads,
    afterThreads,
    errorThreads,
    envVar,
    threadError,
  } = useThreadContext();

  useEffect(() => {
    if (!selectedThread && pathname != "/tab" && !sm)
      setSelectedThread(unPinnedThreads?.[0]);
  }, [unPinnedThreads]);

  const [loader, setToggleLoader] = useState<any>(null);
  const [userId, setUserId] = useState<string | undefined>("");
  const [showMore, setShowMore] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [menuSelected, setMenuSelected] = useState<any>("");
  const divRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    // Check if the click was outside the div
    if (divRef.current && !divRef?.current?.contains(event.target)) {
      console.log("come here in div");
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    Emitter.on("fetchThreads", (value: any) => {
      // if (value && userId) {
      //   setCurrentUnpinnedPage(1);
      //   setUnPinnedThreads([]);
      //   loadUnPinnedThreads(userId, false);
      //   if (unPinnedThreads && unPinnedThreads.length > 0)
      //     setSelectedThread(unPinnedThreads[0]);
      // }
    });

    return () => {
      Emitter.off("fetchThreads");
    };
  }, [userId, unPinnedThreads]);

  const handleNavigation = (path: string) => {
    if (pathname.includes(path)) {
      navigate("/refresh", { replace: true });
      navigate(path, { replace: true });
    } else navigate(path);
  };

  const handleInputChange = (event: any) => {
    setCurrentPinnedPage(1);
    setCurrentUnpinnedPage(1);
    setSearchQuery(event.target.value);
    if (!event.target.value) {
      setPinnedThreads([]);
      setUnPinnedThreads([]);
    }
  };

  useEffect(() => {
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      if (context) {
        const userID = context.userObjectId;
        setUserId(userID);
      } else {
        console.log("App is not running inside Microsoft Teams");
      }
    });
  }, []);

  useEffect(() => {
    const debouncedLoadThreads = debounce(() => {
      setLoading(true);
      // Perform search or load all threads based on the searchQuery

      if (userId) {
        setThreadLoader(true);
        loadUnPinnedThreads(userId, false);
        loadPinnedThreads(userId, true);
      }
      if (searchQuery) {
        setPinnedThreads([]);
        setUnPinnedThreads([]);
      }
    }, DEBOUNCE_DELAY);

    debouncedLoadThreads();

    // Cleanup the debounced function on unmount
    return () => {
      debouncedLoadThreads.cancel();
    };
  }, [searchQuery, userId]);

  const loadPinnedThreads = (userId: any, isPinned: boolean) => {
    setPinnedLoader(true);
    getThreads(userId, isPinned, currentPinnedPage, searchQuery, false);
  };

  const loadUnPinnedThreads = (userId: any, isPinned: boolean) => {
    setUnPinnedLoader(true);
    getThreads(userId, isPinned, currentUnpinnedPage, searchQuery, false);
  };

  const toggleThread = (thread: any, isPinned: boolean) => {
    setToggleLoader(thread);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/thread/pin/${thread?.id}?is_pinned=${isPinned}`,
        {}, // If there's no body, send an empty object
        {
          headers: {
            "x-api-key": userId,
          },
        }
      )
      .then((response) => {
        if (isPinned) {
          setUnPinnedThreads((prevThreads: any) =>
            prevThreads.filter((item: any) => item.id !== thread?.id)
          );
          setUnPinnedTotalRows((preRows: any) => preRows - 1);
          setPinnedThreads((preThreads: any) => [thread, ...preThreads]);
          setPinnedTotalRows((preRows: number) => preRows + 1);
        } else {
          setPinnedThreads((prevThreads: any) =>
            prevThreads.filter((item: any) => item.id !== thread?.id)
          );
          setPinnedTotalRows((preRows: number) => preRows - 1);
          setUnPinnedThreads((preThreads: any) => [thread, ...preThreads]);
          setUnPinnedTotalRows((preRows: number) => preRows + 1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setToggleLoader(null);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100%",
          // width: "100%",
          padding: sm || md || lg ? "0px" : "15px",
          // backgroundColor: sm ? "white" : "#F0F5F8",
        }}
      >
        {/* <div>
          <div>{userId}</div>
          <div>{"beforeThreads " + beforeThreads}</div>
          <div>{"afterThreads " + afterThreads}</div>
          <div>{"errorThreads " + errorThreads}</div>
          <div>{"unPinnedTotalPages: " + unPinnedTotalRows}</div>
          <div>{"unPinnedTotalPages " + unPinnedTotalPages}</div>
          <div>{"envVar " + envVar}</div>
          <div>{"threadError " + threadError}</div>
        </div> */}
        {!showSidebar && (
          <Box
            style={{
              borderRadius: "6px",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "84px",
                alignItems: "center",
                borderRadius: "16px",
                padding: "10px",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                boxShadow: "0px 4px 4px 0px #2023261A", // Softer bottom shadow
              }}
            >
              <DgptLogo width={44} height={44} />
              <div
                style={{ marginTop: "5px", cursor: "pointer" }}
                onClick={() => {
                  setShowSidebar(true);
                  setMenuSelected("");
                }}
              >
                <ArrowRight />
              </div>
            </div>
            <SideMenu
              menuSelected={menuSelected}
              setMenuSelected={setMenuSelected}
              setSelectedThread={setSelectedThread}
              handleNavigation={handleNavigation}
            />
          </Box>
        )}

        <Box
          style={{
            // border: "1px solid #e7e7e7",
            borderRadius: "6px",
            width: "100%",
          }}
        >
          {showSidebar && <SidebarHeader setShowSidebar={setShowSidebar} />}

          <div
            ref={divRef}
            style={{
              display: menuSelected || showSidebar ? "block" : "none",
              width: sm || md || lg ? "100%" : showSidebar ? "368px" : "340px",
              borderRadius: "16px",
              padding: "16px",
              backgroundColor: "white",
              marginTop: showSidebar ? "10px" : "95px",
              marginLeft: !showSidebar ? "10px" : "0px",
              boxShadow: "0px 4px 4px 0px #2023261A", // Softer bottom shadow
            }}
          >
            <div
              style={{
                height: showSidebar
                  ? "calc(100% - 150px)"
                  : "calc(100% - 175px)",
                overflow: "auto",
              }}
            >
              <SearchBar
                loading={loading}
                searchQuery={searchQuery}
                showSidebar={showSidebar}
                menuSelected={menuSelected}
                pinnedThreads={pinnedTotalRows}
                unPinnedThreads={unPinnedTotalRows}
                handleInputChange={handleInputChange}
              />
              {/* Thread Header for Pinned Chats */}
              <ThreadHeader
                showSidebar={showSidebar}
                menuSelected={menuSelected}
                menuType={ALL}
                Icon={PinIcon}
                title={t("sidebar.pinChats")}
                threadLength={pinnedTotalRows}
                count={175}
              />

              {/* Thread List for Pinned Chats */}
              <ThreadList
                searchQuery={searchQuery}
                threads={pinnedThreads}
                setThreads={setUnPinnedThreads}
                currentPage={currentPinnedPage}
                totalPages={pinnedTotalPages}
                totalRows={pinnedTotalRows}
                isLoading={pinnedPageLoading}
                showSidebar={showSidebar}
                showMore={showMore}
                setShowMore={setShowMore}
                loader={loader}
                selectedThread={selectedThread}
                setSelectedThread={setSelectedThread}
                menuSelected={menuSelected}
                setMenuSelected={setMenuSelected}
                getThreads={getThreads}
                toggleThread={toggleThread}
                userId={userId}
                isPinned={true}
                emptyMessage="고정된 채팅을 찾을 수 없습니다."
                setIsOpen={setIsOpen}
                threadLoader={threadLoader}
                threadChatCountFlag={threadChatCountFlag}
                toggleThreadChatCount={toggleThreadChatCount}
              />

              {/* Thread Header for All Chats */}
              <ThreadHeader
                showSidebar={showSidebar}
                menuSelected={menuSelected}
                menuType={PINNED}
                Icon={MessageIcon}
                title={t("sidebar.allChats")}
                threadLength={unPinnedTotalRows}
                count={145}
              />

              {/* Thread List for All Chats */}
              <ThreadList
                searchQuery={searchQuery}
                threads={unPinnedThreads}
                setThreads={setUnPinnedThreads}
                currentPage={currentUnpinnedPage}
                totalPages={unPinnedTotalPages}
                totalRows={unPinnedTotalRows}
                isLoading={unPinnedPageLoading}
                showSidebar={showSidebar}
                showMore={showMore}
                setShowMore={setShowMore}
                loader={loader}
                selectedThread={selectedThread}
                setSelectedThread={setSelectedThread}
                menuSelected={menuSelected}
                setMenuSelected={setMenuSelected}
                getThreads={getThreads}
                toggleThread={toggleThread}
                userId={userId}
                isPinned={false}
                emptyMessage="고정 해제된 채팅을 찾을 수 없습니다."
                setIsOpen={setIsOpen}
                threadLoader={threadLoader}
                threadChatCountFlag={threadChatCountFlag}
                toggleThreadChatCount={toggleThreadChatCount}
              />
            </div>
            {showSidebar && (
              <Button
                style={{ width: "100%", height: "52px" }}
                backgroundColor={"#0C2340"}
                color={"white"}
                fontWeight="normal"
                onClick={() => {
                  setSelectedThread(null);
                  handleNavigation(`/tab`);
                  setIsOpen && setIsOpen(false);
                }}
              >
                <PlusSign />
                <span style={{ marginLeft: "8px" }}>
                  {t("sidebar.newChat")}
                </span>
              </Button>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};
