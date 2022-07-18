import React from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required, errors }) => {
  const { control } = useFormContext();
  let isError = false;
  let errorMessage = "";
  if (errors && errors.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errors[name].type;
  }
  React.useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={label}
              required
              variant="filled"
              error={isError}
            />
          )}
          name={name}
          control={control}
        />
        <Typography color="error">{errorMessage}</Typography>
      </Grid>
    </>
  );
};

export default FormInput;
