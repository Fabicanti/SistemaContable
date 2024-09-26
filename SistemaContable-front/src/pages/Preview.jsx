import React from "react";
import { Head } from "../components/Head";
import frontPage from "../assets/preview/front-preview.png";
import "../styles/Preview.css";
import { PreviewContent } from "../components/Preview/PreviewContent";
import { PreviewAside } from "../components/Preview/PreviewAside";


export const Preview = () => {
  return (
    <>
      <Head />
      <div className="container-view">
        <PreviewAside frontPage={frontPage}/>
        <PreviewContent/>
      </div>
    </>
  );
};
