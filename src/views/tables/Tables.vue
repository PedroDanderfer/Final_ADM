<template>
  <section id="sectionTables">
      <div>
          <h2>Mesas</h2>
          <button v-on:click="addTable">Agregar mesa</button>
      </div>
      <ul v-if="this.tables.length != 0">
        <TablesItem v-for="table in this.tables" :key="table.number+1" :table="table"/>
      </ul>
      <NotFound v-else message="No tienes ninguna mesa." />
  </section>
</template>
<style>
  #sectionTables{
    width:100%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-gap: 20px;
    height: fit-content;
    max-width: 500px;
  }

  #sectionTables >div:first-of-type{
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
    box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    grid-gap: 10px;
    height: fit-content;
  }

  #sectionTables >div:first-of-type >h2{
    display: flex;
    align-self: center;
    justify-self: flex-start;
  }

  #sectionTables >div:first-of-type >button{
    width: fit-content;
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

  #sectionTables >ul{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    list-style: none;
  }

  @media(min-width:600px){
     #sectionTables >ul{
       grid-template-columns: 1fr 1fr;
     }
  }
</style>
<script>
import TablesItem from '@/components/listItems/TablesItem.vue'
import NotFound from '@/components/NotFound.vue'

import tablesServices from '@/services/tables.js'

export default {
  name: 'tablesSection',
  components:{TablesItem, NotFound},
  data: function(){
    return {
      tables:[]
    }
  },
  methods:{
    addTable: function(){
      tablesServices.create().then((res) => {
          this.tables = res.tables;
          return this.$store.commit('addNotification', { type: 'success', message: 'La mesa se creo con éxito.' });
      }).catch((error) => {
          return this.$store.commit('addNotification', { type: 'errors', message: error.errors });
      });
    }
  },
  created: function(){
    if(localStorage.tables == null || localStorage.tables == undefined || localStorage.tables.length == 0){
      return this.tables = [];
    }else{
      return this.tables = JSON.parse(localStorage.tables);
    }
  }
}
</script>


