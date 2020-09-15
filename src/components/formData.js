export const getFormStructure = () => {
  return [
    {
      name: "schoolId",
      type: "text",
      customProps: {
        placeholder: "Enter schoolId",
        label: "school Id",
        defaultValue:"SCH6494b6d504b04"
      },
    },
    {
      name: "academicYear",
      type: "text",
      customProps: {
        placeholder: "Enter Academic Year",
        label: "Academic Year",
        defaultValue:"2020-2021"
      },
    },
    {
      name: "fromDate",
      type: "date",
      customProps: {
        label: "pick a Start Date",
        variant: "dialog",
        inputVariant: "outlined",
      },
    },
    {
      name: "toDate",
      type: "date",
      customProps: {
        label: "pick a to Date",
        variant: "dialog",
        inputVariant: "outlined",
      },
    },

  ];
};
