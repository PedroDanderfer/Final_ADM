export default {
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