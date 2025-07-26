import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  jwt_secret: string;
  jwt_Expired: string;
  JWT_REFRESH_SECRETS:string;
  JWT_REFRESH_EXPIRES:string;
  SUPER_ADMIN_PASSWROD: string;
  SUPER_ADMIN_EMAIL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET:string;
  GOOGLE_CALLBACK_URL:string;
  EXPRESS_SESSION_SECRET:string;
  FRONT_END_URL:string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "MONGO_URL",
    "NODE_ENV",
    "jwt_secret",
    "jwt_Expired",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWROD",
    "JWT_REFRESH_SECRETS",
    "JWT_REFRESH_EXPIRES",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONT_END_URL",
  ];
  
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
    jwt_secret: process.env.jwt_secret as string,
    jwt_Expired: process.env.jwt_Expired as string,
    JWT_REFRESH_SECRETS:process.env.JWT_REFRESH_SECRETS as string,
    JWT_REFRESH_EXPIRES:process.env.JWT_REFRESH_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWROD:process.env.SUPER_ADMIN_PASSWROD as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONT_END_URL: process.env.FRONT_END_URL as string
  };
};

export const envVars = loadEnvVariables();
