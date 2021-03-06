/*!
 * CookieAlert v1.2
 * http://cookiealert.sruu.pl/
 *
 * Created by Paweł Klockiewicz
 * http://klocus.pl/
 */
var CookieAlert = {
	defines : {
		divID: 'CookieAlert',
		cookieName: 'agreeCookies',
		cookieValue: 'yes',
		cookieExpire: 3
	},
	options : {
		style: 'dark',
		position: 'bottom',
		opacity: 1,
		displayTime: 0,
		text: 'Ten serwis wykorzystuje pliki cookies. Korzystanie z witryny oznacza zgodę na ich zapis lub odczyt wg ustawień przeglądarki.',
		cookiePolicy: 'http://cookiealert.sruu.pl/o-ciasteczkach'
	},
    setCookie : function(name, value, expire) {
		document.cookie = name + "=" + escape(value) + ((expire===null)?"":("; expires=" + expire.toGMTString())) + "; path=/";
	},
	checkCookie : function(name) {
		if (document.cookie!=="") {
			var toCookie=document.cookie.split("; ");
			for (i=0; i<toCookie.length; i++) {
				var CookieName=toCookie[i].split("=")[0];
				var CookieValue=toCookie[i].split("=")[1];
				if (CookieName==name) return unescape(CookieValue);
			}
		}
	},
	removeDiv : function(divID) {
		var div = document.getElementById(divID);
		document.body.removeChild(div);
		var expire = new Date();
		expire.setMonth(expire.getMonth()+this.defines.cookieExpire);
		this.setCookie(this.defines.cookieName,this.defines.cookieValue,expire);
	},
	fadeOut : function(opacity, divID) {
		div = document.getElementById(divID);
		div.style.opacity = opacity / 100;
		div.style.filter = 'alpha(opacity=' + opacity + ')';
		if (opacity == 1) {
			div.style.display = 'none';
			done = true;
		}
	},
	init : function(options) {
		var CA = CookieAlert;
		window.onload = function() {
			/* Overide standard options */
			for(var key in options) {
				CA.options[key] = options[key];
			}
			
			/* Create div with allert */
			var div = document.createElement('div');
			div.setAttribute('id',CA.defines.divID);
			
			/* Add style to created div */
			var style = 'position:fixed;'+ CA.options.position +':-1px;left:0px;right:0px;width:100%;z-index:1000;padding:10px;font-family:Arial;font-size:14px;opacity:'+ CA.options.opacity +';';
			switch(CA.options.style)
			{
			  case 'light': style += 'background-color:#FFF; color:#373737; text-shadow: 1px 1px 0px rgba(0,0,0,0.1); border-top:1px solid #ccc; border-bottom:1px solid #ccc; box-shadow:0px 0px 8px rgba(0, 0, 0, 0.15);'; break;
			  case 'dark':  style += 'background-color:#1b1b1b; color:#999; text-shadow: 1px 1px 0px rgba(255,255,255,0.1); border-top:1px solid #444; border-bottom:1px solid #444; box-shadow:0px 0px 8px rgba(0, 0, 0, 0.15);'; break;
			}
			div.setAttribute('style',style);
			
			/* Buttons */
			var buttons = '<div style="width:52px;display:inline-block;vertical-align:middle;text-align:right;">';
/*			buttons += '<a href="'+ CA.options.cookiePolicy +'"><img src="cookiealert/images/'+ CA.options.style +'/info.png" style="border:0;" title="Informacje o ciasteczkach"/></a>';*/
			buttons += '<img src="cookiealert/images/'+ CA.options.style +'/close.png" id="CookieAlertClose" style="border:0;cursor:pointer;margin-left:8px;" title="Zamknij komunikat"/>';
			buttons += '</div>';
			
			/* Add content to created div */
			var content = '<div style="width:calc(100% - 72px);display:inline-block;vertical-align:middle;text-align:center;">' + CA.options.text + '</div>' + buttons;
			div.innerHTML = content;
			
			/* Add div with allert to website */
			if(CA.checkCookie(CA.defines.cookieName)!=CA.defines.cookieValue) {
				document.body.appendChild(div);
				document.getElementById('CookieAlertClose').addEventListener('click', function(){CA.removeDiv(CA.defines.divID);}, false);
				if(CA.options.displayTime > 0) {
					setTimeout(function() {
						for (var i = 100; i >= 1; i--) {
							setTimeout("CookieAlert.fadeOut("+i+", CookieAlert.defines.divID)", (i - 100) * -1 * 5);
						}
					},CA.options.displayTime);
				}
			}
		}
	}
	
};