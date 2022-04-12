<template>
    <li class="MenuItem">
        <div>
            <h3>{{ product.title }}</h3>
            <div>
                <PriceDisplay :price="product.price" :discount="product.discount" />
                <div>
                    <p v-if="product.stock">¡Hay stock!</p>
                    <p v-else>No hay stock</p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <router-link :to="'/product/edit/'+product.title">Editar producto</router-link>
                <form v-on:submit.prevent>
                    <input type="submit" @click="deleteProduct(product)" value="Borrar producto">
                </form>
            </div>
        </div>
    </li>
</template>
<style>
    .MenuItem{
    display: grid;
    grid-template-columns: 1fr 90px;
    grid-template-rows: 1fr;
    grid-gap: 20px;
    }

    .MenuItem >div:first-of-type{
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      grid-gap: 10px;
    }

    .MenuItem >div:first-of-type h3{
        font-size: 20px;
    }

    .MenuItem >div:first-of-type >div{
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr;
      grid-gap: 50px;
      width: 100%;
    }

    .MenuItem >div:first-of-type >div >div:last-of-type{
      display: flex;
      align-self: flex-end;
      justify-self: center;
      width: fit-content;
      height: fit-content;
      font-weight: 500;
        font-size: 17px;
    }

    .MenuItem >div:last-of-type{
        display: flex;
        align-self: flex-end;
        justify-self: center;
        width: fit-content;
        height: fit-content;
    }

    .MenuItem >div:last-of-type >div{
      display: grid;
      grid-template-columns: 40px 40px;
      grid-template-rows: 1fr;
      grid-gap: 10px;
      width:fit-content;
      height: fit-content;
    }

    .MenuItem >div:last-of-type >div >a{
        display: flex;
        width: 30px;
        height: 30px;
        align-self: center;
        justify-self: center;
        background-image: url('../../assets/images/icons/edit_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        font-size: 0;
        background-color: white;
        border: none;
    }

    .MenuItem >div:last-of-type >div >form{
      display: flex;
      width: 30px;
      height: 30px;
      align-self: center;
      justify-self: center;
    }

    .MenuItem >div:last-of-type >div >form >input{
        display: block;
        width: 30px;
        height: 30px;
        background-image: url('../../assets/images/icons/delete_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        font-size: 0;
        background-color: white;
        border: none;
    }
</style>
<script>
import PriceDisplay from '@/components/display/Price.vue'

import productsServices from '@/services/products.js'

export default {
    name: 'MenuItem',
    components:{PriceDisplay},
    props:{
        product:{
            type:Object
        }
    },
    methods:{
        deleteProduct: function(product){
            productsServices.delete(product).then((res) => {
                this.$emit('deleteProduct', res.product);
                return this.$store.commit('addNotification', { type: 'success', message: 'El producto se eliminó con éxito.' });
            }).catch((error) => {
                return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
            });
        }
    }
}
</script>
