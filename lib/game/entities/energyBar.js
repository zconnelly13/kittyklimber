ig.module(
    'game.entities.energyBar'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityEnergyBar = ig.Entity.extend({
        size: {x:200, y:60},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 100,
        padding: 5,
        total: 1000,

        gravityFactor: 0,

        maxVel: {x:0, y:0},
        
        update: function() {
            this.parent();
        },

        draw: function() {
            this.drawBackgroundBar();
            this.drawForegroundBar();
            this.parent();
        },

        drawBackgroundBar: function() {
            ig.system.context.fillStyle = "black";
            ig.system.context.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        },

        drawForegroundBar: function() {
            var energyPercent = ig.game.energy/this.total;
            var length = (this.size.x - this.padding*2)*energyPercent;
            var height = this.size.y-(2*this.padding);
            ig.system.context.fillStyle = "white";
            ig.system.context.fillRect(this.pos.x + this.padding,this.pos.y + this.padding,length,height);
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
        }

    })
});

