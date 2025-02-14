import { database } from "@/src/utils/database"

export default async function StationsPage() {
    const stationsList = await database.db.stations.select(['short_name']).getAll()
  return (
    <div>
      <h1>Stations</h1>
      {(stationsList).map((station) => (
        <div key={station.short_name}>
          {station.short_name}
        </div>
      ))}

    </div>
  )
}
