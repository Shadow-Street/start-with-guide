import Layout from "./Layout.jsx";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, GuestRoute } from "@/components/auth/ProtectedRoute";

import Dashboard from "./Dashboard";

import ChatRooms from "./ChatRooms";

import Subscription from "./Subscription";

import Polls from "./Polls";

import Events from "./Events";

import AdminPanel from "./AdminPanel";

import Profile from "./Profile";

import contact from "./contact";

import Finfluencers from "./Finfluencers";

import InfluencerProfile from "./InfluencerProfile";

import AdvisorRegistration from "./AdvisorRegistration";

import Advisors from "./Advisors";

import AdvisorProfile from "./AdvisorProfile";

import News from "./News";

import SamplePortfolio from "./SamplePortfolio";

import Feedback from "./Feedback";

import SuperAdmin from "./SuperAdmin";

import Educators from "./Educators";

import EntityDashboard from "./EntityDashboard";

import FinfluencerDashboard from "./FinfluencerDashboard";

import AdvisorDashboard from "./AdvisorDashboard";

import EventsManagement from "./EventsManagement";

import PledgePool from "./PledgePool";

import ApiExecutions from "./ApiExecutions";

import AdManagement from "./AdManagement";

import VendorDashboard from "./VendorDashboard";

import Invoice from "./Invoice";

import FundManager from "./FundManager";

import InvestorDashboard from "./InvestorDashboard";

import FundManager_Plans from "./FundManager_Plans";

import FundManager_Investors from "./FundManager_Investors";

import FundManager_Transactions from "./FundManager_Transactions";

import FundManager_Allocations from "./FundManager_Allocations";

import FundManager_Reports from "./FundManager_Reports";

import FeatureHub from "./FeatureHub";

import MyPortfolio from "./MyPortfolio";

import BecomeOrganizer from "./BecomeOrganizer";

import OrganizerDashboard from "./OrganizerDashboard";

import MyEvents from "./MyEvents";

import FixSidebarOrder from "./FixSidebarOrder";

import Login from "./Login";

import Register from "./Register";

