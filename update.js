var https = require('https');

var UpdateModule = {
    init: (success, error) => { // 回调缺省时候的处理 success = success || function () {};
        error = error || function() { };
        let url = 'https://raw.githubusercontent.com/EaglesoftZJ/iGemDesktop/master/package.json?r=' + Math.random();
        https.get(url, function(res) {
            let statusCode = res.statusCode;
            if (statusCode !== 200) { // 出错回调 error(); // 消耗响应数据以释放内存 res.resume();
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', function(chunk) {
                rawData = JSON.parse(chunk);
            }); // 请求结束 res.on('end', function () { // 成功回调 success(rawData);
        }).on('error', function(e) { // 出错回调 error();
        });
    }
};


module.exports = UpdateModule;

