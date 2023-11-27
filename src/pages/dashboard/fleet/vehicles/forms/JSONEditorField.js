import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

export default function JsonEditor({ value, onChange, name }) {
  const handleChange = (e) => {
    onChange({
      target: {
        name,
        value: e,
      },
    });
  };

  return (
    <Editor value={value} onChange={handleChange} mode={Editor.modes.code} />
  );
}
