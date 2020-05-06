$(document).ready(function () {
    //...................................................CATEGORIES...................................................//

    $("#newscrunch").click(function () {
        $(".list-group").toggle();
    });




    //...................................................MODAL...................................................//
    function showmodal() {
        $('.newsCards').click(function () {
            var index = $(this).index('.newsCards')
            var name = $('#source-' + index).val()
            var img = $('#urlToImage-' + index).val()
            var author = $('#author-' + index).val()
            var title = $('#title-' + index).val()
            var description = $('#description-' + index).val()
            var url = $('#url-' + index).val()
            var publishedAt = $('#publishedAt-' + index).val()
            var content = $('#content-' + index).val()
            $('.modal-body').empty()
            $('.modal-body').append('<div class="row modalrow1"/>')
            $('.modalrow1').append('<div class="col-4 img text-center"></div>')
            $('.img').append('<img src="' + img + '" width="150px">')
            $('.modalrow1').append('<div class="col-8 title"></div>')
            $('.title').append('<h5>' + title + '</h5>')
            $('.title').append('<p>' + name + '</p>')
            $('.modal-body').append('<div class="row modalrow2"/>')
            $('.modalrow1').append('<div class="col-12 mt-3 content"></div>')
            $('.content').append('<p>' + description + '</p>')
            $('.content').append('<a href="' + url + '" class="btn btn-sm btn-outline-dark w-100" target="_blank">Click here to read the post</a>')


            $('#exampleModal').modal('show')


        })
    }
    showmodal();



    //...................................................WEATHER...................................................//
    if ($('#city').val()) {
        var city = $('#city').val();
    }
    else {
        var city = 'new delhi'
    }


    $.getJSON(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=fefcb07c01516af278fab70347d82a40",
        function (data) {
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
            window.myWidgetParam.push({
                id: 2,
                cityid: data.id,
                appid: 'f73204efa1bc0b38d1a351f19d7e9d12',
                units: 'metric',
                containerid: 'openweathermap-widget-2'
              });  
              (function() {
                  var script = document.createElement('script');
                  script.async = true;
                  script.charset = "utf-8";
                  script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(script, s);
                })();
        }
            
    );



    //...................................................SEARCH...................................................//


    $('#search').on('keypress', function (e) {
        if (e.which == 13) {
            var search = $('#search').val()
            $.ajax({
                type: "POST",
                url: "/search",
                data: { search: search },
                success: function (response) {
                    $('.news').empty();
                    response.articles.forEach(function (a) {
                        $('.news').append('<div class="card mb-3 shadow" style="max-width: 100%;">')
                        $('.card').last().append('<input type="hidden" value="' + a.source.name + '" id="source-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.author + '" id="author-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.title + '" id="title-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.description + '" id="description-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.url + '" id="url-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.urlToImage + '" id="urlToImage-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.publishedAt + '" id="publishedAt-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<input type="hidden" value="' + a.content + '" id="content-' + response.articles.indexOf(a) + '">')
                        $('.card').last().append('<div class="row no-gutters">')
                        $('.no-gutters').last().append('<div class="col-md-3 image text-center">')
                        $('.image').last().append('<img src="' + a.urlToImage + '" class="card-img mt-3 ml-3" alt="..." style="width: 150px; max-width: 150px; max-height:100px;">')
                        $('.no-gutters').last().append('<div class="col-md-8">')
                        $('.col-md-8').last().append('<div class="card-body ml-3">')
                        $('.card-body').last().append('<h6 class="card-title">' + a.title + '</h6>')
                        $('.card-body').last().append('<p class="card-text">' + a.source.name + '</p>')
                        $('.card-body').last().append('<p class="card-text"><small class="text-muted">' + a.publishedAt + '</small></p>')
                        showmodal();

                    })
                }
            });
        }
    });



    // $('#search').on('keyup', function () {
    //     var search = $('#search').val()
    //     $.ajax({
    //         type: "POST",
    //         url: "/search",
    //         data: { search: search },
    //         success: function (response) {
    //             $('.news').empty();
    //             response.articles.forEach(function (a) {
    //                 $('.news').append('<div class="card mb-3 shadow" style="max-width: 100%;">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.source.name + '" id="source-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.author + '" id="author-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.title + '" id="title-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.description + '" id="description-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.url + '" id="url-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.urlToImage + '" id="urlToImage-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.publishedAt + '" id="publishedAt-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<input type="hidden" value="' + a.content + '" id="content-' + response.articles.indexOf(a) + '">')
    //                 $('.card').last().append('<div class="row no-gutters">')
    //                 $('.no-gutters').last().append('<div class="col-md-3 image text-center">')
    //                 $('.image').last().append('<img src="' + a.urlToImage + '" class="card-img mt-3 ml-3" alt="..." style="width: 150px; max-width: 150px; max-height:100px;">')
    //                 $('.no-gutters').last().append('<div class="col-md-8">')
    //                 $('.col-md-8').last().append('<div class="card-body ml-3">')
    //                 $('.card-body').last().append('<h6 class="card-title">' + a.title + '</h6>')
    //                 $('.card-body').last().append('<p class="card-text">' + a.source.name + '</p>')
    //                 $('.card-body').last().append('<p class="card-text"><small class="text-muted">' + a.publishedAt + '</small></p>')
    //                 showmodal();

    //             })
    //         }
    //     });
    // })

    //<----------------Add bookmark-------------->

    $('.bookmark').click(function () {
        var id = $(".userId").val()
        console.log(id)
        if (id) {

            var index = $('.bookmark').index(this)
            var name = $('#source-' + index).val()
            console.log(name);
            var img = $('#urlToImage-' + index).val();
            console.log(img);
            var author = $('#author-' + index).val();
            console.log(author);
            var title = $('#title-' + index).val()
            var description = $('#description-' + index).val()
            var url = $('#url-' + index).val()
            var publishedAt = $('#publishedAt-' + index).val()
            var content = $('#content-' + index).val()
            console.log(content)
            content = content.substr(0, 100)
            var bookmark = {
                index: index,
                name: name,
                img: img,
                author: author,
                title: title,
                description: description,
                url: url,
                publishedAt: publishedAt,
                content: content,
                id: id
            }
            $.ajax({
                method: "POST",
                datatype: 'JSON',
                url: "/bookmark",
                data: bookmark,
                success: function (response) {
                    console.log(response)
                }
            })
        } else {
            window.location.href = "/login"
        }

    })
});





