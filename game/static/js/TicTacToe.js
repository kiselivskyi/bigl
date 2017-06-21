$(document).ready(function() {
	//localStorage.clear();
	localStorage.setItem('RED',0);
	localStorage.setItem('GREEN',0);
	localStorage.setItem('DRAW',0);
	
	$('#p1wins').html(localStorage.getItem('RED'));
	$('#p2wins').html(localStorage.getItem('GREEN'));
	$('#draws').html(localStorage.getItem('DRAW'));
	
	size = localStorage.getItem('field_size');
	diagonal_ban = localStorage.getItem('diagonal_ban');;
	
	for (i=1;i<=size;i++){
		document.getElementById('b'+i).className = "btn btn-default field";
		document.getElementById('b'+i).value = " ";
		document.getElementById('b'+i).removeAttribute('disabled');
	}
	
	var turnOn = function(id){
		document.getElementById(id).style.WebkitAnimation = 'argh-my-eyes 2s infinite';
		document.getElementById(id).style.animation = 'argh-my-eyes 2s infinite';
	}
	
	var turnOff = function(id){
		document.getElementById(id).style.WebkitAnimation = '';
		document.getElementById(id).style.animation = '';
	}
	
	turnOn('player1');
	turnOff('player2');
	
	var winnerIs = function(value) {
		document.getElementById("result").click();
		check = true;
		$('#modal').modal({backdrop: 'static', keyboard: false});
		
		var text;
		if (value != ''){
			cnt = parseInt(localStorage.getItem(value))+1;
			localStorage.setItem(value,cnt);
			text = 'The WINNER is ';
			winner = value;
		}
		else{
			cnt = parseInt(localStorage.getItem('DRAW'))+1;
			localStorage.setItem('DRAW',cnt);
			text = 'There is no WINNER';
			winner = 'DRAW';
			count_draws++;
		}
		winner_exist = true;
		$('#text').html(text);
		$('#winner').html(value).css('color',value);
		
		$('#p1wins').html(localStorage.getItem('RED'));
		$('#p2wins').html(localStorage.getItem('GREEN'));
		$('#draws').html(localStorage.getItem('DRAW'));
	}
	
	check = false;
	winner = '';
	move = 0;
	count = 0;
	count_draws = 0;
	row = Math.sqrt(size);
	
	var onClick = function() {
	
		move++;
		count++;
		if ( (winner == 'RED') || ((winner == 'DRAW') && (count_draws%2 == 1)) ){
			move++;
			winner = '';
		}
		
		if (move%2 == 1){
			$(this).addClass('btn-danger').attr('disabled', true);
			value = 'RED';
			turnOn('player2');
			turnOff('player1');
	    }
		else {
			$(this).addClass('btn-success').attr('disabled', true);
			value = 'GREEN';
			turnOff('player2');
			turnOn('player1');
		}
		
		this.value = value;
		
		winner_exist = false;
		
		if (count > 2*row-2)
		{
			if (!winner_exist)
				for (i=0; i<row; i++){
					temp = $('#b'+(i*row+1)).val();
					check_step = true;
					if (temp != " ")
						if (!winner_exist)
						{
							for (k=2;k<row+1;k++)
							{
								if (($('#b'+(i*row+k)).val() == temp) && check_step)
									check_step = true;
								else check_step = false;
							}
							if (check_step)
								winnerIs(value)
						}						
				}
			
			if (!winner_exist)	
				for (j=1; j<=row; j++){
					temp = $('#b'+j).val();
					check_step = true;
					if (temp != " ")
						if (!winner_exist)
						{
							for (k=1;k<row;k++)
							{
								if (($('#b'+(k*row+j)).val() == temp) && check_step)
									check_step = true;
								else check_step = false;
							}
							if (check_step)
								winnerIs(value)
						}
				}
			
			if (diagonal_ban == 'False')
			{
				if (!winner_exist){
					temp_p = $('#b1').val();
					step_p = row+1;
					check_step = true;
					for (i=1; i<row; i++)
					{
						if (($('#b'+(1+i*step_p)).val() == temp_p) && (temp_p != " ") && check_step)
							check_step = true;
						else check_step = false;		
					}
					if (check_step)
						winnerIs(value)
				}		
				
				if (!winner_exist){
					temp_m = $('#b'+row).val();
					step_m = row-1;
					check_step = true;
					for (i=1; i<row+1; i++)
					{
						if (($('#b'+(1+i*step_m)).val() == temp_m) && (temp_m != " ") && check_step)
							check_step = true;
						else check_step = false;		
					}
					if (check_step)
						winnerIs(value)
				}
			}
			
		}
		if ((count == size) && (!check))
			winnerIs('');
	};

	$('button[class="btn btn-default field"]').click(onClick);

	$('#restart').click(function() {
		move = 0;
		count = 0;
		check = false;
		if (winner == "GREEN"){
			turnOff('player2');
			turnOn('player1');
		}
		else if (winner == "RED"){
			turnOff('player1');
			turnOn('player2');
		}
		else if ((winner == 'DRAW') && (count_draws%2 == 1)){
			turnOff('player1');
			turnOn('player2');
		}
		else{
			turnOff('player2');
			turnOn('player1');
		}
		for (i=1;i<=size;i++){
			document.getElementById('b'+i).className = "btn btn-default field";
			document.getElementById('b'+i).value = " ";
			document.getElementById('b'+i).removeAttribute('disabled');
		}
	});
});

var newgame = function() {document.getElementById("restart").click();}