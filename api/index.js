import * as server from '../dist/studionexo_20/server/main.server.mjs';


const appExport = server.app ?? server.default ?? server;
const handler = typeof appExport === 'function' ? appExport() : appExport;

export default handler;
