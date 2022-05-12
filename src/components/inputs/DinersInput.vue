<template>
    <div class="DinersInputComponent">
        <span></span>
        <div>
            <button v-on:click="modifyDiners('remove')">Remover comensal</button>
            <input type="number" name="diners" id="diners" v-model="value" min="1">
            <button v-on:click="modifyDiners('add')">Agregar comensal</button>
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<style>
    .DinersInputComponent{
        width: 100%;
        height: fit-content;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
    }

    .DinersInputComponent >span{
        display: flex;
        align-self: center;
        justify-self: center;
        height: 50vw;
        max-height: 100px;
        width: 50vw;
        max-width: 100px;
        background-image: url('../../assets/images/icons/dinners_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .DinersInputComponent >div{
        display: grid;
        grid-template-columns: 40px 40px 40px;
        grid-template-rows: 40px;
        height: 40px;
        width: 120px;
        margin-left: auto;
        margin-right: auto;
    }

    .DinersInputComponent >div >button{
        font-size: 0;
        background-color: white;
        border: none;
        outline: none;
        display: block;
        widows: 40px;
        height: 40px;
    }

    .DinersInputComponent >div >button:first-of-type{
        background-image: url('../../assets/images/icons/remove_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .DinersInputComponent >div >button:last-of-type{
        background-image: url('../../assets/images/icons/add_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .DinersInputComponent >div >input[type="number"]::-webkit-outer-spin-button,
    .DinersInputComponent >div >input[type="number"]::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }

    .DinersInputComponent >div >input[type="number"]{
        -moz-appearance: textfield;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid transparent;
    }

    .DinersInputComponent >ul{
        width: 100%;
        max-width: 150px;
        margin-left: auto;
        margin-right: auto;
        font-size: 10px;
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
    name: 'DinersInput',
    props:{
        diners: {
            type: Number
        },
        name:{
            type: String
        },
        validationRules:{
            type: Array
        }
    },
    data: function(){
        return{
            value: this.diners,
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
        },
        modifyDiners: function(modify){
            if(modify == 'add'){
                this.value++;
            }else if(modify == 'remove' && this.value > 1){
                this.value--;
            }

            return this.validate();
        }
    },
}
</script>
