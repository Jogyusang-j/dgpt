import { useState } from "react";

export const SendButton = ({
  hoverColor = "#F6C23A",
  active,
  width = "32",
  height = "32",
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill={isHovered || active ? "#0C2340" : "#A7B2BA"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.25C16.4142 8.25 16.75 8.58579 16.75 9L16.75 24C16.75 24.4142 16.4142 24.75 16 24.75C15.5858 24.75 15.25 24.4142 15.25 24L15.25 9C15.25 8.58579 15.5858 8.25 16 8.25Z"
        fill={isHovered || active ? hoverColor : "white"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 9.06234C15.9501 9.11066 15.8933 9.16742 15.8232 9.23748L11.5303 13.5304C11.2374 13.8233 10.7626 13.8233 10.4697 13.5304C10.1768 13.2375 10.1768 12.7626 10.4697 12.4697L14.7626 8.17682C14.7706 8.16875 14.7788 8.16062 14.7869 8.15246C14.9319 8.00737 15.0887 7.85047 15.2388 7.73589C15.4148 7.60165 15.6665 7.45715 16 7.45715C16.3335 7.45715 16.5852 7.60165 16.7612 7.73589C16.9113 7.85047 17.0681 8.00737 17.2131 8.15246C17.2212 8.16062 17.2294 8.16875 17.2374 8.17682L21.5303 12.4697C21.8232 12.7626 21.8232 13.2375 21.5303 13.5304C21.2374 13.8233 20.7626 13.8233 20.4697 13.5304L16.1768 9.23748C16.1067 9.16742 16.0499 9.11066 16 9.06234Z"
        fill={isHovered || active ? hoverColor : "white"}
      />
    </svg>
  );
};
