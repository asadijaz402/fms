import React from "react";
// import DynamicMUITable from "../../../../Components/DynamicMUITable";
import DynamicDataTable from "../../../../Components/DynamicDataTable";
import CustomerDialog from "./Dialogs/CustomerDialog";
import moment from "moment";
import { IconButton, Box, Tooltip, Button } from "@mui/material";
import {
  WhatsApp as WhatsAppIcon,
  LocalPhone as PhoneIcon,
  ContentCopy as CopyIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";

import { numberFormat, copyToClipboard } from "../../../../utils";
import DeleteCustomer from "./Dialogs/DeleteCustomer";

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const Email = ({ value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Tooltip title="Copy Email">
          <IconButton
            onClick={() => {
              copyToClipboard(value);
            }}
            size="small"
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Button href={"mailto:" + value} size="small">
          {value}
        </Button>
      </Box>
    </Box>
  );
};

const Contact = ({ value }) => {
  return (
    <Box display="flex">
      <Box>
        <Tooltip title="Call on WhatsApp">
          <IconButton
            href={"https://wa.me/" + numberFormat(value)}
            target="_blank"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Call on Phone">
          <IconButton href={"tel:" + numberFormat(value)}>
            <PhoneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Copy Number">
          <IconButton
            onClick={() => {
              copyToClipboard(value);
            }}
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

const Actions = ({ row }) => {
  return (
    <Box display="flex">
      <Box>
        <CustomerDialog rowId={row.id} data={row} />
      </Box>
      <Box>
        <DeleteCustomer data={row} />
      </Box>
      <Box>
        <Tooltip title="Rental History">
          <IconButton
            size="small"
            href={
              "/bookings/customers/bookings/" +
              row.name +
              "/" +
              row.id +
              "/" +
              "bookings_list"
            }
          >
            <HistoryIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Customer Detail">
          <IconButton
            size="small"
            href={
              "/bookings/customers/bookings/" +
              row.name +
              "/" +
              row.id +
              "/" +
              "customer_detail"
            }
          >
            <DescriptionIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default function CustomerTable({ content }) {
  const columnsCustom = [
    { name: "id", sort: true, filter: false, omit: true },
    {
      name: "name",
      label: "Name",
      sort: true,
    },
    {
      name: "company",
      omit: true,
    },
    {
      name: "email",
      label: "Email",
      sort: true,
      comp: Email,
    },
    {
      name: "mobile",
      label: "Contact Number",
      comp: Contact,
    },
    {
      name: "kashflow_code",
      label: "Kashflow Code",
      sort: true,
      omit: true,
    },
    {
      name: "date_added",
      label: "Created at",
      sort: true,
      comp: DateFormat,
      filter: true,
      filterData: {
        query: "date_added__range",
        type: "date",
      },
    },
    {
      name: "passport_number",
      label: "Passport Number",
      omit: true,
    },
    {
      name: "bank_account_number",
      label: "Bank Account Number",
      omit: true,
    },
    {
      name: "driving_license",
      label: "Driving License",
      omit: true,
    },
    {
      name: "business_reg_number",
      label: "Business #",
      omit: true,
    },
    {
      name: "insurance_number",
      label: "Insurance Number",
      omit: true,
    },
    {
      name: "feedback",
      label: "Feedback",
      omit: true,
    },
    {
      name: "is_active",
      omit: true,
    },
    {
      name: "notes",
      label: "Notes",
      omit: true,
    },
    {
      name: "kashflow_id",
      label: "Kashflow Id",
      omit: true,
    },
    {
      name: "newColumnArray",
      new: [{ name: "id", label: "Action", comp: Actions }],
    },
    {
      name: "customFields",
    },
  ];

  return (
    <DynamicDataTable
      title="Customers"
      urlLink={"hiring/customer/list/?" + content + "&"}
      columnsCustom={columnsCustom}
      model_table="hiring_customer"
      addNew={[<CustomerDialog />]}
    />
  );
}
