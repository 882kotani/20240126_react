import React from "react";
// import React, { forwardRef } from "react";
import "../App.css";

const Main = ({ childref_main }) => {
  return (
    // <div className="box_main">
    <div ref={childref_main} className="box_main">
      <p className="src_before">検索ワードを入力してください。</p>
      <div className="img_box">
        <div id="imageContainer"></div>
      </div>
    </div>
  );
};

export default Main;
