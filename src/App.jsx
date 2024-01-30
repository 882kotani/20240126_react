import React, { useRef, useEffect } from "react";
import "./App.css";
import "./reset.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
// import { v4 as uuidv4 } from "uuid"; //ユニークidを設定。

function App() {
  // const [todos, setTodos] = useState([]);
  // const [counter, setCounter] = useState(0);

  // エンターキーが押された時の処理（propsとしてHeaderに渡す。）
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      search_img();
    }
  }

  // // /*-------scrollしてブラーをかけるイベント--------*/
  // const header = document.getElementById("box_header");
  // const height_header = document.getElementById("box_main").clientHeight;
  // window.addEventListener("scroll", function () {
  //   // const scroll_top = window.pageYOffset;
  //   // if (scroll_top <= height_header) {
  //   //   header.classList.toggle("blur", false);
  //   // } else if (height_header < scroll_top) {
  //   //   header.classList.toggle("blur", true);
  //   // }
  // });

  // function blur_scroll() {
  const childref_header = useRef(null);
  const childref_main = useRef(null);

  const height_header = childref_header.clientHeight;
  console.log(childref_header);
  window.addEventListener("scroll", function () {
    const scroll_top = window.pageYOffset;
    // if (scroll_top <= height_header) {
    if (scroll_top <= height_header) {
      // childref_header.classList.toggle("blur", false);
      childref_header.classList.add("blur");
      console.log("scroll_top <= height_header");
    } else if (height_header < scroll_top) {
      // childref_main.classList.toggle("blur", true);
      childref_header.classList.add("blur");
      console.log("height_header < scroll_top");
    }
  });
  // }

  //検索イベント関数
  function search_img() {
    const form_async = document.querySelector(".header_form");
    const form_async_data = new FormData(form_async);
    const form_async_data_json = Object.fromEntries(form_async_data);
    const src_word = form_async_data_json.src_text; //検索ワード
    const show_num = form_async_data_json.show_sync; //検索数

    const text = document.querySelector(".src_before"); //「検索ワードを・・・」
    text.classList.toggle("after", true); //「検索ワードを・・・」を消す

    const ACCESS_KEY = "6m-MrXZxcBmmmhhHQB92dmtYICSQ4OUruyA-wO3XEx4"; //API key env
    //API URL
    const fetch_url =
      "https://api.unsplash.com/search/photos?query=" +
      src_word +
      "&per_page=" +
      show_num +
      "&client_id=" +
      ACCESS_KEY;

    //リセット：全ての写真を削除（wrap_img要素を削除）
    const divElements = document.querySelectorAll(".wrap_img");
    divElements.forEach(function (divElement) {
      divElement.parentNode.removeChild(divElement);
    });

    display_img(fetch_url, show_num); //APIアクセス〜表示動作
  }

  //fetchをする関数、data（json）を返却する。
  const fetch_api = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  //APIアクセス〜表示する関数
  const display_img = async (url, show_num) => {
    const data = await fetch_api(url); //fetchしてjsonを返却
    const imageContainer = document.getElementById("imageContainer"); //最も大枠のコンテナ要素取得

    for (let i = 0; i < show_num; i++) {
      // imageContainer内のタグを生成（div、img、アイコン用span）
      const divElement = document.createElement("div");
      const imageElement = document.createElement("img");
      const iconSpan = document.createElement("span");

      // classの名前付加（div:wrap_img、img：img_grid）
      divElement.className = "wrap_img";
      imageElement.className = "img_grid";
      imageElement.id = "img" + i; //各画像に一意のid割り当て
      iconSpan.className = "material-symbols-outlined"; //各ダウンロードボタンには同じidを割り当て

      imageElement.src = data.results[i].urls.regular; // img要素（src）に取得先URLを入力
      divElement.appendChild(imageElement); // divタグ内にimg要素を追加

      //-------------ダウンロードボタンをオーバーレイさせる------------
      iconSpan.innerText = "download_for_offline"; // アイコンのテキストを設定
      divElement.appendChild(iconSpan);

      // divタグをimageContainerに追加
      imageContainer.appendChild(divElement);

      //ダウンロードボタンを押下時に画像のIDをアラート表示させる。（追加課題）
      const dl_btn = document.querySelectorAll(".material-symbols-outlined"); //全てのclass要素を取得し配列に格納
      dl_btn[i].addEventListener("click", function () {
        alert("画像のIDは " + imageElement.id + " です。");
      });
    }
  };

  return (
    <>
      <Header
        search_img={search_img}
        display_img={display_img}
        handleKeyDown={handleKeyDown}
        childref_header={childref_header}
      />
      <Main childref_main={childref_main} />
    </>
  );
}
export default App;
