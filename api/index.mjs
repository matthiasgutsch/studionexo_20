// api/index.mjs
import * as server from '../dist/studionexo_20/server/main.server.mjs';

// Handle both “app instance” and “app factory” exports
const appExport = server.app ?? server.default ?? server;
const app = typeof appExport === 'function' ? appExport() : appExport;

export default app; // Vercel Node runtime expects a default export handler
