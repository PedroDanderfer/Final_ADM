<template>
    <li class="TableItem">
        <router-link :to="'/table/get/'+this.table.number">
            <div>
                <h3><span>Mesa N°</span><span>{{ this.table.number }}</span></h3>
                <span></span>
                <div>
                    <div>
                        <p v-if="this.table.status == 'empty'">Vacia</p>
                        <p v-if="this.table.status == 'waiting'">Comiendo</p>
                        <p v-if="this.table.status == 'paying'">Pagando</p>
                    </div>
                    <div v-if="this.table.diners > 0">
                        <p><span>{{ this.table.diners }}</span> <span class="dinersIcon" v-if="this.table.diners == 1">cliente</span><span class="dinersIcon" v-else>clientes</span></p>
                    </div>
                </div>
            </div>  
        </router-link>
    </li>
</template>
<style>
    .TableItem{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        -webkit-box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43); 
        box-shadow: -2px 2px 7px 0px rgba(0,0,0,0.43);
        background-color: white;
        border: 1px solid white;
        border-radius: 10px;
    }

    .TableItem >a{ 
        display: block;
        padding: 5px;
        text-decoration: none;
        color: black;
    }

    .TableItem >a >div{
        width: 100%;
        height: fit-content;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
    }

    .TableItem >a >div >h3{
        width: fit-content;
        height: fit-content;
        display: flex;
        align-self: center;
        justify-self: center;
    }

    .TableItem >a >div >h3 >span:first-of-type{
        visibility: hidden;
        font-size: 0;
    }

    .TableItem >a >div >h3 >span:last-of-type{
        background-color: #f59f2a;
        padding: 2px 5px 2px 5px;
        border: 1px solid #f59f2a;
        border-radius: 5px;
    }

    .TableItem >a >div >span{
        display: flex;
        align-self: center;
        justify-self: center;
        width: 100%;
        height: 100px;
        background-image: url('../../assets/images/table.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .TableItem >a >div >div:last-of-type{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 5px;
    }

    .TableItem >a >div >div:last-of-type >div{
        width: fit-content;
        height: fit-content;
        padding: 1px 5px 1px 5px;
        background-color: #f59f2a;
        border: 1px solid #f59f2a;
        border-radius: 5px;
        display: flex;
        align-self: center;
        justify-self: center;
    }

    .TableItem >a >div >div:last-of-type >div:last-of-type >p{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 1fr;
    }

    .TableItem >a >div >div:last-of-type >div:last-of-type >p >span:first-of-type{
        display: flex;
        align-self: center;
        justify-self: center;
    }

    .dinersIcon{
        display: flex;
        align-self: center;
        justify-self: center;
        background-image: url('../../assets/images/icons/dinners_icon.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 30px;
        height: 30px;
        background-color: transparent;
        font-size: 0;
    }

</style>
<script>

export default {
    name: 'TableItem',
    props:{
        table:{
            type:Object
        }
    },
}
</script>
