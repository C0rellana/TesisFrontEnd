const API="http://192.168.18.37:5000"
//default localhost

//auth 
const ApiLogin = API+"/login";
const ApiRegister = API+"/register";
const ApiGetData = API+"/GetData"
const ChangeColor = API+"/ChangeColor"
const ApiAvatar = API+"/Avatar"
const changePreferencias = API+"/changePreferencias"


//carreras
const ApiCarreras= API+"/carreras";
const ApiCarrerasRamos= API+"/carrerasramos";
const ApiGetCarrera= API+"/ApiGetCarrera";


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

//Api Notas
const ApiNotas= API+"/notas";
export {
    ApiRamos,
    ApiNotas,
    ApiLogin,
    ChangeColor,
    ApiAvatar,
    ApiArchivos,
    ApiDownloadArchivo,
    ApiRegister,
    ApiCarreras,
    ApiGetCarrera,
    ApiCategorias,
    ApiCarrerasRamos,
    ApiGetData,
    ApiValorarArchivo,
    ApiFilterArchivo,
    ApiDenuncia,
    changePreferencias
}
