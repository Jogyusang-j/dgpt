import { Box, BoxProps } from "@chakra-ui/react";
interface SendMessageIconProps extends BoxProps {
  disabled?: boolean;
}

export const SendMessageIcon = ({
  disabled,
  ...props
}: SendMessageIconProps) => (
  <Box
    {...props}
    cursor={disabled ? "not-allowed" : "pointer"}
    opacity={disabled ? 0.5 : 1}
    onClick={disabled ? undefined : props.onClick}
  >
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6706 20.8905C18.8536 20.6125 22.1856 17.2332 22.4598 12.9909C22.5134 12.1607 22.5134 11.3009 22.4598 10.4707C22.1856 6.22838 18.8536 2.84913 14.6706 2.57107C13.2435 2.47621 11.7536 2.47641 10.3294 2.57107C6.14639 2.84913 2.81441 6.22838 2.54024 10.4707C2.48659 11.3009 2.48659 12.1607 2.54024 12.9909C2.6401 14.536 3.32343 15.9666 4.12791 17.1746C4.59501 18.0203 4.28674 19.0758 3.80021 19.9978C3.44941 20.6626 3.27401 20.995 3.41484 21.2351C3.55568 21.4752 3.87026 21.4829 4.49943 21.4982C5.74367 21.5285 6.58268 21.1757 7.24868 20.6846C7.6264 20.4061 7.81527 20.2668 7.94544 20.2508C8.0756 20.2348 8.33177 20.3403 8.84401 20.5513C9.3044 20.7409 9.83896 20.8579 10.3294 20.8905C11.7536 20.9852 13.2435 20.9854 14.6706 20.8905Z"
        stroke={"#0BB4AF"}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 16H17.5M7.5 16H12.5"
        stroke={"#0BB4AF"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M16.5 13H17.5M11.5 13H13.5M7.5 13H8.5"
        stroke={"#0BB4AF"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </Box>
);
