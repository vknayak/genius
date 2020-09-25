import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import { getFormStructure } from "./formData";
import {
  ComposedChart,LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';
var axios = require('axios');
const JSONToCSV=require("json2csv")
const fs=require("fs")

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
    details.fromDate = ""
    details.toDate = ""

    const data = JSON.stringify(details);

    const config = {
      method: 'post',
      url: '/1/school/teacher/stats/fetch',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdhdXJhdiBMYWhvdGkiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE1MTE5NjQxMTl9.4_W1PodMgPXcakztbgGOkkBI_KUWQvrlwyo55_fvXuk'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  console.log(data, 'datadata')

  function dataForChart(listOfdata) {
    console.log(listOfdata,'listOfdata')
    // loop for list of data
    let listOfGradeSection = [];
    let listOfsection = [];
    for (let dict of listOfdata) {
      for (let keys in dict) {
        if (keys === "section") {
          listOfGradeSection.push(dict["grade"] + dict[keys] + dict["subject"]);
          listOfsection.push(dict["grade"] + dict[keys]);
        }
      }
      // unique set for grade and section and subject
      let gradeSectionSet = new Set(listOfGradeSection);
      listOfGradeSection = Array.from(gradeSectionSet);
  
      // unique set for grade and section and subject
      let sectionSet = new Set(listOfsection);
      listOfsection = Array.from(sectionSet);
    }
  
    // loop for time accumulation
    let listForTime = [];
    for (let Sgs of listOfGradeSection) {
      let timeAccumution = 0;
      let newDict = {};
      for (let dict_ of listOfdata) {
        if (
          Sgs[0] === dict_["grade"] &&
          Sgs[1] === dict_["section"] &&
          Sgs.slice(2) === dict_["subject"]
        ) {
          if (dict_.hasOwnProperty("endTime")) {
            timeAccumution += dict_["endTime"] - dict_["startTime"];
            newDict[Sgs] = timeAccumution;
          } else {
            timeAccumution += 325646;
            newDict[Sgs] = timeAccumution;
          }
        }
      }
      listForTime.push(newDict);
    }
  
    // for final formating of data
  
    let listOfFinalFormat = [];
  
    for (let Sg of listOfsection) {
      var dict__ = {};
      for (let Obj of listForTime) {
        for (let SgS in Obj) {
          if (SgS.slice(0, 2) === Sg) {
            dict__["section"] = SgS.slice(0, 2);
            if (SgS.slice(2) === "m"){
              dict__["Maths"] = Math.ceil(Obj[`${SgS}`]/60000);
            }
            if (SgS.slice(2) === "s"){
              dict__["Science"] = Math.ceil(Obj[`${SgS}`]/60000);
            }
            if (SgS.slice(2) === "eg"){
              dict__["English"] = Math.ceil(Obj[`${SgS}`]/60000);
            } 
          }
        }
      }
      listOfFinalFormat.push(dict__);
    }
  
    return listOfFinalFormat ;
  }
  
 const totalData = data.length && dataForChart(data);
 console.log(totalData,'totalData')

//  const csv= JSONToCSV(totalData,{fields:["section","Maths","Science","English"]})
//  fs.writeFileSync("../../public/data.csv",csv)

  
  return (
    <React.Fragment>
      <Header />
      <FormBuilder structure={getFormStructure()} onSubmit={onSubmit} />

      { totalData && <ComposedChart
        width={500}
        height={400}
        data={totalData}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="section" label={{ value: 'Subject', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'time taught in min', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="English" barSize={20} fill="#413ea0" >
        <LabelList dataKey="English" position="top"   /> </Bar>
        <Bar dataKey="Maths" barSize={20} fill="#8884d8"><LabelList dataKey="Maths" position="top"  /></Bar>
        <Bar dataKey="Science" barSize={20} fill="#ff7300"><LabelList dataKey="Science" position="top" /></Bar>
      </ComposedChart>}
    </React.Fragment>
  );
};
export default withStyles(styles)(FormComponent);