import Landing from "./Landing";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    ChatRooms: ChatRooms,
    
    Subscription: Subscription,
    
    Polls: Polls,
    
    Events: Events,
    
    AdminPanel: AdminPanel,
    
    Profile: Profile,
    
    contact: contact,
    
    Finfluencers: Finfluencers,
    
    InfluencerProfile: InfluencerProfile,
    
    AdvisorRegistration: AdvisorRegistration,
    
    Advisors: Advisors,
    
    AdvisorProfile: AdvisorProfile,
    
    News: News,
    
    SamplePortfolio: SamplePortfolio,
    
    Feedback: Feedback,
    
    SuperAdmin: SuperAdmin,
    
    Educators: Educators,
    
    EntityDashboard: EntityDashboard,
    
    FinfluencerDashboard: FinfluencerDashboard,
    
    AdvisorDashboard: AdvisorDashboard,
    
    EventsManagement: EventsManagement,
    
    PledgePool: PledgePool,
    
    ApiExecutions: ApiExecutions,
    
    AdManagement: AdManagement,
    
    VendorDashboard: VendorDashboard,
    
    Invoice: Invoice,
    
    FundManager: FundManager,
    
    InvestorDashboard: InvestorDashboard,
    
    FundManager_Plans: FundManager_Plans,
    
    FundManager_Investors: FundManager_Investors,
    
    FundManager_Transactions: FundManager_Transactions,
    
    FundManager_Allocations: FundManager_Allocations,
    
    FundManager_Reports: FundManager_Reports,
    
    FeatureHub: FeatureHub,
    
    MyPortfolio: MyPortfolio,
    
    BecomeOrganizer: BecomeOrganizer,
    
    OrganizerDashboard: OrganizerDashboard,
    
    MyEvents: MyEvents,
    
    FixSidebarOrder: FixSidebarOrder,
    
    Login: Login,
    
    Register: Register,
    
    Landing: Landing,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    // Pages that should NOT have the sidebar layout
    const publicPages = ['/', '/Landing', '/Login', '/Register', '/contact'];
    const isPublicPage = publicPages.includes(location.pathname);
    
    if (isPublicPage) {
        return (
            <Routes>
                {/* Public Routes - NO LAYOUT/SIDEBAR */}
                <Route path="/" element={<Landing />} />
                <Route path="/Landing" element={<Landing />} />
                <Route path="/Login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/Register" element={<GuestRoute><Register /></GuestRoute>} />
                <Route path="/contact" element={<contact />} />
            </Routes>
        );
    }
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                {/* Protected Routes - WITH LAYOUT/SIDEBAR */}
                <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/MyPortfolio" element={<ProtectedRoute><MyPortfolio /></ProtectedRoute>} />
                <Route path="/ChatRooms" element={<ProtectedRoute><ChatRooms /></ProtectedRoute>} />
                <Route path="/Subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
                <Route path="/Polls" element={<ProtectedRoute><Polls /></ProtectedRoute>} />
                <Route path="/Events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/Finfluencers" element={<ProtectedRoute><Finfluencers /></ProtectedRoute>} />
                <Route path="/InfluencerProfile" element={<ProtectedRoute><InfluencerProfile /></ProtectedRoute>} />
                <Route path="/Advisors" element={<ProtectedRoute><Advisors /></ProtectedRoute>} />
                <Route path="/AdvisorProfile" element={<ProtectedRoute><AdvisorProfile /></ProtectedRoute>} />
                <Route path="/AdvisorRegistration" element={<ProtectedRoute><AdvisorRegistration /></ProtectedRoute>} />
                <Route path="/News" element={<ProtectedRoute><News /></ProtectedRoute>} />
                <Route path="/SamplePortfolio" element={<ProtectedRoute><SamplePortfolio /></ProtectedRoute>} />
                <Route path="/Feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                <Route path="/Educators" element={<ProtectedRoute><Educators /></ProtectedRoute>} />
                <Route path="/PledgePool" element={<ProtectedRoute><PledgePool /></ProtectedRoute>} />
                <Route path="/MyEvents" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
                <Route path="/BecomeOrganizer" element={<ProtectedRoute><BecomeOrganizer /></ProtectedRoute>} />
                <Route path="/Invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
                <Route path="/FixSidebarOrder" element={<ProtectedRoute><FixSidebarOrder /></ProtectedRoute>} />
                <Route path="/FeatureHub" element={<ProtectedRoute><FeatureHub /></ProtectedRoute>} />
                
                {/* Role-Based Dashboard Routes */}
                <Route path="/EntityDashboard" element={<ProtectedRoute allowedRoles={['advisor', 'educator']}><EntityDashboard /></ProtectedRoute>} />
                <Route path="/FinfluencerDashboard" element={<ProtectedRoute allowedRoles={['finfluencer']}><FinfluencerDashboard /></ProtectedRoute>} />
                <Route path="/AdvisorDashboard" element={<ProtectedRoute allowedRoles={['advisor']}><AdvisorDashboard /></ProtectedRoute>} />
                <Route path="/OrganizerDashboard" element={<ProtectedRoute allowedRoles={['advisor', 'finfluencer', 'educator', 'organizer']}><OrganizerDashboard /></ProtectedRoute>} />
                <Route path="/VendorDashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
                <Route path="/InvestorDashboard" element={<ProtectedRoute allowedRoles={['investor']}><InvestorDashboard /></ProtectedRoute>} />
                <Route path="/FundManager" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager /></ProtectedRoute>} />
                <Route path="/FundManager_Plans" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager_Plans /></ProtectedRoute>} />
                <Route path="/FundManager_Investors" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager_Investors /></ProtectedRoute>} />
                <Route path="/FundManager_Transactions" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager_Transactions /></ProtectedRoute>} />
                <Route path="/FundManager_Allocations" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager_Allocations /></ProtectedRoute>} />
                <Route path="/FundManager_Reports" element={<ProtectedRoute allowedRoles={['fund_manager']}><FundManager_Reports /></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/AdminPanel" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminPanel /></ProtectedRoute>} />
                <Route path="/SuperAdmin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdmin /></ProtectedRoute>} />
                <Route path="/EventsManagement" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><EventsManagement /></ProtectedRoute>} />
                <Route path="/ApiExecutions" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><ApiExecutions /></ProtectedRoute>} />
                <Route path="/AdManagement" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'vendor']}><AdManagement /></ProtectedRoute>} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <AuthProvider>
                <PagesContent />
            </AuthProvider>
        </Router>
    );
}