class MetodsT {
    constructor() {
        this.urlBase = 'http://localhost:8080/HistoryCars-1.0-SNAPSHOT/webresources/';
    }

    /*
        Ejecuta el metodo POST para guardar registros,
        resive como parametros la URL donde se expone el metodo
        y el objeto a persistir
    */
    create(path, entity) {
        return new Promise((resolve, reject) => {

            if ((this.urlBase + path).length > 0 && entity != null) {


                fetch(this.urlBase + path, {
                        method: 'POST',
                        body: JSON.stringify(entity),
                        headers: {
                            'content-type': 'application/json; charset=UTF-8'
                        }

                    }).then(response => console.log(response.status) // ojo aca xd resp.json()
                    )
                    .catch(error => reject(`Error al crear registro : ${error}`))
                    .then(response => resolve(`Success ${response}`));

            } else {
                reject(`url o datos invalidos `)
            }
        })
    }

    /*
        Ejecuta el metodo PUT para modificar registros,
        resive como parametros la URL donde se expone el metodo
        y el objeto a modificar
    */
    edit(path, entity) {
        return new Promise((resolve, reject) => {

            if (entity != null && (this.urlBase + path).length > 0) {


                fetch(this.urlBase + path, {
                        method: 'PUT',
                        body: JSON.stringify(entity),
                        headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }

                    }).then(resp => resp // ojo aca xd resp.json()
                    )
                    .catch(error => reject(`Error al editar registro ${error}`))
                    .then(response => resolve(`success ${response}`));

            } else {
                reject(`parametro o url invalido !`)
            }
        });
    }

    /*
        Ejecuta el metodo DELETE para remover registros,
        resive como parametros la URL donde se expone el metodo
        y el identificador de la entidad a remover
    */

    eliminar(path, id) {
        return new Promise((resolve, reject) => {
            if (id !== undefined && id != null && this.urlBase + path.length > 0) {

                return fetch(this.urlBase + path + '/' + id, {
                        method: 'DELETE'
                    })
                    .then(respuesta => respuesta // ojo aca xd resp.json()
                    )
                    .catch(error => reject(` (Error al eliminar registro ${error}`))
                    .then(response => resolve(`success ${response}`));

            } else {
                reject(`Parametro o url no valido`)
            }

        });

    }


    /*
        Busca registros en el server dependiendo el url
       */
    find(url) {
        return fetch(this.urlBase + url).then(function(response) {
            return response.json();
        })

    }

}

export default MetodsT