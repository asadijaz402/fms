import React from "react";
import DynamicMUITable from "../../../../../Components/DynamicMUITable";

export default function CurrentWeekInvoice() {
  return (
    <DynamicMUITable
      title="Current week invoices"
      urlLink="finances/invoices/list/?"
      columnsCustom={[]}
      // addNew={<AddingBooking />}
    />
  );
}
