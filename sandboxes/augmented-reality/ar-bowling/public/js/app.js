window.addEventListener('load', function(){ // on page load
    console.log("> page load");
    $('body').hammer().on('swipe', function(ev) {
        bowl(ev);
    });

    var body = document.querySelector('body'),
    scene = document.querySelector('a-scene'),
    ground = document.querySelector('#ground'),
    player = document.querySelector('#player');

    bowl = function(swipeObject){
    console.log("> input detected");
    var bowlStrength = 10;
        player.body.applyImpulse(
            /*impulse*/         new CANNON.Vec3(0, 0, -bowlStrength),
            /*world position*/  new CANNON.Vec3().copy(ground.getAttribute('position')) // TODO ensure impulse vector is applied through the Y axis only
        );
    }
}, false);