export default async function handler(req, res) {
  const { app } = await import('../dist/studionexo_20/server/main.server.mjs');
  const handle = app();
  return handle(req, res);
}