$(document).ready(function () {
    $("#categoryId").on("change", function () {
        if ($(this).val() != 0) {
            $("#categorySelect").next().remove();
            $.ajax({
                url: "http://localhost:8080/category/getChildrenCategory",
                type: 'POST', //GET
                async: true,    //或false,是否异步
                data: {
                    "parentId": $(this).val()
                },
                timeout: 5000,    //超时时间
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    if (data != null) {
                        $("#categorySelect").after(
                            '<ul style="padding-left: 6.8em">' +
                            '    <li class="languages">' +
                            '   <select class="form-control bfh-countries" data-country="US" id="categoryChildrenId">' +
                            '   <option value="0">Select Category</option>' +
                            '   </select></li>' +
                            '   </ul>'
                        );
                        $.each(data, function (i, categoryChild) {
                            $("#categoryChildrenId").append(
                                '   <option value="' + categoryChild.id + '">' + categoryChild.name + '</option>'
                            );
                        });
                    }
                },
                error: function (xhr, textStatus) {
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                }
            });
        }
    })
});