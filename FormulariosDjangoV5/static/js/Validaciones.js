$(document).ready(function() {
    $("#submitbutton").click(function () {
        var selected = $("input[name='seleccion']").is(':checked');
        var selected1 = $("input[name='seleccion1']").is(':checked');
        var selected2 = $("input[name='seleccion2']").is(':checked');
        var selected3 = $("input[name='seleccion3']").is(':checked');
        var selected4 = $("input[name='seleccion4']").is(':checked');
        var selected5 = $("input[name='seleccion5']").is(':checked');
        var selected7 = $("input[name='seleccion7']").is(':checked');

        if (selected == false) {
            alert("debe de completar todos los campos");
        }
        if (selected1 == false) {
            alert("debe de completar todos los campos");
        }
        if (selected2 == false) {
            alert("debe de completar todos los campos");
        }
        if (selected3 == false) {
            alert("debe de completar todos los campos");
        }
        if (selected4 == false) {
            alert("debe de completar todos los campos");
        }
        if (selected5 == false) {
            alert("debe de completar todos los campos");
        }
        if (selected7 == false) {
            alert("debe de completar todos los campos");
        }
    });

    // $("input[type='radio'][name = 'seleccion4']").change(function(){

    //     if($(this).val()=="other")
    //     {
    //        $("#validacion5_4").show();
    //     }
    //     else
    //     {
    //         $("#validacion5_4").hide(); 
    //     }
     
    //  });
});

