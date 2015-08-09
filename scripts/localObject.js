var fs = require('fs');
var path = require('path');
var dir = path.resolve(__dirname, '../.local_object');
var list = ['categories', 'tags'];

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

hexo.on('generateBefore', function () {
    list.forEach(function (item) {
        console.log('INFO Get local object:', item);
        var object = hexo.locals.get(item);
        var json = JSON.stringify(object, null, 4);
        fs.writeFileSync(path.resolve(dir, item + '.json'), json);
    });
});