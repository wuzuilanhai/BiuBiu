$(document).ready(function () {
        (function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        })(jQuery);
        var videoId = $.getUrlParam('videoId');
        var videoUrl = $.getUrlParam('videoUrl');
        var videoIntro = $.getUrlParam('videoIntro');
        if (videoUrl.indexOf("rtmp://") == 0) {
            $.ajax({
                url: 'http://localhost:8080/video/getOnUpcomingChannels',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                data: {},
                timeout: 5000,    //超时时间
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    $("#upcoming").empty();
                    $.each(data, function (i, video) {
                        $("#upcoming").append(
                            '<div class="single-right-grids">' +
                            '    <div class="col-md-4 single-right-grid-left">' +
                            '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img src="' + video.realUrl + '" alt=""/></a>' +
                            '   </div>' +
                            '   <div class="col-md-8 single-right-grid-right">' +
                            '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '" class="title"> ' + video.name + '</a>' +
                            '<p class="author"><a href="#" class="author">John Maniya</a></p>' +
                            '<p class="views">' + video.views + ' views</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '   </div>'
                        );
                    });
                },
                error: function (xhr, textStatus) {
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                }
            });
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
            $.ajax({
                url: 'http://localhost:8080/video/getRecentlyVideos',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                data: {
                    "pageNum": 1,
                    "pageSize": 10
                },
                timeout: 5000,    //超时时间
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    $("#upcoming").empty();
                    $.each(data, function (i, video) {
                        $("#upcoming").append(
                            '<div class="single-right-grids">' +
                            '    <div class="col-md-4 single-right-grid-left">' +
                            '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img src="' + video.realUrl + '" alt=""/></a>' +
                            '   </div>' +
                            '   <div class="col-md-8 single-right-grid-right">' +
                            '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '" class="title"> ' + video.name + '</a>' +
                            '<p class="author"><a href="#" class="author">John Maniya</a></p>' +
                            '<p class="views">' + video.views + ' views</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '   </div>'
                        );
                    });
                },
                error: function (xhr, textStatus) {
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                }
            });
            $("#videoDiv").empty();
            $("#videoDiv").append(
                '<iframe id="iframeVideo" src="' + videoUrl + '" allowfullscreen></iframe>'
            );
        }

        var comments = {};
        comments["videoId"] = videoId;
        if ($.getUrlParam('pageNum') == undefined || $.getUrlParam('pageNum') == "") {
            comments["pageNum"] = 1;
        } else {
            comments["pageNum"] = $.getUrlParam('pageNum');
        }
        if ($.getUrlParam('pageSize') == undefined || $.getUrlParam('pageSize') == "") {
            comments["pageSize"] = 10;
        } else {
            comments["pageSize"] = $.getUrlParam('pageSize');
        }
        $.ajax({
            url: "http://localhost:8080/comment/getCommentsByVideoMsg",
            type: 'POST', //GET
            async: true,    //或false,是否异步
            data: comments,
            timeout: 5000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                $("#showCommentDiv").empty();
                $.each(data, function (i, comment) {
                    $("#showCommentDiv").append(
                        '<div class="media" id="' + comment.id + '">' +
                        '<h5>' + comment.userName + '</h5>' +
                        '<div class="media-left">' +
                        '   <a href="#">' +
                        '' +
                        '   </a>' +
                        '   </div>' +
                        '   <div class="media-body">' +
                        '   <p>' + comment.content + '</p>' +
                        '<span>View all posts by :<a href="#"> ' + comment.userName + ' </a><a href="javascript:void(0);" id="reply' + comment.id + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply</a></span>' +
                        '    </div>' +
                        '   </div>'
                    );
                    if (comment.commentChildList != null) {
                        $.each(comment.commentChildList, function (i, child) {
                            $("#showCommentDiv").append(
                                '<div class="media" style="padding-left: 4em;" id="' + child.id + '">' +
                                '<h5>' + child.userName + '</h5>' +
                                '<div class="media-left">' +
                                '   <a href="#">' +
                                '' +
                                '   </a>' +
                                '   </div>' +
                                '   <div class="media-body">' +
                                '   <p>' + child.content + '</p>' +
                                '<span>View all posts by :<a href="#"> ' + child.userName + ' </a><a href="javascript:void(0);" id="reply' + comment.id + "_" + i + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply</a></span>' +
                                '    </div>' +
                                '   </div>'
                            );
                        });
                    }
                });

                $("a[id^='reply']").click(function () {
                    var id = $(this).attr("id").substr(5);
                    if ($(this).text().trim() == "cancel") {
                        $(this).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply");
                        $(this).next().remove();
                    } else if ($(this).text().trim() == "reply") {
                        $(this).after(
                            '<div class="box" id="commentChildDiv' + id + '">' +
                            '    <form id="sendCommentChildForm' + id + '" action="http://localhost:8080/comment/addCommentChild" method="post">' +
                            '   <textarea placeholder="Message" required="required" maxlength="140" id="contentMsg' + id + '"></textarea>' +
                            '   <input type="submit" value="SEND">' +
                            '   <div class="clearfix"></div>' +
                            '   </form>' +
                            '   </div>'
                        );
                        $(this).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cancel");

                        $("form[id^='sendCommentChildForm']").on("submit", function (ev) {
                            if (!localStorage.getItem("userId")) {
                                alert("用户还未登录!");
                                ev.preventDefault();
                                return;
                            }
                            var id = $(this).attr("id").substr(20);
                            var parentId = id.split("_");
                            var contentId = "#contentMsg" + id;
                            var url = $(this).attr("action");
                            var params = {};
                            params["content"] = $(contentId).val();
                            params["parentId"] = parentId[0];
                            params["userId"] = localStorage.getItem("userId");
                            params["userName"] = localStorage.getItem("userRealName");
                            $.ajax({
                                url: url,
                                type: 'POST', //GET
                                async: true,    //或false,是否异步
                                data: params,
                                timeout: 5000,    //超时时间
                                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                                success: function (data, textStatus, jqXHR) {
                                    console.log(data);
                                    console.log(textStatus);
                                    console.log(jqXHR);
                                    if (data.status == "success") {
                                        alert("评论成功!");
                                        window.location.reload();
                                    } else if (data.status == "fail") {
                                        alert("评论失败!");
                                    }
                                },
                                error: function (xhr, textStatus) {
                                    console.log('错误');
                                    console.log(xhr);
                                    console.log(textStatus);
                                }
                            });
                            ev.preventDefault();
                        });

                    }
                });

            },
            error: function (xhr, textStatus) {
                console.log('错误');
                console.log(xhr);
                console.log(textStatus);
            }
        });

        $("#sendComment").on("submit", function (ev) {
            if (!localStorage.getItem("userId")) {
                alert("用户还未登录!");
                ev.preventDefault();
                return;
            }
            var url = $("#sendComment").attr("action");
            var params = {};
            params["content"] = $("#comment_msg").val();
            params["hasChild"] = 0;
            params["userId"] = localStorage.getItem("userId");
            params["userName"] = localStorage.getItem("userRealName");
            params["videoId"] = videoId;
            $.ajax({
                url: url,
                type: 'POST', //GET
                async: true,    //或false,是否异步
                data: params,
                timeout: 5000,    //超时时间
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    if (data.status == "success") {
                        alert("评论成功!");
                        window.location.reload();
                    } else if (data.status == "fail") {
                        alert("评论失败!");
                    }
                },
                error: function (xhr, textStatus) {
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                }
            });
            ev.preventDefault();
        });

    }
);