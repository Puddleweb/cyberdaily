CREATE TABLE `attempts` (
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`challenge_id` text NOT NULL,
	`answer` integer NOT NULL,
	`score` integer NOT NULL,
	`completed_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `day`, `challenge_id`)
);
--> statement-breakpoint
CREATE TABLE `challenges` (
	`day` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `generation_runs` (
	`day` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`status` text NOT NULL,
	`updated_at` integer NOT NULL,
	`message` text
);
