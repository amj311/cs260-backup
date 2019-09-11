function log(msg, type){
	const log = document.getElementById('msgs')
	log.innerHTML += `<div class="msg ${type || ''}">
											${msg} - 
											<em>
												${new Date().toISOString()}
											</em></div>`;
	log.scrollTop = log.scrollHeight;
}




/********************************************* */



class DateTime {
	constructor(initDate)
	{
		this.date()
	}
}



/******************************************** */



log(`Started app with ${userData.name}`, "err")