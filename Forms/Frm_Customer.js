var _ObjCustomer;
$(document).ready(async function () {
    try {
        spinner();
        await LLenarGrilla();
        await NuevaEntidad();
        spinnerClose();
    } catch (error) {
        spinnerClose();
        alertAlerta(error);
    }
});
$("body").on("click", "#btn_FormFactura", async function () {
    try {
        window.location.href ='invoice.html';
        // window.location.href ='https://localhost:44303/Forms/invoice.html';
    } catch (error) {
        alertAlerta(error);
    }
});
async function LLenarGrilla() {
    Customer.ArmarGrilla('Customers_GrillaTodos', await Customer.TraerTodas(), 'eventoSeleccionCustomer');
}
async function NuevaEntidad() {
    await LimpiarEntidad();
    _ObjCustomer = new Customer();
}
async function LimpiarEntidad() {
    $("#txt_Nombre").val('');
    $("#txt_Apellido").val('');
    $("#txt_Direccion").val('');
}
async function MostrarEntidad(objSeleccionado) {
    await NuevaEntidad();
    _ObjCustomer = objSeleccionado;
    $("#txt_Nombre").val(objSeleccionado.Nombre);
    $("#txt_Apellido").val(objSeleccionado.Apellido);
    $("#txt_Direccion").val(objSeleccionado.Direccion);
};
$("body").on("click", "#btn_Nuevo", async function () {
    try {
        await NuevaEntidad();
    } catch (error) {
        alertAlerta(error);
    }
});
$("body").on("click", "#btn_Guardar", async function () {
    try {
        spinner();
        _ObjCustomer.Nombre = $("#txt_Nombre").val();
        _ObjCustomer.Apellido = $("#txt_Apellido").val();
        _ObjCustomer.Direccion = $("#txt_Direccion").val();
        await _ObjCustomer.Guardar();
        await NuevaEntidad();
        await LLenarGrilla();
        spinnerClose();
        alertOk('El Cliente se ha guardado correctamente.');
    } catch (error) {
        spinnerClose();
        alertAlerta(error);
    }
});

document.addEventListener("eventoSeleccionCustomer", async function (e) {
    try {
        spinner();
        let Obj = e.detail;
        await MostrarEntidad(Obj);
        spinnerClose();
    } catch (err) {
        spinnerClose();
        alertAlerta(err);
    }
},
    false
);