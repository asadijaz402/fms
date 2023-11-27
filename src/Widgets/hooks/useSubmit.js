import { useState } from "react";

export default function useSubmit() {
  const [value, setValue] = useState({});

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return {
    value,
    onSubmit,
    onChange,
  };
}
