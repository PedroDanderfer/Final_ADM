<template>
    <div id="dinersOrder">
        <div>
            <h3>Agregue los productos</h3>
            <div>
                <div>
                    <input type="text" v-model="search.input.value" placeholder="Buscá un producto">
                    <button @click="deleteSearch">Eliminar busqueda</button>
                </div>
                <ul v-if="search.display.status == true">
                    <li v-for="(product, index) in search.display.value" :key="index">
                        <div>
                            <h4>{{ product.title }}</h4>
                            <button @click="addProduct(product)">Agregar producto</button>
                        </div>
                        <div>
                            <PriceDisplay :price="product.price" :discount="product.discount" />
                            <p>Stock: {{ product.stock?'Hay':'No hay' }}</p>
                        </div>
                    </li>
                </ul>
                <ul v-else-if="search.display.status == false">
                    <li v-for="(error, index) in search.display.errors" :key="index">
                        <p>{{ error }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <h3>Lista de productos</h3>
            <ul>
                <li v-for="(product, index) in table.order" :key="index">
                    <div>
                        <h4>{{ product.title }}</h4>
                        <button @click="removeProduct(product)">Eliminar producto</button>
                    </div>
                    <div>
                        <PriceDisplay :price="product.price" :discount="product.discount" />
                        <div>
                            <div>
                                <button @click="assignAmount(product, 'remove')">Restar cantidad</button>
                                <p>{{ product.amount }}</p>
                                <button @click="assignAmount(product, 'add')">Agregar cantidad</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <p>Total: {{ totalPrice }}</p>
            <button @click="this.goToPay">Cobrar</button>
        </div>
    </div>
</template>
<style>
    #dinersOrder{
        width:100%;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        height: fit-content;
        max-width: 500px;
        text-align: center;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto calc(100vh - 280px) auto;
        grid-gap: 20px;
    }

    #dinersOrder >div:first-of-type{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 10px;
        width: 100%;
        height: fit-content;
    }

    #dinersOrder >div:first-of-type h3{
        display: flex;
        align-self: center;
        justify-self: flex-start;
    }

    #dinersOrder >div:first-of-type >div >div:first-of-type{
        display: grid;
        grid-template-columns: 1fr 30px;
        grid-template-rows: 1fr;
    }

    #dinersOrder >div:first-of-type >div >div:first-of-type >input{
        width: 100%;
        height: 30px;
        outline: none;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    #dinersOrder >div:first-of-type >div >div:first-of-type >button{
        width: 30px;
        height: 30px;
        font-size: 0;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background-image: url('../../assets/images/icons/close_icon.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: transparent;
        outline: none;
    }

    #dinersOrder >div:first-of-type >div >ul{
        display: grid;
        grid-template-columns: 1fr;
        width: calc(100vw - 40px);
        max-width: 480px;
        height: fit-content;
        overflow-y: scroll;
        border: 1px solid #333;
        border-radius: 5px;
        position: absolute;
        background-color: white;
        margin-top: 10px;
        overflow-y: scroll;
        max-height: 40vh;
    }

    #dinersOrder >div:first-of-type >div >ul >li{
        background-color: transparent;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
        padding: 15px;
        min-height: 120px;
    }
    #dinersOrder >div:first-of-type >div >ul >li:nth-child(even){
        background-color: #ddd;
    }
    #dinersOrder >div:first-of-type >div >ul >li:nth-child(odd){
        background-color: #fff;
    }


    #dinersOrder >div:first-of-type >div >ul >li >div:first-of-type{
        display: grid;
        grid-template-columns: 1fr 30px;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #dinersOrder >div:first-of-type >div >ul >li >div:first-of-type h4{
        display: flex;
        align-self: center;
        justify-self: flex-start;
    }

    #dinersOrder >div:first-of-type >div >ul >li >div:first-of-type button{
        height: 30px;
        width: 30px;
        display: flex;
        align-self: center;
        justify-self: center;
        font-size: 0;
        background-image: url('../../assets/images/icons/add_icon.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border: none;
        background-color: transparent;
        outline: none;
    }
    #dinersOrder >div:first-of-type >div >ul >li >div:last-of-type{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #dinersOrder >div:first-of-type >div >ul >li >div:last-of-type >p{
        display:flex;
        align-self: center;
        justify-self: center;
    }

    #dinersOrder >div:nth-of-type(2) >h3{
        text-align: left;
    }

    #dinersOrder >div:nth-of-type(2) >ul{
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
    }
    
    #dinersOrder >div:nth-of-type(2) >ul >li{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        padding: 10px;
        grid-gap: 15px;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li:nth-child(even){
        background-color: #ddd;
    }
    #dinersOrder >div:nth-of-type(2) >ul >li:nth-child(odd){
        background-color: #fff;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:first-of-type{
        display: grid;
        grid-template-columns: auto 30px;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:first-of-type >h4{
        height: fit-content;
        width: fit-content;
        display: flex;
        align-self: center;
        justify-self: flex-start;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:first-of-type >button{
        width: 25px;
        height: 25px;
        display: flex;
        align-self: center;
        justify-self: center;
        border: none;
        outline: none;
        background: transparent;
        background-image: url('../../assets/images/icons/delete_icon.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        font-size: 0;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:first-of-type{
        display: flex;
        align-self: center;
        justify-self: flex-start;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type{
        display: flex;
        align-self: center;
        justify-self: flex-end;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type >div{
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: 1fr;
        grid-gap: 5px;
    }
    
    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type >div >button{
        width: 30px;
        height: 30px;
        display: flex;
        align-self: center;
        justify-self: center;
        background-color: transparent;
        outline: none;
        border: none;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        font-size: 0;
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type >div >button:first-of-type{
        background-image: url('../../assets/images/icons/remove_icon.png');
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type >div >button:last-of-type{
        background-image: url('../../assets/images/icons/add_icon.png');
    }

    #dinersOrder >div:nth-of-type(2) >ul >li >div:last-of-type >div:last-of-type >div >p{
        display: flex;
        align-self: center;
        justify-self: center;
    }

    #dinersOrder >div:last-of-type{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #dinersOrder >div:last-of-type >p{
        display: flex;
        align-self: center;
        justify-self: flex-start;
        font-weight: bold;
    }

    #dinersOrder >div:last-of-type >button{
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
import productsServices from '@/services/products.js'
import PriceDisplay from '@/components/display/Price.vue'

export default {
    name: 'DinersOrder',
    props:['tableNumber', 'table'],
    data: function(){
        return{
            search:{
                input:{
                    value:null
                },
                display:{
                    status:null,
                    value:[],
                    errors:[],
                }
            },
            totalPrice:0
        }
    },
    components:{
        PriceDisplay
    },
    watch:{
        'search.input.value':{
            handler:function(product){
                this.search.display.status = null;
                this.search.display.value = [];
                this.search.display.errors = [];

                if(product == null || product.length <= 0){
                    this.search.display.status = null;
                    this.search.display.value = [];
                    return this.search.display.errors = [];
                }else{
                    var products = productsServices.search(product);
                    if(products.length > 0){
                        this.search.display.status = true;
                        return this.search.display.value = products;
                    }else{
                        this.search.display.status = false;
                        return this.search.display.errors = ['No hay coincidencias con ningun producto.'];
                    }
                }
            }
        },
    },
    methods:{
        goToPay: function(){
            if(this.table.order.length == 0){
                return this.$store.commit('addNotification', { type: 'errors', message: 'No se agregaron productos al pedido.' });
            }
            
            let tables = JSON.parse(localStorage.tables);

            for (let i = 0; i < tables.length; i++) {
                if(tables[i].number == this.table.number){
                    tables[i].status = 'paying';
                    break;
                }else{
                    continue;
                }
            }

            localStorage.tables = JSON.stringify(tables);
            return this.$emit('updateTable', [
                        {
                            update:'status',
                            value: 'paying'
                        }
                    ]);
            
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

        assignAmount:function(product, action){
            let tables = JSON.parse(localStorage.tables), tableIndex, indexProduct = false;

            for (let i = 0; i < tables.length; i++) {
                if(tables[i].number == this.tableNumber){
                    tableIndex = i;
                    break;
                }else{
                    continue;
                }
            }

            if(typeof tableIndex == 'number'){
                for (let i = 0; i < tables[tableIndex].order.length; i++) {
                    if(tables[tableIndex].order[i].title == product.title){
                        indexProduct = i;
                        break;
                    }else{
                        continue;
                    }
                }

                if(typeof indexProduct !== 'number'){
                    return this.$store.commit('addNotification', { type: 'errors', message: 'El producto no se pudo encontrar.' });
                }else{
                    if(action == 'add'){
                        tables[tableIndex].order[indexProduct].amount += 1;
                        localStorage.tables = JSON.stringify(tables);
                        this.$emit('updateTable', [
                                {
                                    update:'addAmount',
                                    value: indexProduct
                                }
                            ]);
                    }else{
                        if(tables[tableIndex].order[indexProduct].amount <= 1){
                            return this.$store.commit('addNotification', { type: 'errors', message: 'No puede haber menos de un producto.' });
                        }else{
                            tables[tableIndex].order[indexProduct].amount -= 1;
                            localStorage.tables = JSON.stringify(tables);
                            this.$emit('updateTable', [
                                {
                                    update:'removeAmount',
                                    value: indexProduct
                                }
                            ]);
                        }
                    }
                    this.getTotalPrice();
                    return this.$store.commit('addNotification', { type: 'success', message: 'El producto se modifico correctamente.' });
                }
            }else{
                return this.$store.commit('addNotification', { type: 'errors', message: 'No se encontro la mesa.' });
            }
        },

        /**
         * Agrega un producto a la orden de la mesa.
         * 
         * @param {product} product
         * @returns {notification}
         */
        addProduct:function(product){
            let tables = JSON.parse(localStorage.tables), tableIndex, productExist = false;

            for (let i = 0; i < tables.length; i++) {
                if(tables[i].number == this.tableNumber){
                    tableIndex = i;
                    break;
                }else{
                    continue;
                }
            }

            if(typeof tableIndex == 'number'){
                for (let i = 0; i < tables[tableIndex].order.length; i++) {
                    if(tables[tableIndex].order[i].title == product.title){
                        productExist = true;
                        break;
                    }else{
                        continue;
                    }
                }

                if(productExist){
                    return this.$store.commit('addNotification', { type: 'errors', message: 'El producto ya se encuentra agregado.' });
                }else{
                    if(product.stock){
                        product.amount = 1;
                        tables[tableIndex].order.push(product);
                        localStorage.tables = JSON.stringify(tables);
                        this.$emit('updateTable', [
                            {
                                update:'pushProduct',
                                value: product
                            }
                        ]);
                        this.getTotalPrice();
                        return this.$store.commit('addNotification', { type: 'success', message: 'El producto se agrego correctamente.' });
                    }else{
                        return this.$store.commit('addNotification', { type: 'errors', message: 'El producto no tiene stock.' });
                    }
                }
            }else{
                return this.$store.commit('addNotification', { type: 'errors', message: 'No se encontro la mesa.' });
            }
        },

        /**
         * Elimina un producto de la orden de la mesa.
         * 
         * @param {product} product
         * @returns {notification}
         */
        removeProduct:function(product){
            let tables = JSON.parse(localStorage.tables), tableIndex, deleteProduct;

             for (let i = 0; i < tables.length; i++) {
                if(tables[i].number == this.tableNumber){
                    tableIndex = i;
                    break;
                }else{
                    continue;
                }
            }

            if(typeof tableIndex == 'number'){
                for (let i = 0; i < tables[tableIndex].order.length; i++) {
                    if(tables[tableIndex].order[i].title == product.title){
                        deleteProduct = i;
                        break;
                    }else{
                        continue;
                    }
                }

                if(typeof deleteProduct !== 'number'){
                    return this.$store.commit('addNotification', { type: 'errors', message: 'El producto no se pudo eliminar.' });
                }else{
                    tables[tableIndex].order.splice(deleteProduct, 1);
                    localStorage.tables = JSON.stringify(tables);
                    this.$emit('updateTable', [
                            {
                                update:'removeProduct',
                                value: product
                            }
                        ]);
                    this.getTotalPrice();
                    return this.$store.commit('addNotification', { type: 'success', message: 'El producto se eliminó correctamente.' });
                }
            }else{
                return this.$store.commit('addNotification', { type: 'errors', message: 'No se encontro la mesa.' });
            }
        },

        deleteSearch:function(){
            return this.search.input.value = null;
        },
    },
    mounted: function(){
        return this.getTotalPrice();
    }
}
</script>
