import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

import EventList from "../views/EventList.vue";
import About from "@/views/AboutView";

import EventLayout from "@/views/event/LayoutEvent";
import EventDetails from "@/views/event/DetailsEvent";
import EventRegister from "@/views/event/RegisterEvent";
import EventEdit from "@/views/event/EditEvent";
import NotFound from "@/views/NotFound";
import NetworkError from "@/views/NetworkError";

import EventService from "@/services/EventService";

import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((res) => {
          GStore.event = res.data;
          // console.log(res);
        })
        .catch((error) => {
          console.log(error);

          if (error.response && error.response.status === 404) {
            return {
              //! calling the error if the resource is not present
              name: "404Resource",
              params: {
                resource: "event",
              },
            };
          } else {
            return {
              name: "NetworkError",
            };
          }
        });
    },
    children: [
      {
        path: "", //! it will be the root to the eventLayout, entry point
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    //* second way to solve the children redirect problem
    path: "/event/:afterEvent(.*)",
    // path: '/event/:id',
    redirect: (to) => {
      //! to is not nessesary because it will fallthrough
      return {
        path: "/events/" + to.params.afterEvent,
        // name: 'EventDetails',
        // params: {
        //   id: to.params.id //* passing the id through
        // }
      };
    },
    // children: [ //* one way to solve the children redirect problem
    //   {
    //     path: 'register',
    //     redirect: () => ({ name: 'EventRegister' })
    //   },
    //   {
    //     path: 'edit',
    //     redirect: () => ({ name: 'EventRegister' })
    //   }
    // ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
  // { //! old hard coded way, use children instead
  //   path: '/event/:id/',
  //   name: 'EventDetails',
  //   props: true,
  //   component: EventDetails
  // },
  // {
  //   path: '/event/:id/register',
  //   name: 'EventRegister',
  //   props: true,
  //   component: EventRegister
  // },
  // {
  //   path: '/event/:id/edit',
  //   name: 'EventEdit',
  //   props: true,
  //   component: EventEdit
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // ! to go back to saved position, review this topic in the docs
    // if (savedPosition) {
    //   return savedPosition;
    // } else {
    //   return { top: 0 };
    // }
    return { top: 0 };
  },
});

router.beforeEach(() => {
  //to and from are Route Object,next() must be called to resolve the hook}
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
