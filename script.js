let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let boardBounds=board.getBoundingClientRect();
let ballcoord=ball.getBoundingClientRect();
let balltop=ballcoord.top;
let ballleft=ballcoord.left;
let x=true;
let y=true;
let leftLives=3;
let rightLives=3;
//user input listen
document.addEventListener("keydown" ,function(e){
    console.log(e);
    if(e.key=="w"){
    movePaddle(leftPaddle, -window.innerHeight*0.1);
    }
    else if(e.key=="s"){
        movePaddle(leftPaddle, window.innerHeight*0.1);
    }
    else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle, -window.innerHeight*0.1);
    }
    else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle, window.innerHeight*0.1);
    }
})

function movePaddle(cPaddle,change){
    let cPaddleBounds=cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change>=boardBounds.top && cPaddleBounds.bottom+change<=boardBounds.bottom)
    cPaddle.style.top=cPaddleBounds.top+change+"px";
}
function moveBall(){
    let ballcoord=ball.getBoundingClientRect();
    let ballTop=ballcoord.top;
    let ballLeft=ballcoord.left;
    let ballBottom=ballcoord.bottom;
    let ballRight=ballcoord.right;
    // is ball in bound
    // handle vertical bound

    function setColor(idx){
        let allicons=document.querySelectorAll(".fas.fa-circle");
        allicons[idx].style.color="#8e44ad";
    }

    let hasTouchedLeft=ballLeft<boardBounds.left;
    let hasTouchedRight=ballRight>boardBounds.right;
    if(hasTouchedLeft || hasTouchedRight)
    {
        if(hasTouchedLeft){
            leftLives--;
            setColor(leftLives);
            if(leftLives==0){
                alert("GAME OVER PLAYER 🅱 WON 💥💥");
                document.loaction.reload();
            }
            else{
                return resetgame();
            }
        }
        else{
            rightLives--;
            setColor(3+rightLives);
            if(rightLives==0){
                alert("GAME OVER PLAYER 🅰 WON 💥💥");
                document.location.reload();
            }
            else{
                return resetgame();
            }
        }
    }

    function resetgame(){
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall);
    }



    if(ballTop<=boardBounds.top||ballBottom>=boardBounds.bottom){
        //vertically outside
        y=!y;
    }
    //handle horizontal bound
    if(ballLeft<=boardBounds.left||ballRight>=boardBounds.right){
        // horizontally outside
       x=!x;
    }
    //*************collison*************** */
    let leftPaddleBounds=leftPaddle.getBoundingClientRect();
    let rightPaddleBounds=rightPaddle.getBoundingClientRect();
    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30>=leftPaddleBounds.top
        && ballBottom-30<=leftPaddleBounds.bottom){
            x=!x;
        }
        if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30>=rightPaddleBounds.top
            && ballBottom-30<=rightPaddleBounds.bottom){
                x=!x;
            }
            //*********************** */

    ball.style.top= y==true?ballTop+4+"px":ballTop-4+"px";
    ball.style.left= x==true?ballLeft+6+"px":ballLeft-6+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);