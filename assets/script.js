let UserPick;
let symbols = ['rock', 'paper', 'scissors'];
let HousePick = symbols[Math.floor(Math.random() * symbols.length)]
let score;

document.getElementById("scoreSpan").innerHTML = localStorage.getItem("score");

document.getElementById("reset-button").addEventListener("click", () => {
  localStorage.setItem("score", 0);
  location.reload();
})

document.getElementById("play-again-button").addEventListener("click", () => location.reload())

let getUserPick = () => {
  document.querySelectorAll('.symbol').forEach(symbol => {
    symbol.addEventListener('click', (e) => {
      UserPick = e.path[1].id
      startGame(UserPick)
    })
  })
}

let displayNot = (id) => document.getElementById(id).classList.add("display-not")
let display = (id) => document.getElementById(id).classList.remove("display-not")

let displayUserPick = (symbol) => {
  document.getElementById("userPickSymbol").src = `assets/images/icon-${symbol}.svg`
  document.getElementById("userPickContainer").classList.add(symbol)
}

let displayHousePick = () => {
  displayNot("countdown")
  display("HousePickSymbol")
  document.getElementById("housePickContainer").classList.remove("empty-symbol")
  document.getElementById("housePickContainer").classList.add(HousePick)
  document.getElementById("HousePickSymbol").src = `assets/images/icon-${HousePick}.svg`
}

let whoWin = (userPick, housePick) => {
  if(userPick == housePick) return "equal"
  else if(userPick == "paper" && housePick == "rock") return "win"
  else if(userPick == "paper" && housePick == "scissors") return "lost"
  else if(userPick == "rock" && housePick == "scissors") return "win"
  else if(userPick == "rock" && housePick == "paper") return "lost"
  else if(userPick == "scissors" && housePick == "paper") return "win"
  else if(userPick == "scissors" && housePick == "rock") return "lost"
}

let IncreaseScore = (status) => {
  if(score === undefined) score = 0;
  if(status == "win") {
    score = parseInt(localStorage.getItem("score")) + 1;
    localStorage.setItem("score", score);
  }else {
    score = parseInt(localStorage.getItem("score"))
  }
  
}

let DisplayWhoWin = () => {
  let content;
  if(whoWin(UserPick, HousePick) == "equal" || whoWin(UserPick, HousePick) == "lost"){
    content = "No luck this time!"
  }else {
    content = "You Won!"
  }
  IncreaseScore(whoWin(UserPick, HousePick))
  document.getElementById("whoWon").innerHTML = content
  setTimeout(() => {
    document.getElementById("userPickContainer").classList.add("step-two-left-open")
    document.getElementById("housePickContainer").classList.add("step-two-right-open")
    document.getElementById("whoWonContainer").classList.remove("display-not")
  }, 1000);
  setTimeout(() => {
    document.getElementById("whoWonContainer").style.animationName = "whoWon"
    document.getElementById("scoreSpan").innerHTML = localStorage.getItem("score");
  }, 1100);
}


let startGame = (symbol) => {
  displayNot("step-one")
  display("step-two")
  displayUserPick(symbol)
  setTimeout(() => {
    displayHousePick()
  }, 500);
  DisplayWhoWin()


  
}

getUserPick()


