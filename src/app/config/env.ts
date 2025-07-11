import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URL: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "MONGO_URL", "NODE_ENV"];
  
  requiredEnvVariables.forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Missing environment variable: ${name}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    MONGO_URL: process.env.MONGO_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVariables();
