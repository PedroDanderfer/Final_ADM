<template>
    <div class="numberInputComponent">
        <div>
            <label :for="name+'Input'">{{ label }}</label>
            <input v-if="Number.isInteger(parseInt(this.minInput)) && !Number.isInteger(parseInt(this.maxInput))" v-model="value" v-on:input="this.validate" :min="parseInt(minInput)" type="number" :name="name" :id="name+'Input'"/>
            <input v-else-if="Number.isInteger(parseInt(this.maxInput)) && ! Number.isInteger(parseInt(this.minInput))" v-model="value" v-on:input="this.validate" :max="parseInt(maxInput)" type="number" :name="name" :id="name+'Input'"/>
            <input v-else-if="Number.isInteger(parseInt(this.minInput)) && Number.isInteger(parseInt(this.maxInput))" v-model="value" v-on:input="this.validate" :min="parseInt(minInput)" :max="parseInt(maxInput)" type="number" :name="name" :id="name+'Input'"/>
            <input v-else v-model="value" v-on:input="this.validate" type="number" :name="name" :id="name+'Input'"/>
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<style >
    .numberInputComponent{
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }

    .numberInputComponent >div{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 5px;
    }    

    .numberInputComponent >div >input{
        width: 100%;
        padding: 5px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 5px;
    }

    .numberInputComponent >ul{
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
import validationServices from '@/services/validation.js'

export default {
    name: 'numberInput',
    props:{
        name: {
            type: String
        },
        label:{
            type:String
        },
        validationRules:{
            type: Array
        },
        minInput:{
            type: String
        },
        maxInput:{
            type: String
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
            let obj = {
                value: this.value,
                name: this.name,
                validationRules: this.validationRules,
            }
            let update = validationServices.validate(obj);
            this.$emit('updateInput', update);
        }
    },
    beforeMount: function(){
        if(this.options !== undefined){
            this.value = this.options;
        }
    }
}
</script>
