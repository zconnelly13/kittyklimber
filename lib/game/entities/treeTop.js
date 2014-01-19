ig.module(
    'game.entities.treeTop'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityTreeTop = ig.Entity.extend({
        size: {x:416, y:100},
        collides: ig.Entity.COLLIDES.NONE,
        zIndex: 100,
        gravityFactor: 0,
        maxVel: {x:0, y:0},

        //animSheet: new ig.AnimationSheet('media/img/space_bar_700_200.png', 700, 200),
        
        update: function() {
            this.checkFinish();
            this.parent();
        },

        checkFinish: function() {
            var kittys = ig.game.getEntitiesByType(EntityKitty);
            for (var i=0;i<kittys.length;i++) {
                var kitty = kittys[i];
                if (this.touches(kitty)) {
                    this.finish();
                }
            }
        },

        draw: function() {
            ig.system.context.fillStyle = "black";
            ig.system.context.fillRect(this.pos.x-ig.game.screen.x,this.pos.y-ig.game.screen.y,416,100);
        },

        finish: function() {
            alert("you win!");
            ig.system.stopRunLoop.call(ig.system);
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
        }

    })
});
