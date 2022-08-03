<template>
  <p>Register for the event.</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],

  inject: ['GStore'],

  methods: {
    register() {
      // Call to API
      // If registered then redirect to event details

      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      //* redirecting programmatic
      this.$router.push({
        name: 'EventDetails'
        //! no need for the params since it will populated by default
        // params: {
        //   id: this.event.id
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
