let blackJackGame = {
    "you": {scoreSpan: "#your-blackjack-result", "div": "#your-cards", "score": 0},
    "dealer": {scoreSpan: "dealer-blackjack-result", "div": "#dealer-box", "score": 0},
    "cards":["2","3","4","5","6","7","8","9","10","J","K","Q","A"],
    "cardsMap": {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":10,"K":10,"Q":10,"A":[1,11]}
};

const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];

const hitSound = new Audio("./sounds/swish.m4a")

    
    
document.querySelector("#blackjack-hit-button").addEventListener("click", blackJackHit);
document.querySelector("#blackjack-deal-button").addEventListener("click", blackJackDeal);

function blackJackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU)
    showScore(YOU);
}

function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackJackGame["cards"][randomIndex];
}


function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("img");
        cardImage.src = `./images/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage).classList.add("card");
        hitSound.play();
    }
}


function blackJackDeal (){
    let yourImages = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
    
    for(i=0; i<yourImages.length; i++) {
        yourImages[i].remove();
    }

    for(i=0; i<dealerImages.length; i++) {
       dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

}

function updateScore(card, activePlayer) {
   if (card === "A") {
       //if AS
        if (activePlayer["score"] + blackJackGame["cardsMap"][card][1]<= 21){
            activePlayer["score"] +=blackJackGame["cardsMap"][card][1];
        } else {
            activePlayer["score"] +=blackJackGame["cardsMap"][card][0]
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
   
}

function showScore(activePlayer){
    if (activePlayer["score"] > 21){
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    }
        else {
            document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
        }
}
