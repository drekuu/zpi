export function getRequiredEnv(name: string) {
  const val = process.env[name];

  if (val === undefined || val === null) {
    throw new Error(`Missing environment variable ${name}`);
  }

  return val;
}
