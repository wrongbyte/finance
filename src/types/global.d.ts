namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      REDIS_PORT: string;
      PSLQ_PORT: string;
      PSQL_HOST: string;
      PSQL_USER: string;
      PSQL_PASSWORD: string;
      PSQL_DB: string;
      ACCESSTOKEN_PRIVATE_KEY: string;
      ACCESSTOKEN_PUBLIC_KEY: string;
      REFRESHTOKEN_PRIVATE_KEY: string;
      REFRESHTOKEN_PUBLIC_KEY: string;
      REDIS_TIMEOUT: string;
      ACCESS_TOKEN_TIMEOUT: string;
      REFRESH_TOKEN_TIMEOUT: string;
      PORT: string;
      MONGO_URI: string;
    }
  }
  