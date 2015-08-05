/**
 * Created by an.han on 15/8/1.
 */

var fs = require('fs');
var path = require('path');
var postPath = path.resolve(__dirname, '../source/_posts');

function rename(dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var fileName = path.resolve(dir, file);
        if (fs.statSync(fileName).isDirectory()) {
            rename(fileName);
        }
        else {
            var newName = file.replace(/^\d{4}-\d{2}-\d{2}-/, '');
            newName = path.resolve(dir, newName);
            fs.renameSync(fileName, newName);
        }
    });
}

module.exports = function () {
    rename(postPath);
}