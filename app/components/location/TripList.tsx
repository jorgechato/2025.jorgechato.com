import type { Location } from '~/utils/schema';
import countryFlagEmoji from 'country-flag-emoji';
import { DateTime } from 'luxon';

interface TripListProps {
  trips: Location[];
}

export function TripList(props: TripListProps) {
  return (
    <div className="mt-10 w-fit mx-auto">

      {props.trips ? <div className="font-h1 text-lg font-bold mb-6 text-yellow-500">Upcoming trips</div> : <></>}

      <ol className="relative border-l border-zinc-200 dark:border-zinc-800 text-left cursor-cell">
        {props.trips?.map((trip) => {
          const flag = countryFlagEmoji.get(trip.countryCode.toUpperCase()).emoji ?? countryFlagEmoji.get(trip.countrySlug.toUpperCase()).emoji;

          return (
            <li key={trip.latitude} className="font-h1 mb-10 ml-6 group">
              <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3
                            ring-8 ring-zinc-100 bg-zinc-200 dark:ring-zinc-800 dark:bg-zinc-700
                            group-hover:scale-125 scale-100 duration-300"
              >
                <div className="rounded-full shadow-lg">{flag}</div>
              </span>
              <h3 className="ml-2 flex items-center mb-1 font-semibold
                            group-hover:scale-105 scale-100 duration-300 transition-scale"
              >
                {trip.city}
              </h3>
              <time className="ml-2 block mb-2 text-sm font-normal leading-none text-zinc-400 dark:text-zinc-500">
                {DateTime.fromFormat(trip.dateStart, 'yyyy-MM-dd').toLocaleString(DateTime.DATE_MED)}
              </time>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
