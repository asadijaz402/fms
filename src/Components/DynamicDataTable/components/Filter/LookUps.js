import * as MUIIcon from '@mui/icons-material';

// lookups ref https://docs.djangoproject.com/en/4.1/ref/models/querysets/#field-lookups
export const FieldTypes = {
  ForeignKey: {
    icon: <MUIIcon.Numbers />,
    filters: [
      {
        name: 'equals',
        value: 'exact',
      },
      {
        name: 'contains',
        value: 'contains',
      },
      {
        name: 'greater than',
        value: 'gt',
      },
      {
        name: 'greater than equal to',
        value: 'gte',
      },
      {
        name: 'less than',
        value: 'lt',
      },
      {
        name: 'less than equal to',
        value: 'lte',
      },
      {
        name: 'starts with',
        value: 'startswith',
      },
      {
        name: 'starts with - Case-insensitive',
        value: 'istartswith',
      },
      {
        name: 'ends with',
        value: 'endswith',
      },
      {
        name: 'ends with - Case-insensitive',
        value: 'iendsswith',
      },
      {
        name: 'range',
        value: 'range',
      },
      {
        name: 'is null',
        value: 'isnull',
      },
    ],
  },
  DateField: {
    icon: <MUIIcon.DateRange />,
    filters: [
      {
        name: 'date',
        value: 'date',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'year',
        value: 'year',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'month',
        value: 'month',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'day',
        value: 'day',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'is null',
        value: 'isnull',
      },
    ],
  },
  DateTimeField: {
    icon: <MUIIcon.AccessTimeFilled />,
    filters: [
      {
        name: 'date',
        value: 'date',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'year',
        value: 'year',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'month',
        value: 'month',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'day',
        value: 'day',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'time',
        value: 'time',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'hour',
        value: 'hour',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },
      {
        name: 'minute',
        value: 'minute',
        filters: [
          {
            name: 'equals',
            value: 'exact',
          },
          {
            name: 'greater than',
            value: 'gt',
          },
          {
            name: 'greater than equal to',
            value: 'gte',
          },
          {
            name: 'less than',
            value: 'lt',
          },
          {
            name: 'less than equal to',
            value: 'lte',
          },
          {
            name: 'range',
            value: 'range',
          },
        ],
      },

      {
        name: 'is null',
        value: 'isnull',
      },
    ],
  },
  AutoField: {
    icon: <MUIIcon.Numbers />,
    filters: [
      {
        name: 'equals',
        value: 'exact',
      },
      {
        name: 'greater than',
        value: 'gt',
      },
      {
        name: 'greater than equal to',
        value: 'gte',
      },
      {
        name: 'less than',
        value: 'lt',
      },
      {
        name: 'less than equal to',
        value: 'lte',
      },
      {
        name: 'range',
        value: 'range',
      },
    ],
  },
  TextField: {
    icon: <MUIIcon.ShortText />,
    filters: [
      {
        name: 'equals',
        value: 'exact',
      },
      {
        name: 'equals - Case-insensitive',
        value: 'iexact',
      },
      {
        name: 'contains',
        value: 'contains',
      },
      {
        name: 'contains - Case-insensitive',
        value: 'icontains',
      },
      {
        name: 'in - In a given iterable',
        value: 'in',
      },
      {
        name: 'greater than',
        value: 'gt',
      },
      {
        name: 'greater than equal to',
        value: 'gte',
      },
      {
        name: 'less than',
        value: 'lt',
      },
      {
        name: 'less than equal to',
        value: 'lte',
      },
      {
        name: 'starts with',
        value: 'startswith',
      },
      {
        name: 'starts with - Case-insensitive',
        value: 'istartswith',
      },
      {
        name: 'ends with',
        value: 'endswith',
      },
      {
        name: 'ends with - Case-insensitive',
        value: 'iendsswith',
      },
      {
        name: 'range',
        value: 'range',
      },
      {
        name: 'is null',
        value: 'isnull',
      },
    ],
  },
  BooleanField: {
    icon: <MUIIcon.Numbers />,
    filters: [
      { name: 'equals', value: 'exact' },
      { name: 'is empty', value: 'isnull' },
    ],
  },
};
