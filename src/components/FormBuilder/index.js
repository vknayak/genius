import React from "react";
import { useForm } from "react-hook-form";
import { withTheme, Button, Box, Container } from "@material-ui/core";
import DateField from "./components/DateField";
import TextField from "./components/TextField";

const COMPONENTS = {
  text: TextField,
  date: DateField,
};

const FormBuilder = ({
  structure,
  initialValues,
  onSubmit,
  theme,
  fullWidth = true,
}) => {

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    submitFocusError: false,
    defaultValues: {
      ...initialValues,
    },
  });

  return (
    <Container>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {structure.map((field) => {
          const FieldComponent = COMPONENTS[field.type];
          return (
            <Box key={field.name} m={2}>
              <FieldComponent
                fullWidth={fullWidth}
                field={field}
                getValues={getValues}
                setValue={setValue}
                control={control}
                register={register}
                watch={watch}
              />
            </Box>
          );
        })}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default withTheme(FormBuilder);
