// firebase 연결
import { app } from "./firebase.js";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
  getCountFromServer,
  startAt,
  endAt,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const db = getFirestore(app);

const boardRef = collection(db, "board");
let boardQuery = query(boardRef, orderBy("regDate", "desc"));
const boardList = document.querySelector("#board-list");

// 검색어 확인
const searchInput = document.querySelector("#search_input");
const searchBtn = document.querySelector("#search_btn");

const getDoc = async (paramDocs) => {
  const getListDoc = await getDocs(paramDocs);
  createList(getListDoc);
};

const checkSearchKeyword = () => {
  const searchKeyword = searchInput.value;
  // 검색어가 없을때
  if (searchKeyword === "") {
    boardQuery = query(boardRef, orderBy("regDate", "desc"));
    getDoc(boardQuery);

    // 검색어가 있을때
  } else {
    boardQuery = query(
      boardRef,
      orderBy("title"),
      startAt(searchKeyword),
      endAt(searchKeyword + "\uf8ff"),
    );
    getDoc(boardQuery);
  }
};
// 처음 화면 로딩
checkSearchKeyword();

//검색 버튼 눌렀을 때
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  checkSearchKeyword();
});

const originUrl = window.location.origin;
const currentUrl = window.location;
const writeUrl = `${originUrl}/board-firebase/write.html`;

//board에 저장된 doc 총 갯수
const docCountOrigin = await getCountFromServer(boardRef);
let docCount = docCountOrigin.data().count;

/*
게시물 번호....................

총 갯수 :  docCount


*/
const createList = (docSnapshots) => {
  boardList.innerHTML = "";
  docSnapshots.forEach((contents) => {
    let content = document.createElement("div");
    content.innerHTML = `
  <div class="board-contents__main-contents">
          <div><span>${docCount--}.</span></div>
          <div>
            <a href="${originUrl}/board-firebase/view.html?doc_id=${
              contents.id
            }">
            ${contents.data().title}
            </a>
          </div>
          <div><span>${contents.data().regDate}</span></div>
          <div><span>${contents.data().userName}</span></div>
        </div>
  `;
    boardList.append(content);
  });
};

const writeBtn = document.querySelector("#write_board > a");
writeBtn.addEventListener("click", () => {
  location.href = writeUrl;
});

// homebtn
const homeBtn = document.querySelector("#home_btn");
homeBtn.addEventListener("click", () => {
  location.href = `${originUrl}/board-firebase/index.html`;
});
