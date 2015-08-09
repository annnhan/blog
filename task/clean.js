/**
 * Created by an.han on 15/8/6.
 */
var child = require('child_process');
var path = require('path');

module.exports = function () {
    console.log(child.execSync('hexo clean', {
        cwd: path.resolve(__dirname, '..')
    }).toString());
}