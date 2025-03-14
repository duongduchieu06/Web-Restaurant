import HomePage from "../pages/homepgaeComps/homepage"
import MenuPage from "../pages/menuComps/menupage"
import IntroducePage from "../pages/introducepageComps/introducepage"
import BooKTable from "../pages/booktableComps/booktable"
import SignInPage from "../pages/signinpageComps/signinpage"
import SignUpPage from "../pages/signuppageComps copy/signuppage"

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
    {
        path: '/SignUp',
        page: SignUpPage,
        isShowHeader: false
    },
    // {
    //     path: '*',
    //     page: NotFoundPage
    // }
]