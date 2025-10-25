"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { Card, CardContent, Typography, Box, Container } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Only render the new search-enabled layout
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 600 }}>
        All Countries
      </Typography>
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <input
          id="country-search"
          name="country-search"
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {filteredCountries.map((country) => (
          <Card
            key={country.name.common}
            onClick={() => handleCountryClick(country.name.common)}
            sx={{
              height: 380,
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                "& .flag-image": {
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            {/* Flag Section with Gradient */}
            <Box
              sx={{
                position: "relative",
                height: 200,
                width: "100%",
                flexShrink: 0,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                overflow: "hidden",
              }}
            >
              <Image
                className="flag-image"
                src={country.flags.svg || country.flags.png}
                alt={`${country.name.common} flag`}
                fill
                priority
                style={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </Box>

            {/* Country Info Section */}
            <CardContent
              sx={{
                flexGrow: 1,
                p: 0,
              }}
            >
              <Box sx={{ p: 2.5 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontSize: "1.15rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {country.name.common}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.2,
                    pl: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 24, fontSize: "1.1rem" }}
                    >
                      📍
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {country.capital?.[0] || "No capital"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 24, fontSize: "1.1rem" }}
                    >
                      🌏
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {country.region || "Unknown region"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 24, fontSize: "1.1rem" }}
                    >
                      👥
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {country.population?.toLocaleString() || "0"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Countries;
