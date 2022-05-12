<template>
  <section id="sectionCreateProduct">
      <div>
          <h2>Creá un producto</h2>
          <p>Agregá algo sabroso a tu carta.</p>
      </div>
      <form v-on:submit.prevent>
          <TextInput ref="titleInput" label="Título del producto" name="title" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('title')"/>
          <TextAreaInput ref="descriptionInput" type="textarea" label="Descripción del producto" name="description" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('description')"/>
          <TextInput ref="priceInput" label="Precio del producto" name="price" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('price')"/>
          <div>
            <div>
              <input type="checkbox" name="haveDiscount" @change="sectionDisplay">
              <p>Agregar un descuento.</p>
            </div>
            <div v-if="display.discount">
              <TextInput ref="discountInput" minInput="0" maxInput="100" label="Descuento (porcentaje)" name="discount" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('discount')"/>
            </div>
          </div>
          <div v-if="this.categories.length == 0" class="emptyCategories">
            <p>Todavia no creaste ninguna categoría</p>
            <p><router-link to="/categories">Crear nueva categoria</router-link></p>
          </div>
          <div v-else>
               <Select ref="categoriesInput" name="categories" :options="this.categories" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('categories')"/>
          </div>
          <input type="submit" @click="createProduct()" value="Crear producto">
      </form>
  </section>
</template>
<style>
  #sectionCreateProduct{
    width:100%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 20px;
    height: fit-content;
    max-width: 500px;
  }

  #sectionCreateProduct >div:first-of-type{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }

  #sectionCreateProduct >form{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-gap: 10px;
  }

  #sectionCreateProduct >form >div:nth-of-type(4){
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }

  #sectionCreateProduct >form >div:nth-of-type(4) >div:first-of-type{
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: 20px auto;
    grid-template-rows: 20px;
    grid-gap: 10px;
  }

  #sectionCreateProduct >form >input[type=submit]{
    width: 100%;
    padding: 5px;
    height: fit-content;
    background-color: #f59f2a;
    border: 1px solid #f59f2a;
    border-radius: 5px;
    font-weight: 500;
    font-size: 15px;
    color: black;
    text-decoration: none;
  }

  .emptyCategories{
    margin-bottom: 10px;
  }
</style>
<script>
import Select from '@/components/inputs/Select.vue'
import TextInput from '@/components/inputs/Text.vue'
import TextAreaInput from '@/components/inputs/TextArea.vue'

import validationServices from '@/services/validation.js'
import productsServices from '@/services/products.js'

export default {
  name: 'createProductSection',
  data: function(){
    return{
      display:{
        discount:false
      },
      inputs:{
        title: {
          value: null,
          validated: null,
          errors: null
        },
        description: {
          value: null,
          validated: null,
          errors: null
        },
        price: {
          value: null,
          validated: null,
          errors: null
        },
        discount: {
          value: null,
          validated: null,
          errors: null
        },
        categories: {
          value: null,
          validated: null,
          errors: null
        }
      },
      categories: []
    }
  },
  components:{
    Select, TextInput, TextAreaInput
  },
  methods:{
    getValidationRules: function(value){
      return validationServices.getValidationRules(value);
    },
    sectionDisplay: function(e){
      if(e.target.name == 'haveDiscount'){
        this.display.discount = !this.display.discount;
      }
    },
    updateInput: function(data){
        this.inputs[data.name].value = data.value;
        this.inputs[data.name].validated = data.validated;
        this.inputs[data.name].errors = data.errors;
    },
    createProduct:function(){
      this.$refs.titleInput.validate();
      this.$refs.descriptionInput.validate();
      this.$refs.priceInput.validate();
      if(this.$refs.discountInput != undefined){
        this.$refs.discountInput.validate();
      }
      if(this.$refs.categoriesInput != undefined){
        this.$refs.categoriesInput.validate();
      }

      if(!this.inputs.title.validated || this.inputs.description.validated == false || this.inputs.price.validated == false || this.inputs.discount.validated == false || this.inputs.categories.validated == false){
          return false;
      }

      let product = {
        title: this.inputs.title.value,
        description: this.inputs.description.value,
        price: this.inputs.price.value,
        discount: this.inputs.discount.value,
        categories: this.inputs.categories.value,
      };
      
      productsServices.create(product).then(() => {
          this.$router.push({ name: 'Menu'});
          return this.$store.commit('addNotification', { type: 'success', message: 'El producto se creo con éxito.' });
      }).catch((error) => {
          return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
      });
    }
  },
  created:function(){
    return this.categories = JSON.parse(localStorage.categories);
  }
}
</script>
