// firebase 연결
import { app } from "./firebase.js";
import {
  getDoc,
  doc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// url에 get parameter 가져오기
const getUrl = new URL(window.location);
const docId = getUrl.searchParams.get("doc_id");

const db = getFirestore(app);
const boardRef = doc(db, "board", docId);
const boardSnap = await getDoc(boardRef);
const boardData = boardSnap.data();

// 게시글 정보
const userName = boardData.userName;
const userId = boardData.userId;
const title = boardData.title;
const regDate = boardData.regDate;
const contentsHtml = boardData.contentsHtml;
const contentsMK = boardData.contentsMK;

// viewer 가져오기
const { Editor } = toastui;

const view = Editor.factory({
  el: document.querySelector("#viewer"),
  viewer: true,
  height: "auto",
  initialValue: contentsHtml,
  theme: "dark",
});
