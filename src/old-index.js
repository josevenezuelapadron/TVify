// TVify es creado por José Padrón el 19/08/2018 en Venezuela, mediante el curso de Platzi.com
// Link del repositorio con este código: 

/*
	Module Dependencies
*/

import $ from 'jquery'

$(function($) {
	var $tvShowsContainer = $('#app-body').find('.tv-shows') // se obtiene todos los elementos con clase tv-shows dentro de app-body

	$tvShowsContainer.on('click', 'button.like', function(event) { // cuando se haga click en ls botones que tengan clase like, estos botones deben estar dentro de un elemento con clave tv-shpow
		var $this = $(this)
		$this.closest('.tv-show').toggleClass('liked') // se hace toggle de la clase liked cuando se da click al corazón
	});

	function renderShows (shows) { 
		$tvShowsContainer.find('.loader').remove() // se remueve la animacion de carga
		shows.forEach(function (show) { // por cada show se hace
			var article = template
			.replace(':name:', show.name) // se reemplaza el nombre del show en la plantilla
			.replace(':img:', show.image ? show.image.medium : '') // se reemplaza la imagen del show en la plantilla
			.replace(':summary:', show.summary) // se reemplaza la descripción del show en la plantilla
			.replace(':img alt:', show.name + " Logo") // se reemplaza el logo del show en la plantilla

			var $article = $(article) // se convierte la nueva ficha del show(<article>) en un objeto jQuery
			$article.hide() // se esconde para luego ser mostrado con la animacion
			$tvShowsContainer.append($article.fadeIn(1000)) // animacion
		})
	}


	$('#app-body').find('form').submit(function(event) { // cuando se da click en el boton de busqueda
		event.preventDefault() // no se manda el valor a la url, que es lo que hace por defecto

		var busqueda = $(this).find('input[type="text"]').val() // se obtiene el valor de la caja de texto

		$tvShowsContainer.find('.tv-show').remove() // se ocultan todos los shows
		var $loader = $('<div class="loader">') // carga la animacion de carga
		$loader.appendTo($tvShowsContainer) // se agrega esta animacion a el documento

		$.ajax({ // peticion a la api, donde q tiene el valor ingresado en la caja de texto
			url: 'http://api.tvmaze.com/search/shows',
			data: { q: busqueda},
			success: function (res, textStatus, jqXHR) {
				$loader.remove() // cuando se tenga un resultado se remueve la animacion de carga
				var shows = res.map(function(el) { // se crea un array con el resultado de esta funcion
						return el.show // ejemplo, se obtienen 2 shows, los va a devolver a los 2 y estos se almacenan en un array
					})

				renderShows(shows) // se cargan los shows obtenidos en el documento
			}
		})
	});


	// Plantilla de las tarjetas de los shows
	var template = '<article class="tv-show">' +
						'<div class="left img-container">' + 
							'<img src=":img:" alt=":img alt:">' +
						'</div>' +
	
						'<div class="right info">' +
							'<h1>:name:</h1>' +
							'<p>:summary:</p>	' +
							'<button class="like">💖</button>'  +
						'</div>' +
					'</article>';

	if(!localStorage.shows){  // este bloque de código es para saber si los datos ya estan en cache no tenerlos que cargar de nuevo
		$.ajax('http://api.tvmaze.com/shows')
			.then(function (shows) {
				$tvShowsContainer.find('.loader').remove()
				localStorage.shows = JSON.stringify(shows)
				renderShows(shows)
			}) 
	}else {
		renderShows(JSON.parse(localStorage.shows)) // si los datos SI estan en cache, se cargan desde la cache
	}
	
})