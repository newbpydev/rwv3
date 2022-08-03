<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>

    <!-- No need for params: {id} since it is required already in the route -->
    <router-link :to="{ name: 'EventDetails' }">Details</router-link>
    |
    <router-link :to="{ name: 'EventRegister' }">Register</router-link>
    |
    <router-link :to="{ name: 'EventEdit' }">Edit</router-link>

    <router-view :event="GStore.event" />
  </div>
</template>

<script>
// import EventService from '../../services/EventService'

export default {
  inject: ["GStore"],

  // props: ['id'],

  // data() {
  //   return {
  //     event: null
  //   }
  // },

  created() {
    // fetch event (by id) and set local data
    // EventService.getEvent(this.id)
    //   .then(res => (this.event = res.data))
    //   .catch(error => {
    //     console.log(error)
    //     if (error.response && error.response.status === 404) {
    //       this.$router.push({
    //         //! calling the error if the resource is not present
    //         name: '404Resource',
    //         params: {
    //           resource: 'event'
    //         }
    //       })
    //     } else {
    //       this.$router.push({
    //         name: 'NetworkError'
    //       })
    //     }
    //   })
  },
};
</script>

<style lang="scss" scoped></style>
