let host = "http://localhost:3000";
export const apiVersion = "v1";

const env = import.meta.env.ENV?.toLowerCase() || "local";

switch (env) {
  case "local":
    host = "http://localhost:3000";
    break;
  case "dev":
    host = "http://localhost:3000";
    break;
  case "prod":
    host = "http://localhost:3000";
    break;
  default:
    host = "http://localhost:3000";
}

const envConfig = {
  local: {
    baseUrl: `${host}/api/${apiVersion}`,
  },
  dev: {
    baseUrl: `${host}/api/${apiVersion}`,
  },
  prod: {
    baseUrl: `${host}/api/${apiVersion}`,
  },
};

export default envConfig[env];