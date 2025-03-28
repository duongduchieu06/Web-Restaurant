import HomePage from "../pages/homePageComps/homepage"
import MenuPage from "../pages/menuComps/menupage"
import IntroducePage from "../pages/introducePageComps/introducepage"
import BooKTable from "../pages/booktablePageComps/booktable"
import SignInPage from "../pages/signinpageComps/signinpage"
import SignUpPage from "../pages/signuppageComps copy/signuppage"
import Profile from "../pages/profileComps/profile"
import AdminPage from "../pages/AdminPageComps/adminpage"

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
    {
        path: '/ProfileUser',
        page: Profile,
        isShowHeader: true
    },
    {
        path: '/Admin',
        page: AdminPage ,
        isShowHeader: false,
        isPrivate: true,
    },
    // {
    //     path: '*',
    //     page: NotFoundPage
    // }
]