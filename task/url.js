/**
 * Created by an.han on 15/8/6.
 */
var fs = require('fs');
var path = require('path');
var child = require('child_process');
var publicPath = path.resolve(__dirname, '../public');
var urlsFile = path.resolve(__dirname, '../urls.txt');

var urls = [
    'http://www.annn.me/',
];
var domain = urls[0];

var exclud = {
    'wp-content': true,
    'js': true,
    'css': true,
    'assets': true
}

var deep = {
    'page': true,
    'tag': true,
    'categorie': true
}

function getUrls(dir, pathdir) {
    pathdir = pathdir || '';
    fs.readdirSync(dir).forEach(function (file) {
        var fileName = path.resolve(dir, file);
        if (fs.statSync(fileName).isDirectory()) {
            if (!(file in exclud)) {
                if (file in deep) {
                    getUrls(fileName, file + '/');
                }
                else {
                    urls.push(domain + pathdir + file);
                }
            }
        }
    })
}

var curl = 'curl -H "Content-Type:text/plain" ' +
    '--data-binary @urls.txt ' +
    '"http://data.zz.baidu.com/urls?site=www.annn.me&token=VS3YuUk5EU0maJSS"'
module.exports = function () {
    getUrls(publicPath);
    fs.writeFileSync(urlsFile, urls.join('\n'));
    child.execSync(curl, {cwd: path.resolve(__dirname, '..')});
};
