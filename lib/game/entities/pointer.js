ig.module(
    'game.entities.pointer'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityPointer = ig.Entity.extend({
        size: {x:175, y:175},
        pos: {x:0,y:0},
        collides: ig.Entity.COLLIDES.PASSIVE,
        zIndex: 100,

        gravityFactor: 0,

        maxVel: {x:0, y:0},
        
        update: function() {
            if (ig.input.pressed('click')) {
                this.pos.x = ig.input.mouse.x - (this.size.x/2);
                this.pos.y = ig.input.mouse.y - (this.size.y/2);
                this.checkClickKitty();
            }
            this.parent();
        },

        checkClickKitty: function() {
            var kittys = ig.game.getEntitiesByType(EntityKitty);
            for (var i=0;i<kittys.length;i++) {
                var kitty = kittys[i];
                if (this.touches(kitty)) {
                    ig.game.selectKitty(kitty);
                }
            }
        },

        draw: function() {
            /*
            ig.system.context.fillStyle = "red";
            ig.system.context.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
            */
            this.parent();
        },

        init: function(x,y,settings) {
            this.parent(x,y,settings);
        }

    })
});

