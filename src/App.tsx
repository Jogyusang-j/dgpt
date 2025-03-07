import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Spinner } from "@fluentui/react-components";
import { useTeams } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./internal/context";
import { ChakraWrapper, Chatbot } from "./components";
import { Sidebar } from "./components/sidebar";
import { ChatHistory } from "./components/chatHistory";
import { Flex, Box } from "@chakra-ui/react";
import { EmptyChatbot } from "./components/emptyChatbot";
import { Messages } from "./components/messages";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Header from "./components/header";
import Breakpoints from "./components/mediaQuery";
import { useState } from "react";
import { ThreadProvider } from "./context/thread-context";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */

export default function App() {
  const { loading, themeString } = useTeams()[0];
  const { sm, md, lg } = Breakpoints();
  const [threadChatCountFlag, toggleThreadChatCount] = useState<any>(null);
  return (
    <TeamsFxContext.Provider value={{ themeString }}>
      <I18nextProvider i18n={i18n}>
        <ChakraWrapper overflowY={"hidden"}>
          <ThreadProvider>
            <Router>
              {(sm || md || lg) && <Header />}

              {loading ? (
                <Spinner id="spinner" />
              ) : (
                <Flex
                  className="bg-app"
                  h={sm || md || lg ? "calc(100%  - 60px)" : "100vh"}
                >
                  {/* Sidebar on the left */}
                  {sm ||
                  md ||
                  lg ||
                  window.location.href.includes("privacy") ||
                  window.location.href.includes("termsofuse") ? (
                    ""
                  ) : (
                    <Box>
                      <Sidebar
                        threadChatCountFlag={threadChatCountFlag}
                        toggleThreadChatCount={toggleThreadChatCount}
                      />
                    </Box>
                  )}

                  {/* Right container for rendering components based on the route */}
                  <Box
                    flex="1"
                    // bg="#F0F5F8"
                    width={"calc(100% - 600px)"}
                  >
                    <Routes>
                      {/* <Route path="/tab" element={<Chatbot key="tab" />} /> */}
                      <Route path="/tab" element={<EmptyChatbot key="tab" />} />
                      <Route
                        path="/chatbot/:threadId?"
                        element={<Chatbot key={window.location.pathname} />}
                      />
                      <Route path="/chat-history" element={<ChatHistory />} />
                      <Route
                        path="/messages/:threadId?"
                        element={
                          <Messages
                            key={window.location.pathname}
                            threadChatCountFlag={threadChatCountFlag}
                            toggleThreadChatCount={toggleThreadChatCount}
                          />
                        }
                      />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/termsofuse" element={<TermsOfUse />} />
                    </Routes>
                  </Box>
                </Flex>
              )}
            </Router>
          </ThreadProvider>
        </ChakraWrapper>
      </I18nextProvider>
    </TeamsFxContext.Provider>
  );
}
