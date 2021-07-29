$(document).ready(function() {
    $("#submitbutton").click(function () {
        var selected = $("input[name='seleccion']").is(':checked');
        var selected1 = $("input[name='seleccion1']").is(':checked');
        var selected10 = $("input[name='seleccion10']").is(':checked');
        // var selected3 = $("input[name='seleccion3']").is(':checked');
        // var selected4 = $("input[name='seleccion4']").is(':checked');
        // var selected5 = $("input[name='seleccion5']").is(':checked');
        // var selected7 = $("input[name='seleccion7']").is(':checked');

        if (selected == false) {
            alert("El campo 'Porque medio te contactaste?' es obligatorio");
        }
        if (selected1 == false) {
            alert("El campo 'Tipo de Cliente' es obligatorio");
        }
        if (selected10 == false) {
            alert("El campo 'Cerraste una venta?' es obligatorio");
        }
        // if (selected3 == false) {
        //     alert("debe de completar todos los campos");
        // }
        // if (selected4 == false) {
        //     alert("debe de completar todos los campos");
        // }
        // if (selected5 == false) {
        //     alert("debe de completar todos los campos");
        // }
        // if (selected7 == false) {
        //     alert("debe de completar todos los campos");
        // }
    });

    // $("input[type='radio'][name = 'seleccion4']").change(function(){
    //     if($(this).val()=="Otro..")
    //     {
    //        $("#validacion5_4").show();
    //     }
    //     else
    //     {
    //         $("#validacion5_4").hide(); 
    //     }
    //  });


//   $("#validacion5_4").click(function(){
//     $("#validacion5_4").hide();
//   });
//   $("#show").click(function(){
//     $("#validacion5_4").show();
//   });

});

