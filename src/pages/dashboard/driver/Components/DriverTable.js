import React from "react";
import DynamicDataTable from "../../../../Components/DynamicDataTable";
import DriverDialog from "./Dialogs/DriverDialog";
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
import DeleteDriver from "./Dialogs/DeleteDriver";

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
      {!row.banned && (
        <Box>
          <DriverDialog rowId={row.id} data={row} />
        </Box>
      )}

      <Box>
        <DeleteDriver data={row} />
      </Box>

      {!row.status && (
        <>
          <Box>
            <Tooltip title="Driver Vehicle History">
              <IconButton
                size="small"
                href={
                  "/bookings/driver/records/" +
                  row.name +
                  "/" +
                  row.id +
                  "/" +
                  "all"
                }
              >
                <HistoryIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Driver Detail">
              <IconButton
                size="small"
                href={
                  "/bookings/driver/records/" +
                  row.name +
                  "/" +
                  row.id +
                  "/" +
                  "driver_detail"
                }
              >
                <DescriptionIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
      {!row.banned && (
        <Box>
          <DriverDialog type="assign" rowId={row.id} data={row} />
        </Box>
      )}
    </Box>
  );
};

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
    name: "date_added",
    label: "Created at",
    sort: true,
    omit: true,
    comp: DateFormat,
  },
  {
    name: "driving_license",
    label: "License #",
    omit: true,
  },
  {
    name: "driving_license_country",
    label: "License Country",
    omit: true,
  },
  {
    name: "driving_license_expiry_date",
    label: "License Expiry",
    omit: true,
    comp: DateFormat,
  },
  {
    name: "insurance_number",
    label: "Insurance #",
    omit: true,
  },
  {
    name: "notes",
    label: "Notes",
    omit: true,
  },
  {
    name: "hos_cycle",
    label: "HOS Cycle",
    filter: true,
    filterData: {
      list: ["120 h / 14 Days", "80 h / 7 Days", "70 h / 7 Days"],
      query: "hos_cycle__in",
      type: "multiple",
    },
  },
  {
    name: "rating",
    label: "Rating",
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

export default function DriverTable({ content }) {
  return (
    <DynamicDataTable
      title="Drivers"
      urlLink={"driver/list/?" + content + "&"}
      columnsCustom={columnsCustom}
      model_table="driver_driver"
      addNew={[<DriverDialog />]}
    />
  );
}
