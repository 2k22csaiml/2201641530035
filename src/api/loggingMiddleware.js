import { sendLog } from '../../Logging-Middleware/log';

const allowedLevels = ['info', 'warn', 'error'];
const allowedPackages = ['frontend', 'backend', 'auth', 'db'];

export async function loggingMiddleware(message, level = 'info', pkg = 'frontend', token) {
  if (!allowedLevels.includes(level)) {
    level = 'info';
  }
  if (!allowedPackages.includes(pkg)) {
    pkg = 'frontend';
  }
  try {
    await sendLog('frontend', level, pkg, message, token);
  } catch (err) {
    // fallback or ignore
  }
}
