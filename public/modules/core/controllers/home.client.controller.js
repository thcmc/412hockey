'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'homepageService',
	function($scope, Authentication, homepageService) {
	
		$scope.authentication = Authentication;

		// var code = document.getElementById('code');
		var demo = document.getElementById('demo');
		var svg = document.getElementsByTagName('svg')[0];

		// Convert the SVG node to HTML.
		var div = document.createElement('div');
		div.appendChild(svg.cloneNode(true));

		// Encode the SVG as base64
		var b64 = 'data:image/svg+xml;base64,'+window.btoa(div.innerHTML);
		var url = 'url("' + b64 + '")';
		// code.innerHTML = 'Base64 CSS (for cross-browser compatibility)\n\nbackground-image: ' + url + ';';
		demo.style.backgroundImage = url;

		$scope.myInterval = 6000;
	  	$scope.slides = [
	    	{image: 'http://placehold.it/1450x450/2E4272/943156&text=1',textHeader: 'LET\'S IMPROVE ATHLETIC DEVELOPMENT', textDesc: 'Track your progress and challenge teammates.'},
	    	{image: 'http://placehold.it/1450x450/2E4272/943156&text=2',textHeader: 'START WITH THE ATHLETE',textDesc: 'Set your goals and remember your accomplishments and personal records'},
	    	{image: 'http://placehold.it/1450x450/2E4272/943156&text=3',textHeader: 'DON\'T FORGET THE COACH',textDesc: 'Receive coaching feedback and climb the performance ladder'},
	    	{image: 'http://placehold.it/1450x450/2E4272/943156&text=4',textHeader: 'ADD IMPROVEMENTS TO THE ORGANIZATION',textDesc: 'View upcoming travel and recommendations from prior teams'},
	    	{image: 'http://placehold.it/1450x450/2E4272/943156&text=5',textHeader: 'BRING IT ALL TOGETHER',textDesc: 'Receive coaching feedback and climb the performance ladder'}
	  	];

	 //  	$scope.playerOptions = [
		// 	{label: 'Game Rating' , uisref: '', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFGElEQVR4Xu2bXUhTYRjHm3NqykovCj9CCMJKsKuibtIob4JyViQZ3Vo3Ob+mi01wgdTmzK91Y7dBUZGoWVdBYUgGQUEfYF14ISrVhZGb+TXt/9iOjLGd8553Z7odz2Bs87wf5/k9//d53vO+r7ptUbza29sPGAwGJ5o4qdPpjFE0FbGq3+8319XVeWLRNrWp422YjNfr9aN47+Rtg6XeysqKf3V11QQIz1nKyy3DDaC7u7sfXjfhBvuXlpauNTY2/pTbuVj5np6eVeE6+vAuLi4eb2pq+qhkH1EpAAD+kOy9Xu9um832S+kbEwDA+LtJSUnXoYLJ2dnZo83NzZNK9sWtAOEGzWYzdxssCujr6zOYTKZBDLXTgPBhZmam2OFweJWCwH3zGwWAAEP6xpycnBFAKIIihnJzc8srKir8SkBICABkqNPpzE9LS3uH4ZANJXhqamrMWwoAGdvR0XEYKhhG7NmuVHpUXAHB0VuOh0JjSaQhBgjnoIKnaHtFifSYcAAIamdnpwVKcCuRHhUHIMfrLFkgXJaB53VIw71QQlW06TEhARC43t5ew9zc3AsooTSa9Bi3ALq6unzwcDomP9l2u/1HOLVgPpCZlZU1gqBYyJse4xnAMwA4A8MGfT7f1UgQ3G733pSUlHeAsIsnPSoOQKksgIetQjxpvoVhO+TEFbkz07gFQEYHIDjh2VM0HFhAbDoAlpuMRRneqbniCoiFcSxtagAC6wfaEJD5eK74EODNAiwyDy7D+uwg1a4GQIpQpOu8QYe3P6l6vPejuAKkbjRW1zUAWhb4v4y+6WlQywJBGxqxGu/hPK3FAC0GxEkMiKXsedcQxepp8wBej0UKOloW0LIAr6aiq6elQS0NamkwPp4FohnJLpdrDzY5qmlDBO3so7awJP4dH0M4iuMROx6T8DEAW2FXYChteIZd/wcIH3aJqnBa7GE4yAkNgIyH4ffJMBx86IOxXRMTE+/pd15e3pHk5OQ6XC8PXL8cDkLCAiDZp6amjpHn4WFLbW3tnVAP03Y4DGzENpmLzgRgr7AAe4XTweUSFgAOO7iwxd1EnodnL0SKIYEzAf0AVYbvt3FGyKYKADjo8IW2t5eXl4vr6+vfiAVRHI8pwXB4DVifAOuQWgAsAEDK+Ph4OtTwVwyAxWLJyM/P90IBC1BAmloALAFAskwAiwCQqhYAXwHgIM4Cl8DDw2IKgEJOIF68ggI+A0CRKgAIQZAOXcOo84Cxfkg62MBAEBykSZKqgmBra2ue0Wgcg+EZMMyKZW13KAQyHnOFG/D+LdWlQfIyVFAJ4x7QdzoThHfH1NTU+kQIQBoC02O6fglzhUehQ2XD5wFIX17ymtgpLjnPBawrSeE2Ptra2rJxjnia1AE4sv5zhXtNEJIcoEmJ1CkuVggCABrfeJehXgHVBeQxfAzg006/QwGQ8ZhJ3sP1s6g3gDiyNmVmfXEDwBR2P6iPouNM1s5YykXa2pJSCIz/PT8/f8xqtRIw5hc3AOohAMGFr6U0HJh7FSkoFwDJHs29xOzQ2tDQ8E3uPUQFQG5nYuWlgpjUdd570QDwklO6XqiHPR7PReqjurr6CX1uKQWQ8RjTays/mB9UEoQtAwDBtIKMR4rVEwD6x0mCgCj/mH7LPQAhpdS4iwFkMBkPCDcDCmgR/rYlAJCRZDwWPBz0HdNkBxTQInhS9QoINl4wOhiCqgGEMz4UgmoBkJcF2UcKXCxlpIJe6PV/qzL5bu4WYAYAAAAASUVORK5CYII='},
		// 	{label:'Private Journal & Notes', uisref: '',  src: 'data:image/png;base64,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'},
		// 	{label:'Nutrition/Fitness Logging', uisref: '',  src: ''},
		// 	{label:'Media Library / Portfolio', uisref: '',  src: ''},
		// 	{label:'Coaching Feedback &amp; Communication', uisref: '',  src: ''}
		// ];

		$scope.playerOptions = [
			{
				aHref:'#',
				imgTitle:'Game Rating',
				imgSrc:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEF0lEQVR4Xu2bS0wTURSGKY9Q+rBposCCdI24ciESXSkro6LGuHJtqi4oUGgTYMEG0pYmQNmILF1CVIjGDeqGxCY+FhqMj26N4iOttKW2tNT/BCYpk04749wpI70kk5T2zr3nfPc/555pTg01Vf5nqHL/azQHMDY2ZrTZbLcNBsN1XMdwNRL07e3tP3i9hpf3IpHIndnZ2fR+bIamAHw+n6OpqekJHO0o5Vwul3uXTCbPjY6Ofqk0BM0A0M7b7fbX5Hw+n3+PHfeYTKbnTqdzk5wcHBw0t7W1deOlv7a2th1j3q6urp5YWFjIVBKCZgCmp6fdcCwIx9disdgpANko5tjc3JwtlUqFCQLGuvr6+kIHAsDMzMwb7P5xyPtCf3//41JOAVYPACxBBS9dLlfnQQFASa4Rf2ZB9lKOUTg4HI4EAKQAwPTfAQgGgx11dXUBOHwGO7nHgd7e3j1hBmW8goNZONpV6GgoFMoX/g8YSVxP0+m0x+v1ftQKiuocQM43NDS8gPOHihlZBEAY43IAcLoUAOEzQIhls9mTbrf7kxYQVAOYmpp6hN0/D0MXo9HoLSS7nywMnZiYOIJT4y4UdRl55D7yyFUW84rnUA0ACSxJsk8kEoeHh4d/sTRycnKyGTlknVQAxdhZzi3MpQiA3+8/CoN8uPksnLYUGiSWOitji+UGzP1sa2vLg+T5Qe06sgGQ80ajMSw31tUaJtwvBiC8j7D4jatLLQTZACD1Jex6D+T4IJPJ3BwaGvpOxiCrJwDFjBBoRgj8YOU4zTM+Pt5itVq/FYYAhQWS7jzZgsJpGYXTJTVrygYARzfgqBXHUovg/C6AZbx/kcCgnneygkDOm81mSoIEfRE54JrgqAAGABIAYK0IAEGK4ljHMdiOUyCMy6bGEKl74WQUV+fAwECk2LGpNvfIVoAUADKKINTX1/uLJcd/hYJdj+PeFSjO6/F4PovnKWWPkjWZAFCyIKuxHMBu6ayLEGC1q0rm4QrgCth5euQhIHrcVhJGNJafAnKJsUo6ctcrN46VPaoVIPWwojY2OYAyBHSnAGHHpQyTUkq5nRY+FyuKA9BLHcBzgOjrbCnJypW63HG6CQG5BrMexwHoJQew3lm583EF6EUB/BSo9lNAHIu8EpSIzQNfCouzN38aVPlNTbnjkB+DejkGy+2UVp9zBXAF6ORrcV4J8kpwrxR5JcgrwZ2Dj1eCvBLUqgTamZcXQrwQ0kkhpK3QpWfnIcBDoMIhIPQEx+Px1pGRkfX9kj6tGwgEWtG4/bWirbJCszQ1KKNV/UZhv3AlYVCfsMVimaf+ZNjyEL3CV9SsL7tDROueYKVOsPopjWwAZKDQEwz63dQir9RoFuNJ9phnBb8V8LL4HZEiACwc0NscVQ/gL1kyQG4SIOfKAAAAAElFTkSuQmCC'			
			},
			{
				aHref:'#',
				imgTitle:'Journal + Notes',
				imgSrc:'data:image/png;base64,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'			
			},
			{
				aHref:'#',
				imgTitle:'Nutrition Logging',
				imgSrc:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADZElEQVR4Xu2aS08UQRDHp7qHnV12N4AsGA4m3nzEePGgFxKN8WKi+Bk8iAcfiSHiAzjomiDqQTEmxo9gNL7w5sUYkZPe8AMYEwRcZV8zs8y0PSYkhMB2zZvd6b1OTXXVr/7VtbvdoCT8AwnPX5EApAISTkC2QMIFIDdB2QKyBVwQyF9f2ZtStUmFKccJITkXr0Zmatt2DUD5oBvmaGUqPy9aGN0CuavlfWktNQtAukROt8NzZtsrumkeEUFAA+gdN14RIEOc8Evjr3m+Mp1f3A6Jbowhd7Hcp3WnnjmxMma/XbqtnW4WJx7AmFF2ZF+v6Tsr9/O/tmPyazHlRsr9mc70gtMOy0UtGwiAvokGcxwt3upAQ4sTEjZedDJYh3EmvX5tbLwSALZiWKJYf2HbYeOVCsBWAksU6y9sO2y8rhUQduBB+xdNLQkASxwrKay/sO2w8bpWgEhSYSeG9S8BIL+5SgUELSmsv7DtZAtE1QJrpMOuqMj/xs05MgUkHoCoMnE9j0wBcSUoWlcCiGoTFFUirueRKSDxm2DiAcQlcdG6kbWAKJC4nksAcgrgDnJ8/xwOaxPc7I+XnhvlA5R03GUAx/jZXwbTXqI/cFoGgJM8IalZt8fyoQPAVCEIm8KYPgOEnnROp816arj8AJY289t9rbSbqpk5Qmj/qs2mS8XUpWbr+1ZAEMlhfPDj+Zoj+3pJ79/qaL5nlHVRtfEZKOxnzJpZ+q4NKc/BagsAwrF2lKm9g8Z7AvSEZbFvv0sdg8oTqIjgtowCRAAK4+ZTADjHb4b8rJrW4fpU5w9R8s5z3wCimgLNABRu6iNA6T2b2VWrsTr4ZzL7FZN8WwDoHTPO8Cq+cJKxFDZUKqbfYZMPBICbxfzYbqYALvtDjLGPfDR22pZ1eflO+pHbNXy3gNsFvdpvBJC5UtuVzZI5ADqAGXdbrduaAM4u5ncMdH2iFA5ix137AJhX1cIe443zpcjNuPMNgG82VafX4romt9YCNmOPCcAFt+PON4DCOKcO5BQfNa/1lcZw9WFuwWs/e3lv/bj1Mu58A3DuCWuq9iXuq7K88raXcecbgOPgPwSq8Z+j/LI0kKY3ML1UGfOO13EXCABMgK1mgx6DrZYYNl4JAEuqXe2kAtq1sti8pAKwpNrV7h+jTzpf/sM9WgAAAABJRU5ErkJggg=='			
			},
			{
				aHref:'#',
				imgTitle:'Media Portfolio',
				imgSrc:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADqklEQVR4Xu2aTWhTQRDH+9IQgiEYBNtC8OahwUNBhPYitOhNpfHsRUHQUz76kUBziWAL+f7orV4UPGss3hSJJy2ICB5sJTcRvyFiShuaJv4XWyglZWf3vfBWsoEHgbe7M/Ob2Z19O2sM9PnP6HP7BzQAHQEWECgUCsHBwcHHFgwlPMTu7u7VaDRaEe6418H0FIjFYl6/3//BMAy/rBJm+nU6nc/4BdLp9B+ZcUwDgPeL8H4YimzUarWx5eXlpowion2SyaTb5/O9dzgcpxEFJURBRHQM1t4UgHw+fw7Gr8H7DigxBSWqMkrI9gH8i5D/DPDbkD8+MzPzRnQsaQCTk5POYDC4Bg+chQIPwuHwdVHhVrQvlUoP4YBr7Xb7baVSGa9Wqy2RcaUBgH4E9AsQ/Kter48iJH+KCLaq7dLS0kmPx7MOCCcQBQjCaFFkbCkAuVzulNPpZAufB0JvQOh9EaFWt4UzbsIZ9xCJm61WKzA7O/uJKkMKAMKuAuOn4f1qJBKZogrrVTsYbhSLxZeAcB7/n2A6BqmyhAHs53wIam5vb4/F4/ENqrBetkulUgG32/0OjnGJ7A2EABzM+RByB6Gf7KVRomMjMu8CQEJkbyAEwK6cTwUhszcgA7A751MhiO4NSABUyflUCCJ7AxIAVXI+FYDI3oALQLWcT4VA3RtwAaiW86kAqHsDLoByudyhClW5XSgU6mqrBsDz2n4EHEWQ19/u9zz9yRGgARwxh+z2ME++joC9Rdz0IqinQL9PAd5cU/296SmguoE8/UwD0GtAv68BOgJ0BHT/muItPna/1ztBvRP8d56h06DZAxGdBXQWkM8CKKqcQckqhWcK9wmOUTIDq/Si3YudnZ3Y3NzcOqVPtza2ZwFmPKq2r2C8V8YI1CB/45mQhWA7AJzPPwWASzDi0dbW1u2FhYUfFBCZTGbI5XKt7JXhV1GGn6b0O9zGdgCo22+ysG80GkNU4/eNWFxcHPZ6vV9xD6EBAFIRZDsAFFYa7CZJs9kcnp+f/y7iRVx9G0HN/8v/DmAVAK6wmxuIgluJROIbDwKr6qC+N4K7PyuInsuitz4Ojm97BGSz2VGsAa/xHOcZ3u09jK/jJsqE7E0U2wEwoxgEXKpiafACmw4UECzs0e45Fs84Lj19pPRRMg3KKm5VPyUiwCpjZMbRAPTnsP4c1ucB+kBEnwjpIzF9Jmj6UFRmE6JSHw1A9lRYJS/2QhfuLbFeCFVpTA1AJW/YoctfXy/PXwyTnKAAAAAASUVORK5CYII='			
			},
			{
				aHref:'#',
				imgTitle:'Coaching Feedback',
				imgSrc:'data:image/png;base64,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'			
			},
			{
				aHref:'#',
				imgTitle:'More',
				imgSrc:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEW0lEQVR4Xu1azWsTQRTfmc3uppjUNAkqFcSjXxVBz34gHjyorVI9CIKKelRBbG3Ti0alFQ8iHiyC4tHUz7P4hf+A34onQUUxaasJtrvJzvgmWokhlt3ZmWRDNud97/3mN2/m/ea9IKXFf6jF168EBAQZ0OIMBEegxRMguASDIxAcgRZnIDgCzZIAsYHCKsVW6ORw5JlIzE2TAYkh6wKAJdlT+tHWI+Ag1eLzzM8IKTT31ViojKKiKBKaIgMSKXM7xvgmWzSxSXfutHHX9wR0DBRWsjM7MRx54RVscsi8hxDeUiaAkDu5tNHj1eeMvbQMiKfMEXZmAWy/F7BzDhfmt0W1jwjjEPNDKSmaP/XO/HmU9eJXMgEUJ1PWB7Zh2bS+WFEQ5QHb0VfoUkNaH1Lx7kp7Qsl1YlvnJs5EX/L4rbSRkgGxgakNWij0gAUq2qV1k6fbnjgFGu/LL8eavkuhqBepaMlsdpTSN5ATGWJZN8aHo6+cxpBOQHLQugLg9/9OWToKpeuQU3CRE/lluqr3IoR6MULLZ7MjNn1JgQCLWGOFs9HXTmPIJWDzeyO5ZtFXuLTm/jmzE9m3+gIlgyy3ACPH80sNQ+/HCO+ptLVterVIpkfyZ9vfuvVZ/b3wIxAfNHeoKh7758wS0gOX4R0esJFj+XnhsP7p7yVIiGVOmJ35S+05Hn/SCYCafRtqdvc/O0bI2Hja6OUFnEyZd4GArcweLsDbuVPGdl5fUgmY2087tJD1BcDqVRkwnftemK9cTPzgAZ4YNHuwim+VL1Vib5tMh+/x+KllI/QIJIesg3B5Xa4VyCalfePptqtcwGekMNMVT0EKP0IlLj81jMQSkLIeI4zW1gJHif0gmw5v5AXu28dQx0B+hQplC8QOK11LZ1sgtelr0EQZUrQybuu2r57Dbhb9P0K8kMGbRZ7ugLJC0/WdTnbaLcBGkuH4DnCj0NwSIELRuY05871jAioDMIWmayBX4dxjFa3gCW5T+gJ0cqZomxkRio4HA7PhIqAyWPTEjyWaCiIHtLuKUNdsQEDCPoemTsYqwqJH2t/xghZp55mASjCgAx5BJVhXCyAh9v1cOrxJJHgRvoQSEE9NHVBxaLQmAaXS3tyZtmsiQIv0IZQA5QiNJaLWF3i9GZUgoY3lSQqLXHC1L7EEgPfEkHkLCKjq2ZHMt5MGlFDnP1nCRz4BFR3cmWA8nVxZ0lc6AQpriKxexF6EMRYMmpjuGyIS5wDyCYAIXlpiDKDMOUBdCIilptZrOPSQBXPbFGU2MucAdSEAEh+BJvigQMfSbVtc9hygTgSUq8EwI8DNYKQec4C6EeB0NFbvOUDdCHBa8d28MmW8GoULIacLr/VdPeYAvsuAakCy5wC+J6BcBiXOAZqCAJlzgKYgQJE4B2gOApgclvSnqKYhoGmfw17KYCNsfaUDAgIawECQAQ0g3Vchgwzw1XY0AEyQAQ0g3Vchgwzw1XY0AEzLZ8AvatUsX6koA5UAAAAASUVORK5CYII='			
			}
		];

		$scope.homepageContent = {};
		try {
		  $scope.homepageContent = homepageService.getContent();
		} catch (error) {
		  console.error(error);
		}
		//
		$scope.playerContent = {};
		try {
		  $scope.playerContent = homepageService.getPlayerFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerChoices = {};
		try {
		  $scope.playerChoices = homepageService.getPlayerMenuChoices();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerFoods = {};
		try {
		  $scope.playerFoods = homepageService.getPlayerChoicesNutrition();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerGoals = {};
		try {
		  $scope.playerGoals = homepageService.getPlayerChoicesGoals();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerEvals = {};
		try {
		  $scope.playerEvals = homepageService.getPlayerChoicesEvals();
		} catch (error) {
		  console.error(error);
		}
		//
		$scope.coachContent = {};
		try {
		  $scope.coachContent = homepageService.getCoachFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.coachChoices = {};
		try {
		  $scope.coachChoices = homepageService.getCoachMenuChoices();
		} catch (error) {
		  console.error(error);
		}
		//
		$scope.parentContent = {};
		try {
		  $scope.parentContent = homepageService.getParentFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.parentChoices = {};
		try {
		  $scope.parentChoices = homepageService.getParentMenuChoices();
		} catch (error) {
		  console.error(error);
		}
		//
		$scope.goalieContent = {};
		try {
		  $scope.goalieContent = homepageService.getGoalieFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.goalieChoices = {};
		try {
		  $scope.goalieChoices = homepageService.getGoalieMenuChoices();
		} catch (error) {
		  console.error(error);
		}
		//
		$scope.instructorContent = {};
		try {
		  $scope.instructorContent = homepageService.getInstructorFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.instructorChoices = {};
		try {
		  $scope.instructorChoices = homepageService.getInstructorMenuChoices();
		} catch (error) {
		  console.error(error);
		}
	}
]);



