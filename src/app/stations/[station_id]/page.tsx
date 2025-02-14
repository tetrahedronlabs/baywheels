import { database } from "@/src/utils/database";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ station_id: string }>;
}) {
  const params = await props.params;
  const station = await database.db.stations
    .filter("short_name", params.station_id)
    .getFirst();
  if (!station) return notFound();
  return (
    <div>
      <h1>Station Details</h1>
      <p>Station Short Code: {params.station_id}</p>
      <p>Station Name: {station.name}</p>
      <p>Station Capacity: {station.capacity}</p>
      <p>
        Station Location: {station.lat}, {station.lon}
      </p>
      <p>Station ID:{station.station_id}</p>
    </div>
  );
}
