import type { NomadList } from '~/utils/schema';
import { Alt } from '@/components/location/Alt';
import { AltSkeleton } from '@/components/location/AltSkeleton';
import { Marker } from '@/components/location/Marker';
import { MarkerSkeleton } from '@/components/location/MarkerSkeleton';
import { TripList } from '@/components/location/TripList';

export default function LocationSection({ of, data }: { of: string; data: NomadList }) {
  const { now, next } = data.location;

  return (
    <section className="w-full object-center m-auto text-center select-none">
      {!data.location.now
        ? (
            <MarkerSkeleton />
          )
        : (
            <Marker thumbnail={now?.thumbnail} />
          )}
      {!data.location.now
        ? (
            <AltSkeleton of={of} />
          )
        : (
            <Alt of={of} now={now} next={next} in={next?.dateStart} />
          )}
      <TripList trips={data.trips} />
    </section>
  );
}
