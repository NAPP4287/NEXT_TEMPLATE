import Config from "@/config/config.export";

export default function Home() {
  return <div>{Config().baseUrl}</div>;
}
