function activate (content) {
    goby.registerCommand('ScanFromFile', function (content) {
        let path = __dirname + '/index.html'
        goby.showIframeDia(path, 'ScanFromFile', '666', '500')
    });
}

exports.activate = activate;