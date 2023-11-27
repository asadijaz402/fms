import React from "react";
import { Button, Grid } from "@mui/material";
// import LegoEditorSidebar from "../../Components/Lego/LegoEditorSidebar";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
// www.npmjs.com/package/react-json-editor-ajrm
import useEditor from "../../Components/Lego/Editor/hooks/useEditor";
import LEGO from "./LEGO";

export default function LegoEditor() {
  const { value, onChange, select, selected, addWidget } = useEditor();

  return (
    <>
      {/* <LegoEditorSidebar /> */}
      <Grid container>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <JSONInput
            // colors={darktheme}
            locale={locale}
            height="100vh"
            width="100%"
            placeholder={value}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <LEGO selected={selected} content={value} onSelect={select} />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={addWidget}>Click Here</Button>
        </Grid>
      </Grid>
    </>
  );
}
