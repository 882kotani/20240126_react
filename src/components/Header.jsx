// import React from "react";
import React, { forwardRef } from "react";
import "../App.css";

const Header = ({
  search_img,
  display_img,
  handleKeyDown,
  childref_header,
  active,
}) => {
  return (
    <div ref={childref_header} className={`header ${active ? "blur" : ""}`}>
      <div className="wrap_header">
        <h1 className="title">画像検索</h1>

        <form className="header_form">
          <input
            className="header_textarea"
            type="text"
            name="src_text"
            autocomplete="off"
            onKeyDown={handleKeyDown}
          />
          <div className="wrap_header_radio-btn">
            <label>
              <input type="radio" name="show_sync" value="20" checked />
              20
            </label>
            <label>
              <input type="radio" name="show_sync" value="100" />
              100
            </label>
          </div>
          <button className="btn_form" type="button" onClick={search_img}>
            検索
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
