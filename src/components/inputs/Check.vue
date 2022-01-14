<template>
    <div class="checkInputComponent">
        <div>
            <label :for="name+'Input'">{{ label }}</label>
            <input type="checkbox" v-model="value" v-on:input="this.validate" :name="name" :id="name+'Input'" />
        </div>
        <ul v-if="this.errors[0] !== undefined">
            <li v-for="error in this.errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>
<script>
import validationServices from '@/services/validation.js'

export default {
    name: 'checkInput',
    props:{
        name: {
            type: String
        },
        label:{
            type:String,
        },
        validationRules:{
            type: Array
        },
        placeValue:{
            type:Boolean
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
        if(this.placeValue !== undefined && this.placeValue !== null){
            this.value = this.placeValue;
        }
    }
}
</script>
