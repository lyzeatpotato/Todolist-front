import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../page/HomePage'
import EventPage from '../page/EventPage'
import LandmarkPage from '../page/LandmarkPage'
import FigurePage from '../page/FigurePage'
import FigureDetail from '../page/FigureDetail'
import AddToDoList from '../page/AddToDoList'
import MessagePage from '../page/MessagePages/MessagePage'
import BlessPage from '../page/MessagePages/BlessPage'
import portraitPage from '../page/PortraitPage'
var routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/event',
    name: 'EventPage',
    component: EventPage
  }, {
    path: '/landmark',
    name: 'LandmarkPage',
    component: LandmarkPage
  }, {
    path: '/figure',
    name: 'FigurePage',
    component: FigurePage
  }, {
    path: '/message',
    name: 'MessagePage',
    component: MessagePage
  },
  {
    path: '/detail',
    name: 'FigureDetail',
    component: FigureDetail
  }, 
  {
    path: '/add',
    name: 'AddToDoList',
    component: AddToDoList
  },
  {
    path: '/bless',
    name: 'BlessPage',
    component: BlessPage
  },{
    path: '/portrait',
    name: 'portraitPage',
    component: portraitPage
  }
];

var router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
