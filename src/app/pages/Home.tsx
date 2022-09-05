import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { ValidateAutocomplete } from "src/app/components/Form/ValidateAutocomplete";

import { City } from "src/app/types/City";
import { FormValues } from "src/app/types/FormValue";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      originCity: "",
      intermediateCity: "",
      destinationCity: "",
      date: undefined,
      passengers: 0,
    },
  });

  useEffect(() => {
    fetch("app.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const onSubmit = (data: FormValues) => {
    const { originCity, destinationCity, date, intermediateCity, passengers } =
      data;

    navigate(
      `/search?origin=${originCity}&destination=${destinationCity}&date=${date}&passenger=${passengers}${
        intermediateCity && `&intermediate=${intermediateCity}`
      }`
    );
  };

  const onSubmitError = () => {
    console.log("errors: ", errors);
  };

  return (
    <Box sx={{ width: 500, mx: "auto", pt: 20 }}>
      <Box
        component="form"
        autoComplete="off"
        id="form-container"
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
      >
        {/* City of Origin */}
        <ValidateAutocomplete
          register={register}
          id="originCity"
          errorMsg={errors?.originCity?.message}
          cities={cities}
          label="Original City"
          error={!!errors?.originCity?.message}
          rules={{
            required: {
              value: true,
              message: "Please select Original city",
            },
            validate: {
              differ: (v) =>
                v !== getValues("destinationCity") ||
                "Please choose different city from Destination",
            },
          }}
        />

        {/* Intermediate City */}
        <ValidateAutocomplete
          register={register}
          id="intermediateCity"
          cities={cities}
          label="Intermediate City"
        />

        {/* Destination City */}
        <ValidateAutocomplete
          register={register}
          id="destinationCity"
          errorMsg={errors?.destinationCity?.message}
          cities={cities}
          label="Destination City"
          error={!!errors?.destinationCity?.message}
          rules={{
            required: {
              value: true,
              message: "Please select Destination city",
            },
            validate: {
              differ: (v) =>
                v !== getValues("originCity") ||
                "Please choose different city from Original",
            },
          }}
        />

        {/* Travel Date */}
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            type="date"
            size="small"
            {...register("date", {
              required: {
                value: true,
                message: "Please choose your Travel date",
              },
            })}
            helperText={errors?.date?.message}
            error={!!errors?.date?.message}
          />
        </Box>

        {/* Passengers */}
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            type="number"
            size="small"
            {...register("passengers", {
              required: true,
              validate: {
                positive: (v) => v > 0 || "Should be a number greater than 0",
              },
            })}
            helperText={errors?.passengers?.message}
            error={!!errors?.passengers?.message}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit" onClick={() => trigger()}>
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
