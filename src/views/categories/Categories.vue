<template>
  <section id="sectionCategories">
    <div>
      <div>
          <h2>Categorías</h2>
          <p>Algunos ejemplos pueden ser: pastas, postres, bebidas.</p>
      </div>
      <form v-on:submit.prevent>
          <Input ref="categoryInput" type="text" label="Nombre de la categoría" name="category" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('category')"/>
          <input type="submit" @click="createCategory()" value="Crear categoría">
      </form>
    </div>
    <div>
      <div v-if="this.categories.length == 0">
        <p>Todavía no creaste categorías.</p>
      </div>
      <ul v-else>
        <CategoriesItem v-for="category in this.categories" :ref="category" :key="category" :category="category" v-on:deleteCategory="deleteCategory(category)" v-on:editCategory="editCategory"/>
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

  @media(min-width:900px){
    #sectionCategories{
      grid-template-columns: auto auto;
      grid-template-rows: 1fr;
      max-width: none;
      padding: 30px;
    }

    #sectionCategories >div:last-of-type{
      min-width: 400px;
    }
  }
</style>
<script>
import Input from '@/components/inputs/Input.vue'
import CategoriesItem from '../../components/listItems/CategoriesItem.vue';

export default {
  name: 'Categories',
  components: {
    Input,
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
    createCategory: function(){
      let categories, categoryExist = false;
      this.$refs.categoryInput.validate();

      if(!this.inputs.category.validated){
        return false;
      }
      
      if(localStorage.categories == undefined || localStorage.categories == null || localStorage.categories.length == 0){
        categories = [this.inputs.category.value];
        this.categories.push(this.inputs.category.value);
        localStorage.categories = JSON.stringify(categories);
      }else{
        categories = JSON.parse(localStorage.categories);
        for (let i = 0; i < categories.length; i++) {
          if(categories[i] == this.inputs.category.value){
            categoryExist = true;
            break;
          }else{
            continue;
          }          
        }

        if(categoryExist){
          this.inputs.category.validated = false;
          return this.inputs.category.errors.push('El nombre ya se encuentra en uso.');
        }else{
          categories.push(this.inputs.category.value);
          this.categories.push(this.inputs.category.value);
          localStorage.categories = JSON.stringify(categories);
          return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se añadio con éxito.' });
        }
      }
    },
    deleteCategory: function(category){
      let categoriesLocal = JSON.parse(localStorage.categories), deleted = false;
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i] == category){
          this.categories.splice(i, 1);
          break;
        }else{
          continue;
        } 
      }
      for (let i = 0; i < categoriesLocal.length; i++) {
        if(categoriesLocal[i] == category){
          deleted = true;
          categoriesLocal.splice(i, 1);
          break;
        }else{
          continue;
        }        
      }

      if(deleted){
        localStorage.categories = JSON.stringify(categoriesLocal);
        return this.$store.commit('addNotification', { type: 'success', message: 'La categoría se eliminó con éxito.' });
      }else{
        return this.$store.commit('addNotification', { type: 'error', message: 'Hubo un problema al eliminar la categoría.' });
      }
    },
    editCategory: function(old, latest){
      for (let i = 0; i < this.categories.length; i++) {
        if(this.categories[i] == old){
          this.$set(this.categories, i, latest);
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
