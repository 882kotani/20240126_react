import React from "react";
import "../App.css";

const Header = () => {
  return (
    <div className="header">
      <div className="wrap_header">
        <h1 className="title">画像検索</h1>

        <form className="header_form">
          <input
            className="header_textarea"
            type="text"
            name="src_text"
            autocomplete="off"
          />
          <div class="wrap_header_radio-btn">
            <label>
              <input type="radio" name="show_sync" value="20" checked />
              20
            </label>
            <label>
              <input type="radio" name="show_sync" value="100" />
              100
            </label>
          </div>
          <button className="btn_form" type="button">
            検索
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
