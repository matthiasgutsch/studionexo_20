export default async function handler(req, res) {
  const { default: server } = await import('../dist/studionexo_20/server/server.mjs');
  return server(req, res);
}