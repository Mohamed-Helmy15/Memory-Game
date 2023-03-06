// main element
let wrong = document.querySelector(".title .wrong-num");
let right = document.querySelector(".title .right-num");
let time = document.querySelector(".title .time");
let playerName = document.querySelector(".title .name");
let boxes = document.querySelectorAll(".game-container .box");
let rightSound = new Audio("./sounds/Right Sound Effect.mp3");
let wrongSound = new Audio("./sounds/Error - Sound Effect (HD).mp3");
let failSound = new Audio("./sounds/Failure - Sound Effect [HD].mp3");
let winSound = new Audio("./sounds/Victory - Sound Effect.mp3");
let playersArray = [];
// main element

// start game button
let btnStart = document.querySelector(".overlay > div:first-child");
let btnReset = document.querySelector(".overlay > div:last-child");
btnStart.onclick = function () {
  let prom = prompt("Enter Your Name");
  if (prom != "" && prom != null) {
    playerName.innerHTML += prom;
    document.querySelector(".overlay").remove();
    timer();
  } else if (prom == "") {
    document.querySelector(".title .name").innerHTML = "Unkown";
    document.querySelector(".overlay").remove();
    timer();
  } else if (prom == null) {
  }
};
btnReset.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to Clear the history of the game",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, clear it!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.localStorage.clear();
    }
  });
};
// start game button

// customize game boxes
let randomArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

boxes.forEach((box) => {
  box.style.cssText = `order:${randomArray[Math.floor(Math.random() * 20)]};`;
});
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    box.classList.add("flipped");
    if (document.querySelectorAll(".flipped").length === 2) {
      addPointer();
      if (
        document.querySelectorAll(".flipped")[0].getAttribute("data-tec") ===
        document.querySelectorAll(".flipped")[1].getAttribute("data-tec")
      ) {
        right.innerHTML = +right.innerHTML + 1;
        if (right.innerHTML != boxes.length / 2) {
          rightSound.play();
        }
        boxes.forEach((box) => {
          box.classList.remove("pointer");
        });
        document.querySelectorAll(".flipped")[0].classList.add("matched");
        document.querySelectorAll(".flipped")[1].classList.add("matched");
        document.querySelectorAll(".matched").forEach((box) => {
          box.classList.add("pointer");
        });
        boxes.forEach((box) => {
          box.classList.remove("flipped");
        });
        if (right.innerHTML == boxes.length / 2) {
          winSound.play();
          addPointer();
          document.querySelector(".leader").style.display = "block";
        }
      } else {
        wrong.innerHTML = +wrong.innerHTML - 1;
        if (wrong.innerHTML != 0) {
          wrongSound.play();
        }
        if (wrong.innerHTML == 0) {
          failSound.play();
          addPointer();
          document.querySelector(".leader").style.display = "block";
        } else {
          boxes.forEach((box) => {
            setTimeout(() => {
              box.classList.remove("pointer");
              box.classList.remove("flipped");
            }, 500);
          });
        }
      }
    }
  });
});
// customize game boxes

// reset game
document.querySelector(".reset").onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to reload the page",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, reload it!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};
// reset game

// save players in localstorage
document.querySelector(".leader").style.display = "none";
let show = document.querySelector(".leader .show");
let clear = document.querySelector(".leader .clear");
show.onclick = function () {
  playersArray = [];
  if (window.localStorage.getItem("players")) {
    playersArray = JSON.parse(window.localStorage.getItem("players"));
  }
  let data = {
    name: playerName.innerHTML,
    score: `${((+right.innerHTML / 10) * 100).toFixed(2)}% in ${
      60 - +time.innerHTML
    } seconds`,
    stat: +right.innerHTML,
  };
  playersArray.push(data);
  window.localStorage.setItem("players", JSON.stringify(playersArray));
  playersArray.forEach((player) => {
    let div = document.createElement("div");
    div.className = "box";
    let fSpan = document.createElement("span");
    let sSSpan = document.createElement("span");
    fSpan.append(player.name);
    sSSpan.append(player.score);
    div.append(fSpan);
    div.append(sSSpan);
    document.querySelector(".leader .leader-player").append(div);
  });
};
clear.onclick = function () {
  window.localStorage.clear();
  document.querySelector(".leader .leader-player").style.display = "none";
};
// save players in localstorage

// functions
function addPointer() {
  boxes.forEach((box) => {
    box.classList.add("pointer");
  });
}

function timer() {
  let decrease = true;
  if (decrease == true) {
    let counter = setInterval(() => {
      time.innerHTML = +time.innerHTML - 1;
      if (+time.innerHTML === 0) {
        clearInterval(counter);
        addPointer();
        decrease = false;
        failSound.play();
        document.querySelector(".leader").style.display = "block";
      } else if (right.innerHTML == 10) {
        clearInterval(counter);
        addPointer();
        decrease = false;
      } else if (wrong.innerHTML == 0) {
        clearInterval(counter);
        addPointer();
        decrease = false;
      }
    }, 1000);
  }
}
// functions
