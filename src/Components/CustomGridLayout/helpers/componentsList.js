// import BookingsTable from '../../../pages/dashboard/bookings/Components/Tables/BookingsTable';
// import { TotalVehicles } from '../../Dashboard/analytics';
import OverView from '../components/Overview/OverView';
import { LineChart, BarChart, AreaChart, PieChart } from '../components/graphs';
import Table from '../components/Dashboard/Table';
import { DataGraphs } from '../../../slices/CustomSlices/actions/apiActions';
import {
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  PieChart as PieChartIcon,
  Score as ScoreIcon,
  TableChart as TableIcon,
} from '@mui/icons-material';

export const components = [
  {
    id: 'static',
    label: 'Counter Widget',
    component: [
      {
        id: 'counter',
        group: 'overview',
        name: 'Count',
        icon: <ScoreIcon fontSize="large" />,
        image: '/images/CustomDashboard/overview/totalVehicles.png',
        component: OverView,
        config: {
          title: {
            w_id: 'counter',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          table: {
            w_id: 'counter',
            type: 'dropdown',
            label: 'Data-Source',
            options: [],
            props: {
              helperText: 'Choose data source table.',
              required: true,
            },
          },
          column: {
            w_id: 'counter',
            type: 'dropdown',
            label: 'Column',
            props: {
              helperText: 'Choose column to count.',
              required: true,
            },
            options: [],
          },
          widgetType: {
            w_id: 'counter',
            type: 'dropdown',
            label: 'widget-Type',
            options: [
              { label: 'Pre-aggregated Field', name: 'pre-aggregated' },
              { label: 'Sum of Field', name: 'Sum' },
              { label: 'Number of Records', name: 'Count' },
              { label: 'Minimum of Field', name: 'Min' },
              { label: 'Maximum of Field', name: 'Max' },
              { label: 'Average of Field', name: 'Avg' },
            ],
            props: { required: true },
          },
          filter: {
            w_id: 'counter',
            type: 'text',
            label: 'Filter',
          },
        },
        onSubmit: {
          action: DataGraphs,
          url: (data) =>
            `superAdmin/queryData/number?field_name=${data.column}&app_model=${
              data.table
            }&filter=${data.filter ? data.filter : ''}&method=${
              data.widgetType
            }`,
        },
      },
    ],
  },
  {
    id: 'table',
    label: 'Table Widget',
    component: [
      {
        id: 'MUITable',
        group: 'MUItab;e',
        name: 'Table',
        icon: <TableIcon fontSize="large" />,
        image: '/images/CustomDashboard/table.png',
        component: Table,
        config: {
          title: {
            w_id: 'MUITable',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          table: {
            w_id: 'MUITable',
            type: 'dropdown',
            label: 'Data-Source',
            options: [],
            props: {
              helperText: 'Choose data source table.',
              required: true,
            },
          },
        },
      },
    ],
  },
  {
    id: 'chart',
    label: 'Chart Widget',
    component: [
      {
        id: 'line_chart',
        name: 'Line Chart',
        group: 'Graphs',
        icon: <ShowChartIcon fontSize="large" />,
        image: '/images/CustomDashboard/graphs.png',
        component: LineChart,
        config: {
          title: {
            w_id: 'line_chart',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          widgetType: {
            w_id: 'line_chart',
            type: 'dropdown',
            label: 'widget-Type',
            options: [
              { label: 'Pre-aggregated Field', name: 'pre-aggregated' },
              { label: 'Sum of Field', name: 'Sum' },
              { label: 'Number of Records', name: 'Count' },
              { label: 'Minimum of Field', name: 'Min' },
              { label: 'Maximum of Field', name: 'Max' },
              { label: 'Average of Field', name: 'Avg' },
            ],
            props: { required: true },
          },
          table: {
            w_id: 'line_chart',
            type: 'dropdown',
            label: 'Table',
            options: [],
            props: { required: true },
          },
          column_xAxis: {
            w_id: 'line_chart',
            type: 'dropdown',
            label: 'x-Axis',
            options: [],
            props: { required: true },
          },
          column_yAxis: {
            w_id: 'line_chart',
            type: 'dropdown',
            label: 'y-Axis',
            options: [],
            props: { required: true },
          },
          filter: {
            w_id: 'line_chart',
            type: 'text',
            label: 'Filter',
          },
        },
        onSubmit: {
          action: DataGraphs,
          url: (data) =>
            `superAdmin/queryData?app_model=${data.table}&x_axis=${
              data.column_xAxis
            }&y_axis=${data.column_yAxis}&method=${data.widgetType}&filter=${
              data.filter ? data.filter : ''
            }`,
        },
      },
      {
        id: 'bar_chart',
        name: 'Bar Chart',
        group: 'BarGraphs',
        icon: <BarChartIcon fontSize="large" />,
        image: '/images/CustomDashboard/graphs.png',
        component: BarChart,
        config: {
          title: {
            w_id: 'bar_chart',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          widgetType: {
            w_id: 'bar_chart',
            type: 'dropdown',
            label: 'widget-Type',
            options: [
              { label: 'Pre-aggregated Field', name: 'pre-aggregated' },
              { label: 'Sum of Field', name: 'Sum' },
              { label: 'Number of Records', name: 'Count' },
              { label: 'Minimum of Field', name: 'Min' },
              { label: 'Maximum of Field', name: 'Max' },
              { label: 'Average of Field', name: 'Avg' },
            ],
            props: { required: true },
          },
          table: {
            w_id: 'bar_chart',
            type: 'dropdown',
            label: 'Table',
            options: [],
            props: { required: true },
          },
          column_xAxis: {
            w_id: 'bar_chart',
            type: 'dropdown',
            label: 'x-Axis',
            options: [],
            props: { required: true },
          },
          column_yAxis: {
            w_id: 'bar_chart',
            type: 'dropdown',
            label: 'y-Axis',
            options: [],
            props: { required: true },
          },
          filter: {
            w_id: 'bar_chart',
            type: 'text',
            label: 'Filter',
          },
        },
        onSubmit: {
          action: DataGraphs,
          url: (data) =>
            `superAdmin/queryData?app_model=${data.table}&x_axis=${
              data.column_xAxis
            }&y_axis=${data.column_yAxis}&method=${data.widgetType}&filter=${
              data.filter ? data.filter : ''
            }`,
        },
      },
      {
        id: 'area_chart',
        name: 'Area Chart',
        group: 'AreaChart',
        icon: <ShowChartIcon fontSize="large" />,
        image: '/images/CustomDashboard/graphs.png',
        component: AreaChart,
        config: {
          title: {
            w_id: 'area_chart',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          widgetType: {
            w_id: 'area_chart',
            type: 'dropdown',
            label: 'widget-Type',
            options: [
              { label: 'Pre-aggregated Field', name: 'pre-aggregated' },
              { label: 'Sum of Field', name: 'Sum' },
              { label: 'Number of Records', name: 'Count' },
              { label: 'Minimum of Field', name: 'Min' },
              { label: 'Maximum of Field', name: 'Max' },
              { label: 'Average of Field', name: 'Avg' },
            ],
            props: { required: true },
          },
          table: {
            w_id: 'area_chart',
            type: 'dropdown',
            label: 'Table',
            options: [],
            props: { required: true },
          },
          column_xAxis: {
            w_id: 'area_chart',
            type: 'dropdown',
            label: 'x-Axis',
            options: [],
            props: { required: true },
          },
          column_yAxis: {
            w_id: 'area_chart',
            type: 'dropdown',
            label: 'y-Axis',
            options: [],
            props: { required: true },
          },
          filter: {
            w_id: 'area_chart',
            type: 'text',
            label: 'Filter',
          },
        },
        onSubmit: {
          action: DataGraphs,
          url: (data) =>
            `superAdmin/queryData?app_model=${data.table}&x_axis=${
              data.column_xAxis
            }&y_axis=${data.column_yAxis}&method=${data.widgetType}&filter=${
              data.filter ? data.filter : ''
            }`,
        },
      },
      {
        id: 'pie_chart',
        name: 'Donut/Pie Chart',
        group: 'PieChart',
        icon: <PieChartIcon fontSize="large" />,
        image: '/images/CustomDashboard/graphs.png',
        component: PieChart,
        config: {
          title: {
            w_id: 'pie_chart',
            type: 'text',
            label: 'Widget Heading',
            props: { required: true },
          },
          widgetType: {
            w_id: 'pie_chart',
            type: 'dropdown',
            label: 'widget-Type',
            options: [
              { label: 'Pre-aggregated Field', name: 'pre-aggregated' },
              { label: 'Sum of Field', name: 'Sum' },
              { label: 'Number of Records', name: 'Count' },
              { label: 'Minimum of Field', name: 'Min' },
              { label: 'Maximum of Field', name: 'Max' },
              { label: 'Average of Field', name: 'Avg' },
            ],
            props: { required: true },
          },
          table: {
            w_id: 'pie_chart',
            type: 'dropdown',
            label: 'Table',
            options: [],
            props: { required: true },
          },
          column_xAxis: {
            w_id: 'pie_chart',
            type: 'dropdown',
            label: 'x-Axis',
            options: [],
            props: { required: true },
          },
          column_xAxis_label: {
            w_id: 'pie_chart',
            type: 'text',
            label: 'x-Axis Label',
            props: { helperText: 'If x-Axis field is a ForeignKey.' },
          },
          column_yAxis: {
            w_id: 'pie_chart',
            type: 'dropdown',
            label: 'y-Axis',
            options: [],
            props: { required: true },
          },
          filter: {
            w_id: 'pie_chart',
            type: 'text',
            label: 'Filter',
          },
        },
        onSubmit: {
          action: DataGraphs,
          url: (data) =>
            `superAdmin/queryData?app_model=${data.table}&x_axis=${
              data.column_xAxis +
              (data.column_xAxis_label ? '__' + data.column_xAxis_label : '')
            }&y_axis=${data.column_yAxis}&method=${data.widgetType}&filter=${
              data.filter ? data.filter : ''
            }`,
        },
      },
    ],
  },
];
