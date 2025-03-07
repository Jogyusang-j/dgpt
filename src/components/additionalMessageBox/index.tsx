import { Box, Tag } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Breakpoints from "../mediaQuery";

const AdditionalMessageBox = ({
  index = 0,
  total = 0,
  workType = "",
  issueTitle = "",
  oValue = "",
  pValue = "",
  qValue = "",
  bgColor = "white",
  hover = false,
  handleClick,
}: any) => {
  const { sm } = Breakpoints();

  return (
    <Box
      style={{
        border: "1px solid #E4EBF0",
        borderRadius: "8px",
        cursor: handleClick ? "pointer" : "default",
        marginBlock: handleClick && index < total - 1 ? "10px" : "0px",
        transition: "background-color 0.3s ease",
      }}
      _hover={{
        backgroundColor: hover ? "#F1F6F9" : "none",
      }}
      onClick={handleClick}
    >
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            display: sm ? "block" : "flex",
            alignItems: sm ? "unset" : "unset",
          }}
        >
          <Tag
            size={"sm"}
            maxBlockSize={"18px"}
            style={{
              background: bgColor,
              fontSize: "10px",
              fontWeight: 600,
              marginLeft: "10px",
              paddingInline: "15px",
            }}
          >
            {workType}
          </Tag>
          <div>
            <div
              style={{
                color: "#18191B",
                fontSize: "10px",
                fontWeight: 600,
                marginLeft: "10px",
                marginTop: sm ? "5px" : "0px",
              }}
            >
              {issueTitle}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#5C6670",
                fontSize: "10px",
                marginInline: "10px",
                marginTop: "3px",
              }}
            >
              (
              <div
                style={{
                  marginInline: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>{oValue}</div>
                {pValue && (
                  <>
                    <ChevronRightIcon
                      boxSize={3.5}
                      style={{ marginInline: "10px" }}
                    />
                    <div>{pValue}</div>
                  </>
                )}
                {qValue && (
                  <>
                    <ChevronRightIcon
                      boxSize={3.5}
                      style={{ marginInline: "10px" }}
                    />
                    <div>{qValue}</div>
                  </>
                )}
              </div>
              )
            </div>
          </div>
        </div>
      </div>

      <Box
        style={{
          paddingLeft: "15px",
          marginTop: "10px",
          paddingInline: "10px",
        }}
      >
        {/* Additional content can be passed here, if needed */}
      </Box>
    </Box>
  );
};

export default AdditionalMessageBox;
