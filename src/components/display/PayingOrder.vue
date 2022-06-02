<template>
    <div id="payingOrder">
        <div>
            <h3>Pago de la orden</h3>
        </div>
        <form v-on:submit.prevent>
            <ul v-if="this.inputs.paymentMethod.errors[0] !== undefined">
                <li v-for="error in this.inputs.paymentMethod.errors" :key="error">{{ error }}</li>
            </ul>
            <div>
                <label for="paymentMethodCash" :class="(this.inputChecked == 'cash') ? 'checked' : 'noChecked'" @click="changeInputChecked('cash')"><span></span><span>Efectivo</span></label>
                <input type="radio" value="cash" id="paymentMethodCash" v-model="inputs.paymentMethod.value">
            </div>
            <div>
                <label for="paymentMethodCard" :class="(this.inputChecked == 'card') ? 'checked' : 'noChecked'" @click="changeInputChecked('card')"><span></span><span>Tarjeta</span></label>
                <input type="radio" value="card" id="paymentMethodCard" v-model="inputs.paymentMethod.value">
            </div>
        </form>
        <div>
            <ul>
                <li v-for="(product,index) in this.table.order"  :key="index">
                    <p>{{ product.title }}</p>
                    <p>
                        <span>Cantidad: </span>
                        <span>
                            <span></span>
                            {{ product.amount }}
                        </span>
                    </p>
                    <PriceDisplay :price="product.price" :discount="product.discount" />
                </li>
            </ul>
        </div>
        <div>
            <p>Total: {{ this.totalPrice }}</p>
            <button @click="finishOrder">Finalizar orden</button>
        </div>
    </div>
</template>
<style>
    #payingOrder{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto;
        grid-gap: 10px;
    }

    #payingOrder >form{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
    }

    #payingOrder >form >div >label{
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr;
        grid-gap: 5px;
        height: 120px;
        border: 1px solid white;
        border-radius: 10px;
        width: 100%;
        background-color: #ddd;
    }

    .checked{
        border: 3px solid #f59f2a !important;
    }

    #payingOrder >form >div >label >span:first-of-type{
        width: 150px;
        height: 100px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        display: flex;
        align-self: center;
        justify-self: center;
    }

    #payingOrder >form >div >label >span:last-of-type{
        display: flex;
        align-self: center;
        justify-self: flex-start;
        font-size: 18px;
    }

    #payingOrder >form >div:first-of-type >label >span:first-of-type{
        background-image: url('../../assets/images/icons/cash_icon.png')
    }

    #payingOrder >form >div:last-of-type >label >span:first-of-type{
        background-image: url('../../assets/images/icons/card_icon.png')
    }

    #payingOrder >form >div >input{
        display: none;
    }

    #payingOrder >div:nth-of-type(2){
        height: calc(100vh - 510px);
        overflow-y: scroll;
    }

    #payingOrder >div:nth-of-type(2) >ul{
        height: fit-content;
        display: grid;
        grid-template-columns: 1fr;
        list-style: none;
    }

    #payingOrder >div:nth-of-type(2) >ul >li{
        display: grid;
        background-color: azure;
        grid-template-columns: auto 70px 100px;
        grid-template-rows: 1fr;
        width: 100%;
        height: 60px;
        padding: 5px;
    }

    #payingOrder >div:nth-of-type(2) >ul >li:nth-child(even){
        background-color: #ddd;
    }
    #payingOrder >div:nth-of-type(2) >ul >li:nth-child(odd){
        background-color: #fff;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >p:first-of-type{
        display: flex;
        align-self: center;
        justify-self: flex-start;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >p:last-of-type{
        display: flex;
        align-self: center;
        justify-self: center;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >p:last-of-type >span:first-of-type{
        display: none;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >p:last-of-type >span:last-of-type{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 1fr;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >p:last-of-type >span:last-of-type >span:first-of-type{
        width: 15px;
        height: 15px;
        display: flex;
        align-self: center;
        justify-self: center;
        background-image: url('../../assets/images/icons/x_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    #payingOrder >div:nth-of-type(2) >ul >li >div:last-of-type{
        display: flex;
        align-self: center;
        justify-self: flex-end;
    }

    #payingOrder >div:last-of-type{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    #payingOrder >div:last-of-type >p{
        font-weight: bold;
        display: flex;
        align-self: center;
        justify-self: flex-end;
        padding: 5px;
    }

    #payingOrder >div:last-of-type >button{
        padding: 5px;
        height: fit-content;
        background-color: #f59f2a;
        border: 1px solid #f59f2a;
        border-radius: 5px;
        font-weight: 500;
        display: flex;
        font-size: 15px;
        align-self: center;
        justify-self: flex-end;
    }
</style>
<script>
import ordersServices from '@/services/orders.js'
import PriceDisplay from '@/components/display/Price.vue'

export default {
    name: 'PayingOrder',
    props:['table'],
    components:{
        PriceDisplay
    },
    data: function(){
        return{
            inputs:{
                paymentMethod:{
                    value: 'cash',
                    validated: null,
                    errors:[]
                }
            },
            inputChecked: 'cash',
            totalPrice:0
        }
    },
    mounted: function(){
        return this.getTotalPrice();
    },
    methods:{
        changeInputChecked: function(input){
            this.inputChecked = input;
        },
        finishOrder: function(){
            ordersServices.create(this.table, this.inputs.paymentMethod.value, this.totalPrice).then(()=>{

                let tables = JSON.parse(localStorage.tables);
            
                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number == this.table.number){
                        tables[i].order = [];
                        tables[i].status = 'empty';
                        tables[i].diners = 0;
                        break;
                    }else{
                        continue;
                    }       
                }

                localStorage.tables = JSON.stringify(tables);

                this.$router.push({ name:'Orders' });
                return this.$store.commit('addNotification', { type: 'success', message: 'La orden se registro con exito.' });
            }).catch((error)=>{
                return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
            });
        },

        getTotalPrice: function(){
            let total = 0;
            for (let i = 0; i < this.table.order.length; i++) {
                if(this.table.order[i].discount !== null){
                    total += (this.table.order[i].price - ((this.table.order[i].price * this.table.order[i].discount) / 100)) * this.table.order[i].amount;
                    continue;
                }else{
                    total += (this.table.order[i].price * this.table.order[i].amount);
                    continue;
                }
            }

            return this.totalPrice = total;
        },
    },
}
</script>
