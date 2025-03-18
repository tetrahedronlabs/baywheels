import { drizzle } from "drizzle-orm/d1";
import { stations } from "../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

// API source URL (Replace with actual endpoint)
const STATIONS_API_URL =
  "https://gbfs.lyft.com/gbfs/2.3/bay/en/station_information.json";

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
  region_id?: string; // Comes as a string from API, needs conversion
  address?: string; // Some may have an address, others may not
  rental_uris: {
    ios: string;
    android: string;
  };
};

// Function to fetch and upsert stations into the database
export async function updateStations(env: CloudflareBindings) {
  const db = drizzle(env.DB);

  try {
    // Fetch station data from API
    const response = await fetch(STATIONS_API_URL);
    if (!response.ok)
      throw new Error(`Failed to fetch stations: ${response.statusText}`);

    const jsonData: { data: { stations: APIStation[] } } =
      await response.json();
    const stationList: APIStation[] = jsonData.data.stations;

    if (!Array.isArray(stationList))
      throw new Error("Invalid station data format");

    console.log(`Fetched ${stationList.length} stations from Lyft`);

    // Convert API data and upsert
    for (const station of stationList) {
      const dbStation: Station = {
        short_name: station.short_name,
        name: station.name,
        station_id: station.station_id,
        lat: station.lat,
        lon: station.lon,
        capacity: station.capacity,
        region_id: station.region_id ? parseInt(station.region_id) : null, // Convert region_id to number
        address: station.address ?? null, // Use address if available, otherwise null
      };

      await db.insert(stations).values(dbStation).onConflictDoUpdate({
        target: stations.station_id, // Conflict resolution on station_id
        set: dbStation,
      });
    }

    console.log("Stations updated successfully");
  } catch (error) {
    console.error("Error updating stations:", error);
  }
}
