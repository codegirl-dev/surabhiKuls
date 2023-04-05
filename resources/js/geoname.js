// < -------------------------------------------- start of Country Neighbour API call......................................................... >
$('#btn1').on("click", function () {

    $('#resultlst').empty();
    $('#resulthead').empty();
    $('#txtid').empty();

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
            if (result.status.code == "OK") {
                $('#resultlst').empty();
                $.each(result.data, function (index, element) {
                    var str = '<li class="list-group-item" >' + element['toponymName'] + '</li>';
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

// < -------------------------------------------- start of Weather API call......................................................... >
$("#resultlst").on('click', 'li',
    function () {

        //alert($(this).attr('data-lat')+' '+$(this).attr('data-lng'));   
       
        
        var listItems = $('#resultlst li');
        listItems.each(function(idx,li){
            $(li).removeClass('list-group-item active').addClass('list-group-item');

        })

        $(this).addClass("list-group-item active");

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
                
                if (result.status.name == "ok") {

                    $('#txtid').html("Sky : " + result.data['clouds'] + " <br> " + "Temperature :" + result.data['temperature'] + " <br> " + "humidity :" + result.data['humidity'] + " <br> " + "windSpeed :" + result.data['windSpeed'] + " . ");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        });

    }
);

// < -------------------------------------------- start of Tourism API call......................................................... >


$('#btn2').on("click", function () {

    
    $('#resultlst').empty();
    $('#resulthead').empty();
    $('#txtid').empty();

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
                    var str = '<li class="list-group-item" data-lat="' + element['lat'] + ' " data-lng = "' + element['lng'] + '" >' + element['toponymName'] + '</li>';
                    $('#resultlst').append(str);
                })

                $('#resulthead').html("List of Touriest Places");

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

});

// < -------------------------------------------- start of PostCode lookup API call......................................................... >

$('#btn3').on("click", function () {

    $('#resultlst').empty();
    $('#resulthead').empty();
    
    $('#resulthead').html("Postcode Validation Result");
    if($('#postid').val().length==0)
    {
        alert("Please Enter Postcode");
        return;
    }

    $.ajax({
        url: "resources/php/geopostcode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#postcountry').val(),
            postcode: $('#postid').val()
        },
        success: function (result) {

            console.log(result);

            if (result.status.name == "ok") {

                if (result.data.length == 0)
                {
                    $('#txtid').html("Invalid PostCode");
                    console.log("empty");
                }
                else
                {
                    var txt =result.data[0]['adminName1']+" -- > " +result.data[0]['placeName'];
                     $('#txtid').html(txt);

                }
               


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });
});



