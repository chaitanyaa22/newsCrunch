$(document).ready(function () {
    $('.select').click(function () {
        $(this).removeClass('text-muted')
        $(this).addClass('text-light')

    })
    $('#cfpassword').on('keyup', function () {
        var password = $('#password').val();
        var cfpassword = $('#cfpassword').val();
        if (cfpassword == password) {
            $('#button').attr('disabled', false);
        }
        else {
            $('#button').attr('disabled', true);
        }

    })

    $('#password').on('keyup', function () {
        var password = $('#password').val();
        var cfpassword = $('#cfpassword').val();
        if (cfpassword == password) {
            $('#button').attr('disabled', false);
        }
        else {
            $('#button').attr('disabled', true);
        }

    })

    $('#password').focus(function () {
        $(this).popover({ content: "Password should be atleast 8 characters and should contain Uppercase characters (A-Z), Lowercase characters (a-z), Digits (0-9), Special characters (~!@#$%^&*_-+=`|\(){}[]:;'<>,.?/)" })
        $(this).blur(function () {
            $(this).popover('hide')
        })
    });

    $('#stateId').hide()
    $('#cityId').hide()

    $('#countryId').click( function () {
        
        if ($('#countryId').val() != "") {
            $('#stateId').show();
        }
        else {
            $('#stateId').hide();            
        }
    })

    $('#stateId').click(function () {
        if ($('#stateId').val() != "" ) {
            $('#cityId').show();
        }
        else {
           $('#cityId').hide();
        }


    })



});