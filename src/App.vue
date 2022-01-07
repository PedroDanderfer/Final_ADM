<template>
  <div id="app">
    <Header />
    <ul v-if="this.$store.state.success.length != 0" class="notificationList notificationSuccess">
      <Notification v-for="success in this.$store.state.success" :key="success" type="success" :notification="success"/>
    </ul>
    <ul v-if="this.$store.state.errors.length != 0" class="notificationList notificationError">
      <Notification v-for="error in this.$store.state.errors" :key="error" type="error" :notification="error"/>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Notification from '@/components/Notification.vue'


export default {
  name: 'App',
  components: {
    Header, Notification
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

#app{
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}

.notificationList{
  width: calc(100% - 20px);
  padding: 10px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}

.notificationSuccess{
  background-color: rgba(0, 255, 0, 0.3);
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.notificationError{
  background-color: rgba(255, 0, 0, 0.3);
  border: 1px solid rgba(255, 0, 0, 0.3);
}
</style>