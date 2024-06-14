import getConfigs from "./config.common";

// 백엔드 dev API
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const mode = "development";

const configDevelopment = getConfigs({
  baseUrl,
  mode,
});

export default configDevelopment;
