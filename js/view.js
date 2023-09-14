// firebase 연결
import { app } from "./firebase.js";
import {
  getDoc,
  doc,
  getFirestore,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// url에 get parameter 가져오기
const originUrl = window.location.origin;
const getUrl = new URL(window.location);
const docId = getUrl.searchParams.get("doc_id");
if (docId === null || docId === undefined) {
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
const regDate = boardData.regDate;
const contentsHtml = boardData.contentsHtml;
const contentsMK = boardData.contentsMK;

// tags
const tagUserId = document.querySelector("#user_id");
const tagUserName = document.querySelector("#user_name");
const tagTitle = document.querySelector("#title");
const tagRegDate = document.querySelector("#reg_date");
const homeBtn = document.querySelector("#home_btn");
const updatePromptOpenBtn = document.querySelector("#update_prompt_open");
const updatePromptCloseBtn = document.querySelector("#update_prompt_close");
const updatePrompt = document.querySelector("#update_prompt");
const updateConfirm = document.querySelector("#update-confirm");
const updatePassword = document.querySelector("#view_password");
const deletePromptOpenBtn = document.querySelector("#delete_prompt_open");
const deletePromptCloseBtn = document.querySelector("#delete_prompt_close");
const deletePrompt = document.querySelector("#delete_prompt");
const deleteConfirm = document.querySelector("#delete-confirm");
const deletePassword = document.querySelector("#delete_view_password");

// 게시글 tag에 data 파싱
tagUserId.value = userId;
tagUserName.innerText = userName;
tagTitle.innerText = title;
tagRegDate.innerText = regDate;

// viewer 가져오기
const { Editor } = toastui;

const view = Editor.factory({
  el: document.querySelector("#viewer"),
  viewer: true,
  height: "auto",
  initialValue: contentsHtml,
  theme: "dark",
});

// logo(?) click
homeBtn.addEventListener("click", () => {
  location.href = `${originUrl}/board-firebase/index.html`;
});

// update prompt open btn click
updatePromptOpenBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updatePrompt.classList.remove("hidden");
});

// update prompt close btn click
updatePromptCloseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updatePrompt.classList.add("hidden");
  updatePassword.value = "";
});

// update confirm btn click
updateConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  // firebase password 가져오기
  const dbPassword = boardData.password;
  //입력받은 password sha256 암호화
  if (sha256(updatePassword.value) === dbPassword) {
    // docId를 get방식으로 update로 넘기기
    location.href = originUrl + "/board-firebase/update.html?doc_id=" + docId;
  } else {
    // 비번 틀렸다는 alert 띄우기
    alert("비밀번호가 다릅니다. \n 확인해주세요.");
    updatePassword.value = "";
    updatePassword.focus();
  }
});

// 삭제 부분
// delete prompt open btn click
deletePromptOpenBtn.addEventListener("click", (event) => {
  event.preventDefault();
  deletePrompt.classList.remove("hidden");
});

// delete prompt close btn click
deletePromptCloseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  deletePrompt.classList.add("hidden");
  deletePassword.value = "";
});

// delete confirm btn click
deleteConfirm.addEventListener("click", async (event) => {
  event.preventDefault();
  // 삭제 처리
  // firebase password 가져오기
  const dbPassword = boardData.password;

  //입력받은 password sha256 암호화
  if (sha256(deletePassword.value) === dbPassword) {
    // docId를 get방식으로 update로 넘기기
    try {
      await deleteDoc(boardRef);
      if (confirm("삭제가 완료되었습니다."))
        location.href = originUrl + "/board-firebase/index.html";
    } catch (e) {
      console.error(e);
    }
  } else {
    // 비번 틀렸다는 alert 띄우기
    alert("비밀번호가 다릅니다. \n 확인해주세요.");
    deletePassword.value = "";
    deletePassword.focus();
  }
});
