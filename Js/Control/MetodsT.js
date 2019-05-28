class MetodsT {
    constructor(url) {
        var urlBase = 'http://localhost:8080/HistoryCars-1.0-SNAPSHOT/webresources/';
        this.url = urlBase + url;
        console.log(this.url);

    }

    /*
        Ejecuta el metodo POST para guardar registros,
        resive como parametros la URL donde se expone el metodo
        y el objeto a persistir
    */
    create(entity) {
        return new Promise((resolve, reject) => {
            if (this.url.length > 0 && entity != null) {


                fetch(this.url, {
                    method: 'POST',
                    body: JSON.stringify(entity),
                    headers: {
                        'content-type': 'application/json; charset=UTF-8'
                    }

                }).then(resp => resp // ojo aca xd resp.json()
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
    edit(entity) {
        return new Promise((resolve, reject) => {

            if (entity != null && this.url.length > 0) {


                fetch(this.url, {
                    method: 'PUT',
                    body: JSON.stringify(entity),
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json'
                    }

                }).then(resp => resp// ojo aca xd resp.json()
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

    eliminar(id) {
        return new Promise((resolve, reject) => {
            if (id !== undefined && id != null && this.url.length > 0) {

                return fetch(this.url + '/' + id, {
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
        this.url += url;
        return  fetch(this.url).then(function(response) {
            return response.json();
        })

    }


    async findRange(url){
        const response = await fetch(this.url+url);
        const data = await response.json();
        return data;
    }

}

export default MetodsT