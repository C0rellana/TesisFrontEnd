//const API="http://192.168.18.37:5000"
const API=process.env.REACT_APP_API;
//default localhost

//auth 
export const ApiLogin = API+"/login";
export const ApiRegister = API+"/register";
export const ApiGetData = API+"/GetData"
export const ChangeColor = API+"/ChangeColor"
export const ApiAvatar = API+"/Avatar"
export const changePreferencias = API+"/changePreferencias"


//carreras
export const ApiCarreras= API+"/carreras";
export const ApiCarrerasRamos= API+"/carrerasramos";
export const ApiGetCarrera= API+"/ApiGetCarrera";
export const ApiCarreraToken= API+"/CarreraToken";
export const ApiCarreraIsEnabled= API+"/CarreraIsEnabled";
//admin
export const ApiLogo= API+"/Logo";

//categorias
export const ApiCategorias= API+"/categorias";
export const ApiEditarCategoria= API+"/editarcategoria";
export const ApiAgregarCategoria= API+"/agregarcategoria";
export const ApiEliminarCategoria= API+"/eliminarcategoria";

//archivos
export const ApiArchivos= API+"/archivos";
export const ApiMisArchivos= API+"/misarchivos";
export const ApiFilterArchivo= API+"/FilterArchivos";
export const ApiDownloadArchivo= API+"/GetArchivo";
export const ApiValorarArchivo= API+"/ValorarArchivo";
export const ApiEditArchivo= API+"/EditArchivo";
export const ApiDeleteArchivo= API+"/DeleteArchivo";


//ramos
export const ApiRamos= API+"/ramos";
export const ApiNuevoRamo= API+"/nuevoramo";
export const ApiEditRamo= API+"/editramo";
export const ApiDeleteRamo= API+"/deleteramo";
export const ApiRamos2= API+"/ramos2";

//contenidos
export const ApiContenidos= API+"/contenidos";
export const ApiNewContenido= API+"/newContenido";
export const ApiEditContenido= API+"/editContenido";
export const ApiDeletContenido= API+"/deleteContenido";


//denuncias
export const ApiDenunciar= API+"/DenunciarArchivo";
export const ApiDenuncia= API+"/denuncias";
export const ApiAceptarDenuncia= API+"/AceptarDenuncia";
export const ApiIgnorarDenuncia= API+"/IgnorarDenuncia";
export const ApiGetTipos= API+"/GetTipos";

//Api Notas
export const ApiNotas= API+"/notas";

//Api Roles
export const ApiRoles= API+"/roles";
export const ApiEditRole= API+"/editRole";
export const ApiRoleDirector= API+"/roleDirector";