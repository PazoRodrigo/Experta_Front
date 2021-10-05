// function ejecutar(url, params) {
//   var ret = undefined;
//   var mess = "";
//   $.ajax({
//     url: url,
//     dataType: "json",
//     type: "POST",
//     data: JSON.stringify(params),
//     async: false,
//     contentType: "application/json; charset=utf-8",
//     success: function (data) {
//       var wsTranfer = data.d;
//       if (wsTranfer.todoOk == true) {
//         ret = wsTranfer.data;
//       } else {
//         mess = wsTranfer.mensaje;
//       }
//     },
//     error: function (xhr, textStatus, error) {
//       console.log(xhr);
//       console.log(textStatus);
//       console.log(error);
//       mess = "Se ha producido un error!!!";
//     },
//   });
//   if (mess != "") {
//     alert(mess);
//   } else {
//     return ret;
//   }
// }
// async function ejecutarAsync(url, params) {
//   var data = await ejecutarAjax(url, params);
//   wsTranfer = data.d;
//   if (wsTranfer.todoOk == true) {
//     return wsTranfer.data;
//   } else {
//     throw wsTranfer.mensaje;
//   }
// }
// async function ejecutarAjax(url, params) {
//   try {
//     return await $.ajax({
//       url: url,
//       dataType: "json",
//       type: "POST",
//       data: JSON.stringify(params),
//       contentType: "application/json; charset=utf-8",
//       error: function (xhr, textStatus, error) {
//         console.log(url);
//         console.log(params);
//         console.log(xhr);
//         console.log(textStatus);
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     $.unblockUI();
//     throw "Se ha producido un error!!!";
//   }
// }
// async function ejecutarAsyncVarBinary(url, params) {
//   var data = await ejecutarAjaxVarBinary(url, params);
//   wsTranfer = data.d;
//   if (wsTranfer.todoOk == true) {
//     return wsTranfer.data;
//   } else {
//     throw wsTranfer.mensaje;
//   }
// }
// async function ejecutarAjaxVarBinary(url, params) {
//   try {
//     return await $.ajax({
//       url: url,
//       dataType: "json",
//       type: "POST",
//       //data: JSON.stringify(params),
//       data: "{fileData : " + JSON.stringify(params) + " }",
//       contentType: "application/json; charset=utf-8",
//       error: function (xhr, textStatus, error) {
//         console.log(url);
//         console.log(params);
//         console.log(xhr);
//         console.log(textStatus);
//         //alertAlerta(xhr.responseJSON.Message);
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     $.unblockUI();
//     throw "Se ha producido un error!!!";
//   }
// }

// function ejecutarProm(url, params) {
//   var ret = undefined;
//   var mess = "";
//   return $.ajax({
//     url: url,
//     dataType: "json",
//     type: "POST",
//     data: JSON.stringify(params),
//     contentType: "application/json; charset=utf-8",
//     error: function (xhr, textStatus, error) {
//       mess = "Se ha producido un error!!!";
//     },
//   });
// }
// async function TraerAPIfetch(url, params, jwt) {
//   try {
//     let httpHeaders;
//     if (jwt) {
//       httpHeaders = {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//         Authorization: `Bearer ${jwt}`,
//       };
//     } else {
//       httpHeaders = {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//       };
//     }
//     var miInit = {
//       method: "GET",
//       headers: httpHeaders,
//      // mode: "no-cors",
//       cache: "default",
//     };
//     const request = await fetch(`${url}?${new URLSearchParams(params)}`, miInit);
//     if (request.status == 401) {
//       throw PopUpConfirmarSinCancelar(
//         "warning",
//         "Login",
//         "Por Favor Ingrese al sistema",
//         "eventoLogin",
//         "Aceptar"
//       );
//     }
//     return  request.json();




