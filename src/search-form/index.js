/*
	Module Dependencies
*/

import $ from 'jquery'
import page from 'page'

$('#app-body').find('form').submit(function(event) { // cuando se da click en el boton de busqueda
		event.preventDefault() // no se manda el valor a la url, que es lo que hace por defecto

		var busqueda = $(this).find('input[type="text"]').val() // se obtiene el valor de la caja de texto

		page(`/search?q=${busqueda}`)
	});