//数据接口
//var REMOTE_DATA_URL = "//api.debug.content.com";
//var baseurl = '//api.debug.content.com/';
//var REMOTE_LOTOULA_URL = 'api.debug.content.com';

var REMOTE_DATA_URL = "//api.dev.lottery666.com";
var baseurl = '//api.dev.lottery666.com/';
var REMOTE_LOTOULA_URL = 'api.dev.lottery666.com';
var NEWS_DETAIL_URL = "//news.dev.lottery666.com";
var URL = 'https://m.dev.lottery666.com/';
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('j c={b:8(){e(d.a.i){1"6.4.7.0":1"6.4.2.0":5"0.6.2";9;1"4.7.0":1"4.2.0":h:5"0.f.2";9}},g:8(){5 3},}',20,20,'com|case|letoula||m|return|fz|lottery|function|break|location|identity|HCQD|window|switch|houcai|platform|default|host|var'.split('|'),0,{}))


var HCQD = {
    identity: function() {
        switch (window.location.host) {
            case "fz.m.houzi.com":
            case "fz.m.monkey.com":
            case "fz.m.letoula.com":
                return "com.fz.letoula";
                break;
            case "m.houzi.com":
            case "m.monkey.com":
            case "m.letoula.com":
            default:
                return "com.houcai.letoula";
                break
        }
    },
    platform: function() {
        return 3
    }
}
