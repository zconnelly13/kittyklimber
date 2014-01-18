ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.kitty',

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

    flow: [
        ['level',LevelChoose],
        ['level',Level0],
    ],

    flowPosition: -1,

	init: function() {
        ig.input.bind(ig.KEY.SPACE, 'spacebar');
        this.nextLevel();
	},

    loadLevel: function(level) {
        if (level !== this.currentLevel) {
            this.currentLevelNumber++;
        }
        this.currentLevel = level;
        this.parent(level);
    },

	update: function() {
		this.parent();
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
        } else if (type == "YouWin!") {
            alert("you win!");
        }
    }

});

ig.main('#canvas', MyGame, 60, 960, 640, 1 );

});
