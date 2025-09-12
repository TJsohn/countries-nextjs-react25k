"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { Card, Grid, CardContent, Typography, CardMedia } from "@mui/material";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch(); // trigger the action

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  console.log("Countries: ", countries);

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  const getCurrencies = (country) => {
    if (!country.currencies) return "No currency data";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  return (
    <div>
      <Grid container spacing={2} direction="row" justifyContent="center">
        {countries.map((country) => (
          <Card key={country.name.common}>
            <CardMedia component="img" image={country.flags.svg} />
            <CardContent>
              <Typography>{country.name.common}</Typography>
              <Typography>{country && getCurrencies(country)}</Typography>
              <Typography>{country.population}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Countries;
