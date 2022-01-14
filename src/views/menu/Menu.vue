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
    <div v-if="!this.ProductsNotFound">
        <div v-for="category in this.menu" :key="category.category">
            <div>
              <h2>{{ category.category }}</h2>
            </div>
            <ul v-if="category.products.length !== 0">
                <MenuItem v-for="product in category.products" :key="product.title" :product="product" v-on:deleteProduct="deleteProduct"/>
            </ul>
            <div v-else>
                <p>La categoría no posee productos.</p>
            </div>
        </div>
    </div>
    <div v-else class="productNotFound">
      <div>
        <span></span>
        <p>Todavía no se crearon productos.</p>
      </div>
    </div>
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
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;    
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
    grid-gap: 10px;
  }
  .navMenu >ul >li{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
  }
  .navMenu >ul >li >a{
    display: flex;
    align-self: center;
    background-color: #f59f2a;
    border: 1px solid #f59f2a;
    border-radius: 8px;
    text-decoration: none;
    color: black;
    font-weight: 500;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-content: center;
    padding: 10px 0 10px 0;
  }
  .navMenu >ul >li:first-of-type >a{
    justify-self: flex-start;
  }
  .navMenu >ul >li:last-of-type >a{
    justify-self: flex-end;
  }
  #sectionMenu >div:last-of-type{
    width:100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  #sectionMenu >div:last-of-type >div{
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    list-style: none;
  }

  #sectionMenu >div:last-of-type >div >div:first-of-type{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    padding-bottom: 2px;
  }

  #sectionMenu >div:last-of-type >div >div:last-of-type{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    margin-top: 15px;
  }

  
  #sectionMenu >div:last-of-type >div >ul{
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }

  .productNotFound{
    width: fit-content;
    height: fit-content;
    display: flex;
    align-self: center;
    justify-self: center;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
  }

  .productNotFound >div{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 20px;
    grid-gap: 20px;
    text-align: center;
  }

  .productNotFound >div >span{
    display: block;
    width: 100%;
    height:300px;
    background-image: url('../../assets/images/notFound.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .productNotFound >div >p{
    font-weight: 500;
    font-size: 18px;
    display: flex;
    align-self: center;
    justify-self: center;
  }

  @media(min-width:600px){
    .navMenu >ul{
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<script>
import MenuItem from '@/components/listItems/MenuItem'

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
    MenuItem
  },
  methods:{
    deleteProduct:function(product){
      let productCategories = product.categories;
      console.log('delete');

      if(productCategories == null || productCategories.length == 0){
        productCategories = [];
        productCategories.push('Otros');
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
