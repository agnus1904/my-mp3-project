import React from 'react';

// lazy load Pages
const OverView: React.FC = React.lazy(()=> import('./OverView'));
const Home: React.FC  = React.lazy(()=> import('./Home'));
const Explore: React.FC  = React.lazy(()=> import('./Explore'));
const NotFound: React.FC  = React.lazy(()=> import('./NotFound'));

const pages = [
    {
        path: '/',
        exact: true,
        component: OverView,
    },
    {
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path: '/explore',
        exact: true,
        component: Explore,
    },
    {
        path: undefined,
        exact: false,
        component: NotFound,
    },
]

export default pages;