spa.shell = (function() {
	var
		configMap = {
			main_html: "<div class=\"spa-shell-head\">" +
				"<div class=\"spa-shell-logo\"></div>" +
				"<div class=\"spa-shell-acct\"></div>" +
				"<div class=\"spa-shell-search\"></div>" +
				"</div>" +
				"<div class=\"spa-shell-main\">" +
				"<div class=\"spa-shell-main-nav\"></div>" +
				"<div class=\"spa-shell-main-content\"></div>" +
				"</div>" +
				"<div class=\"spa-shell-foot\"></div>" +
				"<div class=\"spa-shell-chat\"></div>" +
				"<div class=\"spa-shell-modal\"></div>"
		},
		stateMap = {
			$container: null
		},
		jqueryMap = {},
		setJqueryMap, initModule;
	//--------------------------dom-----------------------------------------
	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container
		};
	};
	//--------------------------end dom-----------------------------------------
	//--------------------------event-----------------------------------------
	//--------------------------end event-----------------------------------------
	//--------------------------public-----------------------------------------
	initModule = function($con) {
		stateMap.$container = $con;
		$con.html(configMap.main_html);
		setJqueryMap();
	};

	//--------------------------end public-----------------------------------------
	return {
		initModule: initModule
})();