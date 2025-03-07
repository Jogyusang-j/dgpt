import { Table, Tbody, Tr, Box } from "@chakra-ui/react";
import React from "react";
import { Paginate } from "../pagination";
import {
  CustomTableContainer,
  StyledChatTableContainer,
  StyledPaginationContainer,
} from "./styled";
import { CustomTextComponent } from "../custom-vetical-view";
import { TABLE_ITEM_LAYOUT_TYPE } from "../../constants";

export const TableComponent: React.FC<ITableComponent> = ({
  tableData,
  itemType,
  showPagination = true,
  pageCount,
  page,
  pageSize,
  handlePageChange,
  onClick,
  onRemove,
  onExpand,
}) => {
  const removePagination =
    itemType === TABLE_ITEM_LAYOUT_TYPE.PRIVACY_POLICY ||
    itemType === TABLE_ITEM_LAYOUT_TYPE.TERMS_CONDITIONS;

  const renderTableItem = (data: any, index: any) => {
    if (
      itemType === TABLE_ITEM_LAYOUT_TYPE.PRIVACY_POLICY ||
      itemType === TABLE_ITEM_LAYOUT_TYPE.TERMS_CONDITIONS
    ) {
      return (
        <Box backgroundColor={"theme.brown.100"}>
           <CustomTextComponent
            title={data?.title}
            description={data?.description}
            lastUpdate={data?.lastUpdate}
            tableContent={data?.tableContent}
            titleSize="18px"
            titleWeight={500}
            descriptionSize="14px"
            descriptionWeight={400}
          /> 
        </Box>
      );
    }

    return null;
  };

  const onPageChange = (newPage: number) => {
    if (typeof onPageChange === "function") {
      handlePageChange(newPage);
    }
  };

  const screensWithNoBorder = [
    TABLE_ITEM_LAYOUT_TYPE.PRIVACY_POLICY,
    TABLE_ITEM_LAYOUT_TYPE.TERMS_CONDITIONS,
  ];

  return (
    <StyledChatTableContainer>
      <CustomTableContainer
        border={screensWithNoBorder.includes(itemType) ? "none" : "1px solid"}
        borderColor={removePagination ? "transparent" : "gray.100"}
        overflow={"scroll"}
      >
        <Table
          overflowY={"scroll"}
          overflowX={"hidden"}
          whiteSpace="wrap"
          variant="unstyled"
          sx={{
            border: "none",
            td: {
              border: "none",
            },
            th: {
              border: "none",
            },
          }}
        >
          <Tbody>
            {tableData &&
              tableData?.length &&
              tableData?.map((data: any, index: any) => (
                <Tr key={index} whiteSpace="wrap" minHeight={"89px"} border="none">
                    {renderTableItem(data, index)}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </CustomTableContainer>
      {showPagination && !removePagination ? (
        <StyledPaginationContainer>
          <Paginate
            page={page}
            count={pageCount}
            pageSize={pageSize}
            onPageChange={onPageChange}
            margin={1}
            variant="ghost"
            isRtl={false}
          />
        </StyledPaginationContainer>
      ) : null}
    </StyledChatTableContainer>
  );
};
