$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/index',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        data: {
            "pageNum":1,
            "pageSize":3
        },
        timeout: 5000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            // console.log(xhr);
            // console.log('发送前');
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            $("#appendLi").after(
                '<li><a href="#" class="menu1"><span class="glyphicon glyphicon-film" aria-hidden="true"></span>' + data.categoryResultDtoList[0].name + '<span' +
                ' class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a></li>' +
                '<ul class="cl-effect-2">' +
                '<li><a href="movies.html">' + data.categoryResultDtoList[0].categoryList[0].name + '</a></li>' +
                '<li><a href="movies.html">' + data.categoryResultDtoList[0].categoryList[1].name + '</a></li>' +
                '<li><a href="movies.html">' + data.categoryResultDtoList[0].categoryList[2].name + '</a></li>' +
                '</ul>' +
                '<!-- script-for-menu -->' +
                '<script>' +
                '$("li a.menu1").click(function () {' +
                ' $("ul.cl-effect-2").slideToggle(300, function () {' +
                // Animation complete.'+
                '   });' +
                '  });' +
                '</script>' +
                '<li><a href="#" class="menu"><span class="glyphicon glyphicon-film glyphicon-king"' +
                'aria-hidden="true"></span>' + data.categoryResultDtoList[1].name + '<span' +
                ' class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a></li>' +
                '<ul class="cl-effect-1">' +
                '<li><a href="sports.html">' + data.categoryResultDtoList[1].categoryList[0].name + '</a></li>' +
                ' <li><a href="sports.html">' + data.categoryResultDtoList[1].categoryList[1].name + '</a></li>' +
                '<li><a href="sports.html">' + data.categoryResultDtoList[1].categoryList[2].name + '</a></li>' +
                '</ul>' +
                ' <!-- script-for-menu -->' +
                ' <script>' +
                ' $("li a.menu").click(function () {' +
                ' $("ul.cl-effect-1").slideToggle(300, function () {' +
                // Animation complete.'+
                '});' +
                '  });' +
                '</script>' +
                '<li><a href="movies.html" class="song-icon"><span class="glyphicon glyphicon-music"' +
                ' aria-hidden="true"></span>' + data.categoryResultDtoList[2].name + '</a></li>' +
                '<li><a href="news.html" class="news-icon"><span class="glyphicon glyphicon-envelope"' +
                ' aria-hidden="true"></span>' + data.categoryResultDtoList[3].name + '</a></li>'
            );

            $.each(data.onlineVideos, function (i, video) {
                $("#onlineVideos").after(
                    '<div class="col-md-2 resent-grid recommended-grid show-video-grid">' +
                    '  <div class="resent-grid-img recommended-grid-img">' +
                    '   <a href="single.html?videoId='+video.id+'&videoUrl='+video.url+'&videoIntro='+video.intro+'"><img src="' + video.realUrl + '" alt="" /></a>' +
                    '   <div class="time small-time show-time">' +
                    '   <p></p>' +
                    '</div>' +
                    '<div class="clck show-clock">' +
                    // '   <span class="glyphicon glyphicon-time" aria-hidden="true"></span>'+
                    // '   </div>'+
                    '   </div>' +
                    '   <div class="resent-grid-info recommended-grid-info">' +
                    '   <h5><a href="single.html?videoId='+video.id+'&videoUrl='+video.url+'&videoIntro='+video.intro+'" class="title">' + video.remark + '</a></h5>' +
                    '<p class="author"><a href="#" class="author">John Maniya</a></p>' +
                    '<p class="views">' + video.views + ' views</p>' +
                    '</div>' +
                    '</div>'
                );
            });

            $.each(data.upcomingChannels, function (i, video) {
                $("#upcoming").after(
                    '<div class="show-right-grids">' +
                    '   <ul>' +
                    '  <li class="tv-img"><a href="#"><img src="images/tv.png" alt="" /></a></li>' +
                    '  <li><a href="single.html?videoId='+video.id+'&videoUrl='+video.url+'&videoIntro='+video.intro+'">'+video.name+'</a></li>' +
                    '</ul>' +
                    '</div>'
                );
            });

        },
        error: function (xhr, textStatus) {
            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
        },
        complete: function () {
            // console.log('结束');
        }
    });
});