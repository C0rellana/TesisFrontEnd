//const API="http://192.168.18.37:5000"
const API=process.env.REACT_APP_API;
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
const ApiEditarCategoria= API+"/editarcategoria";
const ApiAgregarCategoria= API+"/agregarcategoria";
const ApiEliminarCategoria= API+"/eliminarcategoria";

//archivos
const ApiArchivos= API+"/archivos";
const ApiFilterArchivo= API+"/FilterArchivos";
const ApiDownloadArchivo= API+"/GetArchivo";
const ApiValorarArchivo= API+"/ValorarArchivo";

//ramos
const ApiRamos= API+"/ramos";

//denuncias
const ApiDenunciar= API+"/DenunciarArchivo";
const ApiDenuncia= API+"/denuncias";
const ApiAceptarDenuncia= API+"/AceptarDenuncia";
const ApiIgnorarDenuncia= API+"/IgnorarDenuncia";
const ApiGetTipos= API+"/GetTipos";

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
    ApiDenunciar,
    ApiDenuncia,
    ApiAceptarDenuncia,
    ApiIgnorarDenuncia,
    changePreferencias,
    ApiGetTipos,
    ApiEditarCategoria,
    ApiAgregarCategoria,
    ApiEliminarCategoria,

}
