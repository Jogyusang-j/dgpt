import React from "react";
import { StyledDashboardLayoutChildContainer } from "./components/common/style";
import { Box } from "@chakra-ui/react";
import { AppHeader } from "./components/app-header";
import { TableComponent } from "./components/table-component";
import { TABLE_ITEM_LAYOUT_TYPE } from "./constants";
import { PRIVACY_CONTENT } from "./constants/privacy-content";
/**
 * This component is used to display the required
 * terms of use statement which can be found in a
 * link in the about tab.
 */
class TermsOfUse extends React.Component {
  render() {
    return (
      <StyledDashboardLayoutChildContainer
      flex={1}
    >
      <AppHeader
        title={"Terms And Conditions"}
        minH={'83px'}
      />
      <Box
        height={'100%'}
        overflowY={'scroll'}
        padding={'16px'}
      >
        <TableComponent
          tableData={PRIVACY_CONTENT.CONTENT_EN}
          itemType={TABLE_ITEM_LAYOUT_TYPE.TERMS_CONDITIONS}
        />
      </Box>
    </StyledDashboardLayoutChildContainer>
    );
  }
}

export default TermsOfUse;
