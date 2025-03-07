import axios from "axios";
import { useState } from "react";

function useThreads() {
  const limit = 25;
  const [newChatThread, setNewChatThread] = useState<boolean>(false);
  const [pinnedThreads, setPinnedThreads] = useState<any>([]);
  const [unPinnedThreads, setUnPinnedThreads] = useState<any>([]);
  const [pinnedTotalRows, setPinnedTotalRows] = useState(0);
  const [pinnedTotalPages, setPinnedTotalPages] = useState(0);
  const [unPinnedTotalRows, setUnPinnedTotalRows] = useState(0);
  const [unPinnedTotalPages, setUnPinnedTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pinnedLoader, setPinnedLoader] = useState(false);
  const [unPinnedLoader, setUnPinnedLoader] = useState(false);
  const [pinnedPageLoading, setPinnedPageLoading] = useState(false);
  const [unPinnedPageLoading, setUnPinnedPageLoading] = useState(false);
  const [currentPinnedPage, setCurrentPinnedPage] = useState(1);
  const [currentUnpinnedPage, setCurrentUnpinnedPage] = useState(1);
  const [threadLoader, setThreadLoader] = useState(false);
  const [beforeThreads, setBeforeThreads] = useState(false);
  const [afterThreads, setAfterThreads] = useState(false);
  const [errorThreads, setErrorThreads] = useState(false);
  const [envVar, setEnvVar] = useState<any>(null);
  const [threadError, setThreadError] = useState<any>(null);

  const getThreads = (
    userId: any,
    isPinned: boolean,
    currentPage: number,
    searchQuery?: string,
    newChat: boolean = false,
    threadsLimit?: number
  ) => {
    setBeforeThreads(true);
    setEnvVar(process.env.REACT_APP_BASE_URL);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/threads`, {
        headers: {
          "x-api-key": userId,
        },
        params: {
          page: currentPage,
          limit: threadsLimit || limit,
          is_pinned: isPinned,
          ...(searchQuery && { searchQuery }),
        },
      })
      .then((response: any) => {
        setAfterThreads(true);
        const newThreads = response?.data?.data?.rows || [];
        const totalRows = response?.data?.data?.count;

        if (newChat) {
          setUnPinnedThreads(newThreads);
          setCurrentUnpinnedPage(2);
          setUnPinnedTotalRows(totalRows);
          return;
        }

        // if (searchQuery) {
        //   if (isPinned) {
        //     setPinnedThreads(newThreads);
        //   } else {
        //     setUnPinnedThreads(newThreads);
        //   }
        //   // Reset total rows and pages since a search was made
        //   if (isPinned) {
        //     setPinnedTotalRows(totalRows);
        //     setPinnedTotalPages(Math.ceil(totalRows / limit));
        //   } else {
        //     setUnPinnedTotalRows(totalRows);
        //     setUnPinnedTotalPages(Math.ceil(totalRows / limit));
        //   }
        // } else {

        // Append new threads and update totals
        if (isPinned) {
          setPinnedThreads((prevThreads: any) => [
            ...prevThreads,
            ...newThreads,
          ]);
          setPinnedTotalRows(totalRows);
          setPinnedTotalPages(Math.ceil(totalRows / limit));
        } else {
          setUnPinnedThreads((prevThreads: any) => [
            ...prevThreads,
            ...newThreads,
          ]);
          setUnPinnedTotalRows(totalRows);
          setUnPinnedTotalPages(Math.ceil(totalRows / limit));
        }
        // }
      })
      .catch((error) => {
        setThreadError(error);
        setErrorThreads(true);
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
        if (isPinned) {
          setPinnedLoader(false);
          setPinnedPageLoading(false);
          setCurrentPinnedPage(currentPinnedPage + 1);
        } else {
          setUnPinnedLoader(false);
          setUnPinnedPageLoading(false);
          setCurrentUnpinnedPage(currentUnpinnedPage + 1);
        }
        setThreadLoader(false);
        // setPageLoading(false);
      });
  };
  return {
    getThreads,
    setPinnedThreads,
    setUnPinnedThreads,
    setPinnedTotalRows,
    setPinnedTotalPages,
    setUnPinnedTotalRows,
    setUnPinnedTotalPages,
    setLoading,
    setPinnedLoader,
    setUnPinnedLoader,
    setPinnedPageLoading,
    setUnPinnedPageLoading,
    setCurrentPinnedPage,
    setCurrentUnpinnedPage,
    setThreadLoader,
    setNewChatThread,
    newChatThread,
    currentUnpinnedPage,
    pinnedThreads,
    unPinnedThreads,
    pinnedTotalRows,
    pinnedTotalPages,
    unPinnedTotalRows,
    unPinnedTotalPages,
    loading,
    pinnedLoader,
    unPinnedLoader,
    pinnedPageLoading,
    unPinnedPageLoading,
    currentPinnedPage,
    threadLoader,
    beforeThreads,
    afterThreads,
    errorThreads,
    envVar,
    threadError,
  };
}
export default useThreads;
