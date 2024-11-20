const cardsContainer = document.querySelector(".cards");
const colors =["crimson", "turquoise", "limegreen", "royalblue", "goldenrod", "magenta", "lavender", "coral"];
const colorsPicklist =[...colors, ...colors];
const cardCount=colorsPicklist.length;


let revealedCount=0;
let activeCard=null;
let awaitingEndOfMove = false;


function buildCard(color){
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", ()=>{
        const revealed = element.getAttribute("data-revealed");

        if(awaitingEndOfMove || revealed==="true" || element===activeCard){
            return;
        }

        element.style.backgroundColor = color; //inline css to individual card

        if(!activeCard){
            activeCard=element;
            return;
        }

        const colorToMatch = activeCard.getAttribute("data-color");

        if(colorToMatch===color){
            activeCard.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed","true");

            activeCard=null;
            awaitingEndOfMove=false;
            revealedCount+=2;

            if(revealedCount===cardCount){
                alert("You win! Refresh to play again.");
            }
            return;
        }

        awaitingEndOfMove= true;
        setTimeout(()=>{
            element.style.backgroundColor=null;
            activeCard.style.backgroundColor=null;

            awaitingEndOfMove=false;
            activeCard=null;
        },1000)
    });

    return element;
}

//making cards
for(let i=0; i<cardCount; i++){
    const randomIndex = Math.floor(Math.random()*colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const card = buildCard(color);

    colorsPicklist.splice(randomIndex, 1)
    cardsContainer.appendChild(card);
}