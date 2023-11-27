import React from "react";

// https://jerairrest.github.io/react-chartjs-2/
// https://github.com/jerairrest/react-chartjs-2/blob/master/example/src/components/bar.js

import { Bar } from "react-chartjs-2";

import { connect } from "react-redux";

const BarGraph = (props) => {
  var data_on_hire = [];
  var data_off_hire = [];
  var labels = [];

  if (props.data && props.data.length !== 0) {
    props.data.map((dd) => {
      labels = [...labels, dd.depot];
      data_on_hire = [...data_on_hire, dd.on_hire];
      data_off_hire = [...data_off_hire, dd.off_hire];
      return null;
    });
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "On Hire",
        backgroundColor: "#4FC3F7",
        borderColor: "#00ADFB",
        borderWidth: 1,

        data: data_on_hire,
      },
      {
        label: "Off Hire",
        backgroundColor: "#2CD07E",
        borderColor: "#00BC5E",
        borderWidth: 1,

        data: data_off_hire,
      },
    ],
  };

  return <Bar data={data} option={{ maintainAspectRatio: false }} />;
};

const mapStateToProps = (state) => {
  return {
    data: state.api["depot/vehicle/count"],
  };
};

export default connect(mapStateToProps, {})(BarGraph);
