ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.kitty',
    'game.entities.kittyOrange',
    'game.entities.kittyWhite',
    'game.entities.kittyPink',
    'game.entities.pointer',

    'game.levels.Choose',
    'game.levels.0'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
    followY: false,
    buttonBeingPressed: false,
    currentLevel: null,
    currentLevelNumber: 0,
    energy: 1000,

    flow: [
        ['levelchoose',LevelChoose],
        ['level',Level0],
    ],

    flowPosition: -1,

	init: function() {
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.SPACE, 'spacebar');
        this.nextLevel();
	},

    loadLevel: function(level) {
        if (level !== this.currentLevel) {
            this.currentLevelNumber++;
        }
        this.currentLevel = level;
        this.parent(level);
        ig.game.spawnEntity(EntityPointer,0,0);
    },

	update: function() {
		this.parent();
        this.handleCameraMovement();
	},
    
    handleCameraMovement: function() {
        if (this.getPlayer().pos.y < ig.system.height / 2) {
            ig.game.screen.y = this.getPlayer().pos.y - ig.system.height / 2;
        }
    },
	
	draw: function() {
		this.parent();
	},

    getPlayer: function() {
        var player = ig.game.getEntitiesByType('EntityKitty')[0];
        return player;
    },

    nextLevel: function() {
        this.flowPosition++;
        this.buttonBeingPressed = false;
        var flow = this.flow[this.flowPosition];
        var type = flow[0];
        var level = flow[1];
        if (type == "level") {
            this.loadLevel(level);
            this.spawnPlayer();
            this.spawnOpponent();
            this.choose = false;
        } else if (type == "levelchoose") {
            this.loadLevel(level)
            this.choose = true;
        }else if (type == "YouWin!") {
            alert("you win!");
        }
    },

    spawnPlayer: function() {
        var player = ig.game.spawnEntity(this.kitty.classType,384,448);
    },

    spawnOpponent: function() {
        var opponent = ig.game.spawnEntity(EntityKittyWhite,576,448);
        opponent.ai = true;
    },

    selectKitty: function(kitty) {
        this.kitty = kitty;
        this.nextLevel();
    }

});

ig.main('#canvas', MyGame, 60, 960, 640, 1 );

});
