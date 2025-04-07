let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","blue","skyBlue"];

let started = false;
let level =0;

let h2 = document.querySelector("h2");

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", () => {
    if(started==false){
        console.log("game is started");
        started = true;
        startBtn.style.display = "none";
        restartBtn.style.display = "inline-block";
        levelUp();
    }
});
restartBtn.addEventListener("click", () => {
    reset();
    h2.innerText = "To Start The Game! Press Start";
    startBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx =Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp ,1000); 
        }
    }else{
        h2.innerHTML=`<p style="text-align: center;"> Game Over! Your Score was <b>${level}</p>`;
        console.log("Game Over!");
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();    
    }
}

function btnPress(){
    let btn= this;
    userFlash(btn);

   let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level=0;
}