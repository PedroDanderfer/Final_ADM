<template>
    <div class="textInputComponent">
        <div>
            <label :for="name+'Input'">{{ label }}</label>
            <input v-model="value" v-on:input="this.validate" type="text" :name="name" :id="name+'Input'"/>
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<style >
    .textInputComponent{
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }

    .textInputComponent >div{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 5px;
    }    

    .textInputComponent >div >input{
        width: 100%;
        padding: 5px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 5px;
    }

    .textInputComponent >ul{
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
    name: 'textInput',
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
        placeValue:{
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
        validate: function (){
            this.errors = [];
            let obj = {
                value: this.value,
                name: this.name,
                validationRules: this.validationRules,
            }
            let update = validationServices.validate(obj);
            this.errors = update.errors;
            return this.$emit('updateInput', update);
        }
    },
    beforeMount: function(){
        if(this.placeValue !== undefined){
            this.value = this.placeValue;
        }
    }
}
</script>
