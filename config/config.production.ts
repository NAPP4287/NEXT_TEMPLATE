import getConfigs from "./config.common";

// 백엔드 prod API
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const mode = "production";

const configProduction = getConfigs({
  baseUrl,
  mode,
});

export default configProduction;
