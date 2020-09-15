import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import { getFormStructure } from "./formData";
import graphData from "./graphData";
var BarChart = require("react-d3-components").BarChart;

const styles = (theme) => ({
  submit: {
    marginTop: 20,
    backgroundColor: "#FF484F",
  },
  fields: {
    marginTop: 20,
  },
});

const FormComponent = () => {
  const listOfData = {};
  const name = [];
  var sum = 0;
  const options = (graph) => {
    for (var i of graph) {
      if (!name.includes(i.teacherName)) {
        name.push(i.teacherName);
        listOfData[i.teacherName] = 0;
      }
      if (i.hasOwnProperty("endTime")) {
        sum = i.endTime - i.startTime;
      } else {
        sum = 3900000;
      }
      listOfData[i.teacherName] = listOfData[i.teacherName] + sum;
    }
  };
  const callingfunction = options(graphData);

  const listForBarChart = [];
  const dataForBarCart = () => {
    name.forEach((each) =>
      listForBarChart.push({ x: each, y: Math.ceil(listOfData[each] / 60000) })
    );
  };

  const callingDataForBarCart = dataForBarCart();
  const [data, setData] = useState([]);
  const onSubmit = (details) => {
    console.log(details, "details");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdhdXJhdiBMYWhvdGkiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE1MTE5NjQxMTl9.4_W1PodMgPXcakztbgGOkkBI_KUWQvrlwyo55_fvXuk";
    axios
      .post(
        "api/1/school/teacher/stats/fetch",
        { details },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "nayak");
        setData(res);
      });

    alert(JSON.stringify(details, null, 2));
  };

  var finalData = [
    {
      label: "HI",
      values: listForBarChart,
    },
  ];
  return (
    <React.Fragment>
      <Header />
      <FormBuilder structure={getFormStructure()} onSubmit={onSubmit} />
      <h3> Teachers  vs time taught in minutes</h3>
      <BarChart
        data={finalData}
        width={500}
        height={500}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
        xAxis={{label: "Teacher name"}}
        yAxis={{label: "time taught in minutes"}}
      />
    </React.Fragment>
  );
};
export default withStyles(styles)(FormComponent);
