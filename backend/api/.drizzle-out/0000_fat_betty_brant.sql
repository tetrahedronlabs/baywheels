CREATE TABLE `rides` (
	`ride_id` text PRIMARY KEY NOT NULL,
	`rideable_type` text NOT NULL,
	`started_at` text NOT NULL,
	`ended_at` text NOT NULL,
	`start_station_name` text,
	`start_station_id` integer,
	`end_station_name` text,
	`end_station_id` integer,
	`start_lat` real NOT NULL,
	`start_lng` real NOT NULL,
	`end_lat` real NOT NULL,
	`end_lng` real NOT NULL,
	`member_casual` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stations` (
	`short_name` text,
	`name` text NOT NULL,
	`station_id` integer PRIMARY KEY NOT NULL,
	`lat` real NOT NULL,
	`lon` real NOT NULL,
	`capacity` integer NOT NULL,
	`region_id` integer,
	`address` text
);
