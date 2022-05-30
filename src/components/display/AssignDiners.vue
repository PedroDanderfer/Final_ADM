<template>
    <div id="assignDiners">
        <h3>Seleccione la cantidad de comensales.</h3>
        <form v-on:submit.prevent>
            <DinersInput ref="dinersInput" :diners="this.inputs.diners.value" name="diners" :validationRules="this.getValidationRules('diners')" v-on:updateInput="this.updateInput"/>
            <input type="submit" @click="assignDiners()" value="Asignar comensales">
        </form>
    </div>
</template>
<style>
    #assignDiners{
        width:100%;
        padding: 40px;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        height: fit-content;
        max-width: 500px;
        text-align: center;
    }

    #assignDiners >form >input[type="submit"]{
        width: fit-content;
        padding: 5px;
        height: fit-content;
        background-color: #f59f2a;
        border: 1px solid #f59f2a;
        border-radius: 5px;
        font-weight: 500;
        font-size: 15px;
        color: black;
        text-decoration: none;
        margin-top: 10px;
    }
</style>
<script>
import validationServices from '@/services/validation.js'
import DinersInput from '@/components/inputs/DinersInput.vue'

import tablesServices from '@/services/tables.js'

export default {
    name: 'AssignDiners',
    props:['tableNumber'],
    data: function(){
        return{
            totalPrice:0,
            inputs:{
                diners:{
                    value: 1,
                    validated: null,
                    errors:[]
                }
            }
        }
    },
    components:{
        DinersInput
    },
    methods:{
        getValidationRules: function(value){
            return validationServices.getValidationRules(value);
        },
        updateInput: function(data){
            this.inputs[data.name].value = data.value;
            this.inputs[data.name].validated = data.validated;
            this.inputs[data.name].errors = data.errors;
        },  
        assignDiners: function(){
            this.$refs.dinersInput.validate();
            if(!this.inputs.diners.validated){
                return false;
            }

            let table = {
                id:this.$route.params.table,
                diners:this.inputs.diners.value,
                status: 'waiting'
            };
            
            tablesServices.assignDiners(table).then(() => {
                tablesServices.changeStatus(table).then(() => {
                    let update = [
                        {
                            update: 'status',
                            value: 'waiting'
                        },
                        {
                            update:'diners',
                            value:this.inputs.diners.value
                        }
                    ];
                    this.$emit('updateTable', update);
                    return this.$store.commit('addNotification', { type: 'success', message: 'Los comensales se asignaron correctamente.' });
                }).catch((error) => {
                    return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
                });
            }).catch((error) => {
                return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
            });
        }
    }
}
</script>
