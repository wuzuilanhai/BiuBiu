$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/index',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        data: {},
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
                '<li><a href="#" class="menu1"><span class="glyphicon glyphicon-film" aria-hidden="true"></span>'+data.categoryResultDtoList[0].name+'<span' +
                ' class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a></li>' +
                '<ul class="cl-effect-2">' +
                '<li><a href="movies.html">'+data.categoryResultDtoList[0].categoryList[0].name+'</a></li>' +
                '<li><a href="movies.html">'+data.categoryResultDtoList[0].categoryList[1].name+'</a></li>' +
                '<li><a href="movies.html">'+data.categoryResultDtoList[0].categoryList[2].name+'</a></li>' +
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
                'aria-hidden="true"></span>'+data.categoryResultDtoList[1].name+'<span' +
                ' class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a></li>' +
                '<ul class="cl-effect-1">' +
                '<li><a href="sports.html">'+data.categoryResultDtoList[1].categoryList[0].name+'</a></li>' +
                ' <li><a href="sports.html">'+data.categoryResultDtoList[1].categoryList[1].name+'</a></li>' +
                '<li><a href="sports.html">'+data.categoryResultDtoList[1].categoryList[2].name+'</a></li>' +
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
                ' aria-hidden="true"></span>'+data.categoryResultDtoList[2].name+'</a></li>' +
                '<li><a href="news.html" class="news-icon"><span class="glyphicon glyphicon-envelope"' +
                ' aria-hidden="true"></span>'+data.categoryResultDtoList[3].name+'</a></li>'
            );

            $.each(data.recentlyVideos,function (i,video) {
                $("#recentlyVideo").after(
                    '<div class="col-md-4 resent-grid recommended-grid slider-top-grids">'+
                    '<div class="resent-grid-img recommended-grid-img">'+
                    '<a href="single.html"><img src="'+video.realUrl+'" alt=""/></a>'+
                    '<div class="time">'+
                    '<p>'+video.duration+'</p>'+
                    '</div>'+
                    ' <div class="clck">'+
                    ' <span class="glyphicon glyphicon-time" aria-hidden="true"></span>'+
                    '  </div>'+
                    ' </div>'+
                    '  <div class="resent-grid-info recommended-grid-info">'+
                    '   <h3><a href="single.html" class="title title-info">'+video.remark+'</a></h3>'+
                    '<ul>'+
                    '<li><p class="author author-info"><a href="#" class="author">John Maniya</a></p></li>'+
                    '<li class="right-list"><p class="views views-info">'+video.views+' views</p></li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>'
                );
            });

            $("#recentlyVideo").after(
            '<div class="clearfix"></div>'
            );

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