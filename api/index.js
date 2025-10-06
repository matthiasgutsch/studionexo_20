// api/index.js (CommonJS)
let cachedAppPromise;

function getApp() {
  if (!cachedAppPromise) {
    cachedAppPromise = import('../dist/studionexo_20/server/main.server.mjs').then((server) => {
      const appExport = server.app ?? server.default ?? server;
      return typeof appExport === 'function' ? appExport() : appExport;
    });
  }
  return cachedAppPromise;
}

module.exports = async (req, res) => {
  const app = await getApp();
  // Delegate to the Express app
  return app(req, res);
};
