import React, {
  useState,
} from "react";

/* ================================================= */
/* ================= I18N ========================== */
/* ================================================= */

import "./i18n";

/* ================================================= */
/* ================= STRIPE ======================== */
/* ================================================= */

import {
  Elements,
} from "@stripe/react-stripe-js";

import {
  loadStripe,
} from "@stripe/stripe-js";

/* ================================================= */
/* ================= ROUTER ======================== */
/* ================================================= */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

/* ================================================= */
/* ================= MAIN PAGES ==================== */
/* ================================================= */

import HomePage from "./HomePage";
import AuthPage from "./AuthPage";

/* ================================================= */
/* ================= DONOR PAGES =================== */
/* ================================================= */

import Favorites from "./pages/Favorites";
import DonorDashboard from "./pages/DonorDashboard";
import BrowseRequests from "./pages/BrowseRequests";
import MyDonations from "./pages/MyDonations";
import Impact from "./pages/Impact";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

/* ================================================= */
/* ================= NEEDY DASHBOARD =============== */
/* ================================================= */

import NeedyDashboard from "./NeedyDashboard";

/* ================================================= */
/* ================= NEEDY PAGES =================== */
/* ================================================= */

import MyCampaign from "./pages/MyCampaign";
import UpdateStory from "./pages/UpdateStory";
import DocumentsVerification from "./pages/DocumentsVerification";
import DonationsReceived from "./pages/DonationsReceived";
import TransparencyCenter from "./pages/TransparencyCenter";
import RecoveryTimeline from "./pages/RecoveryTimeline";

/* ================================================= */
/* ================= NEEDY SETTINGS ================ */
/* ================================================= */

import NeedySettings from "./pages/NeedySettings";

/* ================================================= */
/* ================= NEEDY MESSAGES ================ */
/* ================================================= */

import NeedyMessages from "./components/needy/NeedyMessages";

/* ================================================= */
/* ================= EXTRA PAGES =================== */
/* ================================================= */

import DonationCheckout from "./pages/DonationCheckout";
import CampaignGallery from "./pages/CampaignGallery";
import LiveSupport from "./pages/LiveSupport";
import CampaignQR from "./pages/CampaignQR";
import EditCampaign from "./pages/EditCampaign";

/* ================================================= */
/* ================= STRIPE INIT =================== */
/* ================================================= */

const stripePromise =
  loadStripe(
    process.env.REACT_APP_STRIPE_PUBLIC_KEY
  );

/* ================================================= */
/* ================= APP =========================== */
/* ================================================= */

function App() {

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  return (

    <Elements stripe={stripePromise}>

      <Router>

        <Switch>

          {/* HOME */}

          <Route
            exact
            path="/"
            render={(props) => (

              <HomePage
                {...props}

                goToAuth={(mode) => {

                  localStorage.setItem(
                    "authMode",
                    mode
                  );

                  props.history.push(
                    "/auth"
                  );

                }}
              />

            )}
          />

          {/* AUTH */}

          <Route
            exact
            path="/auth"
            component={AuthPage}
          />

          {/* DONOR DASHBOARD */}

          <Route
            exact
            path="/donor-dashboard"
            render={(props) => (

              <DonorDashboard
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* NEEDY DASHBOARD */}

          <Route
            exact
            path="/needy-dashboard"
            render={(props) => (

              <NeedyDashboard
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* MY CAMPAIGN */}

          <Route
            exact
            path="/my-campaign"
            render={(props) => (

              <MyCampaign
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* UPDATE STORY */}

          <Route
            exact
            path="/update-story"
            render={(props) => (

              <UpdateStory
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* DOCUMENTS */}

          <Route
            exact
            path="/documents-verification"
            render={(props) => (

              <DocumentsVerification
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* DONATIONS RECEIVED */}

          <Route
            exact
            path="/donations-received"
            render={(props) => (

              <DonationsReceived
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* TRANSPARENCY */}

          <Route
            exact
            path="/transparency-center"
            render={(props) => (

              <TransparencyCenter
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* RECOVERY */}

          <Route
            exact
            path="/recovery-timeline"
            render={(props) => (

              <RecoveryTimeline
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* BROWSE */}

          <Route
            exact
            path="/browse"
            render={(props) => (

              <BrowseRequests
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* FAVORITES */}

          <Route
            exact
            path="/favorites"
            render={(props) => (

              <Favorites
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* MY DONATIONS */}

          <Route
            exact
            path="/my-donations"
            render={(props) => (

              <MyDonations
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* IMPACT */}

          <Route
            exact
            path="/impact"
            render={(props) => (

              <Impact
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* MESSAGES */}

          <Route
            exact
            path="/messages"
            render={(props) => (

              <Messages
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* NEEDY MESSAGES */}

          <Route
            exact
            path="/needy-messages"
            render={(props) => (

              <NeedyMessages
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* SETTINGS */}

          <Route
            exact
            path="/settings"
            render={(props) => (

              <Settings
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* NEEDY SETTINGS */}

          <Route
            exact
            path="/needy-settings"
            render={(props) => (

              <NeedySettings
                {...props}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />

            )}
          />

          {/* EXTRA */}

          <Route
            exact
            path="/donation-checkout"
            component={DonationCheckout}
          />

          <Route
            exact
            path="/campaign-gallery"
            component={CampaignGallery}
          />

          <Route
            exact
            path="/live-support"
            component={LiveSupport}
          />

          <Route
            exact
            path="/campaign-qr"
            component={CampaignQR}
          />

          <Route
            exact
            path="/edit-campaign"
            component={EditCampaign}
          />

          {/* FALLBACK */}

          <Redirect to="/" />

        </Switch>

      </Router>

    </Elements>

  );

}

export default App;