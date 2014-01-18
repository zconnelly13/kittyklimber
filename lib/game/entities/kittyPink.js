ig.module(
    'game.entities.kittyPink'
)
.requires(
    'game.entities.kitty'
)
.defines(function() {

    EntityKittyPink = EntityKitty.extend({
        animSheet: new ig.AnimationSheet('media/img/kitty_pink_37_112.png', 37, 112),
        classType: 'EntityKittyPink',
    })
});

