$(function(){
	alert("This is a movement test with a sprite.\nThe sprite will turn to face the direction it moves, but it isn't using the walk animation yet.\nUse arrow keys to move the character around.");
	var playerDiv = $('#player');
	var playerX = 100;
	var playerY = 100;
	var walkOffset = 0;
	var turnOffset = 0;

	function walk(){
		playerDiv.css({'background-position-x':-64*(walkOffset+1)+'px'});
		walkOffset = (walkOffset + 1)%6;
	}
	
	function turn(){
		playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
		turnOffset = (turnOffset + 1)%4;
	}
	
	function movePlayer(event) {
		switch(event.which){
			case 37:
				if(turnOffset==1){
					playerX -= 10;
					playerDiv.css({left:playerX+'px'});
				}
				else{
					turnOffset = 1;
					playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
				}
				break;
			case 38:
				if(turnOffset==2){
					playerY -= 10;
					playerDiv.css({top:playerY+'px'});
				}
				else{
					turnOffset = 2;
					playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
				}
				break;
			case 39:
				if(turnOffset==3){
					playerX += 10;
					playerDiv.css({left:playerX+'px'});
				}
				else{
					turnOffset = 3;
					playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
				};
				break;
			case 40:
				if(turnOffset==0){
					playerY += 10;
					playerDiv.css({top:playerY+'px'});
				}
				else{
					turnOffset = 0;
					playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
				};
				break;
			console.log(event.which);
		}
	}
	
	$('body').on('keydown', movePlayer);
});
