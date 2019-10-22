var listaCiudadanos = []
var ddCiudadano;
var tableCiudadano;

$(document).ready(function () {
    getDataFromApi()
    createCiudadano()
})


function createCiudadano() {
    $("#btnCreateCiudadano").click(function () {

        var personObj = {
            nombre: $("#inputNombre").val(),
            apellido: $("#inputApellido").val(),
            direccion: $("#inputDireccion").val(),
            ocupacion: $("#inputOcupacion").val(),
            nacionalidad: $("#inputNacionalidad").val(),
            cedula: $("#inputCedula").val(),
            piel: $("#inputPiel").val()
        }

        $.ajax({
            url: 'http://localhost:51050/api/ciudadanos',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(personObj),
            async: false,
            success: function (data) {
                debugger
                console.log(data)
                alert(data.nombre + " Insertado exitosamente")
            }, error: function (jqXHR, textStatus, errorThrown) {
                debugger
                alert("error de insercion:" + jqXHR.responseText)
            }

        })

    })
}

function cargarTablaCiudadanos(data) {
    tableCiudadano = $("#tablaCiudadanos").DataTable({
        destroy: true,
        async: false,
        bAutoWidth: false,
        data: data,
        columns: [
            { data: 'nombre' },
            { data: 'apellido' },
            { data: 'direccion' },
            { data: 'ocupacion' },
            { data: 'nacionalidad' },
            { data: 'cedula' },
            { data: 'piel' }
        ]
    })
}

function getDataFromApi() {
    $.ajax({
        url: 'http://localhost:51050/api/ciudadanos',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            cargarTablaCiudadanos(data)
    
            listaCiudadanos = data
        },
        error: function (xhr, status, errorThrwn) {
            alert(errorThrwn.responseError)
        }
    })
}
