spa.chat = (function() {
	var
		configMap = {
			main_html: '<div style="padding:1em;color:#fff">' +
				'say hello to chat' +
				'</div>',
			settable_map:{}
		},
		stateMap = { $container : null},
		jqueryMap = {},

		setJqueryMap,configModule,initModule;
	//------------------util----------------------
	//------------------end util----------------------
	//------------------dom----------------------

	setJqueryMap = function(){
		var $container = stateMap.$container;
		jqueryMap = {
			$container:$container
		};
	};

	//------------------end dom----------------------
	
	//------------------event----------------------
	//------------------end event----------------------
	//------------------public----------------------

	
	configModule = function(input_map){
		spa.util.setConfigMap({
			input_map : input_map,
			settable_map:configMap.settable_map,
			config_map: configMap
		});
		return true;
	};

	initModule = function($con){
		$con.html(configMap.main_html);
		stateMap.$container=$con;
		setJqueryMap();
		return true;
	};

	return {
		configModule : configModule,
		initModule:initModule
	};

	//------------------end publi----------------------

})();