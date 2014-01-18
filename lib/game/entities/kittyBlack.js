ig.module(
    'game.entities.kittyBlack'
)
.requires(
    'game.entities.kitty'
)
.defines(function() {

    EntityKittyBlack = EntityKitty.extend({
        animSheet: new ig.AnimationSheet('media/img/kitty_black_37_112.png', 37, 112),
        classType: 'EntityKittyBlack',
    })
});

