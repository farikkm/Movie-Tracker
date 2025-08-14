let intervalId;
const title = document.querySelector("h1");

export function init() {
  let counter = 0;

  intervalId = setInterval(() => {
    console.log(counter++);
  }, 1000);

  title.addEventListener("click", () => {
    console.log("Title clicked");
  });
}

export function destroy() {
  clearInterval(intervalId);

  title.removeEventListener("click", onTitleClick);
}

function onTitleClick() {
  console.log("Title clicked");
}
