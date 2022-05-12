<template>
    <div>
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
                            <button @click="assignAmount(product, 'remove')">Restar cantidad</button>
                            <p>{{ product.amount }}</p>
                            <button @click="assignAmount(product, 'add')">Agregar cantidad</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <p>{{ totalPrice }}</p>
        </div>
    </div>
</template>
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
        let tables = JSON.parse(localStorage.tables), table;

        for (let i = 0; i < tables.length; i++) {
            if(tables[i].number == this.tableNumber){
                table = tables[i];
                break;
            }else{
                continue;
            }   
        }

        this.table = table;
        return this.getTotalPrice();
    }
}
</script>
