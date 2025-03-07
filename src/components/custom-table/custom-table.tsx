import React from 'react';
import { Box, Table, Tbody, Tr, Td, Flex } from '@chakra-ui/react';

export const CustomTable : React.FC<ITableContent> = ({
  tableContent,
}) => {
  return (
    <>
     <Flex justify="center" align="center">
      <Box 
        mt={4} 
        overflowX="auto"
        borderRadius={'16px'}
        border={'1px'}
        borderColor={'#E4EBF0'}
        width={{base:'100%',md:'600px'}}
        >
        <Table variant="simple">
          <Tbody>
            {tableContent?.map((item, index) => (
              <Tr key={index}>
                <Td>{item.company}</Td>
                <Td>{item.details}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      </Flex>
    </>
  );
}