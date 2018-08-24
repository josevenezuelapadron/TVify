/*
	Module Dependencies
*/

import $ from 'jquery'

 var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function(event) { // cuando se haga click en ls botones que tengan clase like, estos botones deben estar dentro de un elemento con clave tv-shpow
	var $this = $(this)
	$this.closest('.tv-show').toggleClass('liked') // se hace toggle de la clase liked cuando se da click al corazón
	});

export default $tvShowsContainer