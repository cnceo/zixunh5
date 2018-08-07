try {
	window.sessionStorage.setItem("test", 'test');
	window.sessionStorage.removeItem("test");
} catch(e) {
	alert("非常抱歉，乐透啦H5站点，暂不支持隐私浏览，您可以使用普通模式继续访问，或升级至最新的手机浏览器");
}

var BASE_DIR = "/";

// 本地路径
var INFO_DIR = "info/draw/";
var AWARD_DIR="info/draw/awardDetail/";
var CHART_DIR = "info/draw/chart/"
var SPORTS_DIR = "trade/sports/";
var DIGITAL_DIR = "trade/digital/";
var KUAIPING_DIR ="trade/kuaiping/";

//首页
var URL_INDEX = BASE_DIR + 'index.html';

// 开奖列表
var URL_INFO_KAIJIANG_JCZQ_LIST = BASE_DIR + AWARD_DIR + "jczq_list.html";
var URL_INFO_KAIJIANG_JCLQ_LIST = BASE_DIR + AWARD_DIR + "jclq_list.html";
var URL_INFO_KAIJIANG_ZQDC_LIST = BASE_DIR + AWARD_DIR + "zqdc_list.html";
var URL_INFO_KAIJIANG_SFC_LIST = BASE_DIR + AWARD_DIR + "sfc_list.html";
var URL_INFO_KAIJIANG_SSQ_LIST = BASE_DIR + AWARD_DIR+"ssq_list.html";
var URL_INFO_KAIJIANG_FC3D_LIST = BASE_DIR + AWARD_DIR + "fc3d_list.html";
var URL_INFO_KAIJIANG_PL3_LIST = BASE_DIR + AWARD_DIR + "pl3_list.html";
var URL_INFO_KAIJIANG_PL5_LIST = BASE_DIR + AWARD_DIR + "pl5_list.html";
var URL_INFO_KAIJIANG_QLC_LIST = BASE_DIR + AWARD_DIR + "qlc_list.html";
var URL_INFO_KAIJIANG_QXC_LIST = BASE_DIR + AWARD_DIR + "qxc_list.html";
var URL_INFO_KAIJIANG_DLT_LIST = BASE_DIR + AWARD_DIR + "dlt_list.html";
var URL_INFO_KAIJIANG_X11x5_LIST = BASE_DIR + AWARD_DIR + "x11X5_list.html";
var URL_INFO_KAIJIANG_GXK3_LIST = BASE_DIR + AWARD_DIR + "gxk3_list.html";
var URL_INFO_KAIJIANG_GXKLSF_LIST = BASE_DIR + AWARD_DIR + "gxklsf_list.html";
// 开奖详情
var URL_INFO_KAIJIANG_SSQ_DETAIL = BASE_DIR + AWARD_DIR + "ssq_detail.html";
var URL_INFO_KAIJIANG_DLT_DETAIL = BASE_DIR + AWARD_DIR + "dlt_detail.html";
var URL_INFO_KAIJIANG_FC3D_DETAIL = BASE_DIR + AWARD_DIR + "fc3d_detail.html";
var URL_INFO_KAIJIANG_PL3_DETAIL = BASE_DIR + AWARD_DIR + "pl3_detail.html";
var URL_INFO_KAIJIANG_PL5_DETAIL = BASE_DIR + AWARD_DIR + "pl5_detail.html";
var URL_INFO_KAIJIANG_X11x5_DETAIL = BASE_DIR + AWARD_DIR + "x11x5_detail.html";
var URL_INFO_KAIJIANG_SFC_DETAIL = BASE_DIR + AWARD_DIR + "sfc_detail.html";
var URL_INFO_KAIJIANG_QLC_DETAIL = BASE_DIR + AWARD_DIR + "qlc_detail.html";
var URL_INFO_KAIJIANG_QXC_DETAIL = BASE_DIR + AWARD_DIR + "qxc_detail.html";
var URL_INFO_KAIJIANG_GXK3_DETAIL = BASE_DIR + AWARD_DIR + "gxk3_detail.html";
var URL_INFO_KAIJIANG_GXKLSF_DETAIL = BASE_DIR + AWARD_DIR + "gxklsf_detail.html";

/***********************详情页***********************/
// 赛事详情页
var URL_TRADE_ANALY = BASE_DIR +"trade/analyse.html";

