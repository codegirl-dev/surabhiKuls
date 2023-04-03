$('#btn1').on("click", function () {

    $.ajax({
        url: "resources/php/geohandler.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val()
        },

        //neighbours api

        success: function (result) {

            // console.log(result);
            var items = [];
            var rowIdx = 0;
            if (result.status.name == "ok") {
                $('#resultlst').empty();
                $.each(result.data, function (index, element) {
                    var str = '<li>' + element['toponymName'] + '</li>';
                    $('#resultlst').append(str);
                })

                $('#resulthead').html("List of Neighbours");


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

});

$("#resultlst").on('click', 'li',
    function () {

        //alert($(this).attr('data-lat')+' '+$(this).attr('data-lng'));   

        $.ajax({
            url: "resources/php/geoweather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                latitude: $(this).attr('data-lat'),
                longitude: $(this).attr('data-lng')
            },
            success: function (result) {
                $('#txtid').empty();
                console.log(result);
                // var item = [];
                if (result.status.name == "ok") {

                    $('#txtid').html("Sky :" + result.data['clouds'] + " " + "Temperature :" + result.data['temperature'] + " " + "humidity :" + result.data['humidity'] + " " + "windSpeed :" + result.data['windSpeed'] + " ");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        });

    }
);

// < -------------------------------------------- start of  second API......................................................... >


$('#btn2').on("click", function () {

    $.ajax({
        url: "resources/php/geonameTourApi.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryID: $('#selCountryNm').val()
        },
        success: function (result) {

            console.log(result);
            var items = [];
            // var item = [];
            if (result.status.name == "ok") {

                $('#resultlst').empty();
                $.each(result.data, function (index, element) {
                    var str = '<li data-lat="' + element['lat'] + ' " data-lng = "' + element['lng'] + '" >' + element['toponymName'] + '</li>';
                    $('#resultlst').append(str);
                })

                $('#resulthead').html("List of Tour Places");

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

});
$('#btn3').on("click", function () {

    $.ajax({
        url: "resources/php/geoweather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            latitude: $('#sellat').val(),

            longitude: $('#sellng').val()
        },
        success: function (result) {

            console.log(result);
            var items = [];
            // var item = [];
            if (result.status.lat == "ok") {
                $.each(result.data, function (index, element) {
                    items.push(element['lat'] + " " + element['lng']);

                })
                console.log(items.join());
                $('#resulttxt').html(items.join());


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

});