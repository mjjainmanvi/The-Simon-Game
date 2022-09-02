
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var gamestart=false;

var level=0;

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
    console.log(userClickedPattern.length-1);
  

})

$(document).keypress(function(){
    if(!gamestart){
        nextSequence();
        $("#level-title").text("Level "+level);
        gamestart=true;
    }
    
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    // console.log(randomChoosenColor);
    gamePattern.push(randomChoosenColor);
    // console.log(gamePattern);
   $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosenColor);
   
              
}
// select all elemments with class btn
function playSound(name){
    var audio1=new Audio('sounds/'+name+'.mp3');
    audio1.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){
       $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

       
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
}
else{
    // console.log("fail");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    $("#level-title").text("Game over,press any key to restart");
    restart();

} 
}
function restart(){
    level=0;
    gamePattern=[];
    gamestart=false;
}