/******************改版资讯********************/
//资讯首页
var URL_ZIXUN = BASE_DIR +"info/zixun/zixun.html";
//资讯二级栏目（必须参数columnid,scolumnid，scolumnname）
var URL_ZIXUN_SECOND = BASE_DIR +"info/zixun/zixun_second.html";
//资讯详情
var URL_ZIXUN_DETAIL = BASE_DIR +"info/zixun/zixun_detail.html";
//资讯世界杯(type=1 32强阅兵,type=2 全部赛程)
var URL_ZIXUN_WorldCup = BASE_DIR + "info/zixun/zixun_worldCup_team.html"
//资讯走势图(lotyid=10 双色球走势图,lotyid=11 大乐透走势图)
var URL_ZIXUN_ZST = BASE_DIR + "info/zixun/zixun_zst.html"
//资讯开奖
var URL_ZIXUN_KAIJIANG = BASE_DIR + "info/zixun/zixun_award.html"
//资讯直播
var URL_ZIXUN_LIVE = BASE_DIR +"info/zixun/zixun_live.html";




/******************乐透啦********************/
//乐透啦绝对根路径
//var LETOULA_BASE_DIR = "https://m.letoula.com/";
var LETOULA_BASE_DIR = "https://haocai.letoula.cn/";

var HCTAG = "?hctag=subuc"

//乐透啦首页
//var URL_LETOULA = LETOULA_BASE_DIR + HCTAG;
var URL_LETOULA = LETOULA_BASE_DIR ;

/***************交易区*******************/
//竞彩投注页
var URL_TRADE_JCZQ = LETOULA_BASE_DIR + SPORTS_DIR + "jczq/jczq.html" + HCTAG;
var URL_TRADE_JCLQ = LETOULA_BASE_DIR + SPORTS_DIR + "jclq/jclq.html" + HCTAG;
var URL_TRADE_ZQDC = LETOULA_BASE_DIR + SPORTS_DIR + "zqdc/zqdc.html" + HCTAG;
var URL_TRADE_SFC  = LETOULA_BASE_DIR + SPORTS_DIR + "sfc/sfc.html" + HCTAG;
var URL_TRADE_RX9  = LETOULA_BASE_DIR + SPORTS_DIR + "rx9/rx9.html" + HCTAG;
var URL_TRADE_JZDG  = LETOULA_BASE_DIR + SPORTS_DIR + "jzdg/jzdg.html" + HCTAG;
var URL_TRADE_SJB = LETOULA_BASE_DIR + "trade/sports/cup/cup.html" + HCTAG;
//数字彩投注页
var URL_TRADE_SSQ = LETOULA_BASE_DIR + DIGITAL_DIR + "ssq/ssq.html" + HCTAG;
var URL_TRADE_DLT = LETOULA_BASE_DIR + DIGITAL_DIR + "dlt/dlt.html" + HCTAG;
var URL_TRADE_FC3D = LETOULA_BASE_DIR + DIGITAL_DIR + "fc3d/fc3d.html" + HCTAG;
var URL_TRADE_PL3 = LETOULA_BASE_DIR + DIGITAL_DIR + "pl3/pl3.html" + HCTAG;
var URL_TRADE_PL5 = LETOULA_BASE_DIR + DIGITAL_DIR + "pl5/pl5.html" + HCTAG;
var URL_TRADE_QXC = LETOULA_BASE_DIR + DIGITAL_DIR + "qxc/qxc.html" + HCTAG;
var URL_TRADE_QLC = LETOULA_BASE_DIR + DIGITAL_DIR + "qlc/qlc.html" + HCTAG;
//快频
var URL_TRADE_X11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?20" + HCTAG;
var URL_TRADE_Y11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?21" + HCTAG;
var URL_TRADE_SD11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?23" + HCTAG;
var URL_TRADE_SX11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?24" + HCTAG;
var URL_TRADE_QH11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?25" + HCTAG;
var URL_TRADE_GX11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?26" + HCTAG;
var URL_TRADE_JX11x5=LETOULA_BASE_DIR+KUAIPING_DIR+"11x5.html?27" + HCTAG;
var URL_TRADE_11x5 = LETOULA_BASE_DIR + KUAIPING_DIR + "11x5.html" + HCTAG;
var URL_TRADE_K3 = LETOULA_BASE_DIR + KUAIPING_DIR + "k3.html" + HCTAG;
var URL_TRADE_KLSF=LETOULA_BASE_DIR+KUAIPING_DIR+"klsf.html" + HCTAG;
























