export default {
    /**
     * Genera un numero aleatoreo que este disponible para ser asignado como id de la mesa.
     * 
     * @param {Array} tables 
     * @returns {Number}
     */
    generateTablesId(tables){
        let idExisting = [], number;

        for (let i = 0; i < tables.length; i++) {
            idExisting.push(tables[i].number);                
        }

        number = Math.floor(Math.random() * 1000);

        if(idExisting.includes(number)){
            return this.generateTablesId();
        }else{
            return number;
        }
    }
}