var _ListaCustomers;

class Customer {
    constructor() {
        this.IdEntidad = 0;
        this.Nombre = '';
        this.Apellido = '';
        this.Direccion = '';
    }

    async strApellidoNombre() {
        return this.Apellido + ', ' + this.Nombre;
    }
    async Guardar() {
        if (this.IdEntidad == 0) {
            await this.Alta();
        } else {
            throw('Modifica Cliente. Función a desarrollar.');
        }
    }
    async Alta() {
        await this.ValidarCampos();
        let data =
        {
            "FirstName": this.Nombre,
            "LastName": this.Apellido,
            "Address": this.Direccion
        }
        let entidad = "Customer";
        let url = ApiURL + "/" + entidad;
        await PostAPI(url, data);
    }
    async ValidarCampos() {
        let strError = '';
        if (parseInt(this.Nombre?.length) === 0 && parseInt(this.Apellido?.length) === 0 && parseInt(this.Direccion?.length) === 0) {
            throw 'El Cliente no se ha guardado. <br><br>Debe completar todos los campos';
        } else {
            if (parseInt(this.Nombre?.length) === 0 || parseInt(this.Apellido?.length) === 0 || parseInt(this.Direccion?.length) === 0) {
                if (parseInt(this.Nombre?.length) === 0) {
                    strError += 'Debe completar el Nombre<br>';
                }
                if (parseInt(this.Apellido?.length) === 0) {
                    strError += 'Debe completar el Apellido<br>';
                }
                if (parseInt(this.Direccion?.length) === 0) {
                    strError += 'Debe completar la Dirección<br>';
                }
            }
        }
        if (parseInt(strError.length) > 0) {
            throw 'El Cliente no se ha guardado. <br><br>' + strError;
        }

    };

    static async Todos() {
        if (_ListaCustomers == undefined) {
            _ListaCustomers = await Customer.TraerTodas();
        }
        return _ListaCustomers;
    }
    static async TraerTodos() {
        return await Customer.Todos();
    }

    // Traer
    static async TraerTodas() {
        let entidad = 'Customer';
        let url = ApiURL + '/' + entidad;
        let datos = await TraerAPI(url);
        let result = [];
        $.each(datos, function (key, value) {
            result.push(llenarEntidadCustomer(value));
        });
        return result;
    }

    // Herramientas
    static async ArmarCombo(lista, div, idCombo, strSelector, evento, estilo) {
        let Cbo = '';
        Cbo += '<select id="' + idCombo + '" onchange="SeleccionCustomer(this);" class="' + estilo + '"  data-Evento="' + evento + '">';
        Cbo += '    <option value="0">' + strSelector + '</option>';
        let i = 0;
        while (i <= lista?.length - 1) {
            Cbo += '<option value="' + lista[i].IdEntidad + '" data-Id="' + lista[i].IdEntidad + '">' + await lista[i].strApellidoNombre() + '</option>';
            i++;
        }
        Cbo += '</select>';
        return $('#' + div + '').html(Cbo);
    }
    static async ArmarGrilla(div, lista, eventoSeleccion) {
        $('#' + div + '').html('');
        let str = '';
        if (lista.length > 0) {
            str += '<table style="width: 100%;">';
            let i = 0;
            while (i <= lista.length - 1) {
                let item = lista[i];
                str += '<tr>';
                str += '    <td>';
                str += '        <a href="#" class="link-block-2 w-inline-block mibtn-SeleccionCustomer" data-Id="' + item.IdEntidad + '" data-Evento="' + eventoSeleccion + '" ></a >';
                str += '    </td>';
                str += '    <td>';
                str += '        <a href="#" data-Id="' + item.IdEntidad + '" data-Evento="' + eventoSeleccion + '" class="mibtn-SeleccionCustomer" >' + await item.strApellidoNombre() + '</a>';
                str += '    </td>';
                str += '</tr>';
                i++;
            }
            str += '</table>';
        }
        return $('#' + div + '').html(str);
    }

}
function llenarEntidadCustomer(entidad) {
    let m = new Customer;
    m.IdEntidad = entidad.customerId;
    m.Nombre = entidad.firstName;
    m.Apellido = entidad.lastName;
    m.Direccion = entidad.address;
    return m;
}
async function SeleccionCustomer(MiElemento) {
    try {
        let elemento = document.getElementById(MiElemento.id);
        let buscado = $.grep(await  Customer.Todos(), function (entidad, index) {
            return entidad.IdEntidad == elemento.options[elemento.selectedIndex].value;
        });
        let Seleccionado = buscado[0];
        let evento = elemento.getAttribute('data-Evento');
        let event = new CustomEvent(evento, { detail: Seleccionado });
        document.dispatchEvent(event);
    } catch (err) {
        alertAlerta(err);
    }
}
$("body").on("click", ".mibtn-SeleccionCustomer", async function () {
    try {
        let $this = $(this);
        let buscado = $.grep(await Customer.Todos(), function (entidad, index) {
            return entidad.IdEntidad == $this.attr("data-Id");
        });
        let Seleccionado = buscado[0];
        let evento = $this.attr("data-Evento");
        let event = new CustomEvent(evento, { detail: Seleccionado });
        document.dispatchEvent(event);
    } catch (err) {
        alertAlerta(err);
    }
});

