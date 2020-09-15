import React, {useState} from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import { getFormStructure } from "./formData";
import graphData from './graphData'

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

  console.log(graphData, 'graphDatagraphData')
  const [data, setData] =useState([])
  const onSubmit = (details) => {
    console.log(details, "details");
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdhdXJhdiBMYWhvdGkiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE1MTE5NjQxMTl9.4_W1PodMgPXcakztbgGOkkBI_KUWQvrlwyo55_fvXuk"
    axios.post(
      "api/1/school/teacher/stats/fetch",
      { details },
      {
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res, "nayak");
      setData(res)
    });

    alert(JSON.stringify(details, null, 2));
  };

  return (
    <React.Fragment>
      <Header />
      <FormBuilder structure={getFormStructure()} onSubmit={onSubmit} />
    </React.Fragment>
  );
};
export default withStyles(styles)(FormComponent);
