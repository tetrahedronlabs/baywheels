PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_stations` (
	`short_name` text,
	`name` text NOT NULL,
	`station_id` text PRIMARY KEY NOT NULL,
	`lat` real NOT NULL,
	`lon` real NOT NULL,
	`capacity` integer NOT NULL,
	`region_id` integer,
	`address` text
);
--> statement-breakpoint
INSERT INTO `__new_stations`("short_name", "name", "station_id", "lat", "lon", "capacity", "region_id", "address") SELECT "short_name", "name", "station_id", "lat", "lon", "capacity", "region_id", "address" FROM `stations`;--> statement-breakpoint
DROP TABLE `stations`;--> statement-breakpoint
ALTER TABLE `__new_stations` RENAME TO `stations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;