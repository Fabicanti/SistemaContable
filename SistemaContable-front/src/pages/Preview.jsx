import React, { useEffect } from "react";
import { Head } from "../components/Head";
import frontPage from "../assets/preview/front-preview.png";
import "../styles/Preview.css";
import { PreviewContent } from "../components/Preview/PreviewContent";
import { PreviewAside } from "../components/Preview/PreviewAside";

export const Preview = () => {
  
  useEffect(() => {
    document.title = "Sistema contable";
    return () => (document.title = "Inicio");
  }, []);

  return (
    <>
      <Head />
      <div className="container-view">
        <PreviewAside frontPage={frontPage} />
        <PreviewContent />
      </div>
    </>
  );
};
