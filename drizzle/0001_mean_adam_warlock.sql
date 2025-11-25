CREATE TABLE `albums` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`releaseYear` int NOT NULL,
	`spotifyId` varchar(255),
	`spotifyUrl` varchar(500),
	`coverImageKey` varchar(500),
	`coverImageUrl` varchar(500),
	`trackCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `albums_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `concerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`date` timestamp NOT NULL,
	`time` varchar(10),
	`location` varchar(255) NOT NULL,
	`address` text,
	`ticketUrl` varchar(500),
	`imageKey` varchar(500),
	`imageUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `concerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`read` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fileUploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileUrl` varchar(500) NOT NULL,
	`mimeType` varchar(100),
	`fileSize` int,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fileUploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`imageKey` varchar(500) NOT NULL,
	`imageUrl` varchar(500) NOT NULL,
	`thumbnailUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`youtubeId` varchar(255) NOT NULL,
	`youtubeUrl` varchar(500),
	`thumbnailUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
