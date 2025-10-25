import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Public,
  People,
  Square,
  LocationCity,
  Launch
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const FavouritesList = () => {
  const [expanded, setExpanded] = useState(true);
  const favourites = useSelector((state) => state.favourites.favourites);
  const countries = useSelector((state) => state.countries.countries);
  const router = useRouter();

  // Get full country data for favourites
  const favouriteCountries = favourites.map(fav => 
    countries.find(country => country.cca3 === fav.country_code) || fav
  ).filter(Boolean);

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  if (favouriteCountries.length === 0) {
    return null;
  }

  const totalPopulation = favouriteCountries.reduce((sum, country) => sum + (country.population || 0), 0);
  const totalArea = favouriteCountries.reduce((sum, country) => sum + (country.area || 0), 0);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="h2">
            📋 My Favourites List ({favouriteCountries.length})
          </Typography>
          <Button
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            size="small"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<People />}
            label={`${totalPopulation.toLocaleString()} people`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Square />}
            label={`${totalArea.toLocaleString()} km²`}
            size="small"
            variant="outlined"
          />
        </Box>

        <Collapse in={expanded}>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {favouriteCountries.map((country, index) => (
              <React.Fragment key={country.cca3}>
                <ListItem
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={country.flags?.svg}
                      alt={`${country.name?.common || country.country_name} flag`}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {country.name?.common || country.country_name}
                        </Typography>
                        <Chip label={country.cca3 || 'N/A'} size="small" />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          <LocationCity sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                          {country.capital?.[0] || 'No capital'} • {country.region || 'N/A'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="caption" color="text.secondary">
                            <People sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                            {(country.population || 0).toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <Square sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                            {(country.area || 0).toLocaleString()} km²
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  
                  <Tooltip title="View country details">
                    <IconButton
                      onClick={() => handleCountryClick(country.name?.common || country.country_name)}
                      size="small"
                    >
                      <Launch />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                
                {index < favouriteCountries.length - 1 && <Divider sx={{ my: 0.5 }} />}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default FavouritesList;