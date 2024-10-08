//import { AppHeadClient } from "@apphead/database";
import { sqlite } from "@apphead/authentication";

export const db = sqlite("main.db");

db.exec(`CREATE TABLE IF NOT EXISTS user (
  id TEXT NOT NULL PRIMARY KEY,
  github_id INTEGER UNIQUE,
  username TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)`);

/**
 * Apphead
 */
/* export const db = new AppHeadClient(); */
