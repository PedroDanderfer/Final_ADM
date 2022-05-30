<template>
    <section id="sectionTable">
        <div>
            <h2>Mesa n° {{this.table.number}}</h2>
            <button @click="this.goBack" v-if="this.table.status == 'waiting' || this.table.status == 'paying'">Volver atras</button>
            <button @click="this.deleteTable">Borrar mesa</button>
        </div>
        <div v-if="this.table.status == 'empty'" id="sectionTableAssignDiners">
            <AssignDiners :tableNumber="this.table.number" v-on:updateTable="updateTable"/>
        </div>
        <div v-else-if="this.table.status == 'waiting'">
            <DinersOrder :tableNumber="this.table.number" :table="this.table" v-on:updateTable="updateTable"/>
        </div>
        <div v-else-if="this.table.status == 'paying'">
            <PayingOrder/>
        </div>
    </section>
</template>
<style>
    #sectionTable{
        width:100%;
        padding: 0 10px 0 10px;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        border: 1px solid white;
        border-radius: 10px;
        height: fit-content;
        max-width: 500px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
    }

    #sectionTable >div:first-of-type{
        display: grid;
        grid-template-columns: auto 30px 30px;
        grid-template-rows: 1fr;
        grid-gap: 10px;
    }

    #sectionTable >div:first-of-type button{
        background-color: white;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: 1px solid white;
        width: 30px;
        height: 30px;
        display: flex;
        align-self: center;
        justify-self: flex-end;
        font-size: 0;
        outline: none;
    }

    #sectionTable >div:first-of-type button:first-of-type{
        background-image: url('../../assets/images/icons/back_icon.png');
    }

    #sectionTable >div:first-of-type button:last-of-type{
        background-image: url('../../assets/images/icons/delete_icon.png');
    }
    
</style>
<script>
import tablesServices from '@/services/tables.js'

import AssignDiners from '@/components/display/AssignDiners.vue'
import DinersOrder from '@/components/display/DinersOrder.vue'
import PayingOrder from '@/components/display/PayingOrder.vue'

export default {
    name: 'Table',
    components:{
        DinersOrder,
        AssignDiners,
        PayingOrder
    },
    data: function(){
        return{
            table: null,
        }
    },
    methods:{
        goBack:function(){
            let tables = JSON.parse(localStorage.tables);
            if(this.table.status == 'waiting'){
                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number === this.table.number){
                        tables[i].status = 'empty';
                        tables[i].order = [];
                        break;
                    }else{
                        continue;
                    }
                }

                localStorage.tables = JSON.stringify(tables);
                this.table.status = 'empty';
                this.table.order = [];
            }else if(this.table.status == 'paying'){
                for (let i = 0; i < tables.length; i++) {
                    if(tables[i].number === this.table.number){
                        tables[i].status = 'waiting';
                        break;
                    }else{
                        continue;
                    }
                }

                localStorage.tables = JSON.stringify(tables);
                this.table.status = 'waiting';
            }else{
                return false;
            }
        },
        getTable: function(table){
            let tables = JSON.parse(localStorage.tables);
            for (let i = 0; i < tables.length; i++) {
                if(tables[i].number == table){
                    return this.table = tables[i];
                }else{
                    continue;
                }
            }

            this.table = [];
            this.$router.push({ path: '/tables' })
            return this.$store.commit('addNotification', { type: 'errors', message: 'La mesa seleccionada no existe.' });
        },
        deleteTable: function(){
            tablesServices.delete(this.table.number).then(() => {
                this.$router.push({ path: '/tables' })
                return this.$store.commit('addNotification', { type: 'success', message: 'La mesa se eliminó con éxito.' });
            }).catch((err) => {
                return this.$store.commit('addNotification', { type: 'errors', message: err.errors });
            })
        },
        updateTable: function(update){
            let table = this.table;
            for (let i = 0; i < update.length; i++) {
                if(update[i].update == 'pushProduct'){
                    table.order.push(update[i].value);
                    return this.$set(this.table, table);
                }else if(update[i].update == 'removeProduct'){
                    for (let j = 0; j < table.order.length; j++) {
                        if(table.order[j].title == update[i].value.title){
                            table.order.splice(j, 1);
                            break;
                        }else{
                            continue;
                        }
                    }
                    return this.$set(this.table, table);
                }else if(update[i].update == 'addAmount'){
                    table.order[update[i].value].amount += 1;
                    return this.$set(this.table, table);
                }else if(update[i].update == 'removeAmount'){
                    table.order[update[i].value].amount -= 1;
                    return this.$set(this.table, table);
                }else{
                    table[update[i].update] = update[i].value;
                    return this.$set(this.table, table);
                }               
            }
        }
    },
    created:function(){
        return this.getTable(this.$route.params.table);
    },
    watch:{
        '$route.params.table': function(){
            return this.getTable(this.$route.params.table);
        }
    }
}
</script>