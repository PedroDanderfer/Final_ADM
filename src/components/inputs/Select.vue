<template>
    <div class="selectInputComponent">
        <div>
            <select ref="selectInput" v-model="value" v-on:input="this.validate" :name="name" :id="name+'Input'" multiple>
                <option v-for="option in this.options" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<style >
    .selectInputComponent{
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }

    .selectInputComponent >div{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 5px;
    }    

    .selectInputComponent >div >select{
        width: 100%;
        padding: 5px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 5px;
    }

    .selectInputComponent >ul{
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
    name: 'selectInput',
    props:{
        name: {
            type: String
        },
        options:{
            type: Array
        },
        validationRules:{
            type: Array
        }
    },
    data: function(){
        return{
            value: [],
            validated: null,
            errors: [],
        }
    },
    methods:{
        validate: function(){
            setTimeout(() => {
                this.errors = [];
                let obj = {
                    value: this.value,
                    name: this.name,
                    validationRules: this.validationRules,
                }
                let update = validationServices.validate(obj);
                this.errors = update.errors;
                return this.$emit('updateInput', update);
            }, 1);
        }
    },
}
</script>
