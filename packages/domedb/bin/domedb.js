#!/usr/bin/env node
import { MongoClient } from "mongodb";
import { bootstrap } from "../src/bootstrap.js";

// Connection URL
const url = "mongodb://localhost:27017";
export const client = new MongoClient(url);

await client.connect();
console.log('Connected successfully to server');

bootstrap();
