import HomePage from "../pages/homePageComps/homepage"
import MenuPage from "../pages/menuComps/menupage"
import BooKTable from "../pages/booktablePageComps/booktable"
import SignInPage from "../pages/signinpageComps/signinpage"
import SignUpPage from "../pages/signuppageComps copy/signuppage"
import Profile from "../pages/profileComps/profile"
import AdminManageFood from "../pages/AdminManageFoodComps/adminmanagefood"
import AdminManageUser from "../pages/AdminManageUserComps/adminmanageuser"
import AdminManageRestaurant from "../pages/AdminManageResComps/adminmanagerestaurant"
import AdminManageBooking from "../pages/AdminManageBookingComps/adminmanagebooking"
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure";
import InforPage from "../pages/inforComps/menupage"

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
        page: InforPage,
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
        path: '/payment/success',
        page: PaymentSuccess,
        isShowHeader: false,
        },
        {
        path: '/payment/failure',
        page: PaymentFailure,
        isShowHeader: false,
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
        path: '/Admin/ManageRestaurant',
        page: AdminManageRestaurant,
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
    {
        path: '/Admin/ManageBooking',
        page: AdminManageBooking,
        isShowHeader: false,
        isPrivate: true,
        isAdminRoute: true,
    },
];