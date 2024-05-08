let gameSeq=[];
let userSeq=[];

let btns=["green","yellow","red","blue"];

let h4=document.querySelector("h4"); 
let level=0;
let score=0;   
let started=false;
let highScore=0;
let p=document.createElement("p");
let container=document.querySelector(".box-container");

document.addEventListener("keypress",function()
{  
    if(started==false)
    {
        started=true;
        console.log("game started");
        setTimeout(()=>{
            levelUp();
        },500);
    }
})
function flashBtn(btn){
    btn.classList.add("flash");
    setTimeout(() => {
    btn.classList.remove("flash");
    }, 200);
}

function levelUp()
{
    document.querySelector(".heading").appendChild(p);
    p.innerText=`Highscore:${score}`;
    userSeq=[];
    level++;
    h4.innerText=`Level ${level}`;
    let randIndex=Math.floor(Math.random()*4);
    // console.log(randIndex);
    let randColor=btns[randIndex];
    let randBtn=document.querySelector(`.${randColor}`);
    console.log(randColor);
    flashBtn(randBtn);
    gameSeq.push(randColor);
}

function checkAns(idx)
{
    // let idx=level-1;
    if(gameSeq[idx]===userSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(() => {
                levelUp();
            }, 700);
            userSeq=[];
        }
    }
    else
    {
        score=level;
        if(score>highScore)
        {
            highScore=score;
        }
        h4.innerHTML=`Game Over!!!. Your Score Was <b>${score}</b>.<br>Please Enter Any Key To Restart`;
        gameOver();
        reset();
    }
}

function gameOver()
{
    container.classList.add("alert");
    setTimeout(() => {
        container.classList.remove("alert");
        }, 500);

}

function reset()
{
    started=false;
    gameSeq=[];
    // alert(`you scored ${score} points`);
    level=0;
}

function btnPress()
{
    let btn=this;
    flashBtn(btn);

    let userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    // console.log(userColor);
}

let boxs=document.querySelectorAll(".box");
for( box of boxs)
{
    box.addEventListener("click",btnPress);
}

let helpBtn=document.querySelector(".helpBtn");
let note=document.createElement("div");
note.innerHTML="<span><sup>*</sup>NOTE:</note:span><ul><li>After Starting Game Computer Will Give You A Random Color. </li><li>In each Level Computer Give You One Color</li><li>To Conquer Each Level You Have To Select Same Color Sequence From Starting.</li></ul>"
note.classList.add("note");
let flag=false;
helpBtn.addEventListener("click",function(){
    if(flag==false)
    {
        document.querySelector(".helpSector").appendChild(note);
        flag=true
    }
    else
    {
        document.querySelector(".helpSector").removeChild(note);
        flag=false;
    }
})
