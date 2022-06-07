<template>
    <section id="sectionEditProduct">
        <div v-if="product == null">
            <p>null</p>
        </div>
        <div v-else>
            <div>
                <h2>Edita un producto</h2>
                <p>Ahora mismo vas a editar el producto: <span>{{ product.title }}</span>.</p>
            </div>        
            <form v-on:submit.prevent>
                <TextInput :placeValue="product.title" ref="titleInput" label="Título" name="title" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('title')"/>
                <TextAreaInput :placeValue="product.description" ref="descriptionInput" type="textarea" label="Descripción" name="description" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('description')"/>
                <TextInput :placeValue="product.price" ref="priceInput" label="Precio" name="price" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('price')"/>
                <div>
                    <div>
                    <input type="checkbox" name="haveDiscount" @change="sectionDisplay" ref="displayDiscountInput">
                    <p>Agregar un descuento.</p>
                    </div>
                    <div v-if="display.discount">
                    <TextInput :placeValue="product.discount" ref="discountInput" minInput="0" maxInput="100" label="Descuento (porcentaje)" name="discount" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('discount')"/>
                    </div>
                </div>
                <CheckInput label="Stock" :placeValue="product.stock" ref="stockInput" name="stock" v-on:updateInput="updateInput" :validationRules="this.getValidationRules('stock')"/>
                <div v-if="this.categories.length == 0" class="emptyCategories">
                    <p>Todavia no creaste ninguna categoría</p>
                    <p><router-link to="/categories">Crear nueva categoria</router-link></p>
                </div>
                <div v-else>
                    <Select label="Categorías" :placeValue="product.categories" ref="categoriesInput" name="categories" :options="this.categories" v-on:updateInput="this.updateInput" :validationRules="this.getValidationRules('categories')"/>
                </div>
                <input type="submit" @click="editProduct()" value="Editar producto">
            </form>
        </div>
    </section>
</template>
<style>
 #sectionEditProduct >div{
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
    max-width: 800px;
  }

  #sectionEditProduct >div >div:first-of-type{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }

  #sectionEditProduct >div >div:first-of-type >p >span{
      font-weight: 500;
      font-size: 18px;
  }

  #sectionEditProduct >div >form{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-gap: 10px;
  }

  #sectionEditProduct >div >form >div:nth-of-type(4){
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  }

  #sectionEditProduct >div >form >div:nth-of-type(4) >div:first-of-type{
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: 20px auto;
    grid-template-rows: 20px;
    grid-gap: 10px;
  }

  #sectionEditProduct >div >form >input[type=submit]{
   width: 100%;
   padding: 5px;
   background-color: #f59f2a;
   border: 1px solid #f59f2a;
   border-radius: 5px;
  }

  .emptyCategories{
    margin-bottom: 10px;
  }
</style>
<script>
import TextInput from '@/components/inputs/Text.vue'
import TextAreaInput from '@/components/inputs/TextArea.vue'
import Select from '@/components/inputs/Select.vue'
import CheckInput from '@/components/inputs/Check.vue'

import validationServices from '@/services/validation.js'
import productsServices from '@/services/products.js'

