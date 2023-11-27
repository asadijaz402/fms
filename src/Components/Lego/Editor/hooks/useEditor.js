import { useState, useEffect } from "react";
import * as WidgetJSON from "../../../../Widgets";

export default function useEditor() {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState([
    {
      id: "1",
      type: "Container",
      properties: {},
      content: [
        {
          id: "2",
          type: "Box",
          properties: {
            mt: 2,
            mb: 2,
          },
          content: [
            {
              id: "3",
              type: "Form",
              properties: {},
              content: [
                {
                  id: "4",
                  type: "Grid",
                  properties: {
                    container: true,
                    spacing: 2,
                  },
                  content: [
                    {
                      id: "5",
                      type: "Grid",
                      properties: {
                        item: true,
                        xs: 12,
                        sm: 12,
                        md: 6,
                        lg: 6,
                      },
                      content: [
                        {
                          id: "6",
                          type: "TextField",
                          properties: {
                            label: "Full Name",
                            fullWidth: true,
                            variant: "outlined",
                            name: "full_name",
                          },
                        },
                      ],
                    },
                    {
                      id: "7",
                      type: "Grid",
                      properties: {
                        item: true,
                        xs: 12,
                        sm: 12,
                        md: 6,
                        lg: 6,
                      },
                      content: [
                        {
                          id: "8",
                          type: "TextField",
                          properties: {
                            label: "Email",
                            type: "email",
                            required: true,
                            fullWidth: true,
                            variant: "outlined",
                            name: "email",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const select = (e) => {
    setSelected({
      id: e.target.id?.split(",")[0],
      type: e.target.id?.split(",")[1],
    });
  };

  console.log(selected);

  const onChange = (e) => {
    setValue(JSON.parse(e.json));
  };

  const addWidget = () => {
    setValue([...value, WidgetJSON.default["ButtonJSON"]]);
  };

  console.log(value);
  return {
    value,
    onChange,
    select,
    selected,
    addWidget,
  };
}
