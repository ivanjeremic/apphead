export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Handle preflight requests
  if (event.node.req.method === "OPTIONS") {
    event.node.res.statusCode = 204; // No Content
    event.node.res.end();
  }
});
