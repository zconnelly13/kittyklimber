ig.module(
    'game.entities.kittyWhite'
)
.requires(
    'game.entities.kitty'
)
.defines(function() {

    EntityKittyWhite = EntityKitty.extend({
        animSheet: new ig.AnimationSheet('media/img/kitty_white_37_112.png', 37, 112),
        classType: 'EntityKittyWhite',
    })
});

