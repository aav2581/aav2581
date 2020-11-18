$(function(){
	
	//d7bd066df2128c8c721de4167a84008c
	//http://data.fixer.io/api/latest

	$('.money div').text(function(){
		$.get(
			'http://data.fixer.io/api/latest',
			{'access_key': 'd7bd066df2128c8c721de4167a84008c',
			'base': 'EUR',
			'symbols': 'RUB, USD'},

			function(response){
			console.log(response);
			
			
			
			let rub = response.rates.RUB.toFixed(2);
			let usd = response.rates.USD.toFixed(2);
			let usdd = (rub / usd).toFixed(2)
						
			$('.EUR').text(rub);
			$('.USD').text(usdd);

			console.log(rub);
			console.log(usd);
			console.log(rub / usd);
			});
	});

	function disableScroll() {
		$('html, body').addClass('stop-scrolling');
		$('html, body').bind('touchmove', function(e){e.preventDefault()});
	};

	function enableScroll() {
		$('html, body').removeClass('stop-scrolling');
		$('html, body').bind('touchmove', function(e){e.e.stopPropagation()});
	}

	$('.popup-button').click(function(){
		$('.popup-container').fadeIn(1000, disableScroll);
	});

	$('.popup-container').click(function(event){
		if (event.target == this) {
			$(this).fadeOut(400, enableScroll);
		}
	})

});