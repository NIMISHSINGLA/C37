class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      //.once means  it will se only one time what is happening
      if(playerCountRef.exists()){
        //.exists() means i will just check if thre is an value in databse or not
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    //hide input,button,greetings
    form.hidedetails();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
   //undefined means no value have been assigned
   //!== opposite of ==
    if(allPlayers !== undefined){
      var y  = 130;
      //used to access player,s name and distance seprately
      for(var plr in allPlayers){
        //all players is an array
        if (plr === "player" + player.index)
          fill("red");
        else
          fill("black");

        y +=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, y )
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
