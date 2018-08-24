/*
	Module Dependencies
*/

import $ from 'jquery'
import $tvShowsContainer from 'src/tv-shows-container'

var template = `<article class="tv-show"> 
						<div class="left img-container">
							<img src=":img:" alt=":img alt:">
						</div>
	
						<div class="right info">
							<h1>:name:</h1>
							<p>:summary:</p>
							<button class="like">💖</button>
						</div>
					</article>`

export default function renderShows (shows) { 
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