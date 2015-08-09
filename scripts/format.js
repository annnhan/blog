/**
 * Created by an.han on 15/8/8.
 */

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
    hexo.locals.set('yearPosts', yearPosts.sort(function (a, b) {
        return b.year - a.year;
    }));
});

console.log('INFO Format data end');
