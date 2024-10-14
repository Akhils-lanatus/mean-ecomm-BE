declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    JWT_TOKEN: string;
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  }
}
