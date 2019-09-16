function log(msg, type){
	const log = document.getElementById('msgs')
	log.innerHTML += `<div class="msg ${type || ''}">
											${msg} - 
											<em>
												${new Date().toISOString()}
											</em></div>`;
	log.scrollTop = log.scrollHeight;
}


function fillCalGrid()
{
	for (let i = 0; i < (24*4); i++)
	{
		let hr = Math.floor(i/4)
		let min;
		className="min";
		
		switch (i%4){
			case 0:
				min = "00"
				className = "hr";
				break;
			case 1:
				min = "15";
				break;
			case 2:
				min = "30";
				break;
			case 3:
				min = "45";
				break;
		}
		document.getElementsByClassName("bglines")[0].innerHTML += `<div class="sched-box ${className}"><div class="timestamp">${hr%12}:${min}</div></div>`;

	}
}
function setCalScroll(){
	
	let eventMap = Array.from(document.getElementsByClassName('main')).map(function (event) {
		return Number($(event).css('top').slice(0,-2))
	})

	let firstEventTop = Math.min(...eventMap);

	document.getElementById('calendar').scrollTop = firstEventTop - 10;
}

/********************************************* */



class Event {
	constructor(){}
	start;
	end;
}



/******************************************** */



log(`Started app with ${userData.name}`, "err")
fillCalGrid();
setCalScroll();