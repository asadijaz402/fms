import React from "react";
import DynamicDataTable from "../../../../Components/DynamicDataTable";
import { Box, Chip } from "@mui/material";
import moment from "moment";
import { UserDialog, DeleteUserDialog, PasswordReset } from "../dialogs";

const GroupComp = ({ value }) => {
  return (
    <Box display="flex">
      {value?.map((row) => {
        return (
          <Box mr={1}>
            <Chip size="small" key={row.id} label={row.name} />
          </Box>
        );
      })}
    </Box>
  );
};

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const ActionButtons = ({ row }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box mr="1">
        <UserDialog id={row.id} data={row} />
      </Box>
      <Box mr="1">
        <PasswordReset id={row.id} data={row} />
      </Box>
      <Box>
        <DeleteUserDialog id={row.id} data={row} />
      </Box>
    </Box>
  );
};

const columnsCustom = [
  { name: "first_name", label: "Name", sort: false, filter: false },
  { name: "id", omit: true },
  { name: "username", omit: true },
  { name: "permission_users", omit: true },
  {
    name: "groups",
    label: "Groups",
    sort: true,
    comp: GroupComp,
    props: { wrap: true },
  },
  { name: "date_joined", label: "Date Joined", comp: DateFormat },
  {
    name: "company_member",
    omit: true,
  },
  {
    name: "newColumnArray",
    new: [
      {
        name: "id",
        label: "Action",
        comp: ActionButtons,
      },
    ],
  },
];

export default function UserListTable({ content }) {
  return (
    <DynamicDataTable
      title="Users"
      urlLink={"account/users/?" + content + "&"}
      columnsCustom={columnsCustom}
      addNew={[<UserDialog />]}
    />
  );
}
