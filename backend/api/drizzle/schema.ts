import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const rides = sqliteTable("rides", {
  ride_id: text().primaryKey(),
  rideable_type: text().notNull(),
  started_at: text().notNull(),
  ended_at: text().notNull(),
  start_station_name: text(),
  start_station_id: integer(),
  end_station_name: text(),
  end_station_id: integer(),
  start_lat: real().notNull(),
  start_lng: real().notNull(),
  end_lat: real().notNull(),
  end_lng: real().notNull(),
  member_casual: text().notNull(),
});

export const stations = sqliteTable("stations", {
  short_name: text(),
  name: text().notNull(),
  station_id: integer().primaryKey(),
  lat: real().notNull(),
  lon: real().notNull(),
  capacity: integer().notNull(),
  region_id: integer(),
  address: text(),
});