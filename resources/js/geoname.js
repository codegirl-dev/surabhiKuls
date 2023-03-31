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
            if (result.status.name == "ok") {
                $('#tresult').empty();
                $.each(result.data, function (index, element) {
                    $('#tresult').append('<tr><td>'+ element['toponymName'] + '</td></tr>')
                })

                 $('#resulthead').html("List of Neighbours");
                 

             }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

}); 

// start second API

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
                    items.push( element['lat'] + " " + element['lng']);
                    
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