import { Route, Routes as Switch } from "react-router-dom";
import {
  Authenticated,
  OtherPrivateRoute,
  default as PrivateRoute,
} from "./Auth";
import { Login, NotFound, Signup } from "./pages";
import AIsplitMailing from "./pages/AISplitMailing";
import CreateABTest from "./pages/AISplitMailing/CreateABTest";
import Account from "./pages/Account";
import CloudStorage from "./pages/Account/CloudStorage";
import Aws from "./pages/Account/Organization/Integrations/Aws";
import MailGun from "./pages/Account/Organization/Integrations/MailGun";
import SendGrid from "./pages/Account/Organization/Integrations/SendGrid";
import Smtp from "./pages/Account/Organization/Integrations/Smtp";
import Webhook from "./pages/Account/Organization/Integrations/Webhook";
import BadProtocal from "./pages/BadProtocol";
import EmailScrapper from "./pages/EmailScrapper";
import EmailValidation from "./pages/EmailValidation";
import EmailAnalytics from "./pages/EmailValidation/EmailAnalytics";
import EmailValidationDetails from "./pages/EmailValidation/EmailValidationDetails";
import ValidationResult from "./pages/EmailValidation/ValidationResult/Result";
import Campaigns from "./pages/Organization/Campaigns";
import NewCampaign from "./pages/Organization/Campaigns/NewCampaign";
import ListManagement from "./pages/Organization/ListManagement";
import AddContact from "./pages/Organization/ListManagement/AddContact";
import ListContacts from "./pages/Organization/ListManagement/ListContacts";
import MailingSystem from "./pages/Organization/MailingSystem";
import ComposeMail from "./pages/Organization/MailingSystem/ComposeMail";
import TeamChat from "./pages/Organization/TeamChat";
import Tools from "./pages/Organization/Tools";
import Organizations from "./pages/Organizations";
import Reseller from "./pages/Reseller";
import ResetPassword from "./pages/ResetPassword";
import Resources from "./pages/Resources";
import Tutorials from "./pages/Tutorials";
import Whitelabel from "./pages/Whitelabel";
import ManageUsers from "./pages/Whitelabel/ManageUsers";
import CustomEditor from "./pages/CustomEditor";
import LandingPages from "./pages/LandingPages";
import Preview from "./pages/Preview";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Authenticated component={Login} />} />
      {/* admin pages  */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/organization/:id/dashboard"
          element={<MailingSystem mailboxTitle="Inbox" />}
        />
        <Route
          path="/organization/:id/inbox"
          element={<MailingSystem mailboxTitle="Inbox" />}
        />
        <Route
          path="/organization/:id/sent"
          element={<MailingSystem mailboxTitle="Sent" />}
        />
        <Route
          path="/organization/:id/starred"
          element={<MailingSystem mailboxTitle="Starred" />}
        />
        <Route
          path="/organization/:id/drafts"
          element={<MailingSystem mailboxTitle="Drafts" />}
        />
        <Route
          path="/organization/:id/spam"
          element={<MailingSystem mailboxTitle="Spam" />}
        />
        <Route
          path="/organization/:id/trash"
          element={<MailingSystem mailboxTitle="Trash" />}
        />
        <Route
          path="/organization/:id/compose-new-mail"
          element={<ComposeMail />}
        />
        <Route path="/organization/:id/teamchat" element={<TeamChat />} />
        <Route path="/organization/:id/campaigns" element={<Campaigns />} />
        <Route
          path="/organization/:id/new-campaign/:campaignId"
          element={<NewCampaign />}
        />
        <Route path="/organization/:id/tools" element={<Tools />} />
        <Route
          path="/organization/:id/list-management"
          element={<ListManagement />}
        />
        <Route
          path="/organization/:id/list-management"
          element={<ListManagement />}
        />{" "}
        <Route
          path="/organization/:id/add-contact-to-list"
          element={<AddContact />}
        />
        <Route
          path="/organization/:id/list-contacts"
          element={<ListContacts />}
        />
        <Route
          path="/organization/:id/email-validation"
          element={<EmailValidation />}
        />
        <Route
          path="/organization/:id/email-validation/all-results"
          element={<ValidationResult />}
        />
        <Route
          path="/organization/:id/email-validation/email-details"
          element={<EmailValidationDetails />}
        />
        <Route
          path="/organization/:id/email-validation/email-analytics"
          element={<EmailAnalytics />}
        />
        <Route
          path="/organization/:id/email-scrapper"
          element={<EmailScrapper />}
        />
        <Route
          path="/organization/:id/ai-spliter"
          element={<AIsplitMailing />}
        />
        <Route
          path="/organization/:id/ai-spliter/create-ab-test"
          element={<CreateABTest />}
        />
      </Route>
      {/* sub account pages  */}
      {/* <Route element={<SubAccountPrivateRoute />}>
        <Route
          path="/sub-account"
          element={<SubAccountMailingSystem mailboxTitle="Inbox" />}
        />
        <Route
          path="/sub-account/dashboard"
          element={<SubAccountMailingSystem mailboxTitle="Inbox" />}
        />
        <Route
          path="/sub-account/inbox"
          element={<SubAccountMailingSystem mailboxTitle="Inbox" />}
        />
        <Route
          path="/sub-account/sent"
          element={<SubAccountMailingSystem mailboxTitle="Sent" />}
        />
        <Route
          path="/sub-account/starred"
          element={<SubAccountMailingSystem mailboxTitle="Starred" />}
        />
        <Route
          path="/sub-account/draft"
          element={<SubAccountMailingSystem mailboxTitle="Draft" />}
        />
        <Route
          path="/sub-account/spam"
          element={<SubAccountMailingSystem mailboxTitle="Spam" />}
        />
        <Route
          path="/sub-account/trash"
          element={<SubAccountMailingSystem mailboxTitle="Trash" />}
        />
        <Route
          path="/sub-account/compose-new-mail"
          element={<SubAccountComposeMail />}
        />
        <Route path="/sub-account/teamchat" element={<SubAccountTeamChat />} />
        <Route
          path="/sub-account/campaigns"
          element={<SubAccountCampaigns />}
        />
        <Route
          path="/sub-account/new-campaign"
          element={<SubAccountNewCampaigns />}
        />
        <Route path="/sub-account/tools" element={<SubAccountTools />} />
        <Route
          path="/sub-account/list-management"
          element={<SubAccountListManagement />}
        />

        <Route
          path="/sub-account/add-contact-to-list"
          element={<SubAccountAddContact />}
        />
        <Route
          path="/sub-account/list-contacts"
          element={<SubAccountListContacts />}
        />
      </Route> */}
      // other authenticated routes with topbar
      <Route element={<OtherPrivateRoute showTopNav />}>
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/pages" element={<LandingPages />} />
        <Route path="/pages/:pageId" element={<LandingPages />} />
        <Route path="/account-settings" element={<Account />} />
        <Route path="/account-settings/integration/smtp" element={<Smtp />} />
        <Route
          path="/account-settings/integration/webhook"
          element={<Webhook />}
        />
        <Route path="/account-settings/integration/aws" element={<Aws />} />
        <Route
          path="/account-settings/integration/mailgun"
          element={<MailGun />}
        />
        <Route
          path="/account-settings/integration/sendgrid"
          element={<SendGrid />}
        />
        <Route path="/cloud-storage" element={<CloudStorage />} />
        <Route path="/reseller" element={<Reseller />} />
        <Route path="/white-label" element={<Whitelabel />} />
        <Route path="/white-label/manage-users" element={<ManageUsers />} />
        <Route path="/help/tutorials" element={<Tutorials />} />
        <Route path="/help/resources" element={<Resources />} />
      </Route>
      <Route element={<OtherPrivateRoute />}>
        <Route path="/editor/:pageId" element={<CustomEditor />} />
        <Route path="/editor/:category/:label" element={<Preview />} />
      </Route>
      <Route path="/login" element={<Authenticated component={Login} />} />
      <Route path="/signup" element={<Authenticated component={Signup} />} />
      {/* <Route
        path="/:id/login"
        element={<SubAuthenticated component={SubAccountLogin} />}
      /> */}
      <Route path="/bad-protocol" element={<BadProtocal />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
