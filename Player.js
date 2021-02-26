class Player {
  constructor(){
    //index means number = (player1 , player2)
    this.index = null;
    this.distance = 0;
    this.name = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "playerinfo/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }
  //static function means which are called by class themselves rather than by object of class
  //class name.function name
  static getPlayerInfo(){
    var playerInfoRef = database.ref('playerinfo');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