export default {
    name: 'editProductSection',
    data: function(){
        return{
            product: null,
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
                stock:{
                    value:null,
                    validated:null,
                    error:null
                },
                categories: {
                    value: null,
                    validated: null,
                    errors: null
                }
            },
            categories:[]
        }
    },
    components:{TextInput, TextAreaInput, Select, CheckInput},
    methods:{
        getProduct: function(productTitle){
            let product = {
                status: false,
                product: null
            };
            let products = JSON.parse(localStorage.products);
            for (let i = 0; i < products.length; i++) {
                if(products[i].title == productTitle){
                    product.status = true;
                    product.product = products[i];
                    break;
                }else{
                    continue;
                }
            }

            if(product.status){
                this.inputs.title.value = product.product.title;
                if(product.product.description != null){
                    this.inputs.description.value = product.product.description;
                }
                if(product.product.price != null){
                    this.inputs.price.value = product.product.price;
                }
                if(product.product.discount != null){
                    this.inputs.discount.value = product.product.discount;
                }
                if(product.product.categories != null){
                    this.inputs.categories.value = product.product.categories;
                }
                return this.product = product.product;
            }else{
               return this.product = [];
            }
        },
        editProduct: function(){
            let inputsHasChanged = {
                status: false,
                inputs: []
            }
            if(this.product.title != this.inputs.title.value){
                inputsHasChanged.status = true;
                inputsHasChanged.inputs.push('title');
            }
            if(this.product.description != this.inputs.description.value){
                inputsHasChanged.status = true;
                inputsHasChanged.inputs.push('description');
            }
            if(this.product.price != this.inputs.price.value){
                inputsHasChanged.status = true;
                inputsHasChanged.inputs.push('price');
            }

            if(this.$refs.displayDiscountInput.checked){
                if(this.product.discount != this.inputs.discount.value){
                    inputsHasChanged.status = true;
                    inputsHasChanged.inputs.push('discount');
                }
            }else{
                if(this.product.discount != null){
                    inputsHasChanged.status = true;
                    inputsHasChanged.inputs.push('discount');
                }
            }

            if(this.inputs.stock.value !== null && this.product.stock == this.inputs.stock.value){
                inputsHasChanged.status = true;
                inputsHasChanged.inputs.push('stock');
            }

            console.log(this.product.stock+' '+this.inputs.stock.value);

            if(this.product.categories != this.inputs.categories.value){
                inputsHasChanged.status = true;
                inputsHasChanged.inputs.push('categories');
            }

            if(inputsHasChanged.status){
                let product = {};
                for (let i = 0; i < inputsHasChanged.inputs.length; i++) {
                    if(inputsHasChanged.inputs[i] == 'discount'){
                        if(this.$refs.displayDiscountInput.checked){
                            if(this.product.discount != this.inputs.discount.value){
                                this.$refs.discountInput.validate();
                                product["discount"] = this.inputs.discount.value;
                            }
                        }else{
                            if(this.product.discount != null){
                                this.inputs.discount.validated = true;
                                product["discount"] = null;
                            }
                        }
                    }else{
                        if(this.$refs[inputsHasChanged.inputs[i]+'Input'] != undefined){
                            this.$refs[inputsHasChanged.inputs[i]+'Input'].validate();
                            product[inputsHasChanged.inputs[i]] = this.inputs[inputsHasChanged.inputs[i]].value;
                        }   
                    }           

                    if(!this.inputs[inputsHasChanged.inputs[i]].validated){
                        return false;
                    }
                }

                console.log(inputsHasChanged.status+' '+inputsHasChanged.inputs);
                
                productsServices.edit(product, this.product).then(() => {
                    this.$router.push({ path: '/menu' })
                    return this.$store.commit('addNotification', { type: 'success', message: 'El producto se editó con éxito.' });
                }).catch((error) => {
                    return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
                });
            }else{
                return false;
            }
        },
        getValidationRules: function(value){
            return validationServices.getValidationRules(value);
        },
        updateInput: function(data){
            this.inputs[data.name].value = data.value;
            this.inputs[data.name].validated = data.validated;
            this.inputs[data.name].errors = data.errors;
        },
         sectionDisplay: function(e){
            if(e.target.name == 'haveDiscount'){
                this.display.discount = !this.display.discount;
            }
        },
    },
    watch: { 
     '$route.params.product': function(){
         return this.getProduct(this.$route.params.product);
     }
    },
    created:function(){
        this.categories = JSON.parse(localStorage.categories);
        return this.getProduct(this.$route.params.product);
    },
    mounted:function(){
        if(this.product.discount !== null){
            this.$refs.displayDiscountInput.checked = true;
            return this.display.discount = true;
        }
    }
}
</script>
