import { createConnection } from 'node:net';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const port = 3000;

function isPortInUse() {
  return new Promise((resolve) => {
    const socket = createConnection({ host: '127.0.0.1', port });
    socket.setTimeout(1500);
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => { socket.destroy(); resolve(false); });
  });
}

if (await isPortInUse()) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (response.ok && body.includes('Turner 10')) {
      console.log(`Turner 10 is already running at http://localhost:${port}`);
      console.log('This terminal will stay open while that server is running. Press Ctrl+C to detach.');
      const monitor = setInterval(async () => {
        if (!(await isPortInUse())) {
          clearInterval(monitor);
          console.log('The Turner 10 server has stopped. Run npm run dev to start it again.');
        }
      }, 3000);
      await new Promise(() => {});
    }
  } catch {
    // A listener that has not answered yet still owns the port.
  }
  console.error(`Port ${port} is in use by another or unresponsive server. Stop that process before starting Turner 10.`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
const nextCli = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextCli, 'dev', '-p', String(port)], { stdio: 'inherit' });
child.once('error', (error) => { console.error(error); process.exitCode = 1; });
child.once('exit', (code) => { process.exitCode = code ?? 1; });
