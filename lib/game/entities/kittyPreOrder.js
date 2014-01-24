ig.module(
    'game.entities.kittyPreOrder'
)
.requires(
    'game.entities.kitty'
)
.defines(function() {

    EntityKittyPreOrder = EntityKitty.extend({
        animSheet: new ig.AnimationSheet('media/img/kitty_orange_37_112.png', 37, 112),
        classType: 'EntityKittyPreOrder',
    })
});

