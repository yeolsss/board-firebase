// firebase 연결
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const db = getFirestore(app);

const boardRef = collection(db, "board");

// editor 생성
const { Editor } = toastui;

const editor = new Editor({
  el: document.querySelector("#editor"),
  previewStyle: "vertical",
  height: "80rem",
  theme: "dark",
});

// 날짜 만들기
const getDate = () => {
  let today = new Date();

  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  let date = String(today.getDate()).padStart(2, "0"); // 날짜
  return `${year}.${month}.${date}`;
};

// 글쓰기 object 생성
const write = {
  userId: "",
  userName: "",
  password: "",
  title: "",
  contentsMK: "",
  contentsHtml: "",
  regDate: "",
};

// 필요 변수 선언
const userId = document.querySelector("#user_id");
const userName = document.querySelector("#user_name");
const userPassword = document.querySelector("#user_password");
const contentTitle = document.querySelector("#content_title");
const contents = "";

const testBtn = document.querySelector("#submit_btn");
testBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  // form data 가져오기
  write.userId = userId.value;
  write.userName = userName.value;
  write.password = sha256(userPassword.value);
  write.title = contentTitle.value;
  write.contentsMK = editor.getMarkdown();
  write.contentsHtml = editor.getHTML();
  write.regDate = getDate();

  const docId = Date.now();

  await setDoc(doc(boardRef, `${docId}`), write)
    .then((refDoc) => {
      // 등록완료
      location.href = `../viewer.html?doc_id=${docId}`;
    })
    .catch((error) => {
      console.error(error);
    });
});
