<template>
    <li id="componentCategoriesItem">
        <div v-if="editDisplay" id="categoriesItemEdit">
            <form v-on:submit.prevent>
                    <Input type="text" :ref="category" :othersErrors="this.inputs.category.errors" :placeValue="category" label="Nombre de la categoría" name="category" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('category')"/>
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
import Input from '@/components/inputs/Input.vue'

export default {
    name: 'CategoriesItem',
    components:{
        Input
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
            this.inputs[data.type].value = data.value;
            this.inputs[data.type].validated = data.validated;
            this.inputs[data.type].errors = data.errors;
        },
        getValidationRules: function(name){
            let rules = {
                category: ['required', 'max:20', 'min:2']
            };

            return rules[name];
        },
        editCategoryDisplay:function(){
            this.editDisplay = !this.editDisplay;
        },
        deleteCategory: function(category){
            this.$emit('deleteCategory', category);
        },
        editCategory: function(){
            this.inputs.category.errors = [];
            let categories = JSON.parse(localStorage.categories), editSuccess = false;
            this.$refs[this.category].validate();

            if(!this.inputs.category.validated){
                return this.$refs[this.category].validate();
            } 

            if(this.category == this.inputs.category.value){
                let errorExist = false;
                for (let i = 0; i < this.inputs.category.errors.length; i++) {
                    if(this.inputs.category.errors[i] == 'La categoría ya existe.'){
                        errorExist = true;
                        break;
                    }else{
                        continue;
                    }           
                }
                if(!errorExist){
                    return this.inputs.category.errors.push('La categoría ya existe.');
                }else{
                    return false;
                }
            }

            for (let i = 0; i < categories.length; i++) {
                if(categories[i] == this.category){
                    categories.splice(i, 1, this.inputs.category.value);    
                    editSuccess = true;
                    break;
                }else{
                    continue;
                }
            }

            if(editSuccess){
                localStorage.categories = JSON.stringify(categories);
                this.$emit('editCategory', this.category, this.inputs.category.value);
                return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se editó con éxito.' });
            }else{
                return this.$store.commit('addNotification', { type: 'error', message: 'La categoría no se pudo editar.' });
            }
        }
    },
    beforeMount: function(){
        this.inputs.category.value = this.category;
        this.inputs.category.validated = false;
        this.inputs.category.errors = [];
    }
}
</script>
