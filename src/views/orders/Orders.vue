<template>
  <div id="Orders">
    <div>
      <h2>Ordenes</h2>
    </div>
    <div v-if="this.orders == null || this.orders.lenght == 0">
      <p>Todavia no se registraron ordenes</p>
    </div>
    <ul v-else>
      <li v-for="(order, index) in this.orders" :key="index">
        <div>
          <p>Creado el: {{ order.dayCreated }}, a la(s): {{ order.timeCreated }}</p>
        </div>
        <div>
          <p><span>Mesa numero: </span>{{ order.tableNumber }}</p>
          <p><span>Comensales: </span>{{ order.diners }}</p>
        </div>
        <ul>
          <li v-for="(order, index) in order.order" :key="index">
            <p>{{ order.title }}</p>
            <p>
                <span>Cantidad: </span>
                <span>
                    <span></span>
                    {{ order.amount }}
                </span>
            </p>
            <PriceDisplay :price="order.price" :discount="order.discount" />
          </li>
        </ul>
        <div>
          <p>Total: {{ order.total }}</p>
          <p :class="(order.paymentMethod == 'cash') ? 'cashIcon' : 'cardIcon'">Metodo de pago: {{ (order.paymentMethod == 'cash') ? 'Efectivo' : 'Tarjeta' }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
  #Orders{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 20px;
  }

  #Orders >div{
    width: fit-content;
    height: fit-content;
    display: flex;
    align-self: center;
    justify-self: flex-start;
  }

  #Orders >ul{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  #Orders >ul >li{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr auto 1fr;
    grid-gap: 5px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 10px;
  }

  #Orders >ul >li >ul >li:nth-child(even){
    background-color: #fff;
  }
  #Orders >ul >li >ul >li:nth-child(odd){
    background-color: #ddd;
  }

  #Orders >ul >li >div:first-of-type{
    display: flex;
    align-self: center;
    justify-self: flex-start;
    width: fit-content;
    height: fit-content;
  }

  #Orders >ul >li >div:nth-of-type(2){
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 5px;
  }
  #Orders >ul >li >div:nth-of-type(2) >p:first-of-type{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 20px auto;
    width: fit-content;
    height: fit-content;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  #Orders >ul >li >div:nth-of-type(2) >p:first-of-type >span{
    font-size: 0;
    width: 30px;
    height: 15px;
    background-image: url('../../assets/images/table.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  #Orders >ul >li >div:nth-of-type(2) >p:last-of-type{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 20px auto;
    width: fit-content;
    height: fit-content;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  #Orders >ul >li >div:nth-of-type(2) >p:last-of-type >span{
    font-size: 0;
    width: 30px;
    height: 20px;
    background-image: url('../../assets/images/icons/dinners_icon.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  #Orders >ul >li >ul{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    list-style: none;
    max-height: 250px;
    overflow-y: scroll;
  }

  #Orders >ul >li >ul >li{
    display: grid;
    grid-template-columns: auto 40px 100px;
    grid-template-rows: 1fr;
    grid-gap: 5px;
    padding: 5px;
  }

  #Orders >ul >li >ul >li >p:first-of-type{
    display: flex;
    align-self: center;
    justify-self: flex-start;
  }

  #Orders >ul >li >ul >li >p:last-of-type{
    display: flex;
    align-self: center;
    justify-self: center;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  #Orders >ul >li >ul >li >p:last-of-type >span:first-of-type{
    width: 20px;
    height: 20px;
    font-size: 0;
    background-image: url('../../assets/images/icons/x_icon.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  #Orders >ul >li >ul >li >div:last-of-type{
    display: flex;
    align-self: center;
    justify-self: center;
  }

  #Orders >ul >li >div:last-of-type{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 5px;
  }

  #Orders >ul >li >div:last-of-type >p:first-of-type{
    display: flex;
    align-self: center;
    justify-self: center;
    font-weight: bold;
  }

  #Orders >ul >li >div:last-of-type >p:last-of-type{
    display: flex;
    align-self: center;
    justify-self: center;
    width: 40px;
    height: 30px;
    font-size: 0;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .cashIcon{
    background-image: url('../../assets/images/icons/cash_icon.png');
  }
  .cardIcon{
    background-image: url('../../assets/images/icons/card_icon.png');
  }
</style>
<script>
import PriceDisplay from '@/components/display/Price.vue'

export default {
  name:'ordersSection',
  data:function(){
    return{
      orders:null
    }
  },
  components:{
    PriceDisplay
  },
  beforeMount:function(){
    if(localStorage.orders == undefined || localStorage.orders == null || localStorage.orders.lenght == 0){
      return this.orders = [];
    }

    let orders = JSON.parse(localStorage.orders);
    return this.orders = orders;
  }
}
</script>

