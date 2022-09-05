import React, { useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

import { City } from "src/app/types/City";
import { FormValues } from "src/app/types/FormValue";

interface ValidateAutocompleteProps {
  id:
    | "date"
    | "originCity"
    | "intermediateCity"
    | "destinationCity"
    | "passengers";
  cities: City[];
  register: UseFormRegister<FormValues>;
  label: string;
  errorMsg?: string;
  error?: boolean;
  rules?: RegisterOptions;
}

export const ValidateAutocomplete: React.FC<ValidateAutocompleteProps> = ({
  cities,
  id,
  register,
  label,
  errorMsg,
  error,
  rules,
}) => {
  const selectBoxRef = useRef<HTMLInputElement>(null);

  return (
    <Autocomplete
      ref={selectBoxRef}
      size="small"
      freeSolo
      id="origin-city"
      disableClearable
      sx={{ mt: 3 }}
      options={cities?.map((option) => option.city)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          {...register(id, rules)}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          helperText={error && errorMsg}
          error={error}
        />
      )}
    />
  );
};
