// firebase 연결
import { app } from "./firebase.js";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
  getCountFromServer,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const db = getFirestore(app);

const boardRef = collection(db, "board");
const boardQuery = query(boardRef, orderBy("regDate", "desc"));
const docSnapshots = await getDocs(boardQuery);
const boardList = document.querySelector("#board-list");

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

/*await getDocs(boardQuery).then((refDoc) => {
  refDoc.forEach((item, index) => {
    console.log(item.data(), index);
  });
});
const lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1];
console.log("last", lastVisible);

*/

const writeBtn = document.querySelector("#write_board > a");
writeBtn.addEventListener("click", () => {
  location.href = writeUrl;
});

// homebtn
const homeBtn = document.querySelector("#home_btn");
homeBtn.addEventListener("click", () => {
  location.href = `${originUrl}/board-firebase/index.html`;
});
