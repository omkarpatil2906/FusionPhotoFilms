import { lazy } from "react";
import Layout from "../layout";
import MinimalLayout from "../layout/MinimalLayout";
const ContactUs = lazy(() => import("../components/section/home/ContactUs"));
const AboutUs = lazy(() => import("../components/section/home/AboutUs"));
const Home = lazy(() => import("../components/section/home/Home"));
const Gallery = lazy(() => import("../components/section/gallary/Gallary"));
const Wedding = lazy(() =>
  import("../components/section/gallary/wedding/Wedding")
);
const Bride = lazy(() => import("../components/section/gallary/bride/Bride"));
const Groom = lazy(() => import("../components/section/gallary/groom/Groom"));
const PreWedding = lazy(() =>
  import("../components/section/gallary/preWedding/PreWedding")
);
const Haldi = lazy(() => import("../components/section/gallary/haldi/Haldi"));
const Engagement = lazy(() =>
  import("../components/section/gallary/engagement/Engagement")
);
const Mehndi = lazy(() =>
  import("../components/section/gallary/mehndi/Mehndi")
);
const Mekeup = lazy(() =>
  import("../components/section/gallary/mekeups/Mekeup")
);
const Maternity = lazy(() =>
  import("../components/section/gallary/maternity/Maternity")
);
const UploadImage = lazy(() =>
  import("../components/section/uploadImg/UploadImage")
);
const Error404 = lazy(() => import("../components/section/errorpage/Error404"));

const WebsiteRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourVision",
        element: <AboutUs />,
      },
      {
        path: "/connect",
        element: <ContactUs />,
      },
      {
        path: "/ourWork",
        element: <Gallery />,
      },
      {
        path: "/weddingImg",
        element: <Wedding />,
      },
      {
        path: "/brideImg",
        element: <Bride />,
      },
      {
        path: "/groomImg",
        element: <Groom />,
      },
      {
        path: "/preWeddingImg",
        element: <PreWedding />,
      },
      {
        path: "/haldiImg",
        element: <Haldi />,
      },
      {
        path: "/engagementImg",
        element: <Engagement />,
      },
      {
        path: "/mehndiImg",
        element: <Mehndi />,
      },
      {
        path: "/mekeupImg",
        element: <Mekeup />,
      },
      {
        path: "/maternity",
        element: <Maternity />,
      },
      {
        path: "/upload/fusionFilms@2024",
        element: <UploadImage />,
      },
    ],
  },
  {
    path: "*",
    element: <MinimalLayout />,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default WebsiteRoutes;
