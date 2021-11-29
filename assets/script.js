let UserPick;
let symbols = ['rock', 'paper', 'scissors'];
let HousePick = symbols[Math.floor(Math.random() * symbols.length)]
let score = 0;



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

let countdown = (count) => {
  let timeleft = count
  setInterval(() => {
    if(timeleft < 0) {
      clearInterval(countdown)
    }else{
      document.getElementById("countdown").innerHTML = timeleft
      timeleft -= 1
    }
  }, 700)
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
  if(status == "win") score += 1
  return score
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
  }, 4000);
  setTimeout(() => {
    document.getElementById("whoWonContainer").style.animationName = "whoWon"
    document.getElementById("scoreSpan").innerHTML = score
  }, 4100);
}


let startGame = (symbol) => {
  displayNot("step-one")
  display("step-two")
  displayUserPick(symbol)
  countdown(3)
  setTimeout(() => {
    displayHousePick()
  }, 3300);
  DisplayWhoWin()


  
}

getUserPick()


