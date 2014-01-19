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

        animSheet: new ig.AnimationSheet('media/img/energy_bar_60_450.png', 60, 450),
        
        update: function() {
            this.parent();
        },

        draw: function() {
            this.drawProgressBar();
            this.drawBackgroundImage();
        },

        drawProgressBar: function() {
            var width = 23;
            var energyPercent = ig.game.energy/this.total;
            var height = -385*energyPercent;
            if (height > 0) {
                height = 0;
            };
            ig.system.context.fillStyle = "#70f26d";
            ig.system.context.fillRect(140,444,23,height);
        },

        drawBackgroundImage: function() {
            this.currentAnim.draw(130,50);
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
            this.addAnim('default',1,[0]);
        }

    })
});

