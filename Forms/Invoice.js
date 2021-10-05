class Invoice {
    constructor() {
        this.IdEntidad = 0;
        this.IdCliente = '';
        this.ListaCodigos = [];
    }
    async Alta() {
        await this.ValidarCampos();
        let data =
        {
            "CustomerId": parseInt(this.IdCliente),
            "Codes": this.ListaCodigos,
            "Date": new Date().toISOString().slice(0, 10)
        }
        let entidad = "invoice";
        let url = ApiURL + "/" + entidad;
        await PostAPI(url, data);
    }
     async  ValidarCampos() {
         let strError = '';
        if (this.IdCliente == 0 || this.ListaCodigos.length == 0) {
            if (this.IdCliente == 0 && this.ListaCodigos.length == 0) {
                throw ('Debe seleccionar el cliente y completar los productos de la fáctura');
            } else {
                if (this.IdCliente == 0) {
                    strError += 'Debe seleccionar el cliente<br>';
                }
                if (this.ListaCodigos.length == 0) {
                    strError += 'Debe completar los productos de la fáctura<br>';
                }
            }
        }
        if (parseInt(strError.length) > 0) {
            throw 'La fáctura no se ha guardado. <br><br>' + strError;
        }
        
     }

     // Traer
    static async TraerTodas() {
        let entidad = 'invoice';
        let url = ApiURL + '/' + entidad;
        let datos = await TraerAPI(url);
        let result = [];
        $.each(datos, function (key, value) {
            result.push(llenarEntidadCustomer(value));
        });
        return result;
    }
    static async TraerTodasXCliente(idCliente) {
        let entidad = 'invoice';
        let url = ApiURL + '/' + entidad + '/' + idCliente;
        let datos = await TraerAPI(url);
        let result = [];
        $.each(datos, function (key, value) {
            result.push(llenarEntidadCustomer(value));
        });
        return result;
    }
     // Herramientas
    static async ArmarGrillaProductos(div, lista, eventoSeleccionar, eventoEliminar) {
        $('#' + div + '').html('');
        let str = '';
        if (lista.length > 0) {
            str += '<table style="width: 100%;">';
            let i = 0;
            while (i <= lista.length - 1) {
                let item = lista[i];
                str += '<tr>';
                str += '    <td style="width:30%">';
                str += '        <a href="#" class="link-block-2 w-inline-block mibtn-SeleccionProducto text-primary" data-Id="' + item + '" data-Evento="' + eventoSeleccionar + '" >Seleccionar</a >';
                str += '    </td>';
                str += '    <td style="width:50%">';
                str += item;
                str += '    </td>';
                str += '    <td style="width:20%">';
                str += '        <a href="#" class="link-block-2 w-inline-block mibtn-SeleccionProducto text-danger" data-Id="' + item + '" data-Evento="' + eventoEliminar + '" >Eliminar</a >';
                str += '    </td>';
                str += '</tr>';
                i++;
            }
            str += '</table>';
        }
        return $('#' + div + '').html(str);
    }
}