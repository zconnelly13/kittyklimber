ig.module( 'game.levels.Choose' )
.requires( 'impact.image','game.entities.kittyWhite','game.entities.kittyOrange','game.entities.kittyPink' )
.defines(function(){
LevelChoose=/*JSON[*/{"entities":[{"type":"EntityKittyWhite","x":448,"y":272,"settings":{"choose":"true"}},{"type":"EntityKittyOrange","x":248,"y":272,"settings":{"choose":"true"}},{"type":"EntityKittyPink","x":648,"y":272,"settings":{"choose":"true"}}],"layer":[{"name":"background","width":3,"height":2,"linkWithCollision":false,"visible":1,"tilesetName":"media/img/background_960_640.png","repeat":true,"preRender":true,"distance":"1","tilesize":320,"foreground":false,"data":[[1,2,3],[4,5,6]]}]}/*]JSON*/;
LevelChooseResources=[new ig.Image('media/img/background_960_640.png')];
});