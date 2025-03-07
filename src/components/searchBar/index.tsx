import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Search } from "../../assets";
import { ALL, PINNED } from "../../utils.js";
import { SearchIcon } from "../../assets/icons";

const SearchBar = ({
  loading,
  searchQuery,
  showSidebar,
  menuSelected,
  pinnedThreads,
  unPinnedThreads,
  handleInputChange,
}: any) => {
  const { t } = useTranslation("common");
  const [showSearchbar, setShowSearchbar] = useState(false);
  const inputRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  const autofocusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const getThreadCount = (
    menuSelected: any,
    pinnedThreads: any,
    unPinnedThreads: any
  ) => {
    switch (menuSelected) {
      case PINNED:
        return pinnedThreads || 0;
      case ALL:
        return unPinnedThreads || 0;
      default:
        return (pinnedThreads || 0) + (unPinnedThreads || 0);
    }
  };

  const header = () => {
    if (showSidebar)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "500", fontSize: "20px" }}>
            {t("sidebar.chatsHeader")} (
            {getThreadCount(menuSelected, pinnedThreads, unPinnedThreads)})
          </div>
          <div
            style={{
              cursor: "pointer",
              background: isHovered ? "#CDD6DC" : "",
              height: "50px",
              width: "50px",
              borderRadius: "50px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              setShowSearchbar(!showSearchbar);
              setTimeout(() => {
                autofocusInput();
              }, 300);
            }}
          >
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
              <Search />
            </div>
          </div>
        </div>
      );
  };

  useEffect(() => {
    if (!showSidebar) setShowSearchbar(false);
  }, [showSidebar]);

  return (
    <>
      {header()}

      {showSearchbar && (
        <div style={{ marginTop: "10px" }}>
          <InputGroup>
            <Input
              ref={inputRef}
              value={searchQuery}
              placeholder={t("sidebar.searchTerm")}
              flex={1}
              mr={2}
              pl={"43px"}
              height={"48px"}
              style={{
                backgroundColor: "#F1F6F9",
                border: "1px solid #CDD6DC",
                color: "#A7B2BA",
              }}
              _focus={{
                borderColor: "transparent", // Ensure border remains transparent on focus
                boxShadow: "none", // Ensure no box shadow on focus
              }}
              sx={{
                "::-webkit-input-placeholder": { color: "#A7B2BA" }, // For Webkit-based browsers
                "::-moz-placeholder": { color: "#A7B2BA" }, // For Firefox 19+
                ":-ms-input-placeholder": { color: "#A7B2BA" }, // For IE
                "::-ms-input-placeholder": { color: "#A7B2BA" }, // For Edge
                "::placeholder": { color: "#A7B2BA" }, // Standard placeholder styling
              }}
              onChange={handleInputChange}
            />
            <InputLeftElement height="100%">
              <SearchIcon />
            </InputLeftElement>
            {/* <InputRightElement height="100%">
              {loading ? (
                <Spinner size={"sm"} />
              ) : (
                <SearchIcon color="gray.500" />
              )}
            </InputRightElement> */}
          </InputGroup>
        </div>
      )}
    </>
  );
};

export default SearchBar;
