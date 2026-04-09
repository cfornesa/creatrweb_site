CREATE TABLE `document_embeddings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`file_path` text NOT NULL,
	`content` text NOT NULL,
	`embedding` text NOT NULL
);
