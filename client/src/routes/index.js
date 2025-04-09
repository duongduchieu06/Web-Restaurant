import HomePage from "../pages/homePageComps/homepage"
import MenuPage from "../pages/menuComps/menupage"
import IntroducePage from "../pages/introducePageComps/introducepage"
import BooKTable from "../pages/booktablePageComps/booktable"
import SignInPage from "../pages/signinpageComps/signinpage"
import SignUpPage from "../pages/signuppageComps copy/signuppage"
import Profile from "../pages/profileComps/profile"
import AdminPage from "../pages/AdminPageComps/adminpage"
import AdminManageTable from "../pages/AdminManageTableComps/adminmanagetable"
import AdminManageFood from "../pages/AdminManageFoodComps/adminmanagefood"
import AdminManageUser from "../pages/AdminManageUserComps/adminmanageuser"

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
        page: () => <div>Welcome to Admin Dashboard</div>, // Placeholder for admin dashboard
        isShowHeader: false,
        isPrivate: true,
        isAdminRoute: true,
    },
    {
        path: '/Admin/ManageFood',
        page: AdminManageFood,
        isShowHeader: false,
        isPrivate: true,
        isAdminRoute: true,
    },
    {
        path: '/Admin/ManageTables',
        page: AdminManageTable,
        isShowHeader: false,
        isPrivate: true,
        isAdminRoute: true,
    },
    {
        path: '/Admin/ManageUsers',
        page: AdminManageUser,
        isShowHeader: false,
        isPrivate: true,
        isAdminRoute: true,
    },
];