import React, { useEffect } from "react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import Routes from "./routes";
import ScrollToTop from "./common/ScrollToTop";

function App() {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <ScrollToTop/>
      <Routes />
    </div>
  );
}

export default App;
