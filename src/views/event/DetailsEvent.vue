<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<script>
// import EventService from '../../services/EventService'

export default {
  props: ['event']

  // data() {
  //   return {
  //     event: null
  //   }
  // },

  // created() {
  //   // fetch event (by id) and set local data
  //   EventService.getEvent(this.id)
  //     .then(res => (this.event = res.data))
  //     .catch(error => console.log(error))
  // }
}
</script>

<style lang="scss" scoped></style>
