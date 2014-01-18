ig.module(
    'game.entities.kittyOrange'
)
.requires(
    'game.entities.kitty'
)
.defines(function() {

    EntityKittyOrange = EntityKitty.extend({
        animSheet: new ig.AnimationSheet('media/img/kitty_orange_37_112.png', 37, 112),
        classType: 'EntityKittyOrange',
    })
});

