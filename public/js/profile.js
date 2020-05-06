$(document).ready(function () {
    var city = $('#city').val();

    $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=fefcb07c01516af278fab70347d82a40",
        function (data) {
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
              window.myWidgetParam.push({
                  id: 5,
                  cityid: data.id,
                  appid: 'f73204efa1bc0b38d1a351f19d7e9d12',
                  units: 'metric',
                  containerid: 'openweathermap-widget-5',
                  });  
                  (function() {
                      var script = document.createElement('script');
                      script.async = true;script.charset = "utf-8";
                      script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                      var s = document.getElementsByTagName('script')[0];
                      s.parentNode.insertBefore(script, s);
                    })();
        }

    );


    $('#password').on('keyup', function () {
        var pass = $('#password').val()
        var old = $('#oldpassword').val()
        if(pass != old){
            $('.float-right').remove()
            $('#password').addClass('border-danger')
        }
        else{
            $('.float-right').remove()
            $('#password').removeClass('border-danger')

        }
        
    })


    $('#newpassword').on('keyup', function(){
        var npass =  $('#newpassword').val()
        if(npass.length>0){
            $('#updatebutton').attr('disabled', true)
        }
        else{
            $('#updatebutton').removeAttr('disabled')
        }
     })
     $('#cfpassword').on('keyup', function(){
         var npass = $('#newpassword').val()
         var cfpass = $('#cfpassword').val()
         if(cfpass == npass){
             $('#updatebutton').removeAttr('disabled')
         }
         else{
             $('#updatebutton').attr('disabled', true)
         }
     })








     $('#history').click(function () {
        $('#historymodal').modal('show')
    })
    
    $('#selectall').click(function () {
        var items = []
        if ($('#selectall').prop("checked") == true) {
            var checkbox = document.getElementsByClassName('historycheck')
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true;
            }
        }
        else {
            var checkbox = document.getElementsByClassName('historycheck')
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false;
            }
        }



        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                items.push(checkbox[i])
            }
        }
        if (items.length >= 1) {
            $('#historydelete').removeAttr('disabled');
            $('#interestadd').removeAttr('disabled');
        }
        else {
            $('#historydelete').attr('disabled', true);
            $('#interestadd').attr('disabled', true);

        }
    })

    
    $('.historycheck').click(function () { 
        var items = [] 
        var checkboxes = document.getElementsByClassName('historycheck')
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                items.push(checkboxes[i])
            }
        }
        if (items.length >= 1) {
            $('#historydelete').removeAttr('disabled');
            $('#interestadd').removeAttr('disabled');
        }
        else {
            $('#historydelete').attr('disabled', true);
            $('#interestadd').attr('disabled', true);
        
        }
    });
});
