interface LocationDetail {
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  epoch_start: number;
  epoch_end: number;
  date_start: string;
  date_end: string;
  place_photo?: string;
}

interface Location {
  now: LocationDetail;
  next?: LocationDetail;
  previous?: LocationDetail;
}

interface Stats {
  cities: number;
  countries: number;
  followers: number;
  following: number;
  distance_traveled_km: number;
  distance_traveled_miles: number;
  countries_visited_percentage: number;
  cities_visited_percentage: number;
}

interface Trip {
  epoch_start: number;
  epoch_end: number;
  date_start: string;
  date_end: string;
  length: string;
  epoch_duration: number;
  place: string;
  place_slug?: string | null;
  place_long_slug?: string | null;
  place_url?: string | null;
  place_photo?: string;
  country: string;
  country_code: string;
  country_slug: string;
  latitude: number;
  longitude: number;
  trip_id: string;
}

export interface TravelData {
  cached: string;
  success: string;
  legal: string;
  photo: string;
  username: string;
  location: Location;
  stats: Stats;
  map: null;
  trips: Trip[];
}
