// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "rides",
    checkConstraints: {
      _pgroll_check_not_null_member_casual: {
        name: "_pgroll_check_not_null_member_casual",
        columns: ["_pgroll_new_member_casual"],
        definition: "CHECK ((_pgroll_new_member_casual IS NOT NULL)) NOT VALID",
      },
      tripdata_xata_id_length_xata_id: {
        name: "tripdata_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_tripdata_xata_id_key: {
        name: "_pgroll_new_tripdata_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "_pgroll_new_member_casual",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "end_lat",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "end_lng",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "end_station_id",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "end_station_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "ended_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "member_casual",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "ride_id",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "rideable_type",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "start_lat",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "start_lng",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "start_station_id",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "start_station_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "started_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "stations",
    checkConstraints: {
      stations_xata_id_length_xata_id: {
        name: "stations_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_stations_xata_id_key: {
        name: "_pgroll_new_stations_xata_id_key",
        columns: ["xata_id"],
      },
      stations_station_id_unique: {
        name: "stations_station_id_unique",
        columns: ["station_id"],
      },
    },
    columns: [
      {
        name: "address",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "capacity",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "lat",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "lon",
        type: "float",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "region_id",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "rental_uris/android",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "rental_uris/ios",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "short_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "station_id",
        type: "text",
        notNull: false,
        unique: true,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Rides = InferredTypes["rides"];
export type RidesRecord = Rides & XataRecord;

export type Stations = InferredTypes["stations"];
export type StationsRecord = Stations & XataRecord;

export type DatabaseSchema = {
  rides: RidesRecord;
  stations: StationsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://tetrahedron-ver4cq.us-west-2.xata.sh/db/baywheels",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
