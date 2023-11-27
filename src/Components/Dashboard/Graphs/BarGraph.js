import React, { Component } from "react";

// https://jerairrest.github.io/react-chartjs-2/
// https://github.com/jerairrest/react-chartjs-2/blob/master/example/src/components/bar.js

import { Line } from "react-chartjs-2";
import moment from "moment";
import "src/Pages/MainDashboard/style.css";
import { connect } from "react-redux";

class BarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list1: [],
      data_list2: [],
      labels: [],
      show_graph: "month",
    };
  }

  handleChange = (e) => {
    this.setState({ show_graph: e.target.value });
  };

  render() {
    let labels = [];
    let data1 = [];
    let data2 = [];
    if (this.state.show_graph || this.props.show_graph === "month") {
      // labels = ["Jan", "Feb", "March", "April"];
      // data1 = [1032, 953, 887, 834];
      // data2 = [805, 655, 543, 566];

      labels = [];
      data1 = [];
      data2 = [];
      if (
        this.props.data2 &&
        this.props.data2.prev_data &&
        this.props.data2.prev_data.length !== 0
      ) {
        let seletected_month = "";
        let average_data1 = "";
        let average_data2 = "";
        let count = 0;
        this.props.data2.prev_data.map((dd) => {
          if (
            seletected_month !== moment(dd.date, "YYYY-MM-DD").format("MMM")
          ) {
            if (average_data1 && average_data2 && count) {
              data1 = [...data1, Math.round(average_data1 / count)];
              data2 = [...data2, Math.round(average_data2 / count)];
            }

            seletected_month = moment(dd.date, "YYYY-MM-DD").format("MMM");
            count = 1;
            average_data1 = dd.total;
            average_data2 = dd.hired;
            labels = [...labels, moment(dd.date, "YYYY-MM-DD").format("MMM")];
          } else {
            average_data1 = average_data1 + dd.total;
            average_data2 = average_data2 + dd.hired;
            count = count + 1;
          }
          return true;
        });
        data1 = [...data1, this.props.data2.total_count];
        data2 = [...data2, this.props.data2.hired_count];
      }
    }

    if (
      this.props.show_graph === "date" &&
      this.props.data.weekly_count &&
      this.props.data.weekly_count.length !== 0
    ) {
      data1 = [];
      data2 = [];
      labels = [];
      this.props.data.weekly_count.map((dd) => {
        if (
          labels[labels.length - 1] !==
          moment(dd.date, "YYYY-MM-DD").format("DD/MMM")
        ) {
          labels = [...labels, moment(dd.date, "YYYY-MM-DD").format("DD/MMM")];
          data1 = [...data1, dd.total];
          data2 = [...data2, dd.hired];
        }
        return true;
      });
    }

    const graph_data = {
      labels: labels,
      datasets: [
        {
          label: "Total",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data1,
        },
        {
          label: "Hired",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(175,92,180,0.4)",
          borderColor: "rgba(175,92,182,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data2,
        },
      ],
    };
    return <Line className="appBar" data={graph_data} />;
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.api["hiring/rental-graph"],
    data2: state.api["hiring/year-graph"],
  };
};

export default connect(mapStateToProps, {})(BarGraph);
