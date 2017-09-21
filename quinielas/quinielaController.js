// quinielaController.js

exports.leerFicheroQuiniela = function(req, res)
{
    var fs = require('fs'),
    readline = require('readline'),
    path = require('path');

    // Cuando la variable que se va a recibir del GET es distinta de ID se usa query
    var fichero_apuestas = path.join(__dirname, req.query.fichero || "J07.txt");
    console.log("Fichero de apuestas: " + fichero_apuestas);

    var resultado_quiniela = req.query.resultado || '112X110001221201';
    console.log("Resultado de la quiniela a comprobar: " + resultado_quiniela);

    var numero_apuestas = 0;
    var aciertos_totales = new Array();
    var apuestas = new Array();

    var interfaz_leer_combinacion = readline.createInterface({
        input: fs.createReadStream(fichero_apuestas)
    });

    interfaz_leer_combinacion.on('line', function (combinacion)
    {
        var aciertos = comprobar_quiniela(combinacion, resultado_quiniela);
        numero_apuestas++;
        if(aciertos !== undefined && aciertos > 0)
        {
            if(aciertos_totales[aciertos] === undefined)
                aciertos_totales[aciertos] = 1;
            else
                aciertos_totales[aciertos] += 1;
        }
        var apuesta = new Object();
        apuesta.combinacion = combinacion;
        apuesta.aciertos = aciertos;
        apuestas.push(apuesta);
    });

    interfaz_leer_combinacion.on('close', function()
    {
        var json_response = new Object();
        json_response.numero_apuestas = numero_apuestas;
        json_response.aciertos = new Object();
        for (var i = aciertos_totales.length - 1; i >= 0; i--)
        {
            if(aciertos_totales[i] !== undefined)
                json_response.aciertos[i] = aciertos_totales[i];
        }
        json_response.apuestas = ordenar_apuestas_por_aciertos(apuestas);

        console.log("Resultados de mi apuesta");
        console.log(json_response);

        res.status(200).jsonp(json_response);
    });
};

// PRIVATE FUNCTIONS
function comprobar_quiniela(combinacion, resultado)
{
    try
    {
        var aciertos = 0;
        var i = 0;
        for (i; i < combinacion.length - 2; i++)
        {
            // Comprobamos si hemos llegado al pleno al 15
            if(i == combinacion.length - 2)
            {
                // Comprobamos que hemos acertado el pleno al 15. Y solo lo añadimos, si hemos acertado todas las anteriores.
                if(combinacion[i] == resultado[i] && combinacion[i+1] == resultado[i+1] && aciertos == 14)
                    aciertos++;
            }
            else
            {
                if (combinacion[i] == resultado[i])
                    aciertos++;
            }
        }
        return aciertos;
    }
    catch(err)
    {
        return 0;
    }
}

function ordenar_apuestas_por_aciertos(apuestas)
{
    // De mayor a menor
    return apuestas.sort(function(a, b){
        return b.aciertos-a.aciertos
    })
}
