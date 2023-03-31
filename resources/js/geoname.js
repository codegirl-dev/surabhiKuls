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

            console.log(result);
            var items = [];
            // var item = [];
            if (result.status.name == "ok") {
                $.each(result.data, function (index, element) {
                    items.push(element['toponymName'] + " " + element['lat']);

                    //item.push(element['lat']);


                })

                //have to delete it

                if (result.status.lat == "ok") {
                    $.each(result.data, function (index, element) {
                        items.push(element['lat']);
                    })


                    $('#resulttxt').html(items.join());

                    //$('#resulttxt').html(item.join());
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("fail");
        }
    });

}); 

// start second API

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
                $.each(result.data, function (index, element) {
                    items.push('<a href="'+ element['toponymName'] +'"> '+ element['toponymName'] +'</a>');
                    
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