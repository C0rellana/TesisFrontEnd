const API="http://192.168.18.37:5000"
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
const ApiFilterArchivo= API+"/FilterArchivos";
const ApiDownloadArchivo= API+"/GetArchivo";
const ApiValorarArchivo= API+"/ValorarArchivo";
const ApiDenuncia= API+"/DenunciarArchivo";

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
    ApiGetData,
    ApiValorarArchivo,
    ApiFilterArchivo,
    ApiDenuncia
}
