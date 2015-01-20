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
			chat_retract_title: '点击展开'

		},
		stateMap = {
			$container: null,
			is_chat_retracted: true
		},
		jqueryMap = {},
		setJqueryMap, initModule, toggleChat, onclickChat;
	//--------------------------dom-----------------------------------------
	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = {
			$container: $container,
			$chat: $container.find('.spa-shell-chat')
		};
	};


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
			}

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


		}
		//--------------------------end dom-----------------------------------------
		//--------------------------event-----------------------------------------
	onclickChat = function(e) {
		toggleChat(stateMap.is_chat_retracted);
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
	};

	//--------------------------end public-----------------------------------------
	return {
		initModule: initModule
	}
})();