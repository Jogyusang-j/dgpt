import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CustomTable } from '../custom-table';

export const  CustomTextComponent: React.FC <ICustomViewProps> = ({ 
    title, 
    description, 
    titleSize = "14px", 
    descriptionSize = "14px", 
    titleWeight = 400,
    descriptionWeight = 400,
    lastUpdate,
    tableContent,
}) => {
  return (
    <Box width={'100%'} >
      <Text maxW={'100%'} wordBreak={'break-all'} fontWeight={titleWeight} mt={1} fontSize={titleSize}>{title}</Text>
      {lastUpdate?
      <Text fontWeight={titleWeight} fontSize="16px" color="theme.button.primary">{lastUpdate}</Text> :null}
      {description ?
       <Text mt={2} style={ {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        } }
        fontSize={descriptionSize} fontWeight={descriptionWeight}>
        {description}

      </Text> : null} 
      {tableContent ?
        <CustomTable tableContent={tableContent}/>
      : null }
    </Box>
  );
}
