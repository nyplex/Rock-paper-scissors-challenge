let UserPick;
let HousePick;

let getUserPick = () => {
  document.querySelectorAll('.symbol').forEach(symbol => {
    symbol.addEventListener('click', (e) => {
      UserPick = e.path[1].id
      startGame(UserPick)
    })
  })
}

//get House Pick function

let displayNot = (id) => document.getElementById(id).classList.add("display-not")
let display = (id) => document.getElementById(id).classList.remove("display-not")

let displayUserPick = (symbol) => {
  document.getElementById("userPickSymbol").src = `assets/images/icon-${symbol}.svg`
  document.getElementById("userPickContainer").classList.add(symbol)
}

let displayHousePick = (symbol) => {
  symbol = "rock"
  displayNot("countdown")
  display("HousePickSymbol")
  document.getElementById("housePickContainer").classList.remove("empty-symbol")
  document.getElementById("housePickContainer").classList.add(symbol)
  document.getElementById("HousePickSymbol").src = `assets/images/icon-${symbol}.svg`
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


let startGame = (symbol) => {
  // 1- check symbol 
  // 2- Remove step 1 content and display step 2 in index.html
  displayNot("step-one")
  display("step-two")
  displayUserPick(symbol)
  //when countdown finished display the house pick
  countdown(3)
  setTimeout(() => {
    displayHousePick()
  }, 3300);

  
}

getUserPick()


