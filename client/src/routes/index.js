import HomePage from "../pages/homepgaeComps/homepage"
import MenuPage from "../pages/menuComps/menupage"
import IntroducePage from "../pages/introducepageComps/introducepage"
import BooKTable from "../pages/booktableComps/booktable"
import SignInPage from "../pages/signinpageComps/signinpage"

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/Menu',
        page: MenuPage,
        isShowHeader: true
    },
    {
        path: '/Introduce',
        page: IntroducePage,
        isShowHeader: true
    },
    {
        path: '/BooKTable',
        page: BooKTable,
        isShowHeader: true
    },
    {
        path: '/SignIn',
        page: SignInPage,
        isShowHeader: false
    },
//trang khi khi đường dẫn sai!
    // {
    //     path: '*',
    //     page: NotFoundPage
    // }
]