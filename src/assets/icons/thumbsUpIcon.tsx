import { Box, BoxProps } from "@chakra-ui/react";
interface ThumbsUpIconProps extends BoxProps {
  checked?: boolean;
  disabled?: boolean;
}

export const ThumbsUpIcon = ({
  disabled,
  checked,
  ...props
}: ThumbsUpIconProps) => (
  <Box
    {...props}
    cursor={disabled ? "not-allowed" : "pointer"}
    opacity={disabled ? 0.5 : 1}
    onClick={disabled ? undefined : props.onClick}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 17"
      fill={checked ? "#33D687" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33398 8.49996C1.33398 7.76358 1.93094 7.16663 2.66732 7.16663C3.77189 7.16663 4.66732 8.06206 4.66732 9.16663V11.8333C4.66732 12.9379 3.77189 13.8333 2.66732 13.8333C1.93094 13.8333 1.33398 13.2363 1.33398 12.5V8.49996Z"
        stroke="#32D687"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3205 5.37084L10.1429 5.94423C9.99746 6.41407 9.92472 6.649 9.98065 6.83453C10.0259 6.98463 10.1253 7.11401 10.2606 7.19914C10.428 7.30436 10.6811 7.30436 11.1874 7.30436H11.4567C13.1701 7.30436 14.0268 7.30436 14.4314 7.81153C14.4777 7.8695 14.5188 7.93113 14.5544 7.99578C14.8656 8.56143 14.5117 9.32342 13.804 10.8474C13.1544 12.2459 12.8297 12.9452 12.2267 13.3568C12.1683 13.3966 12.1083 13.4342 12.0468 13.4694C11.412 13.8333 10.6254 13.8333 9.05224 13.8333H8.71103C6.80511 13.8333 5.85215 13.8333 5.26006 13.2596C4.66797 12.686 4.66797 11.7626 4.66797 9.91595V9.26689C4.66797 8.29642 4.66797 7.81119 4.8402 7.36706C5.01242 6.92294 5.3422 6.55776 6.00177 5.82741L8.72938 2.80704C8.79779 2.73129 8.832 2.69341 8.86215 2.66717C9.14366 2.42219 9.57812 2.44976 9.82424 2.72823C9.85061 2.75806 9.87942 2.79994 9.93704 2.88369C10.0272 3.0147 10.0723 3.0802 10.1115 3.1451C10.4632 3.72609 10.5696 4.41624 10.4085 5.07143C10.3905 5.14461 10.3671 5.22006 10.3205 5.37084Z"
        stroke="#32D687"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Box>
);
