<template>
    <li>
        {{ notification }}
    </li>
</template>

<script>
export default {
    name: 'Notification',
    props:{
        notification:{
            type: String
        },
        type: {
            type: String
        }
    },
    mounted: function(){
        setTimeout(() => {
            this.$store.commit('removeNotification', { type: this.type, message: this.notification });
        }, 5000);
    }
}
</script>