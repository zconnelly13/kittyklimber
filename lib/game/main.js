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
    'game.entities.kittyPreOrder',
    'game.entities.branch',
    'game.entities.pointer',
    'game.entities.treeTop',
    'game.entities.spaceBar',

    'game.levels.Choose',
    'game.levels.0'
)
.defines(function(){

MyGame = ig.Game.extend({
	
    font: new ig.Font('media/fonts/white_pink_stroke_60.font.png'),
    followY: false,
    currentLevelNumber: 0,
    energy: 1000,
    time: 0,

    branches: [],

    cameraMovement: true,

    tryAgainTime: 0,
    drawTryAgain: false,

    youWinTime: 0,
    drawYouWin: false,

    flow: [
        ['levelchoose',LevelChoose],
        ['level',Level0],
        ['level',Level0]
    ],

    flowPosition: -1,

	init: function() {
        if (ig.ua.iOS) {
            this.font = new ig.Font('media/fonts/white_pink_stroke_60_iOS.font.png');
        }
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.SPACE, 'spacebar');
        this.nextLevel();
	},

    loadLevel: function(level) {
        this.currentLevelNumber++;
        this.parent(level);
        ig.game.spawnEntity(EntityPointer,0,0);
    },

    spawnTreeTop: function(level) {
        var x = 0;
        var y = -2000-(2000*level+(Math.random()*300));
        ig.game.spawnEntity(EntityTreeTop,x,y);
    },

    calculateBranches:  function(level) {
        var currentY = -800;
        var leftX = 332;
        var rightX = 488;
        for(var i=0;i<(level+10)*20;i++) {
            currentY -= 800+Math.random()*350;
            this.branches.push([leftX,currentY]);
            this.branches.push([rightX,currentY]);
        }
    },

    spawnBranches: function(level) {
        var lowestBranch = this.branches[0];
        var kitty = this.getHighestKitty();
        if (kitty.pos.y - 640 < lowestBranch[1]) {
            var leftBranch = this.branches.shift();
            var rightBranch = this.branches.shift();
            ig.game.spawnEntity(EntityBranch,leftBranch[0],leftBranch[1]);
            ig.game.spawnEntity(EntityBranch,rightBranch[0],rightBranch[1]);
        }
    },

    getHighestKitty: function() {
        var kittys = ig.game.getEntitiesByType('EntityKitty');
        var highestKitty = kittys[0];
        var highest = kittys[0].pos.y;
        for(var i=0;i<kittys.length;i++) {
            var kitty = kittys[i];
            var posY = kitty.pos.y;
            if (posY < highest) {
                highest = posY + 0;
                highestKitty = kitty;
            }
        }
        return highestKitty;
    },

	update: function() {
        this.time++;
        if (this.branches.length !== 0) {
            this.spawnBranches();
        }
		this.parent();
        this.handleCameraMovement();
	},
    
    handleCameraMovement: function() {
        if (this.cameraMovement && this.getPlayer().pos.y < ig.system.height / 2) {
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
        if (this.drawTryAgain) {
            if (this.time < this.tryAgainTime + 150) {
                ig.system.context.fillStyle = "rgba(0,0,0,0.3";
                ig.system.context.fillRect(0,0,ig.system.width,ig.system.height);
                this.font.draw("Try Again",x, y, ig.Font.ALIGN.CENTER );
            } else {
                this.tryAgainTime = 0;
                this.drawTryAgain = false;
                this.cameraMovement = true;
                this.nextLevel();
            }
        }
        if (this.drawYouWin) {
            if (this.time < this.youWinTime + 150) {
                ig.system.context.fillStyle = "rgba(0,0,0,0.3";
                ig.system.context.fillRect(0,0,ig.system.width,ig.system.height);
                this.font.draw("You Win!",x, y, ig.Font.ALIGN.CENTER );
            } else {
                this.youWinTime = 0;
                this.drawYouWin = false;
                this.cameraMovement = true;
                this.nextLevel();
            }
        }
	},

    getPlayer: function() {
        var player = ig.game.getEntitiesByType('EntityKitty')[0];
        return player;
    },

    nextLevel: function() {
        this.flowPosition++;
        var flow = this.flow[this.flowPosition];
        if (undefined == flow) {
            var flow = this.flow[1];
        }
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
                this.branches = [];
                this.calculateBranches(this.currentLevelNumber);
            }
            this.choose = false;
            ig.game.sortEntitiesDeferred();
        } else if (type == "levelchoose") {
            this.loadLevel(level)
            this.choose = true;
            this.checkPreOrder();
        }else if (type == "YouWin!") {
            alert("you win!");
        }
    },

    checkPreOrder: function() {
        var href = window.location.href;
        if (href.indexOf("k=") < 0) {
            return false;
        } else {
            this.displayPreOrderCat();
        }
    },

    displayPreOrderCat: function() {
        var x = 848;
        var y = 272;
        var settings = {choose:'true'};
        ig.game.spawnEntity(EntityKittyPreOrder,x,y,settings);
    },

    spawnPlayer: function() {
        var player = ig.game.spawnEntity(this.kitty.classType,384,448);
    },

    spawnOpponent: function() {
        var opponent = ig.game.spawnEntity(EntityKittyBlack,540,448);
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
        this.currentLevelNumber--;
        this.displayTryAgain();
    },

    displayTryAgain: function() {
        this.cameraMovement = false;
        this.tryAgainTime = this.time + 0;
        this.drawTryAgain = true;
    },

    winLevel: function() {
        this.displayYouWin();
    },

    displayYouWin: function() {
        this.cameraMovement = false;
        this.youWinTime = this.time + 0;
        this.drawYouWin = true;
    },

    resetEnergy: function() {
        this.energy = 1000;
    },

    spawnSpaceBar: function() {
        ig.game.spawnEntity(EntitySpaceBar,0,0);
    }

});

var c = document.createElement('canvas');
c.id = 'canvas';
document.body.appendChild(c);

if (ig.ua.mobile) {
    ig.main('#canvas', MyGame, 5, 960, 640, 1 );
} else {
    ig.main('#canvas', MyGame, 60, 960, 640, 1 );
}

});
