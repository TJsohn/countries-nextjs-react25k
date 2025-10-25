'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useFavouriteAnalytics } from '../hooks/useFavouriteAnalytics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const formatNumber = (num) => {
  // Handle null, undefined, or non-numeric values
  if (num == null || isNaN(num)) return '0';
  
  // Convert to number if it's a string
  const number = Number(num);
  
  if (number >= 1000000000) return `${(number / 1000000000).toFixed(1)}B`;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return number.toLocaleString();
};

const FavouriteAnalytics = () => {
  const analytics = useFavouriteAnalytics();

  if (analytics.totalFavourites === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Add some favourite countries to see analytics! 📊
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        📊 Your Favourite Countries Analytics
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h3">{analytics.totalFavourites}</Typography>
              <Typography variant="body2">Total Favourites</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">{formatNumber(analytics.totalPopulation)}</Typography>
              <Typography variant="body2">Total Population</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">{formatNumber(analytics.totalArea)}</Typography>
              <Typography variant="body2">Total Area (km²)</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">
                {analytics.regionStats.length > 0 
                  ? analytics.regionStats[0].count === 1 && analytics.regionStats.length > 1
                    ? `${analytics.regionStats.length} Regions`
                    : analytics.regionStats[0].region
                  : 'N/A'
                }
              </Typography>
              <Typography variant="body2">
                {analytics.regionStats.length > 0 && analytics.regionStats[0].count === 1 && analytics.regionStats.length > 1
                  ? 'Equal Distribution'
                  : 'Top Region'
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Regional Distribution Chart */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🌍 Countries by Region
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.regionStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, count }) => `${region}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="region"
                  >
                    {analytics.regionStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Population Chart */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                👥 Population Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.favouriteCountries.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name.common" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Bar dataKey="population" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Country Highlights */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🏆 Country Highlights
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary">
                  Largest by Area:
                </Typography>
                <Typography variant="body1">
                  {analytics.largestCountry?.name.common} ({formatNumber(analytics.largestCountry?.area)} km²)
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary">
                  Most Populous:
                </Typography>
                <Typography variant="body1">
                  {analytics.favouriteCountries
                    .sort((a, b) => (b.population || 0) - (a.population || 0))[0]?.name.common} 
                  ({formatNumber(analytics.favouriteCountries
                    .sort((a, b) => (b.population || 0) - (a.population || 0))[0]?.population)} people)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Languages */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🗣️ Most Common Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analytics.languageStats.map((lang, index) => (
                  <Chip
                    key={lang.language}
                    label={`${lang.language} (${lang.count})`}
                    color="primary"
                    variant={index === 0 ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FavouriteAnalytics;