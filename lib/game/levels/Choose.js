ig.module( 'game.levels.Choose' )
.requires( 'impact.image','game.entities.kitty' )
.defines(function(){
LevelChoose=/*JSON[*/{"entities":[{"type":"EntityKitty","x":448,"y":280,"settings":{"choose":"true"}},{"type":"EntityKitty","x":248,"y":280,"settings":{"choose":"true"}},{"type":"EntityKitty","x":648,"y":272,"settings":{"choose":"true"}}],"layer":[{"name":"background","width":3,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/img/background_640_320.png","repeat":true,"preRender":true,"distance":"1","tilesize":320,"foreground":false,"data":[[1,2,1],[1,2,1],[1,2,1]]}]}/*]JSON*/;
LevelChooseResources=[new ig.Image('media/img/background_640_320.png')];
});