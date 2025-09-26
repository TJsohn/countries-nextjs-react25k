"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch(); // trigger the action
  const router = useRouter();

  console.log("encodeURIComponent: ", encodeURIComponent("Côte d'Ivoire"));

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  console.log("Countries: ", countries);

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        {countries.map((country) => (
          <Card
            key={country.name.common}
            sx={{ width: "200px", height: "200px" }}
          >
            <CardActionArea
              onClick={() => handleCountryClick(country.name.common)}
            >
              <CardContent>
                <Image
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                  src={country.flags.svg}
                  alt={country.name.common}
                />
                <Typography variant="h6">{country.name.common}</Typography>
                <Typography variant="body1">{country.population}</Typography>
                <Typography variant="body1">
                  {country && getCurrencies(country)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Countries;
