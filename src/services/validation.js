export default {

    /**
     * Valida un valor mediante un array de reglas.
     * 
     * @param {request} req 
     * @returns {update}
     */

    validate(req) {
        let response, split, errors = [], validated = true;

        for (let i = 0; i < req.validationRules.length; i++) {
            if(req.validationRules[i].includes(':')){
                split = req.validationRules[i].split(':');
                response = this[split[0]](req.value, split[1], req.validationRules);
                if(response.status){
                    continue;
                }else{
                    validated = false;
                    errors.push(response.error);
                    continue;
                }
            }else{
                response = this[req.validationRules[i]](req.value, req.validationRules);
                if(response.status){
                    continue;
                }else{
                    validated = false;
                    errors.push(response.error);
                    continue;
                }
            }
        }

        let update = {
            name: req.name,
            value: req.value,
            validated: validated,
            errors: errors
        };

        return update;
    },

    /**
     * Valida si un valor existe
     * 
     * @param {value} value 
     * @returns {boolean}
     */
    required: function(value){
        if(value === null || value === ''){
            return {
                status: false,
                error: 'No puede estar vacio.'
            }
        }else{
            return {
                status: true
            };
        }
    },

    /**
     * Valida que el valor no se exceda del parametro
     * 
     * @param {value} value 
     * @param {number} param 
     * @param {array} rules 
     * @returns {boolean}
     */
    max: function(value, param, rules){
        if(rules.includes('numeric')){
            if(value !== null && parseInt(value) > parseInt(param)){
                return {
                    status: false,
                    error: 'Debe ser menor a '+param
                }
            }else{
                return {
                    status: true
                }
            }
        }else{
            if(value !== null && value.length > parseInt(param)){
                return {
                    status: false,
                    error: 'Debe ser menor a '+param+' caracteres.'
                }
            }else{
                return {
                    status: true
                }
            }
        }
    },

    /**
     * Valida que el valor este por encima del parametro
     * 
     * @param {value} value 
     * @param {number} param 
     * @param {array} rules 
     * @returns {boolean}
     */
    min: function(value, param, rules){
        if(rules.includes('numeric')){
            if(value !== null && parseInt(value) < parseInt(param)){
                return {
                    status: false,
                    error: 'Debe ser mayor a '+param
                }
            }else{
                return {
                    status: true
                }
            }
        }else{
            if(value !== null &&  value.length < parseInt(param)){
                if(value.length == 0){
                    return {
                        status: true
                    }
                }else{
                    return {
                        status: false,
                        error: 'Debe ser mayor a '+param+' caracteres.'
                    }
                }
            }else{
                return {
                    status: true
                }
            }
        }
    },

    /**
     * Valida si el valor es numerico
     * 
     * @param {value} value 
     * @returns {boolean}
     */
    numeric (value){
        if(value == null || value == ''){
            return {
                status: true
            }
        }else{
            if(isNaN(parseInt(value))){
                return {
                    status: false,
                    error: 'Solo puede contener numeros.'
                }
            }else{
                return {
                    status: true
                }
            }
        }            
    },

    /**
     * Valida si el valor es unico
     * 
     * @param {value} value 
     * @param {string} params 
     * @returns {boolean}
     */
    unique(value, params){
        let param, list, exist = false;
        if(params.includes('-')){
            param = params.split('-');
            list = localStorage[param[0]];
        }else{
            list = localStorage[params];
        }

        if(list == undefined){
            return {
                status: true
            }
        }else{
            list = JSON.parse(list);
            
            for (let i = 0; i < list.length; i++) {
                if(list[i][param[1]] == value){
                    exist = true;
                    break;
                }else{
                    continue;
                }
            }

            if(exist){
                return {
                    status: false,
                    error: 'Ya se encuentra en uso.'
                }
            }else{
                return {
                    status: true
                }
            }   
        }
    },

    /**
     * Valida si el valor es un array
     * 
     * @param {value} value 
     * @returns {boolean}
     */
    array(value){
        if(Array.isArray(value)){
            return{
                status:true
            }
        }else{
            return {
                status: false,
                error: 'Debe de ser un array.'
            }
        }
    },

    /**
     * Valida si el valor es booleano
     * 
     * @param {value} value 
     * @returns {boolean}
     */
    bool(value){
        if(typeof value == "boolean"){
            return{
                status: true
            }
        }else{
            return{
                status:false,
                error: 'Debe ser verdadero o falso.'
            }
        }
    },
    
    /**
     * Devuelve las reglas de validacion gracias al nombre del campo
     * 
     * @param {string} name 
     * @returns {array}
     */
    getValidationRules(name) {
        let rules = {
            category: ['required', 'max:20', 'min:2'],
            categories: ['array'],
            title: ['required', 'unique:products-title', 'min:2', 'max:30'],
            description: ['min:10', 'max:100'],
            price: ['numeric'],
            stock: ['bool'],
            discount:['numeric', 'min:1', 'max:100'],
            diners:['required','numeric','min:1', 'max:100']
        };

        return rules[name];
    }
  
}