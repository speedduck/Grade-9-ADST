$(function(){
	alert("This is an animated sprite movement test.\nUse arrow keys to move the character and spacebar to change skins.");
	var playerDiv = $('#player');
	var playerSprites = ['bandit', 'skeleton', 'terranite'];
	var currentSprite = 0;
	var playerX = 100;
	var playerY = 100;
	var standing = true;
	var walkOffset = 0;
	var turnOffset = 0;

	function walk(event){
		if(standing){
			walkOffset = 0;
			playerDiv.css({'background-position-x':-64*(walkOffset)+'px'});
		}
		else {
			playerDiv.css({'background-position-x':-64*(walkOffset+1)+'px'});
			walkOffset = (walkOffset + 1)%6;
		}
	}
	
	function turn(event){
		playerDiv.css({'background-position-y':-128*(turnOffset)+'px'});
	}
	
	function movePlayer(event) {
		standing = true;
		switch(event.which){
			case 32:
				playerDiv.removeClass('sprite-'+playerSprites[currentSprite]);
				currentSprite = (currentSprite + 1)%3;
				playerDiv.addClass('sprite-'+playerSprites[currentSprite]);
				break;
			case 37:
				if(turnOffset==1){
					standing = false;
					playerX -= 2;
					playerDiv.css({left:playerX+'px'});
				}
				else turnOffset = 1;
				break;
			case 38:
				if(turnOffset==2){
					standing = false;
					playerY -= 2;
					playerDiv.css({top:playerY+'px'});
				}
				else turnOffset = 2;
				break;
			case 39:
				if(turnOffset==3){
					standing = false;
					playerX += 2;
					playerDiv.css({left:playerX+'px'});
				}
				else turnOffset = 3;
				break;
			case 40:
				if(turnOffset==0){
					standing = false;
					playerY += 2;
					playerDiv.css({top:playerY+'px'});
				}
				else turnOffset = 0;
				break;
			console.log(event.which);
		}
	}
	
	$('body').on('keydown', movePlayer);
	$('body').on('keydown', turn);
	$('body').on('keydown', walk);
});
