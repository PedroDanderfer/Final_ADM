<template>
  <section id="sectionMenu">
    <div>
      <h2>Menu</h2>
      <nav class="navMenu">
        <ul>
          <li><router-link to="/categories">Categorías</router-link></li>
          <li><router-link to="/product/create">Agregar producto</router-link></li>
        </ul>
      </nav>
    </div>
    <ul v-if="!this.ProductsNotFound">
        <li v-for="(category, index) in this.menu" :key="index">
          <div class="divProduct" v-if="category.products.length >= 1">
            <div>
                <h2>{{ category.category }}</h2>
            </div>
            <ul>
                <MenuItem v-for="product in category.products" :key="product.title" :product="product" v-on:deleteProduct="deleteProduct"/>
            </ul>
          </div>
        </li>
    </ul>
    <NotFound v-else message="Todavía no se crearon productos." />
  </section>
</template>

<style>
  #sectionMenu{
    width:100%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    max-width: 500px;
  }

  #sectionMenu >div:first-of-type{
    width:100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;    
    grid-gap: 10px;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    padding: 10px;
  }

  #sectionMenu >div:first-of-type >h2{
    display: flex;
    align-self: center;
    justify-self: flex-start;
  }

  #sectionMenu >ul{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    list-style: none;
  }

  .navMenu{
    width: 100%;
    display: flex;
    align-self: center;
    justify-self: flex-end;
  }
  .navMenu >ul{
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    list-style: none;
  }
  .navMenu >ul >li{
    display: flex;
    align-self: center;
    justify-self: flex-end;
    width: fit-content;
  }
  .navMenu >ul >li >a{
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
  }
  .divProduct{
    width:100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    list-style: none;
  }

  .divProduct >div:first-of-type{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  
  .divProduct >ul{
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }

  @media(min-width:600px){
    .navMenu >ul{
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<script>
import MenuItem from '@/components/listItems/MenuItem'
import NotFound from '@/components/NotFound.vue'

import menuServices from '@/services/menu.js'

export default {
  name: 'menuSection',
  data: function(){
    return{
      menu:[],
      ProductsNotFound: false
    }
  },
  components:{
    MenuItem,
    NotFound
  },
  methods:{
    deleteProduct:function(product){
      let productCategories = product.categories;

      if(productCategories == null || productCategories.length == 0){
        productCategories = ['Otros'];
      }

      for (let i = 0; i < this.menu.length; i++) {
        if(productCategories.includes(this.menu[i].category)){
          for (let j = 0; j < this.menu[i].products.length; j++) {
            if(this.menu[i].products[j].title == product.title){
              this.menu[i].products.splice(j, 1);
              this.displayProductsNotFound();
              break;
            }else{
              continue;
            }           
          }
        }      
      }
    },
    displayProductsNotFound: function(){
      let existe = false;
      for (let i = 0; i < this.menu.length; i++) {
        if(this.menu[i].products.length > 0){
          existe = true;
          break;
        }else{
          continue;
        }
      }

      if(existe){
        return this.ProductsNotFound  = false;
      }else{
        return this.ProductsNotFound = true;
      }
    }
  },
  beforeMount:function(){
    menuServices.getMenu().then((res) => {
      this.menu = res; 
      return this.displayProductsNotFound();
    });
  },
  watch:{
    menu: function(){
      return this.displayProductsNotFound();
    }
  }
}
</script>
