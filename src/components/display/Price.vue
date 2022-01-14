<template>
    <div v-if="price === null" class="displayPrice">
        <p>¡Gratis!</p>
    </div>
    <div v-else class="displayPrice">
        <div v-if="discount !== null" class="displayDiscount">
            <div>
                <p>${{ price }}</p>
                <p>${{ getPriceWithDiscount }}</p>
            </div>
            <div>
                <span>{{ getDiscount }}</span>
            </div>
        </div>
        <div v-else class="displayNoDiscount">
            <p>${{ price }}</p>
        </div>
    </div>
</template>
<style>
    .displayPrice{
        display: flex;
        justify-self: flex-start;
        align-self: center;
        width: fit-content;
        height: fit-content;
    }

    .displayPrice >p{
        font-weight: 500;
        font-size: 17px;
    }

    .displayDiscount{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 1fr;
        grid-gap: 5px;
    }

    .displayDiscount >div:first-of-type{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 2px;
    }

    .displayDiscount >div:first-of-type >p:first-of-type{
        display: flex;
        align-self: center;
        justify-self: center;
        text-decoration: line-through;
        font-size: 15px;
    }

    .displayDiscount >div:first-of-type >p:last-of-type{
        display: flex;
        align-self: center;
        justify-self: center;
        font-weight: 500;
        font-size: 17px;
    }

    .displayDiscount >div:last-of-type{
        display: flex;
        align-self: center;
        justify-self: center;
        width: fit-content;
        height: fit-content;
        border: 1px solid #333;
        border-radius: 5px;
        padding: 2px 4px 2px 4px;
    }
    
    .displayNoDiscount{
        font-weight: 500;
        font-size: 17px;
    }
</style>
<script>
export default {
    name: 'PriceDisplay',
    props:['price', 'discount'],
    computed:{
        getPriceWithDiscount: function(){
            return this.price-((this.price * this.discount)/100);
        },
        getDiscount: function(){
            if(this.discount == 100){
                return "¡Gratis!";
            }else{
                return this.discount+"%";
            }
        }
    }
}
</script>
