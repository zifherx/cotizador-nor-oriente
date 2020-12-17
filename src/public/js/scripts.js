$(function() {

    $('#tentativa-campania').hide();
    $('#precio-final').hide();

    $('#btnLimpiar').on('click', function(e) {
        e.preventDefault();
        $('#codigo_tdp').val('');
        $('#modelo').val('');
        $('#anio').val('');
        $('#campania1').val('');
        $('#campania2').val('');
        $('#precio').val('');
        $('#precioBruto').val('');
        $('#precioVenta').val('');
        $('#tentativa-campania').hide();
        $('#precio-final').hide();
    })

    $('#btnBuscar').on('click', function(e) {
        e.preventDefault();

        let tdp = $('#codigo_tdp');

        $.ajax({
            url: '/cotizador',
            method: 'POST',
            data: {
                codigo_tdp: tdp.val()
            },
            success: function(response) {
                //console.log(response);
                $('#modelo').val(response.modelo);
                $('#anio').val(response.anio);
                $('#campania1').val(response.incentivo);
                $('#campania2').val(response.campania);
                $('#precio').val(response.precio);
                $('#precioBruto').val(response.precio);
                $('#precioVenta').val(response.precio - response.incentivo);
                $('#tentativa-campania').slideToggle();
                $('#precio-final').slideToggle();
            },
            error: function(xhr, status) {
                alert('Disculpa, código no existe!');
                $('#tentativa-campania').hide();
                $('#precio-final').hide();
            }
        })
    })


});