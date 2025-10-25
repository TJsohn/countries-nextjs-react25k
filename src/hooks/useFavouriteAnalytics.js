import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useFavouriteAnalytics = () => {
  const { favourites } = useSelector((state) => state.favourites);
  const { countries } = useSelector((state) => state.countries);

  const analytics = useMemo(() => {
    if (!favourites.length || !countries.length) {
      return {
        totalFavourites: 0,
        regionStats: [],
        populationStats: null,
        areaStats: null,
        languageStats: [],
        currencyStats: [],
        totalPopulation: 0,
        totalArea: 0,
        largestCountry: null,
        smallestCountry: null,
      };
    }

    // Get full country data for favourites
    const favouriteCountries = favourites
      .map((fav) => {
        // Try to match by country name
        const found = countries.find(
          (country) => country.name.common === fav.country_name
        );
        return found;
      })
      .filter(Boolean);

    // Debug: Let's see what region data we have

    // Region statistics - better region handling
    const regionCounts = favouriteCountries.reduce((acc, country) => {
      // Use subregion if available, fallback to region, then 'Other'
      const region = country.subregion || country.region || "Other";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});

    const regionStats = Object.entries(regionCounts)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count);

    // Population statistics
    const populations = favouriteCountries.map((c) => c.population || 0);
    const totalPopulation = populations.reduce((sum, pop) => sum + pop, 0);
    const avgPopulation = totalPopulation / favouriteCountries.length;

    // Area statistics
    const areas = favouriteCountries.map((c) => c.area || 0);
    const totalArea = areas.reduce((sum, area) => sum + area, 0);
    const avgArea = totalArea / favouriteCountries.length;

    // Largest and smallest countries
    const largestCountry = favouriteCountries.reduce(
      (largest, country) =>
        (country.area || 0) > (largest?.area || 0) ? country : largest,
      null
    );

    const smallestCountry = favouriteCountries.reduce(
      (smallest, country) =>
        (country.area || 0) < (smallest?.area || 0) ? country : smallest,
      null
    );

    // Language statistics
    const languageCounts = favouriteCountries.reduce((acc, country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => {
          acc[lang] = (acc[lang] || 0) + 1;
        });
      }
      return acc;
    }, {});

    const languageStats = Object.entries(languageCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 languages

    // Currency statistics
    const currencyCounts = favouriteCountries.reduce((acc, country) => {
      if (country.currencies) {
        Object.values(country.currencies).forEach((currency) => {
          acc[currency.name] = (acc[currency.name] || 0) + 1;
        });
      }
      return acc;
    }, {});

    const currencyStats = Object.entries(currencyCounts)
      .map(([currency, count]) => ({ currency, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 currencies

    return {
      totalFavourites: favouriteCountries.length,
      regionStats,
      populationStats: {
        total: totalPopulation,
        average: avgPopulation,
        highest: Math.max(...populations),
        lowest: Math.min(...populations.filter((p) => p > 0)),
      },
      areaStats: {
        total: totalArea,
        average: avgArea,
        largest: Math.max(...areas),
        smallest: Math.min(...areas.filter((a) => a > 0)),
      },
      languageStats,
      currencyStats,
      totalPopulation,
      totalArea,
      largestCountry,
      smallestCountry,
      favouriteCountries,
    };
  }, [favourites, countries]);

  return analytics;
};
