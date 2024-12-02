import { FaSearch, FaMusic, FaFilm, FaRegHeart } from 'react-icons/fa';
import { FaList } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineTv, MdOutlineWatchLater } from "react-icons/md";

export const menu_options = [
    {
        option: 'Discover',
        url: '/discover',
        icon: FaSearch
    },
    {
        option: 'Playlist',
        url: '/playlist',
        icon: FaMusic
    },
    {
        option: 'Movie',
        url: '/movie',
        icon: FaFilm
    },
    {
        option: 'TV Shows',
        url: '/tvshows',
        icon: MdOutlineTv
    },
    {
        option: 'My List',
        url: '/mylist',
        icon: FaList
    },
]

export const user_options = [
    {
        option: 'Watch Later',
        url: '/watchlater',
        icon: MdOutlineWatchLater
    },
    {
        option: 'Recomended',
        url: '/recomended',
        icon: FaRegHeart
    }
]

export const user_settings = [
    {
        option: 'Settings',
        url: '/settings',
        icon: IoIosSettings
    },
    {
        option: 'Logout',
        url: '/logout',
        icon: LuLogOut
    }
]