//   } catch (error) {
//     throw new Error(error);
//   }
// }
async function TraerAPIfetch(url, params, jwt) {
  let httpHeaders;
  if (jwt) {
    httpHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    };
  } else {
    httpHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
  }
  var miInit = {
    method: "GET",
    headers: httpHeaders,
    // mode: "no-cors",
    cache: "default",
  };
  await (await (fetch(`${url}?${new URLSearchParams(params)}`, miInit)
    .then(res => {
      if (res.status == 401) {
        throw PopUpConfirmarSinCancelar(
          "warning",
          "Login",
          "Por Favor Ingrese al sistema",
          "eventoLogin",
          "Aceptar"
        );
      }
      if (!res.ok) {
        console.log('Error: ', `${url}`, miInit, JSON.stringify(params));
        throw new Error('Se produjo un error de comunicacion');
      }
      return res.json()
    })
    .catch(err => {
      console.log('Error: ', `${url}`, miInit, JSON.stringify(params));
      throw new Error(err);
    })
  ))
  return data
}
async function PostAPIfetch(url, params, jwt) {
  let httpHeaders;
  if (jwt) {
    httpHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${jwt}`,
    };
  } else {
    httpHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }
  var miInit = {
    method: "POST",
    headers: httpHeaders,
    // mode: "no-cors",
    cache: "default",
    body: JSON.stringify(params)
  };
  let data = await (await (fetch(`${url}`, miInit)
    .then(res => {
      if (res.status == 401) {
        PopUpConfirmarSinCancelar(
          "warning",
          "Login",
          "Sesion Expirada o Sin Acceso",
          "eventoLogin",
          "Aceptar"
        );
      }
      if (!res.ok) {
        console.log(`${url}`, miInit, JSON.stringify(params));
        throw new Error('Se produjo un error de comunicacion');
      }
      return res;
    })
    .catch(err => {
      console.log(`${url}`, miInit, JSON.stringify(params));
      throw new Error(err);
    })
  ))
  return data
}
async function TraerAPI(url, params, jwt) {
  try {
    return await $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      data: params,
      contentType: "application/json; charset=utf-8",
      // beforeSend: function (xhr) {   //Include the bearer token in header
      //    xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
      //},
      headers: {
        Authorization: jwt,
      },
      success: function (data) {
        return data;
      },
      error: function (xhr, textStatus, error) {
        console.log(url);
        console.log(params);
        console.log("xhr", xhr);
        console.log(textStatus);
        console.log(error);
        console.log(xhr.responseJSON);
        //console.log(xhr.responseJSON.Message);
        throw xhr;
      },
    });
  } catch (xhr) {
    //$.unblockUI();
    if (xhr.status == 401) {
      throw new Error("Sesion Expirada, ingrese nuevamente");
    } else {
      throw xhr.responseJSON;
    }

  }
}

async function PostAPI(url, params, jwt) {
  try {
    let dataObject = JSON.stringify(params);
    let response = "";
    await $.ajax({
      type: "POST",
      url: url,
      headers: {
        Authorization: jwt,
      },
      data: dataObject,
      crossDomain: true,
      contentType: "application/json",
      success: function (data) {
        response = data;
      },
      error: function (xhr, textStatus, error) {
        console.log(url);
        console.log(params);
        console.log("xhr", xhr);
        console.log(textStatus);
        console.log(error);
        throw xhr;
      },
    });
    return response;
  } catch (xhr) {
    if (xhr.status == 401) {
      throw new Error("Sesion Expirada, ingrese nuevamente");
    } else {
      throw xhr.responseJSON;
    }
  }
}

async function DeleteAPI(url, params) {
  console.log(params);
  try {
    let dataObject = JSON.stringify(params);
    console.log(dataObject);
    await $.ajax({
      type: "DELETE",
      url: url,
      data: dataObject,
      crossDomain: true,
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        return data;
      },
      error: function (xhr, textStatus, error) {
        console.log(url);
        console.log(params);
        console.log(xhr);
        console.log(textStatus);
        console.log(error);
        console.log(xhr.responseJSON.Message);
        throw xhr;
      },
    });
  } catch (error) {
    $.unblockUI();
    throw error;
  }
}
