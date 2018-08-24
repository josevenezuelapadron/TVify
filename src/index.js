/*
	Module Dependencies
*/

import $ from 'jquery'
import page from 'page'
import { getShows, searchShows } from 'src/tvmaze-api-client'
import renderShows from 'src/render'
import $tvShowsContainer from 'src/tv-shows-container'
import 'src/search-form'
import qs from 'qs'
import swal from 'sweetalert2'

page('/', function (ctx, next) {
	$tvShowsContainer.find('.tv-show').remove() // se ocultan todos los shows
	if(!localStorage.shows){  // este bloque de código es para saber si los datos ya estan en cache no tenerlos que cargar de nuevo
		getShows(function (shows) {
			$tvShowsContainer.find('.loader').remove()
				localStorage.shows = JSON.stringify(shows)
				renderShows(shows)
		})
	}else {
		renderShows(JSON.parse(localStorage.shows)) // si los datos SI estan en cache, se cargan desde la cache
	}
})

page('/search', function (ctx, next) {
	$tvShowsContainer.find('.tv-show').remove() // se ocultan todos los shows
	var $loader = $('<div class="loader">') // carga la animacion de carga
	$loader.appendTo($tvShowsContainer) // se agrega esta animacion a el documento

	const busqueda = qs.parse(ctx.querystring) // convierte busqueda en un json

	searchShows(busqueda, function (res) {
		$loader.remove() // cuando se tenga un resultado se remueve la animacion de carga
		var shows = res.map(function(el) { // se crea un array con el resultado de esta funcion
				return el.show // ejemplo, se obtienen 2 shows, los va a devolver a los 2 y estos se almacenan en un array
			})

		renderShows(shows) // se cargan los shows obtenidos en el documento
	})
})

var btnAbout = document.getElementById('about')

btnAbout.addEventListener('click', function () {
	swal(
	  'Desarrollado por José Pádrón',
	  '24/08/2018 v0.1.0 Venezuela https://github.com/josevenezuelapadron/TVify',
	  'info'
	)
})

page()