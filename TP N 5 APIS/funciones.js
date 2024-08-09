const API_URL_Company = "https://utn-lubnan-api-2.herokuapp.com/api/Company"
const API_URL_Empleados = "https://utn-lubnan-api-2.herokuapp.com/api/Employee"
let dataCompania;
let dataEmpleados;
let datos=null;

let empleadoNuevo = {
    companyId: 8,
    firstName: "John",
    lastName: "Doe",
    Email: "john@doe.com"

}

let nuevoDatosEmpleado = {
    firstName: "Nuevo Nombre",
    lastName: "Nuevo Apellido",
    Email: "nuevo@correo.com"
}


 async function manejadorRequestListar() {

    //  if(this.status===200){ //evalua si esta correcto y listo  /// no hace nada

    let dataCompania;
    let dataEmpleados;
    //ready state 0=no se abrio y no se llamo al metodo, 1= se llamo al metodo open
    //2= se esta llamando al metodo send, 3= esta cargando, esta recibiendo la respuesta
    //4= se completo todo

     await fetch(API_URL_Company)
        .then(response => response.json())
        .then(companias => {
            dataCompania=companias;


        });


    await fetch(API_URL_Empleados)
        .then(response => response.json())
        .then(empleados => {
            dataEmpleados=empleados;

        })

        return {dataCompania, dataEmpleados}

}



async function llamadaFuncion(){
try{
datos= await manejadorRequestListar();
console.log(datos);
}catch(er){
    console.log(er);
}
}

////////////////////////////////////////////////


function filtrarEmpresaymostrar() {

    const inputId = document.getElementById("inputId").value

    const companiaEncon = datos.dataCompania.find(Company => Company.companyId == inputId);



    if (companiaEncon) {


        const filtroEmplea = datos.dataEmpleados.filter(Employee => Employee.companyId == (inputId));

        const resultados = document.getElementById("empleados");
        resultados.innerHTML = "";



        filtroEmplea.forEach(Employee => {

            resultados.innerHTML += `<li>ID: ${Employee.employeeId} - Nombre: ${Employee.firstName}</li>`;
        });
    } else {

        alert("No se encontro empleados con esa id de compañia.");

    }
}
//////////////////////////////////////

async function postEmpleados(empleadoNuevo) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(empleadoNuevo)
    };


    const response = await fetch(API_URL_Empleados, opciones);


    if (response.status === 200) {
        console.log("Empleado agregado correctamente");
    }
    else {
        console.log("El empleado no ha podido ser agregado")
    }
}



////////////////////////////////////////////////////////

async function deleteEmpleados() {

    const inputIdEmpl = document.getElementById("inputIdDeleteEmp").value
    const inputIdCom = document.getElementById("inputIdDeleteCom").value


    const empleadoEncon = datos.dataEmpleados.find(Employee => Employee.employeeId == inputIdEmpl && Employee.companyId == inputIdCom);


    if (!empleadoEncon) {
        alert("El empleado con esa id no existe en la compañia");
        return;
    }
    const opciones = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"

        },

    };
    const response = await fetch(API_URL_Empleados + `/${inputIdEmpl}`, opciones);

    if (response.status === 200) {
        console.log("Empleado eliminado correctamente");
    }
    else {
        console.log("El empleado no ha podido ser agregado");
    }

}

async function modificarEmpleado(empleadoId, companiaId, nuevoDatosEmpleado) {

    const empleadoEncon = datos.dataEmpleados.find(Employee => Employee.employeeId == empleadoId && Employee.companyId == companiaId);


    if (!empleadoEncon) {
        alert("El empleado con esa ID y compañía no existe.");
        return;
    }

    const opciones = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoDatosEmpleado)
    };


    const response = await fetch(API_URL_Empleados + `/${empleadoId}`, opciones)

    if (response.status == 200) {
        console.log("El empleado fue modificado con exito")
    }
    else {
        console.log("El empleado no fue modificado correctamente")
    }

}

///////////////////////////////

const boton = document.getElementById("boton-de-filtrar")

boton.addEventListener("click", () => filtrarEmpresaymostrar())

const botonDelete = document.getElementById("boton-de-eliminar")

botonDelete.addEventListener("click", () => deleteEmpleados())




modificarEmpleado(1, 1, nuevoDatosEmpleado);
postEmpleados(empleadoNuevo);
deleteEmpleados();
manejadorRequestListar();





// Vas a tener 2 arreglos
// En base al arreglo de empleados, vas a ejecutarle un filter, o sea empleados.filter()

// Los vas a filtrar en base al numero de id que haya ungresado el usuario por input
// PRimero fijandote si existe agluna empresa con ese id, haciendo empresa.find()
// Si existe, ejecutas el filter, y luego de filtrar mostras en html reiniciando la lista