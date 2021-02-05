import Settings from './../settings';

class ToplistService {

	saveScore(playerNameD,scoreD) {
		// If the name of the player is empty, we do not save it to the toplist
		if (_.isEmpty(playerNameD)) {
			return;
		}

		$.ajax({
            url: Settings.urls.saveScore,
            type: 'post',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            },
            data: JSON.stringify({
				playerName : playerNameD,
				score : scoreD
			})
		});
	}

	/**
	 * Call your webservice to get the top10 player
	 * Something like this: return $.get(Settings.urls.getTop10);
	 */
	getTop10(callback) {
		return $.get(Settings.urls.getTop10, callback);
 		// return [
 		// 	{"playerName":"AE","score":"100000"}
 		// 	,{"playerName":"AE","score":"90000"}
 		// 	,{"playerName":"AE","score":"80000"}
 		// 	,{"playerName":"AE","score":"70000"}
 		// 	,{"playerName":"AE","score":"60000"}
 		// 	,{"playerName":"AE","score":"50000"}
 		// 	,{"playerName":"AE","score":"40000"}
 		// 	,{"playerName":"AE","score":"30000"}
 		// 	,{"playerName":"AE","score":"20000"}
 		// 	,{"playerName":"AE","score":"10000"} 			
 		// ];
	}
}

export default new ToplistService();