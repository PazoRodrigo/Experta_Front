var _ObjInvoice;
var _ListaCodigos;

$(document).ready(async function () {
    try {
        spinner();
        await LlenarCboCliente();
        // await LLenarGrilla();
        await NuevaEntidad();
        spinnerClose();
    } catch (error) {
        spinnerClose();
        alertAlerta(error);
    }
});
$("body").on("click", "#btn_FormCliente", async function () {
    try {
        window.location.href = 'https://localhost:44303/Forms/customer.html';
    } catch (error) {
        alertAlerta(error);
    }
});
async function LlenarCboCliente() {
    Customer.ArmarCombo(await Customer.Todos(), 'CboCliente', 'idCboCliente', 'Seleccionar Cliente', 'eventoClienteSeleccionado', 'form-control');
}
async function NuevaEntidad() {
    _ObjInvoice = new Invoice();
    _ListaCodigos = [];
    await LimpiarEntidad();
}
async function LimpiarEntidad() {
    $("#idCboCliente").val(0);
    await LimpiarProducto();
    LlenarGrillaProductos(_ListaCodigos);
}
async function LlenarGrillaProductos(lista) {
    Invoice.ArmarGrillaProductos('GrillaProductos', lista, 'evento_seleccionProducto', 'evento_eliminarProducto');
    
}
async function LlenarGrillaFacturas(lista) {
    // Invoice.ArmarGrilla('GrillaFacturas', lista, '', '');    
}
async function LimpiarProducto() {
    $("#txt_Producto").val('');
}
$("body").on("click", "#btn_Nuevo", async function () {
    try {
        await NuevaEntidad();
    } catch (error) {
        alertAlerta(error);
    }
});
$("body").on("click", "#btn_AgregarProducto", async function () {
    try {
        spinner();
        let codigo = $("#txt_Producto").val();
        codigo = Right('0000' + codigo, 4);
        await ValidarProducto(codigo);
        _ListaCodigos.push(codigo);
        await LimpiarProducto()
        await LlenarGrillaProductos(_ListaCodigos);
        spinnerClose();
    } catch (error) {
        spinnerClose();
        alertAlerta(error);
    }
});
async function ValidarProducto(codigo) {
    if (codigo == 0) {
        throw ('El código del producto es incorrecto');
    }
    if (_ListaCodigos.length > 0) {
        let i = 0;
        while (i <= _ListaCodigos.length - 1) {
            if (codigo == _ListaCodigos[i]) {
                throw ('El código del producto a ingresar ya existe');
            }
            i++;
        }
    }
};



$("body").on("click", "#btn_GuardarFactura", async function () {
    try {
        spinner();
        _ObjInvoice.IdCliente = $("#idCboCliente").val();
        _ObjInvoice.ListaCodigos = _ListaCodigos;
        await _ObjInvoice.Alta();
        await NuevaEntidad();
        spinnerClose();
        alertOk('La Fáctura se ha guardado correctamente.');
    } catch (error) {
        spinnerClose();
        alertAlerta(error);
    }
});

document.addEventListener("eventoClienteSeleccionado", async function (e) {
    try {
        spinner();
        let Obj = e.detail;
        await LlenarGrillaFacturas(Obj);
        spinnerClose();
    } catch (err) {
        spinnerClose();
        alertAlerta(err);
    }
},
    false
);
document.addEventListener("evento_seleccionProducto", async function (e) {
    try {
        throw('Selección de Producto para modificar. Función a desarrollar.');
    } catch (err) {
        spinnerClose();
        alertAlerta(err);
    }
},
    false
);
document.addEventListener("evento_eliminarProducto", async function (e) {
    try {
        throw('Selección de Producto para eliminar. Función a desarrollar.');
    } catch (err) {
        spinnerClose();
        alertAlerta(err);
    }
},
    false
);