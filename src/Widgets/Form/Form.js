import React from "react";
import BackdropWidget from "../Backdrop/Backdrop";
import { useSubmit } from "../hooks";

export default function FormWidget({ children, ...props }) {
  const { value, loading, onChange, onSubmit } = useSubmit();

  return (
    <form onSubmit={onSubmit} {...props}>
      <BackdropWidget loading={loading} />
      {React.cloneElement(children, {
        data: value,
        onChange: (e) => onChange(e),
      })}
    </form>
  );
}
