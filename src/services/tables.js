import othersServices from "./others.js";

export default {
    /**
     * Crea una nueva mesa en el local storage
     * 
     * @returns {Promise<Tables.TablesResponse>}
     */
    create(){
        return new Promise ((resolve, reject) => {
            let table = {
                number: null,
                status: 'empty',
                diners: 0,
                order: []
            }, tables = [];

            if(localStorage.tables === null || localStorage.tables === undefined || localStorage.tables.length == 0){
                table["number"] = 1;
                tables.push(table);
                localStorage.tables = JSON.stringify(tables);
                resolve({
                    status: true,
                    tables: tables,
                });
            }else{
                tables = JSON.parse(localStorage.tables);
                let idExist = false;
                for (let i = 0; i < tables.length; i++) {
                    if ((tables.length+1) == tables[i].number) {
                        console.log(tables.length+' '+tables[i].number);
                        idExist = true;
                        break;
                    }else{
                        continue;
                    }
                }

                if(idExist){
                    table["number"] = othersServices.generateTablesId(tables);
                }else{
                    table["number"] = tables.length+1;
                }

                if(tables.length >600){
                    reject({
                        status: false,
                        errors: 'No puede haber más de 600 mesas.',
                    });
                }else{
                    tables.push(table);
                    localStorage.tables = JSON.stringify(tables);
                    resolve({
                        status: true,
                        tables: tables,
                    });
                }
            }
        });
    },

    /**
     * Modifica la cantidad de comensales que hay en una mesa existente en el local storage.
     * 
     * @param {table} table 
     * @returns {Promise<Tables.TablesResponse>}
     */
    assignDiners(table){
        return new Promise ((resolve, reject) => {
            if(localStorage.tables === null || localStorage.tables === undefined || localStorage.tables.length == 0){
                reject({
                    status: false,
                    errors: 'No existe dicha mesa.',
                });
            }else{
                let tables = JSON.parse(localStorage.tables), 
                existe = {
                    status: false,
                    index: 0
                };

                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number == table.id){
                        existe.status = true;
                        existe.index = i;
                        break;
                    }else{
                        continue;
                    }          
                }

                if(existe.status){
                    tables[existe.index].diners = table.diners;
                    localStorage.tables = JSON.stringify(tables);
                    resolve({
                        status:true
                    });
                }else{
                    reject({
                        status:false,
                        errors: 'No se pudo eliminar la mesa.'
                    });
                }
            }


        })
    },

    /**
     * Modifica el estado de una mesa existente en el local storage.
     * 
     * @param {table} table 
     * @returns {Promise<Tables.TablesResponse>}
     */
    changeStatus(table){
        return new Promise ((resolve, reject) => {
            if(localStorage.tables === null || localStorage.tables === undefined || localStorage.tables.length == 0){
                reject({
                    status: false,
                    errors: 'No existe dicha mesa.',
                });
            }else{
                let tables = JSON.parse(localStorage.tables), 
                existe = {
                    status: false,
                    index: 0
                };

                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number == table.id){
                        existe.status = true;
                        existe.index = i;
                        break;
                    }else{
                        continue;
                    }          
                }

                if(existe.status){
                    tables[existe.index].status = table.status;
                    localStorage.tables = JSON.stringify(tables);
                    resolve({
                        status:true
                    });
                }else{
                    reject({
                        status:false,
                        errors: 'No se pudo modificar el estado de la mesa.'
                    });
                }
            }


        })
    },

    /**
     * Elimina una mesa existente en el local storage.
     * 
     * @param {table} table 
     * @returns {Promise<Tables.TablesResponse>}
     */
    delete(table){
        return new Promise ((resolve, reject) => {
            if(localStorage.tables === null || localStorage.tables === undefined || localStorage.tables.length == 0){
                reject({
                    status: false,
                    errors: 'No existe dicha mesa.',
                });
            }else{
                let tables = JSON.parse(localStorage.tables), 
                existe = {
                    status: false,
                    index: 0
                };
                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number == table){
                        existe.status = true;
                        existe.index = i;
                        break;
                    }else{
                        continue;
                    }          
                }

                if(existe.status){
                    tables.splice(existe.index, 1);
                    localStorage.tables = JSON.stringify(tables);
                    resolve({
                        status:true
                    });
                }else{
                    reject({
                        status:false,
                        errors: 'No se pudo eliminar la mesa.'
                    });
                }
            }
        })
    }
}