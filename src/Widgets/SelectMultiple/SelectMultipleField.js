import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  useTheme,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(options, value, theme) {
  return {
    fontWeight:
      value.indexOf(options) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectFieldWidget({ children, ...props }) {
  const theme = useTheme();

  return (
    <FormControl {...props}>
      {props.label && <InputLabel>{props.label}</InputLabel>}
      <Select multiple MenuProps={MenuProps} {...props}>
        {props.options.map((row) => (
          <MenuItem
            key={row}
            value={row}
            style={getStyles(props.options, props.value, theme)}
          >
            {row}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
