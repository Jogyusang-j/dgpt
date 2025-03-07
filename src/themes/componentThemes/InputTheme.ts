import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    field: {
        border: '1px solid',
        borderColor: 'gray.200',
        _focus: {
            borderColor: 'primary.200',
        },
        fontSize: '14px',
        color: 'black.100',
        fontWeight: '400',
        pl: '16px',
        borderRadius: '8px',
        _dark:{
            backgroundColor:'gray.400',
            borderColor:'transparent',
            color:'primary.shineGrayText'
        },
        height:'52px'
    },
})
const sizes = {
    md: definePartsStyle({
        field: {
            fontSize: '14px',
            fontWeight: '400',
        }
    }),
}
export const inputTheme = defineMultiStyleConfig({ baseStyle, sizes, defaultProps: {variant: 'primary', size:'md'} })