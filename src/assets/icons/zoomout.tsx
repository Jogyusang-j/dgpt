import { Box, BoxProps } from "@chakra-ui/react";

export function ZoomOutIcon({ ...props }: BoxProps) {
    return (
        <Box cursor={'pointer'} {...props}>
            <svg width="100%" height="100%" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.251 53.251L61.4167 61.4167M36.0125 41.4563H46.9M57.7875 41.4563C57.7875 32.4367 50.4758 25.125 41.4563 25.125C32.4367 25.125 25.125 32.4367 25.125 41.4563C25.125 50.4758 32.4367 57.7875 41.4563 57.7875C50.4758 57.7875 57.7875 50.4758 57.7875 41.4563Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.58301 16.7499C5.94732 13.0217 6.77282 10.5142 8.64337 8.64362C10.5139 6.77307 13.0214 5.94756 16.7497 5.58325M16.7497 61.4166C13.0214 61.0523 10.5139 60.2268 8.64337 58.3562C6.77282 56.4857 5.94732 53.9782 5.58301 50.2499M61.4163 16.7499C61.052 13.0217 60.2265 10.5142 58.356 8.64362C56.4854 6.77307 53.9779 5.94756 50.2497 5.58325M5.58301 27.9166L5.58301 39.0833M39.083 5.58325L27.9163 5.58325" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        </Box>
    )
}
