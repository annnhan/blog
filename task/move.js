/**
 * Created by an.han on 15/8/6.
 */
var fs = require('fs');
var path = require('path');
var child = require('child_process');
var postPath = path.resolve(__dirname, '../source/_posts');
var postSourcePath = path.resolve(__dirname, '../source/_posts_source');
var countMap = {};
var count = 0;

function move(dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var fileName = path.resolve(dir, file);
        if (fs.statSync(fileName).isDirectory()) {
            move(fileName);
        }
        else {
            if (countMap[file]) {
                countMap[file] += 1;
                file = path.basename(file, path.extname(file)) + countMap[file] + path.extname(file);
            }
            else {
                countMap[file] = 1;
            }
            var newName = path.resolve(postPath, file);
            var content = fs.readFileSync(fileName);
            fs.writeFileSync(newName, content);
            count++;
            //console.log('INFO  Moved:', file);
        }
    });
}

module.exports = function () {
    if (!fs.existsSync(postPath)) {
        fs.mkdirSync(postPath);
    }

    console.log('INFO  Clearing _posts folder...');
    child.execSync('rm -r *', {cwd: postPath});

    console.log('INFO  Move files from _posts_source folder to _posts folder...');
    move(postSourcePath);
    console.log('INFO  ' + count + ' files moved.');

};
