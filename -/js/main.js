$(function() {

	/***/// rozwinięcie i zwinięcie listy wyboru
	var controlsBtnEnabled = true;
	$(".controls").on('click', '.controls-btn', function(e) {
		e.preventDefault();
		if (controlsBtnEnabled) {
			controlsBtnEnabled = false;
			$(this).toggleClass('active').next('.controls-options').stop(true, true).slideToggle(200, function() {
				$(this).parent().toggleClass('expanded').parents('body').toggleClass('outer-click-listener');
				controlsBtnEnabled = true;
			});
		}
	});

	/***/// zwinięcie rozwiniętej listy wyboru po kliknięciu poza nią
	$('html').on('click', '.outer-click-listener', function(e) {
		var eTarget = $(e.target);
		if (!eTarget.is('.controls.expanded *')) {
			e.preventDefault();
			$('.controls.expanded .controls-btn').removeClass('active').next('.controls-options').stop(true, true).slideUp(10, function() {
				$(this).parent().removeClass('expanded').parents('.outer-click-listener').removeClass('outer-click-listener');
				controlsBtnEnabled = true;
			});
		}
	});

	/***/// zaznaczenie punktu listy wyboru po wczytaniu strony
	var htmlClasses = $('html').attr('class'); // pobranie klas z html
	var themeClasses = ['blue', 'green', 'brown-01', 'brown-02']; // tablica z klasami kolorów
	var selectedTheme = 'default'; // domyślny schemat, domyślnie wybierany punkt listy
	$.each(themeClasses, function(i,val) {// próba znalezienia którejś z klas kolorów na html
		var patt = new RegExp("(?:^|\\s)(" + val + ")(?=\\s|$)", "gi"); // dynamicznie tworzony regexp
		if (htmlClasses.match(patt) !== null) {// jest dopasowanie klasy na html z klasą koloru
			 if (selectedTheme !== 'default') {// w jednej z poprzednich iteracji przypisano inny schemat niż domyślny (za dużo klas kolorów na html)
			 		$('html').removeClass(val); // usunięcie zbędnej (kolejnej) klasy koloru z html
			 } else { // klasa na html wskazuje na inny schemat kolorów niż domyślny 
			 		selectedTheme = val; // wybór odpowiedniego schematu na liście
			 }
		}
	});
	$('.controls-options-list [data-theme="'+selectedTheme+'"]').addClass('selected'); // zaznaczenie odpowiedniego punktu listy wyboru

	/***/// wybór opcji schematu koloru i zmiana zaznaczenia punktu listy wyboru
	$('.controls-options-list').on('click', "li:not(.selected)", function() {
		$(this).addClass('selected').siblings().removeClass('selected').parents('html').removeClass(themeClasses.join(" "));
		if ($(this).data("theme") != 'default') {
			$('html').addClass($(this).data("theme"));
		}
	});

});

