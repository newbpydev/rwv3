<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
        >&#60; Page
      </router-link>
      <!-- 
      <router-link v-for="pg in totalPages" :key="pg" :to="pg">{{
        pg
      }}</router-link> -->

      <div>
        <span v-for="totalPage in totalPages" :key="totalPage">
          <router-link :to="{ name: 'EventList', query: { page: totalPage } }">
            {{ totalPage }}
          </router-link>
        </span>
      </div>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Page &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// import NProgress from "nprogress";
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";

// import axios from 'axios'
import EventService from "@/services/EventService";

//! watchEffect needed to watch for changes on whatever is inside its callback function
// import { watchEffect } from 'vue'

export default {
  name: "EventList",

  props: ["page"],

  components: {
    EventCard,
  },

  data() {
    return {
      events: null,
      totalEvents: 0,
      totalPages: 1,
    };
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    // NProgress.start();
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = response.headers["x-total-count"];
          comp.totalPages = Math.ceil(comp.totalEvents / 2);
        });
        // next()
      })
      .catch(() => {
        next({ name: "NetworkError" });
      })
      // .finally(() => {
      //   NProgress.done();
      // });
  },
  beforeRouteUpdate(routeTo) {
    // NProgress.start();
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
        this.totalPages = Math.ceil(this.totalEvents / 2);

        // next()
      })
      .catch(() => {
        return { name: "NetworkError" };
      })
      .finally(() => {
        // NProgress.done();
      });
  },

  // created() {
  // axios
  //   .get(
  //     'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events'
  //   )
  //* using watch effect before I moved the API
  // watchEffect(() => {
  //   this.events = null
  //   EventService.getEvents(2, this.page)
  //     .then(response => {
  //       this.events = response.data
  //       this.totalEvents = response.headers['x-total-count']
  //       this.totalPages = Math.ceil(this.totalEvents / 2)
  //       // console.log(response.headers)
  //       // console.log(this.totalEvents)
  //     })
  //     .catch(() =>
  //       this.$router.push({
  //         name: 'NetworkError'
  //       })
  //     )
  // })
  // },

  computed: {
    hasNextPage() {
      // const totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < this.totalPages;
    },
    // totalPages() {
    //   return Math.ceil(this.totalEvents / 2)
    // }
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
