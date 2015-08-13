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
        if (!yearMap[year]) {
            yearMap[year]  = [post];
        }
        else {
            while( yearMap[year][index] && (post.date.valueOf() < yearMap[year][index].date.valueOf()) ){
                index++;
            }
            yearMap[year].splice(index, 0, post);
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

    //console.log(yearPosts);

    hexo.locals.set('yearPosts', yearPosts);
});

console.log('INFO Format data end');
