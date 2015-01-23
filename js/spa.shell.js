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
				"<div class=\"spa-shell-modal\"></div>",
			chat_extend_time: 1000,
			chat_retract_time: 300,
			chat_extend_height: 450,
			chat_retract_height: 15,
			chat_extend_title: '点击关闭',
			chat_retract_title: '点击展开',
			anchor_schema_map: {
				chat: {
					open: true,
					closed: true
				}
			}

		},
		stateMap = {
			$container: null,
			is_chat_retracted: true,
			anchor_map: {}
		},
		jqueryMap = {},
		setJqueryMap, initModule, toggleChat, onclickChat,
		copyAnchorMap, changeAnchorpart, onHashchange;

	//------------------utility---------------------------------------------	
	copyAnchorMap = function() {
		return $.extend(true, {}, stateMap.anchor_map);
	};

	changeAnchorpart = function(arg_map) {
		var
			anchor_map_revise = copyAnchorMap(),
			bool_return = true,
			key_name, key_name_dep;

		for (key_name in arg_map) {
			if (arg_map.hasOwnProperty(key_name)) {
				if (key_name.indexOf('_') == 0) {
					continue;
				}

				anchor_map_revise[key_name] = arg_map[key_name];

				key_name_dep = '_' + key_name;
				if (arg_map[key_name_dep]) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				} else {
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep];
				}
			}
		};

		try {
			$.uriAnchor.setAnchor(anchor_map_revise);
		} catch (e) {
			$.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
			bool_return = false;
		}
		return bool_return;


	};
	//------------------end utility-----------------------------------------	

	//--------------------------dom-----------------------------------------
	//设置dom
	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container,
			$chat: $container.find('.spa-shell-chat')
		};
	};

	//切换chat显示状态  
	toggleChat = function(dosth, callback) {
		var
			px_chat_ht = jqueryMap.$chat.height(),
			is_open = px_chat_ht === configMap.chat_extend_height,
			is_closed = px_chat_ht === configMap.chat_retract_height,
			is_sliding = !is_open && !is_closed;
		if (is_sliding) return false;

		if (dosth) {
			jqueryMap.$chat.animate({
					height: configMap.chat_extend_height
				},
				configMap.chat_extend_time,
				function() {
					jqueryMap.$chat.attr('title', configMap.chat_extend_title);
					stateMap.is_chat_retracted = false;
					callback && callback(jqueryMap.$chat);
				}
			);
			return true;
		};

		jqueryMap.$chat.animate({
				height: configMap.chat_retract_height
			},
			configMap.chat_retract_time,
			function() {
				jqueryMap.$chat.attr('title', configMap.chat_retract_title);
				stateMap.is_chat_retracted = true;
				callback && callback(jqueryMap.$chat);
			}
		);
		return true;


	};
	//--------------------------end dom-----------------------------------------
	//--------------------------event-----------------------------------------
	onclickChat = function(e) {

		/*if (toggleChat(stateMap.is_chat_retracted)) {
			$.uriAnchor.setAnchor({
				chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
			});
		};*/
		changeAnchorpart({
			chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
		});
		return false;
	};

	onHashchange = function() {
		var
			anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,
			_s_chat_previous, _s_chat_proposed,
			s_chat_proposed;
		try {
			anchor_map_proposed = $.uriAnchor.makeAnchorMap();
		} catch (e) {
			$.uriAnchor.setAnchor(anchor_map_previous, null, true);
			return false;
		};
		stateMap.anchor_map = anchor_map_proposed;
		_s_chat_previous = anchor_map_previous._s_chat;
		_s_chat_proposed = anchor_map_proposed._s_chat;

		if (!anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
			s_chat_proposed = anchor_map_proposed.chat;
			switch (s_chat_proposed) {
				case 'open':
					toggleChat(true);
					break;
				case 'closed':
					toggleChat(false);
					break;
				default:
					toggleChat(false);
					delete anchor_map_proposed.chat;
					$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
			};
		}

		return false;
	};
	//--------------------------end event-----------------------------------------
	//--------------------------public-----------------------------------------
	initModule = function($con) {
		stateMap.$container = $con;
		$con.html(configMap.main_html);
		setJqueryMap();

		stateMap.is_chat_retracted = true;
		jqueryMap.$chat
			.attr('title', configMap.chat_retract_time)
			.click(onclickChat);

		$.uriAnchor.configModule({
			schema_map: configMap.anchor_schema_map
		});

		spa.chat.configModule({});
		spa.chat.initModule(jqueryMap.$chat);

		$(window)
			.bind('hashchange', onHashchange)
			.trigger('hashchange');
	};

	//--------------------------end public-----------------------------------------
	return {
		initModule: initModule
	}
})();