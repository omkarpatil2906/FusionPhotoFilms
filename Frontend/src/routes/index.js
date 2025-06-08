import { useRoutes } from "react-router-dom";

// project import
import WebsiteRoutes from "./Routes";

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes(WebsiteRoutes);
}
