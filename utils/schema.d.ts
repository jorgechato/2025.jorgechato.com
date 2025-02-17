export interface NomadList {
  location: {
    now: Location;
    next: Location;
  };
  trips: Location[];
}

export interface Location {
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  countryCode: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
  dateStart: string;
  dateEnd: string;
  length: string;
}
