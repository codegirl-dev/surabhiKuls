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
           // var item = [];
            if (result.status.name == "ok") {   
                $.each(result.data,function(index,element) {
                    items.push(element['toponymName'] + " " + element['lat']);
                
                    //item.push(element['lat']);
                    
                    
                })

                if (result.status.lat == "ok") {   
                    $.each(result.data,function(index,element){
                        items.push(element['lat']);})


                $('#resulttxt').html(items.join());

                //$('#resulttxt').html(item.join());
                    }
            }

            
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
                console.log("fail");
        }
    }); 

});