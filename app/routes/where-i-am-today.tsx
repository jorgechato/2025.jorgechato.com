import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import type { TravelData } from '~/utils/api';
import type { Location, NomadList } from '~/utils/schema';
import LocationSection from '@/components/location/Location';
import { useLoaderData } from '@remix-run/react';
import { Profile, ThumbnailLocations } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: `Where is ${Profile.HEADER} today?` },
    { name: 'description', content: 'I use to travel a lot, so here you can see where I am today.' },
  ];
};

function cleanURL(url: string | undefined): string {
  if (!url) {
    return '';
  }

  if (url.includes('https://')) {
    const match = url.match(/\/assets\/img\/places\/.*\.(jpg|png|webp|jpeg)(\?.*)?$/);
    if (!match)
      return url; // Return the original URL if no match is found

    const imagePath = match[0]; // Extract the required image path
    return `https://nomads.com/cdn-cgi/image/format=auto,fit=cover,width=250,height=320${imagePath}`;
  }
  return `https://nomads.com${url.replace('width=100,height=100', 'width=250,height=320')}`;
}

function nomadLocationToLocation(nomadLocation: any, thumbnailOverwrite: Record<string, string>): Location {
  const city = nomadLocation.place ?? nomadLocation.city;
  const citySlug = nomadLocation.place_slug ?? nomadLocation.city_slug;
  const thumbnail = thumbnailOverwrite[city] ?? cleanURL(nomadLocation.place_photo);

  return {
    city,
    citySlug,
    country: nomadLocation.country,
    countrySlug: nomadLocation.country_slug,
    countryCode: nomadLocation.country_code,
    thumbnail,
    latitude: nomadLocation.latitude,
    longitude: nomadLocation.longitude,
    dateStart: nomadLocation.date_start,
    dateEnd: nomadLocation.date_end,
    length: nomadLocation.length,
  } as Location;
}

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    // eslint-disable-next-line node/prefer-global/process
    const response = await fetch(`https://nomads.com/@${context.cloudflare.env.NOMADLIST_USERNAME || process.env.NOMADLIST_USERNAME}.json?key=${context.cloudflare.env.NOMADLIST_KEY || process.env.NOMADLIST_KEY}`);
    const data: TravelData = await response.json();
    const thumbnailOverwrite: Record<string, string> = ThumbnailLocations;

    const trips: Location[] = Array.isArray(data.trips)
      ? data.trips
          .filter((trip: any) => new Date(trip.date_start) > new Date())
          .map((trip: any) => nomadLocationToLocation(trip, thumbnailOverwrite))
          .sort((a: Location, b: Location) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
      : [data.trips];

    return {
      location: {
        now: nomadLocationToLocation(data.location.now, thumbnailOverwrite) || [],
        next: nomadLocationToLocation(data.location.next, thumbnailOverwrite) || [],
      },
      trips,
    } as NomadList;
  }
  catch {
    return { location: { now: null, next: null }, trips: [] };
  }
}

export default function Index() {
  const data = useLoaderData<NomadList>();

  return (
    <section className="w-full object-center m-auto text-center select-none">
      <LocationSection of={Profile.HEADER} data={data} />
    </section>
  );
}
