<template>
  <section id="sectionCategories">
    <div>
      <div>
          <h2>Categorías</h2>
          <p>Algunos ejemplos pueden ser: pastas, postres, bebidas.</p>
      </div>
      <form v-on:submit.prevent>
          <TextInput ref="categoryInput" label="Nombre de la categoría" name="category" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('category')"/>
          <input type="submit" @click="createCategory()" value="Crear categoría">
      </form>
    </div>
    <div>
      <div v-if="this.categories.length == 0">
        <p>Todavía no creaste categorías.</p>
      </div>
      <ul v-else>
        <CategoriesItem v-for="category in this.categories" :ref="category" :key="category" :category="category" v-on:editCategories="editCategories" v-on:deleteCategory="deleteCategory(category)" v-on:editCategory="editCategory"/>
      </ul>
    </div>
  </section>
</template>
<style>
  #sectionCategories{
    width:100%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    max-width: 500px;
  }

  #sectionCategories >div:first-of-type{
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    height: fit-content;
  }

  #sectionCategories >div:first-of-type >form >input[type=submit]{
   width: 100%;
   padding: 5px;
   background-color: #f59f2a;
   border: 1px solid #f59f2a;
   border-radius: 5px;
  }

  #sectionCategories >div:last-of-type{
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }

  #sectionCategories >div:last-of-type >ul{
    list-style: none;
    widows: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
</style>
<script>
import TextInput from '@/components/inputs/Text.vue'
import CategoriesItem from '@/components/listItems/CategoriesItem.vue';

import categoriesServices from '@/services/categories.js'
import validationServices from '@/services/validation.js'

export default {
  name: 'Categories',
  components: {
    TextInput,
    CategoriesItem
  },
  data:function(){
    return{
        inputs:{
            category: {
                value: null,
                validated: null,
                errors: null
            }
        },
        categories:[]
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
    createCategory: function(){
      this.$refs.categoryInput.validate();

      if(!this.inputs.category.validated){
          return false;
      }

      categoriesServices.create(this.inputs.category.value).then((res) => {
          this.categories.push(res.categories);
          this.inputs.category.value = null;
          this.$refs.categoryInput.value = null;
          return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se añadio con éxito.' });
      }).catch((error) => {
          return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
      });
    },
    editCategories: function(categories){
      return this.categories = categories;
    },
    editCategory: function(newCategory, oldCategory){
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i] == oldCategory){
          this.$set(this.categories, i, newCategory);
          break;
        } else{
          continue;
        }       
      }
    }
  },
  beforeMount: function(){
    if(localStorage.categories != undefined){
      this.categories = JSON.parse(localStorage.categories);
    }
  }
}
</script>
