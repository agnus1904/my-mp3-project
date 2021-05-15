import React from 'react';

// lazy load Pages
const OverView: React.FC = React.lazy(()=> import('./OverView'));
const Home: React.FC  = React.lazy(()=> import('./Home'));
const Explore: React.FC  = React.lazy(()=> import('./Explore'));
const NotFound: React.FC  = React.lazy(()=> import('./NotFound'));

const Album: React.FC = React.lazy(()=> import('./Library/Album'));
const Atists: React.FC = React.lazy(()=> import('./Library/Atists'));
const Favorite: React.FC = React.lazy(()=> import('./Library/Favorite'));
const ForYou: React.FC = React.lazy(()=> import('./Library/ForYou'));
const Reccent: React.FC = React.lazy(()=> import('./Library/Reccent'));

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
        path: '/for-you',
        exact: true,
        component: ForYou,
    },
    {
        path: '/reccent',
        exact: true,
        component: Reccent,
    },
    {
        path: '/favorite',
        exact: true,
        component: Favorite,
    },
    {
        path: '/album',
        exact: true,
        component: Album,
    },
    {
        path: '/atists',
        exact: true,
        component: Atists,
    },
    {
        path: undefined,
        exact: false,
        component: NotFound,
    },
]

export default pages;