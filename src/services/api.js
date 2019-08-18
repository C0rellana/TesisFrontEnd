const API="http://127.0.0.1:5000"
//default localhost

//auth 
const ApiLogin = API+"/login";
const ApiRegister = API+"/register";
const ApiGetData = API+"/GetData"

//carreras
const ApiCarreras= API+"/carreras";
const ApiCarrerasRamos= API+"/carrerasramos";

//categorias
const ApiCategorias= API+"/categorias";

//archivos
const ApiArchivos= API+"/archivos";
const ApiDownloadArchivo= API+"/GetArchivo";

//ramos
const ApiRamos= API+"/ramos";




export {
    ApiRamos,
    ApiLogin,
    ApiArchivos,
    ApiDownloadArchivo,
    ApiRegister,
    ApiCarreras,
    ApiCategorias,
    ApiCarrerasRamos,
    ApiGetData
}