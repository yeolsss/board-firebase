import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const db = getFirestore(app);

const addBoard = document.querySelector("#add_board");
const getBoard = document.querySelector("#get_board");

addBoard.addEventListener("click", (event) => {
  event.preventDefault();
  createBoard();
});

getBoard.addEventListener("click", (event) => {
  event.preventDefault();
  fnGetBoard();
});

const createBoard = async () => {
  await setDoc(doc(boardRef, `${Date.now()}`), {
    id: 12345,
    contents: "asdkfjasldkjfasldk",
  })
    .then((refDoc) => {
      console.log(refDoc);
    })
    .catch((error) => {
      console.error(error);
    });
};

const fnGetBoard = async () => {};
