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

            $.each(data.recentlyVideos, function (i, video) {
                $("#recentlyVideo").after(
                    '<div class="col-md-4 resent-grid recommended-grid slider-top-grids">' +
                    '<div class="resent-grid-img recommended-grid-img">' +
                    '<a href="single.html?videoId='+video.id+'"><img src="' + video.realUrl + '" alt=""/></a>' +
                    '<div class="time">' +
                    '<p>' + video.duration + '</p>' +
                    '</div>' +
                    ' <div class="clck">' +
                    ' <span class="glyphicon glyphicon-time" aria-hidden="true"></span>' +
                    '  </div>' +
                    ' </div>' +
                    '  <div class="resent-grid-info recommended-grid-info">' +
                    '   <h3><a href="single.html?videoId='+video.id+'&videoUrl='+video.url+'" class="title title-info">' + video.remark + '</a></h3>' +
                    '<ul>' +
                    '<li><p class="author author-info"><a href="#" class="author">John Maniya</a></p></li>' +
                    '<li class="right-list"><p class="views views-info">' + video.views + ' views</p></li>' +
                    '</ul>' +
                    '</div>' +
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

    $("#loginForm").on("submit", function (ev) {
        var url = $("#loginForm").attr("action");
        var params = {};
        var loginAccout = $("#loginForm input[name=loginAccout]").val();
        if (/^0?1[3|4|5|8][0-9]\d{8}$/.test(loginAccout)) {
            params["loginPhone"] = loginAccout;
        } else {
            params["loginEmail"] = loginAccout;
        }
        params["loginPassword"] = $("#loginForm input[name=loginPassword]").val();
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
                if (data.message == "success") {
                    localStorage.setItem("userId", data.user.id);
                    localStorage.setItem("userEmail", data.user.loginEmail);
                    localStorage.setItem("userPhone", data.user.loginPhone);
                    localStorage.setItem("userRealName", data.user.realName);
                    localStorage.setItem("token", data.token);
                    //页面设置
                    window.location.replace("http://localhost:63342/BiuBiu/index.html");
                } else if (data.message == "fail") {
                    alert("用户名或密码错误!");
                    $("#loginForm input[name=loginPassword]").val("");
                    $("#loginForm input[name=loginAccout]").focus();
                    $("#loginForm input[name=loginAccout]").select();
                }
            },
            error: function (xhr, textStatus) {
                console.log('错误');
                console.log(xhr);
                console.log(textStatus);
            }
        });
        //阻止submit表单提交
        ev.preventDefault();
        //或者return false
    });

    $("#registerForm").on("submit", function (ev) {
        var url = $("#registerForm").attr("action");
        var params = {};
        params["loginPhone"] = $("#registerForm input[name=loginPhone]").val();
        params["loginEmail"] = $("#registerForm input[name=loginEmail]").val();
        params["loginPassword"] = $("#registerForm input[name=loginPassword]").val();
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
                    alert("注册成功!");
                    window.location.replace("http://localhost:63342/BiuBiu/index.html");
                } else if (data.status == "fail,the accout has exist!") {
                    alert("帐号已存在!")
                    $("#registerForm input[name=loginPhone]").val("");
                    $("#registerForm input[name=loginEmail]").val("");
                    $("#registerForm input[name=loginPassword]").val("");
                    $("#registerForm input[name=loginPhone]").focus();
                } else if (data.status == "fail") {
                    alert("注册失败!");
                    $("#registerForm input[name=loginPhone]").val("");
                    $("#registerForm input[name=loginEmail]").val("");
                    $("#registerForm input[name=loginPassword]").val("");
                    $("#registerForm input[name=loginPhone]").focus();
                }
            },
            error: function (xhr, textStatus) {
                console.log('错误');
                console.log(xhr);
                console.log(textStatus);
            }
        });
        //阻止submit表单提交
        ev.preventDefault();
        //或者return false
    });

    if (localStorage.getItem("userId")) {
        $("#signInDiv").hide();
        $("#signUpDiv").hide();
        $("#uploadDiv").after(
            '<div class="signin">' +
            '<a href="javascript:void(0);" id="showUser" class="play-icon popup-with-zoom-anim">' + localStorage.getItem("userRealName") + '</a>' +
            '</div>' +
            '<div class="signin">' +
            '<a href="javascript:void(0);" id="signout" class="play-icon popup-with-zoom-anim">Sign Out</a>' +
            '</div>'
        );
    }

    $("#signout").click(function () {
        $.ajax({
            url: "http://localhost:8080/user/logout",
            type: 'POST', //GET
            async: true,    //或false,是否异步
            data: {
                "loginEmail": localStorage.getItem("userEmail"),
                "loginPhone": localStorage.getItem("userPhone"),
                "id": localStorage.getItem("userId")
            },
            timeout: 5000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                if (data.status == "success") {
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userPhone");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");
                    alert("注销成功!");
                    window.location.replace("http://localhost:63342/BiuBiu/index.html");
                } else if (data.status == "fail") {
                    alert("注销失败!")
                    window.location.replace("http://localhost:63342/BiuBiu/index.html");
                }
            },
            error: function (xhr, textStatus) {
                console.log('错误');
                console.log(xhr);
                console.log(textStatus);
            }
        });
    });

});