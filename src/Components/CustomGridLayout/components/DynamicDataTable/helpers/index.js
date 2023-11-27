import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import useCustomFieldForm from '../hook/useCustomFieldForm';
import * as Widgets from '../../../../../Widgets';

export function labelGenerator(value) {
  return (value.charAt(0).toUpperCase() + value.slice(1)).split('_').join(' ');
}

export function selector(row, map) {
  if (typeof map === 'string') {
    return row[map] ? row[map] : '-';
  } else {
    if (row[map.name]) {
      if (map.selector) {
        return map.selector;
      } else {
        if (typeof row[map.name] === 'object') {
          if (map.value) {
            return row[map.name][map.value];
          } else {
            return row[map.name][0];
          }
        } else {
          return row[map.name];
        }
      }
    } else {
      return '-';
    }
  }
}

export function cell(row, map) {
  if (typeof map === 'string') {
    if (typeof row[map] === 'boolean') {
      if (row[map]) {
        return <CheckIcon color='success' fontSize='small' />;
      } else {
        return <CancelIcon color='error' fontSize='small' />;
      }
    } else {
      return selector(row, map);
    }
  } else {
    if (map.comp) {
      let Comp = map.comp;
      return <Comp row={row} value={row[map.name] ? row[map.name] : '-'} />;
    } else {
      return selector(row, map);
    }
  }
}

export function sortString(column, sortDirection, columnsCustom) {
  let row = columnsCustom.filter((n) => {
    if (n.label) {
      if (n.label === column.name) {
        return true;
      } else {
        return false;
      }
    } else {
      if (labelGenerator(n.name) === column.name) {
        return true;
      } else {
        return false;
      }
    }
  });
  return sortDirection === 'asc' ? row[0].name : '-' + row[0].name;
}

export function EditCell(row, field) {
  const { loading, widgets, handleChange, value } = useCustomFieldForm(
    row,
    field
  );

  let Comp = Widgets.default[widgets[field.fieldType.name].widget];

  return (
    <Comp
      onChange={handleChange}
      name={{ label: field.name, rowId: row.id }}
      loading={loading}
      {...widgets[field.fieldType.name].props}
      {...field.props}
      size='small'
      value={value[field.id]?.value}
    />
  );
}
