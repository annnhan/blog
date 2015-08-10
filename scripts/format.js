/**
 * Created by an.han on 15/8/8.
 */
var fs = require('fs');
var path = require('path');

console.log('INFO Format data start');

hexo.on('generateBefore', function () {
    var yearPosts = [];
    var yearMap = {};
    hexo.locals.get('posts').each(function (post) {
        var year = post.date.year();
        var index = 0;
        var arr = yearMap[year];
        if (!arr) {
            arr = yearMap[year] = [post];
        }
        else {
            while( arr[index] && (post.date.valueOf() < arr[index].date.valueOf()) ){
                index++;
            }
            arr.splice(index, 0, post);
        }
    });

    for (var year in yearMap) {
        yearPosts.push({
            year: year,
            posts: yearMap[year]
        });
    }

    var yearPosts = yearPosts.sort(function (a, b) {
        return b.year - a.year;
    });


    //var json = JSON.stringify(yearPosts, null, 4);
    //var dir = path.resolve(__dirname, '../.local_object');
    //fs.writeFileSync(path.resolve(dir, 'yearPosts.json'), json);

    hexo.locals.set('yearPosts', yearPosts);
});

console.log('INFO Format data end');
