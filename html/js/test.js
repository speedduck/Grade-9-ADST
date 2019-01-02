$(function(){
	alert("This is a movement test.\nUse arrow keys to move the blue square.");
	var playerDiv = $('#player');
	var playerX = 100;
	var playerY = 100;
	
	function movePlayer(event) {
		switch(event.which){
			case 37:
				playerX -= 10;
				playerDiv.css({left:playerX+'px'});
				break;
			case 38:
				playerY -= 10;
				playerDiv.css({top:playerY+'px'});
				break;
			case 39:
				playerX += 10;
				playerDiv.css({left:playerX+'px'});
				break;
			case 40:
				playerY += 10;
				playerDiv.css({top:playerY+'px'});
				break;
			console.log(event.which);
		}
	}
	
	$('body').on('keydown', movePlayer);
});
