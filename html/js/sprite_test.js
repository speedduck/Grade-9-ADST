$(function(){
	alert("This is a sprite animation test.\nThe sprite walks in place, rotates, and changes skins.");
	var playerDiv = $('#player1');
	var playerSprites = ['bandit', 'skeleton', 'terranite'];
	var currentSprite = 0;
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
	
	function spriteChange(){
		playerDiv.removeClass('sprite-'+playerSprites[currentSprite]);
		currentSprite = (currentSprite + 1)%3;
		playerDiv.addClass('sprite-'+playerSprites[currentSprite]);
	}

	setInterval(walk, 125);
	setInterval(turn, 1500);
	setInterval(spriteChange, 6000);
});
