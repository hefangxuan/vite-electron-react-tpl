interface productionEnv {
  BASE_URL: "/";
  MODE: "production";
  DEV: false;
  PROD: true;
}
interface developmentEnv {
  VITE_DEV_SERVER_URL: "http://localhost:3000/";
  VITE_ELECTRON_DISABLE_SECURITY_WARNINGS: "true";
  VITE_PORT: "3345";
  BASE_URL: "/";
  MODE: "development";
  DEV: true;
  PROD: false;
}
interface testEnv {
  BASE_URL: "/";
  MODE: "test";
  DEV: true;
  PROD: false;
}
// @ts-ignore
type ImportMetaEnv = productionEnv | developmentEnv | testEnv;
