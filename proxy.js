var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/XCS60',
  target: 'http://127.0.0.1:8103',
  secure: false
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);

//https://stackoverflow.com/questions/53473754/angular-7-app-getting-cors-error-from-angular-client