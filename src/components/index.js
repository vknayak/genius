import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import { getFormStructure } from "./formData";

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
  const [data, setData] = useState([]);
  const onSubmit = (details) => {
    console.log(details, "details");
    details.fromDate =""
    details.toDate =""
    
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdhdXJhdiBMYWhvdGkiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE1MTE5NjQxMTl9.4_W1PodMgPXcakztbgGOkkBI_KUWQvrlwyo55_fvXuk";
      const instance = axios.create({
        baseURL: 'https://stage.geniusteacher.in/api',
        timeout: 1000,
        headers: {'Authorization': 'Bearer '+token},
        data:details,
      });
      instance.post('/1/school/teacher/stats/fetch').then((res)=> console.log(res))
      // axios
      // .post(
      //   "https://stage.geniusteacher.in/api/1/school/teacher/stats/fetch",
      //    details,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json"
      //     },
      //   }
      // )
      // .then((res) => {
      //   console.log(res, "nayak");
      //   setData(res);
      // });

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
