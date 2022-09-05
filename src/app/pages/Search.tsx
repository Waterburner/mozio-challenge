import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { getDistance } from "src/utils/getDistance";

import { City } from "src/app/types/City";

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetch("app.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const originData = useMemo(() => {
    return cities.filter((city) => city.city === searchParams.get("origin"));
  }, [cities, searchParams]);

  const intermediateData = useMemo(() => {
    return cities.filter(
      (city) => city.city === searchParams.get("intermediate")
    );
  }, [cities, searchParams]);

  const destData = useMemo(() => {
    return cities.filter(
      (city) => city.city === searchParams.get("destination")
    );
  }, [cities, searchParams]);

  const distance = useMemo(() => {
    if (searchParams.get("intermediate")) {
      return (
        getDistance(
          originData[0]?.lat,
          originData[0]?.lng,
          intermediateData[0]?.lat,
          intermediateData[0]?.lng
        ) +
        getDistance(
          destData[0]?.lat,
          destData[0]?.lng,
          intermediateData[0]?.lat,
          intermediateData[0]?.lng
        )
      );
    }

    return getDistance(
      originData[0]?.lat,
      originData[0]?.lng,
      destData[0]?.lat,
      destData[0]?.lng
    );
  }, [cities, searchParams]);

  return (
    <Box sx={{ width: 500, mx: "auto", pt: 20 }}>
      <Typography variant="h5">
        Original City: {searchParams.get("origin")}
      </Typography>
      {searchParams.get("intermediate") && (
        <Typography variant="h5">
          Intermediate City: {searchParams.get("intermediate")}
        </Typography>
      )}
      <Typography variant="h5">
        Destination: {searchParams.get("destination")}
      </Typography>
      <Typography variant="h5">Date: {searchParams.get("date")}</Typography>
      <Typography variant="h5">
        Passengers: {searchParams.get("passenger")}
      </Typography>
      {distance ? (
        <Typography variant="h4">{distance}</Typography>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
