"use client";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";
import { Public } from "@mui/icons-material";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavourites } from "../../lib/features/favourites/favouritesSlice";
import { fetchCountries } from "../../lib/features/countries/countriesSlice";
import { useAuth } from "../context/AuthContext";
import FavouriteAnalytics from "../../components/FavouriteAnalytics";
import { useRouter } from "next/navigation";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const countries = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.favourites.loading);
  const router = useRouter();


  // Get full country data for favourites
  const favouriteCountries = favourites.map(fav => 
    countries.find(country => country.name?.common === fav.country_name) || fav
  ).filter(Boolean);

  useEffect(() => {
    // Fetch countries data for analytics
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  if (authLoading || loading) {
    return <CircularProgress />;
  }

  // if we have user logged in show 'Favourites page is here'
  // if we dont have user logged in show 'Please login to see your favourites'
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Please login to see your favourites
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to save and view your favorite countries.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Favourite Countries
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {favourites.length === 0
            ? "You haven't selected any favourite countries yet. Visit a country page to add it to your favourites!"
            : `You have ${favourites.length} favourite ${favourites.length === 1 ? 'country' : 'countries'}.`}
        </Typography>
      </Box>

      {/* Countries Grid */}
      {favourites.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            🌍 Your Favourite Countries
          </Typography>
          <Grid container spacing={3}>
{favouriteCountries.map((country, index) => (
  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${country.cca3 || country.name?.common}-${index}`}>
                <Card 
                  sx={{ 
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                      '& .flag-image': {
                        transform: 'scale(1.05)',
                      }
                    }
                  }}
                >
                  {/* Country Card Content */}
                  <Box
                    onClick={() => handleCountryClick(country.name?.common || country.country_name)}
                    sx={{ 
                      cursor: 'pointer', 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Flag Section with gradient overlay */}
                    {country.flags?.svg && (
                      <Box 
                        sx={{ 
                          position: 'relative',
                          width: '100%',
                          height: 200,
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        <Image
                          className="flag-image"
                          fill
                          priority
                          style={{ 
                            objectFit: "cover",
                            transition: 'transform 0.3s ease',
                          }}
                          src={country.flags.svg}
                          alt={`${country.name?.common || country.country_name} flag`}
                        />
                      </Box>
                    )}
                    
                    <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 2.5 }}>
                      <Box>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          gutterBottom
                          sx={{ 
                            fontWeight: 600,
                            mb: 2,
                            fontSize: '1.15rem',
                          }}
                        >
                          {country.name?.common || country.country_name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>📍</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {country.capital?.[0] || 'No capital'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>🌏</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {country.region || 'Unknown region'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>👥</Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              {(country.population || 0).toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Analytics Section */}
          <Box sx={{ mt: 6 }}>
            <FavouriteAnalytics />
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No favourite countries yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start exploring countries and add them to your favourites!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default FavouritesPage;