<template>
    <li id="componentCategoriesItem">
        <div v-if="editDisplay" id="categoriesItemEdit">
            <form v-on:submit.prevent>
                    <TextInput ref="categoryInput" :othersErrors="this.inputs.category.errors" :placeValue="category" label="Nombre de la categoría" name="category" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('category')"/>
                    <input type="submit" @click="editCategory" value="Guardar">
            </form>
            <button v-on:click="editCategoryDisplay">Cerrar</button>
        </div>
        <div v-else id="categoriesItemNoEdit">
            <h3>{{ category }}</h3>
            <div>
                <button v-on:click="editCategoryDisplay">Editar categoría</button>
                <form v-on:submit.prevent>
                    <input type="submit" @click="deleteCategory(category)" value="Borrar categoría">
                </form>
            </div>
        </div>
    </li>
</template>
<style>
    #componentCategoriesItem{
        width: 100%;
    }

    #componentCategoriesItem >div{
        width:100%;
        display:grid;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #categoriesItemEdit{
        grid-template-columns: 1fr 40px;
    }

    #categoriesItemNoEdit{
        grid-template-columns: 1fr 90px;
    }

    #categoriesItemNoEdit >h3{
        display: flex;
        width: fit-content;
        height: fit-content;
        align-self: center;
        justify-self: flex-start;
        font-weight: 500;
    }

    #categoriesItemNoEdit >div{
        width: 100%;
        display: grid;
        grid-template-columns: 40px 40px;
        grid-gap: 10px;
        grid-template-rows: 1fr;
    }

    #categoriesItemNoEdit >div >form{
        display: grid;
        grid-template-columns: 40px;
        grid-template-rows: 40px;
        height: 40px;
        width: 40px;
    }

    #categoriesItemNoEdit >div >form >input[type=submit]{
        display: flex;
        align-self: center;
        justify-self: center;
        width: 30px;
        height: 30px;
        background-color: white;
        border: 1px solid white;
        outline: none;
        font-size: 0;
        background-image: url('../../assets/images/icons/delete_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    #categoriesItemNoEdit >div >button{
        display: flex;
        align-self: center;
        justify-self: center;
        width: 30px;
        height: 30px;
        background-color: white;
        border: 1px solid white;
        outline: none;
        font-size: 0;
        background-image: url('../../assets/images/icons/edit_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    #categoriesItemEdit >form{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    #categoriesItemEdit >form >input[type=submit]{
        width: 100%;
        height: 30px;
        background-color: #f59f2a;
        border: 1px solid #f59f2a;
        border-radius: 5px;
    }

    #categoriesItemEdit >button{
         display: flex;
        align-self: flex-end;
        justify-self: center;
        width: 30px;
        height: 30px;
        background-color: white;
        border: 1px solid white;
        outline: none;
        font-size: 0;
        background-image: url('../../assets/images/icons/close_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
<script>
import TextInput from '@/components/inputs/Text.vue'

import validationServices from '@/services/validation.js'
import categoriesServices from '@/services/categories.js'

export default {
    name: 'CategoriesItem',
    components:{
        TextInput
    },
    props:{
        category:{
            type: String
        }
    },
    data: function(){
        return{
            editDisplay: false,
            inputs:{
                category: {
                    value: null,
                    validated: null,
                    errors: null
                }
            }
        }
    },
    methods:{
        updateInput: function(data){
            this.inputs[data.name].value = data.value;
            this.inputs[data.name].validated = data.validated;
            this.inputs[data.name].errors = data.errors;
        },
        getValidationRules: function(value){
            return validationServices.getValidationRules(value);
        },
        editCategoryDisplay:function(){
            this.editDisplay = !this.editDisplay;
        },
        deleteCategory: function(category){
            categoriesServices.delete(category).then((res) => {
                this.$emit('editCategories', res.categories);
                return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se eliminó con éxito.' });
            }).catch((error) => {
                return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
            });
        },
        editCategory: function(){
            this.$refs.categoryInput.validate();

            if(!this.inputs.category.validated){
                return false;
            }

            categoriesServices.edit(this.inputs.category.value, this.category).then((res) => {
                this.$emit('editCategory', res.newCategory, res.oldCategory);
                return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se editó con éxito.' });
            }).catch((error) => {
                console.log(error);
                return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
            });
        }
    },
    beforeMount: function(){
        this.inputs.category.value = this.category;
        this.inputs.category.validated = false;
        this.inputs.category.errors = [];
    }
}
</script>
