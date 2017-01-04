$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/video/getHistoryVideo",
        type: 'POST', //GET
        async: true,    //或false,是否异步
        data: {
            "pageNum": 1,
            "pageSize": 5,
            "userId": localStorage.getItem("userId")
        },
        timeout: 5000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);

            $(".history-text").nextAll().remove();

            $.each(data.list, function (i, video) {
                $(".recommended-info").append(
                    '<div class="history-grids">' +
                    '    <div class="col-md-1 history-left" style="padding: 0em;padding-top: 10.36px">' +
                    '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img style="max-width:100%;max-height:100%" src="' + video.realUrl + '" alt=""/></a>' +
                    '   </div>' +
                    '   <div class="col-md-11 history-right">' +
                    '   <h5><a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '">' + video.remark + '</a></h5>' +
                    '<p>' + video.intro + '</p>' +
                    '</div>' +
                    '<div class="clearfix"></div>' +
                    '   </div>'
                );
            });

            $(".recommended-info").after(
                '<ul class="pagination">' +
                ' <li><a href="javascript:void(0);"  id="prev' + data.pageNum + '">&laquo;</a></li>'
            );

            if (data.total <= 0) {
                return;
            }

            for (var i = 1; i <= data.total; i++) {
                $(".pagination").append(
                    '<li><a href="javascript:void(0);" id="current' + i + '">' + i + '</a></li>'
                );
            }

            $(".pagination").append(
                '<li><a href="javascript:void(0);" id="next' + data.pageNum + '">&raquo;</a></li>' +
                '</ul>'
            );

            $("a[id^=prev]").click(function () {
                var id = $(this).attr("id").substr(4) - 1;
                if (id <= 0) {
                    id = 1;
                }

                $.ajax({
                    url: "http://localhost:8080/video/getHistoryVideo",
                    type: 'POST', //GET
                    async: true,    //或false,是否异步
                    data: {
                        "pageNum": id,
                        "pageSize": 5,
                        "userId": localStorage.getItem("userId")
                    },
                    timeout: 5000,    //超时时间
                    dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        console.log(textStatus);
                        console.log(jqXHR);

                        $(".history-text").nextAll().remove();

                        $.each(data.list, function (i, video) {
                            $(".recommended-info").append(
                                '<div class="history-grids">' +
                                '    <div class="col-md-1 history-left" style="padding: 0em;padding-top: 10.36px">' +
                                '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img style="max-width:100%;max-height:100%" src="' + video.realUrl + '" alt=""/></a>' +
                                '   </div>' +
                                '   <div class="col-md-11 history-right">' +
                                '   <h5><a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '">' + video.remark + '</a></h5>' +
                                '<p>' + video.intro + '</p>' +
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

            });

            $("a[id^=current]").click(function () {
                var id = $(this).attr("id").substr(7);
                $.ajax({
                    url: "http://localhost:8080/video/getHistoryVideo",
                    type: 'POST', //GET
                    async: true,    //或false,是否异步
                    data: {
                        "pageNum": id,
                        "pageSize": 5,
                        "userId": localStorage.getItem("userId")
                    },
                    timeout: 5000,    //超时时间
                    dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        console.log(textStatus);
                        console.log(jqXHR);

                        $(".history-text").nextAll().remove();

                        $.each(data.list, function (i, video) {
                            $(".recommended-info").append(
                                '<div class="history-grids">' +
                                '    <div class="col-md-1 history-left" style="padding: 0em;padding-top: 10.36px">' +
                                '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img style="max-width:100%;max-height:100%" src="' + video.realUrl + '" alt=""/></a>' +
                                '   </div>' +
                                '   <div class="col-md-11 history-right">' +
                                '   <h5><a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '">' + video.remark + '</a></h5>' +
                                '<p>' + video.intro + '</p>' +
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

            });

            $("a[id^=next]").click(function () {
                var id = $(this).attr("id").substr(4) + 1;
                if (id >= data.total) {
                    id = data.total;
                }

                $.ajax({
                    url: "http://localhost:8080/video/getHistoryVideo",
                    type: 'POST', //GET
                    async: true,    //或false,是否异步
                    data: {
                        "pageNum": id,
                        "pageSize": 5,
                        "userId": localStorage.getItem("userId")
                    },
                    timeout: 5000,    //超时时间
                    dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        console.log(textStatus);
                        console.log(jqXHR);

                        $(".history-text").nextAll().remove();

                        $.each(data.list, function (i, video) {
                            $(".recommended-info").append(
                                '<div class="history-grids">' +
                                '    <div class="col-md-1 history-left" style="padding: 0em;padding-top: 10.36px">' +
                                '   <a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '"><img style="max-width:100%;max-height:100%" src="' + video.realUrl + '" alt=""/></a>' +
                                '   </div>' +
                                '   <div class="col-md-11 history-right">' +
                                '   <h5><a href="single.html?videoId=' + video.id + '&videoUrl=' + video.url + '&videoIntro=' + video.intro + '">' + video.remark + '</a></h5>' +
                                '<p>' + video.intro + '</p>' +
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

            });

        },
        error: function (xhr, textStatus) {
            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
        }
    });

});