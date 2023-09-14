// firebase 연결
import { app } from "./firebase.js";
import {
  getDoc,
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// url에 get parameter 가져오기
const originUrl = window.location.origin;
const getUrl = new URL(window.location);
const docId = getUrl.searchParams.get("doc_id");
if (docId === null || docId === undefined || docId === "") {
  alert("잘 못된 접근입니다.");
  location.href = originUrl + "/board-firebase/index.html";
}

const db = getFirestore(app);
const boardRef = doc(db, "board", docId);
const boardSnap = await getDoc(boardRef);
const boardData = boardSnap.data();
// 게시글 정보
const userName = boardData.userName;
const userId = boardData.userId;
const title = boardData.title;
const userPassword = boardData.password;
const contentsMK = boardData.contentsMK;
const regDate = boardData.regDate;

// tags
const tagUserId = document.querySelector("#user_id");
const tagUserName = document.querySelector("#user_name");
const tagTitle = document.querySelector("#content_title");
const homeBtn = document.querySelector("#home_btn");

// 게시글 tag에 data 파싱
tagUserId.value = userId;
tagUserName.value = userName;
tagTitle.value = title;

// editor 가져오기
const { Editor } = toastui;
const editor = new Editor({
  el: document.querySelector("#editor"),
  previewStyle: "vertical",
  initialValue: contentsMK,
  height: "80rem",
  theme: "dark",
});

// home 화면으로 돌아가기 버튼
homeBtn.addEventListener("click", () => {
  location.href = `${originUrl}/board-firebase/index.html`;
});

// 글 수정 object
const update = {
  userId: "",
  userName: "",
  password: "",
  title: "",
  contentsMK: "",
  contentsHtml: "",
  regDate: "",
  updateDate: "",
};

// 현재 날짜 함수
const getDate = () => {
  let today = new Date();

  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  let date = String(today.getDate()).padStart(2, "0"); // 날짜
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

// firebase update
const submitBtn = document.querySelector("#submit_btn");
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  // form data 가져오기
  update.userId = tagUserId.value;
  update.userName = tagUserName.value;
  update.password = userPassword;
  update.title = tagTitle.value;
  update.contentsMK = editor.getMarkdown();
  update.contentsHtml = editor.getHTML();
  update.regDate = regDate;
  update.updateDate = getDate();

  await setDoc(boardRef, update)
    .then((refDoc) => {
      // 등록완료
      location.href = `${originUrl}/board-firebase/view.html?doc_id=${docId}`;
    })
    .catch((error) => {
      console.error(error);
    });
});
