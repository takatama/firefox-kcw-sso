var _ = require("sdk/l10n").get;

require("sdk/page-mod").PageMod({
    include: '*.kcw.kddi.ne.jp',
    contentScriptFile: './redirect-to-login.js',
    "preferences": [{
        "name": "companyCode",
        "title": "会社コード",
        "description": "専用ログインURL (https://kcw.kddi.ne.jp/s/*) の最後の文字列 (*の部分)です。",
        "type": "string",
        "value": ""
    }],
    onAttach: function (worker) {
        worker.port.on('getCompanyCode', function () {
            var companyCode = require('sdk/simple-prefs').prefs['company_code'];
            worker.port.emit('onCompanyCode', { companyCode: companyCode, alertMessage: _('alert_no_company_code')});
        });
    }
});



