// object_eg = {
//     "type": "Text",
//     "properties": {
//         html: "",
//     },
//     "content": [],
//     "parent": null
// }

export default function TextWidget({ html }) {
  return (
    <p
      style={{ margin: 0, padding: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
