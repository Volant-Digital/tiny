//regular expressions to extract IP and country values
const countryCodeExpression = /loc=([\w]{2})/;
const userIPExpression = /ip=([\w\.]+)/;

//automatic country determination.
function initCountry() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 3000;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    countryCode = countryCodeExpression.exec(this.responseText)
                    ip = userIPExpression.exec(this.responseText)
                    if (countryCode === null || countryCode[1] === '' ||
                        ip === null || ip[1] === '') {
                        reject('IP/Country code detection failed');
                    }
                    let result = {
                        "countryCode": countryCode[1],
                        "IP": ip[1]
                    };
                    resolve(result)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.ontimeout = function () {
            reject('timeout')
        }
        xhr.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace', true);
        xhr.send();
    });
}	


window.addEventListener("load", function() {
	initCountry().then(result => {let cc = result;sendReport(cc);})
});

// window.onload = function() {
function sendReport(cc) {
    // assign random uuid
    if (sessionStorage.uuid) {
          uuid = sessionStorage.uuid;
		} else {
          var uuid = Math.random().toString(16).slice(-8);
          sessionStorage.uuid = uuid;
    }
    
    // calculate client metrics
	
var ref = document.referrer
// Set default value
ref = ref || 'Direct';
	
    var time = window.performance.timing;
    var ttfb = time.responseStart - time.navigationStart;
    var onload = time.loadEventStart - time.navigationStart;
    var dcl = time.domContentLoadedEventEnd - time.navigationStart;
    
    // add + metrics & aggregate into an object
    var perfdat = { url: window.location.href, ttfb: ttfb, dcl: dcl, onLoad: onload, res: window.screen.width+'x'+window.screen.height, ua: navigator.userAgent, cc: cc.countryCode ,user: uuid, ref: ref};
    
    // report
    async function postName() {
        const response = await fetch('https://log-api.newrelic.com/log/v1?Api-Key=9a0f7d9fe04d8870dbb95efc8096f060FFFFNRAL', {
          mode: 'no-cors',
          method: 'POST',
          body: JSON.stringify(perfdat)
        });
    }
    // do it.
    postName();
	
}
