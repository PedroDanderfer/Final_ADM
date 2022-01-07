<template>
    <div id="componentInput">
        <div>
            <label :for="name+'Input'">{{ label }}</label>
            <input v-model="value" v-on:input="this.validate" :type="type" :name="name" :id="name+'Input'"/>
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<style >
    #componentInput{
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }

    #componentInput >div{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 5px;
    }    

    #componentInput >div >input{
        width: 100%;
        padding: 5px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 5px;
    }

    #componentInput >ul{
        width: 100%;
        background-color: rgba(255, 0, 0, 0.3);
        border: 1px solid rgba(255, 0, 0, 0.3);
        border-radius: 5px;
        padding: 5px;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 5px;
        list-style: none;
        margin-bottom: 10px;
    }
</style>
<script>
export default {
    name: 'Input',
    props:{
        type:{
            type: String
        },
        label:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        validationRules:{
            type:Array
        },
        placeValue: {
            type: String
        },
        othersErrors: {
            type: Array
        }
    },
    data: function(){
        return{
            value: null,
            validated: null,
            errors: [],
        }
    },
    methods:{
        validate: function(){
            let response, split;
            this.validated = true;
            this.errors = [];
            for (let i = 0; i < this.validationRules.length; i++) {
                if(this.validationRules[i].includes(':')){
                    split = this.validationRules[i].split(':');
                    response = this[split[0]](this.value, split[1], this.validationRules);
                    if(response.status){
                        continue;
                    }else{
                        this.validated = false;
                        this.errors.push(response.error);
                        continue;
                    }
                }else{
                    response = this[this.validationRules[i]](this.value, this.validationRules);
                    if(response.status){
                        continue;
                    }else{
                        this.validated = false;
                        this.errors.push(response.error);
                        continue;
                    }
                }
            }

            if(this.validated === null){
                this.validated = true;
            }

            let update = {
                type: this.name,
                value: this.value,
                validated: this.validated,
                errors: this.errors
            };

            this.$emit('updateInput', update);
        },

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
        max: function(value, param){
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
        },
        min: function(value, param, rules){
            if(value !== null &&  value.length < parseInt(param)){
                if(rules.includes('required') && value.length == 0){
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
    beforeMount: function(){
        if(this.placeValue !== undefined){
            this.value = this.placeValue;
        }
    },
    watch:{
        othersErrors:function (errors){
            this.errors = errors;
        }
    }
}
</script>
