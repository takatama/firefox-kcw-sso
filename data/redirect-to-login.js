var loginUrl = 'kcw.kddi.ne.jp/login.php';

var isLoginUrlWithoutCompanyCode = function (url) {
    return url.indexOf(loginUrl) >= 0 && url.indexOf('&s=') < 0;
}

if (isLoginUrlWithoutCompanyCode(document.URL)) {
    self.port.emit('getCompanyCode');
}

var withCompanyCode = function(url, companyCode) {
    var query = 's=' + companyCode;
    if (url.indexOf(query) < 0) {
        if (url.indexOf('#!') < 0) {
            return url + '&' + query;
        }
        var urls = url.split('#!');
        return urls[0] + '&' + query + '#!' + urls[1];
    }
    return url;
};

self.port.on('onCompanyCode', function (data) {
    if (!isLoginUrlWithoutCompanyCode(document.URL)) {
        return;
    }
    if (!data.companyCode) {
        alert(data.alertMessage);
        return;
    }
    document.location = withCompanyCode(document.URL, data.companyCode);
});
