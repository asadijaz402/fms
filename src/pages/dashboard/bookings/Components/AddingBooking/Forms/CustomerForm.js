import React from "react";
import { Button, Box, Collapse } from "@mui/material";
import CustomerSearch from "../../../../../../Components/Search/CustomerSearch";
import CustomerDialog from "../../../../customers/Components/Dialogs/CustomerDialog.js";
import AddCustomerForm from "./AddCustomerForm";

export default function CustomerForm({
  handleNext,
  handleBack,
  onChange,
  value,
}) {
  return (
    <>
      <Box alignItems="center" display="flex" width="100%" mt={2} gap={2}>
        <CustomerDialog onChange={onChange} />
        <CustomerSearch
          handleChange={onChange}
          name="customer"
          customer={value.customer}
        />
      </Box>
      <Collapse in={value.customer} timeout="auto">
        <Box mt={4}>
          <AddCustomerForm userId={value.customer} disabled={true} />
        </Box>
      </Collapse>
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!value.customer}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </>
  );
}
