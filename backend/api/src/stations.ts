import { drizzle } from "drizzle-orm/d1";
import { stations } from "../drizzle/schema";
import { InferSelectModel, eq } from "drizzle-orm";

// API source URL (Replace with actual endpoint)
const STATIONS_API_URL = "https://gbfs.lyft.com/gbfs/2.3/bay/en/station_information.json";

// Infer TypeScript type from Drizzle schema
export type Station = InferSelectModel<typeof stations>;

// Define the API response structure
export type APIStation = {
  short_name: string;
  name: string;
  station_id: string;
  lat: number;
  lon: number;
  capacity: number;
  region_id?: string;
  address?: string;
};

// Function to fetch and upsert stations into the database
export async function updateStations(env: CloudflareBindings) {
  const db = drizzle(env.DB);

  try {
    // Fetch station data from API
    const response = await fetch(STATIONS_API_URL);
    if (!response.ok) throw new Error(`Failed to fetch stations: ${response.statusText}`);

    const jsonData: { data: { stations: APIStation[] } } = await response.json();
    const stationList: APIStation[] = jsonData.data.stations;

    if (!Array.isArray(stationList)) throw new Error("Invalid station data format");

    console.log(`Fetched ${stationList.length} stations from the Lyft API`);

    for (const station of stationList) {
      const existing = await db
        .select()
        .from(stations)
        .where(eq(stations.station_id, station.station_id))
        .get();

      const newStation: Station = {
        short_name: station.short_name,
        name: station.name,
        station_id: station.station_id,
        lat: station.lat,
        lon: station.lon,
        capacity: station.capacity,
        region_id: station.region_id ? parseInt(station.region_id) : null,
        address: station.address ?? null,
      };

      if (!existing) {
        // Insert only if the station is new
        await db.insert(stations).values(newStation);
        console.log(`Inserted new station: ${station.short_name}`);
      } else {
        // Check if data has changed
        const hasChanged = Object.keys(newStation).some((key) => {
          return newStation[key as keyof Station] !== existing[key as keyof Station];
        });

        if (hasChanged) {
          // Update only if something has changed
          await db
            .update(stations)
            .set(newStation)
            .where(eq(stations.station_id, station.station_id));
          console.log(`Updated station: ${station.short_name}`);
        } else {
          console.log(`No changes for station: ${station.short_name}`);
        }
      }
    }

    console.log("Station update process completed.");
  } catch (error) {
    console.error("Error updating stations:", error);
  }
}
