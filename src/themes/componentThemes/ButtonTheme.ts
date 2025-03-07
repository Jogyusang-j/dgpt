import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonTheme: ComponentStyleConfig = {
    baseStyle: {
    },
    sizes: {
        md: {
            h: '55px',
            w: '190px',
            fontSize: '16px',
            fontWeight: '700',
        },
        sm: {
            h: '36px',
            w: 'auto',
            px: '24px',
            fontSize: '12px',
            fontWeight: '500',
        },
        full: {
            h: '55px',
            w: '100%',
            fontSize: '16px',
        },
    },
    variants: {
        'primary': {
            bg: 'primary.200',
            color: 'white.100',
            borderRadius: '12px',
        },
    },
    defaultProps: {
        size: 'md',
        variant: 'primary',
    },
}