import React, { createContext, useContext, ReactNode } from "react";
import useThreads from "../hooks/useThreads";

const defaultState: any = {
  getThreads: () => {},
  setPinnedThreads: () => {},
  setUnPinnedThreads: () => {},
  setPinnedTotalRows: () => {},
  setPinnedTotalPages: () => {},
  setUnPinnedTotalRows: () => {},
  setUnPinnedTotalPages: () => {},
  setLoading: () => {},
  setPinnedLoader: () => {},
  setUnPinnedLoader: () => {},
  setPinnedPageLoading: () => {},
  setUnPinnedPageLoading: () => {},
  setCurrentPinnedPage: () => {},
  setCurrentUnpinnedPage: () => {},
  setThreadLoader: () => {},
  setNewChatThread: () => {},
  newChatThread: false,
  currentUnpinnedPage: 1,
  pinnedThreads: [],
  unPinnedThreads: [],
  pinnedTotalRows: 0,
  pinnedTotalPages: 0,
  unPinnedTotalRows: 0,
  unPinnedTotalPages: 0,
  loading: false,
  pinnedLoader: false,
  unPinnedLoader: false,
  pinnedPageLoading: false,
  unPinnedPageLoading: false,
  currentPinnedPage: 0,
  threadLoader: false,
};

const ThreadContext = createContext<any>(defaultState);

interface ThreadProviderProps {
  children: ReactNode;
}

export const ThreadProvider: React.FC<ThreadProviderProps> = ({ children }) => {
  const Thread = useThreads();
  return (
    <ThreadContext.Provider value={Thread}>{children}</ThreadContext.Provider>
  );
};

export const useThreadContext = () => {
  return useContext(ThreadContext);
};
