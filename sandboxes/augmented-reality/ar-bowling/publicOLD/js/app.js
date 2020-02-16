

window.addEventListener('load', function(){ // on page load
    
    console.log("> page load");

    var body = document.querySelector('body'),
    scene = document.querySelector('a-scene'),
    ground = document.querySelector('#ground'),
    player = document.querySelector('#player');

    //Creates hammer object
    var mc = new Hammer(body);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });    

    mc.on("swipe", function(ev) {
        bowl(ev);
    });

    //gets velocity of swipe (relative to screen)
    function swipeAxisHandler(ev){
        //var velocity = ev.gesture.velocity;
        var velocityX = ev.velocityX;
        var velocityY = ev.velocityY * 10;
        //console.log("velocity drag speed = " + velocity);
        return {
            x: velocityX,
            y: velocityY
        }
    }

    bowl = function(swipeObject){
        console.log("> input detected");
        var vel = swipeAxisHandler(swipeObject);
        console.log(vel.x);
        console.log(vel.y);
        
        console.log(player.getAttribute("velocity"));
        player.body.velocity.set(vel.x, 0, vel.y);
        console.log(player.getAttribute("velocity"));
    };
    
        // window.addEventListener("touchstart", bowl);
        
}, false);