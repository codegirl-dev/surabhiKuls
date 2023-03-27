$('#btn1').on("click", function() {

    $.ajax({
        url: "resources/php/geohandler.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val()
        },
        success: function(result) {

            console.log(result);
            var items = [];
            if (result.status.name == "ok") {   
                $.each(result.data,function(index,element){
                    items.push(element['toponymName']);
                })

                $('#resulttxt').html(items.join());

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
                console.log("fail");
        }
    }); 

});