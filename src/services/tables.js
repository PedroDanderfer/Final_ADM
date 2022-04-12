import othersServices from "./others.js";

export default {
    create(){
        return new Promise ((resolve, reject) => {
            let table = {
                number: null,
                status: 'empty',
                customers: []
            }, tables = [];

            if(localStorage.tables === null || localStorage.tables === undefined || localStorage.tables.length == 0){
                table["number"] = 0;
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
                    if (tables.length == tables[i].number) {
                        idExist = true;
                        break;
                    }else{
                        continue;
                    }
                }

                if(idExist){
                    table["number"] = othersServices.generateTablesId(tables);
                }else{
                    table["number"] = tables.length;
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
    }
}