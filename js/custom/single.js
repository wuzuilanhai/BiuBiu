$(document).ready(function () {
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);
    var videoUrl = $.getUrlParam('videoUrl');
    if (videoUrl.indexOf("rtmp://") == 0) {
        $("#videoDiv").empty();
        $("#videoDiv").append(
            '<a id="player" style="display:block;width:100%;height:360px;"></a>'
        );
        str = videoUrl;
        arr = str.split('/');
        protocol = arr[0];
        server = arr[2];
        app = arr[3];
        playpath = arr[4];
        flowplayer("player", "flowplayer/flowplayer-3.2.8.swf", {
            clip: {
                url: playpath,
                provider: "rtmp",
                live: "true"
            },
            plugins: {
                rtmp: {
                    url: "flowplayer/flowplayer.rtmp-3.2.8.swf",
                    netConnectionUrl: protocol + "//" + server + "/" + app
                },
                controls: {
                    bottom: 0,
                    height: 24,
                    zIndex: 1,
                    fontColor: "#ffffff",
                    timeFontColor: "#333333",
                    playlist: true,//上一个、下一个按钮
                    play: true,//开端按钮
                    volume: true,//音量按钮
                    mute: true,//静音按钮
                    stop: true,//停止按钮
                    fullscreen: true, //全屏按钮
                    scrubber: true,//进度条
                    url: "flowplayer/flowplayer.controls-3.2.8.swf",//决意功能条的显示样式（功能条swf文件，按照项目定亦可引用:http://releases.flowplayer.org/swf/flowplayer.controls-3.2.12.swf）
                    time: true,//是否显示时候信息
                    autoHide: true,//功能条是否主动隐蔽
                    backgroundColor: "＃aedaff",//靠山色彩
                    backgroundGradient: [0.1, 0.1, 1.0],//靠山色彩渐变度（等分的点渐变）
                    opacity: 0.5,//功能条的透明度
                    borderRadius: "30",//功能条边角
                    tooltips: {
                        buttons: true,//是否显示
                        fullscreen: "全屏",//全屏按钮，鼠标指上时显示的文本
                        stop: "停止",
                        play: "开端",
                        volume: "音量",
                        mute: "静音",
                        next: "下一个",
                        previous: "上一个"
                    }
                }
            }
        });
    } else {
        $("#videoDiv").empty();
        $("#videoDiv").append(
            '<iframe id="iframeVideo" src="' + videoUrl + '" allowfullscreen></iframe>'
        );
    }
});