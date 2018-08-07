//引入gulp和gulp插件
var gulp = require('gulp');
var rev = require('gulp-rev');
var replace = require('gulp-replace');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');


var buildBasePath = '../zixun_h5/';//构建输出的目录
var revPath = 'rev/';//版本号更改映射地址,必填


// var buildBasePath = '/usr/local/scode/pack_gulp/zixun_h5/';//构建输出的目录
// var revPath = '/usr/local/scode/pack_gulp/rev/';//版本号更改映射地址,必填

var repStatic = '//static-1256413295.cos.ap-guangzhou.myqcloud.com/';//替换前的地址
var webSite = '/Static/';//替换后的地址

var repLocalStatic = '/Static/';//开发地址->替换前的地址
var webOnlineSite = '//static-1256413295.cos.ap-guangzhou.myqcloud.com/';//线上地址->替换后的地址

/********************************************静态替换**************************/
//开发使用，替换静态文件为开发地址
gulp.task('repLocalHtmlDev', function(){
    gulp.src([buildBasePath+'**/*.js','!gulpfile.js',buildBasePath+'**/*.css',buildBasePath+'**/*.html'])
        .pipe(replace(repStatic, webSite))
        .pipe(gulp.dest(buildBasePath));
});
//线上使用，替换静态文件为线上地址
gulp.task('repOnlineHtmlDev', function(){
    gulp.src([buildBasePath+'**/*.js','!gulpfile.js',buildBasePath+'**/*.css',buildBasePath+'**/*.html'])
        .pipe(replace(repLocalStatic, webOnlineSite))
        .pipe(gulp.dest(buildBasePath));
});
/********************************************静态替换**************************/

//CSS生成文件hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src([buildBasePath+'**/*.css'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(revPath+'css'));
});

//js生成文件hash编码并生成rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src([buildBasePath+'**/*.js'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(revPath+'js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', function(){
    return gulp.src(['rev/**/*.json',buildBasePath+'**/*.js',buildBasePath+'**/*.css',buildBasePath+'**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(buildBasePath));
});

//替换->本地开发
gulp.task('default', function (done) {
    condition = false;
    runSequence(
        ['repLocalHtmlDev'],
        done);
});
//替换->线上环境
gulp.task('online', function (done) {
    condition = false;
    runSequence(
        ['repOnlineHtmlDev'],
        done);
});
//版本号
gulp.task('rev', function (done) {
    condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});
