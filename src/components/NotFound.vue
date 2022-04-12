<template>
    <div class="NotFound">
        <div>
          <span></span>
          <p>{{ message }}</p>
          <router-link v-if="link != null" :to="link">{{ linkMessage }}</router-link>
        </div>
    </div>
</template>
<style>

    .NotFound{
        width: fit-content;
        height: fit-content;
        display: flex;
        align-self: center;
        justify-self: center;
    }

    .NotFound >div{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding: 20px;
        grid-gap: 20px;
    }

    .NotFound >div >span{
        display: block;
        width: 100%;
        height:300px;
        background-image: url('../assets/images/notFound.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

    .NotFound >div >p{
        font-weight: 500;
        font-size: 18px;
    }
</style>

<script>
export default {
    name: "NotFound",
    props:{
        message:{
            type:String
        },
        link:{
            type:String
        },
        linkMessage:{
            type:String
        }
    }
}
</script>
