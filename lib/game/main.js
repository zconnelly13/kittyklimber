ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.kitty',
    'game.entities.kittyOrange',
    'game.entities.kittyWhite',
    'game.entities.kittyBlack',
    'game.entities.kittyPink',
    'game.entities.branch',
    'game.entities.pointer',
    'game.entities.treeTop',
    'game.entities.spaceBar',

    'game.levels.Choose',
    'game.levels.0'
)
.defines(function(){

MyGame = ig.Game.extend({
	
    font: new ig.Font('media/fonts/pink_30.font.png'),
    followY: false,
    currentLevel: null,
    currentLevelNumber: 0,
    energy: 1000,
    time: 0,

    flow: [
        ['levelchoose',LevelChoose],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0],
        ['level',Level0] // Level 10
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

    spawnTreeTop: function(level) {
        var x = 324;
        var y = -2000-(2000*level+(Math.random()*300));
        //var y = -300*level;
        ig.game.spawnEntity(EntityTreeTop,x,y);
    },

    spawnBranches: function(level) {
        var currentY = -800;
        var leftX = 324;
        var rightX = 528;
        for(var i=0;i<level+10;i++) {
            currentY -= 800+Math.random()*350;
            ig.game.spawnEntity(EntityBranch,leftX,currentY);
            ig.game.spawnEntity(EntityBranch,rightX,currentY);
        }
    },

	update: function() {
        this.time++;
		this.parent();
        this.handleCameraMovement();
	},
    
    handleCameraMovement: function() {
        if (this.getPlayer().pos.y < ig.system.height / 2) {
            ig.game.screen.y = this.getPlayer().pos.y - ig.system.height / 2;
        }
    },
	
	draw: function() {
        var x = ig.system.width/2;
        var y = ig.system.height/2;
		this.parent();
        if (this.time < 80 && this.currentLevelNumber >= 2) {
            this.font.draw('Level ' + (this.currentLevelNumber-1), x, y, ig.Font.ALIGN.CENTER );
        }
	},

    getPlayer: function() {
        var player = ig.game.getEntitiesByType('EntityKitty')[0];
        return player;
    },

    nextLevel: function() {
        this.flowPosition++;
        var flow = this.flow[this.flowPosition];
        var type = flow[0];
        var level = flow[1];
        if (type == "level") {
            this.loadLevel(level);
            ig.input.bind(ig.KEY.MOUSE1, 'spacebar');
            if (this.currentLevelNumber == 2) {
                this.spawnSpaceBar();
            }
            this.spawnPlayer();
            this.spawnOpponent();
            this.resetEnergy();
            this.time = 0;
            if (this.currentLevelNumber >= 2) {
                this.spawnTreeTop(this.currentLevelNumber);
                this.spawnBranches(this.currentLevelNumber);
            }
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
        var opponent = ig.game.spawnEntity(EntityKittyBlack,576,448);
        opponent.ai = true;
    },

    selectKitty: function(kitty) {
        this.kitty = kitty;
        this.nextLevel();
    },

    finish: function(kitty) {
        if (kitty.classType == "EntityKittyBlack") {
            this.failLevel();
        } else {
            this.winLevel();
        }
    },

    failLevel: function() {
        //this.displayScoreScreen();
        this.currentLevelNumber--;
        this.nextLevel();
    },

    winLevel: function() {
        //this.displayScoreScreen();
        this.nextLevel();
    },

    displayScoreScreen: function() {
    },

    resetEnergy: function() {
        this.energy = 1000;
    },

    spawnSpaceBar: function() {
        ig.game.spawnEntity(EntitySpaceBar,0,0);
    }

});

ig.main('#canvas', MyGame, 60, 960, 640, 1 );

});
