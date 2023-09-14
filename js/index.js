const currentUrl = window.location;
const originUrl = currentUrl.origin;
const writeUrl = `${originUrl}/board-firebase/write.html`;

const writeBtn = document.querySelector("#write_board > a");
writeBtn.addEventListener("click", () => {
  location.href = writeUrl;
});

// homebtn
const homeBtn = document.querySelector("#home_btn");
homeBtn.addEventListener("click", () => {
  location.href = `${originUrl}/board-firebase/index.html`;
});
