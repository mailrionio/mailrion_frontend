import { emailTempData, templateData, TemplateEntry } from "@/templates";
import { setLandingPages } from "@/redux/features/PagesSlice";
import { dispatch, useAppSelector } from "@/redux/store";
import { MdKeyboardBackspace } from "react-icons/md";
import React, { useState, memo } from "react";
import { BiHide } from "react-icons/bi";
import {
  setIsNewsLetter,
  setTemplate,
  setToggleStep,
} from "@/redux/features/utilSlice";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./styles.scss";
import {
  dbCampaignOpts,
  ICampaignDB,
  IndexedDBCrud,
} from "@/helpers/indexedbd.helper";
import { CreatePageAPI } from "@/redux/features/PagesSlice/services";

const Preview: React.FC = () => {
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [showPanel, setShowPanel] = useState(true);
  const { step, pageName, isNewsLetter } = useAppSelector(
    (state) => state.utils
  );
  const { category, label } = useParams();
  const param = useSearchParams()[0];
  const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
  const campaignId = param.get("campaignId");
  const currentPage = param.get("currentPage");
  const cmpId = `mlrCampaign-${campaignId}`;
  const orgsId = param.get("orgsId");
  const orgsNum = param.get("orgsNum");
  const navigate = useNavigate();

  if (!category || !label) {
    return (
      <Navigate
        to={
          isNewsLetter
            ? `/organization/${orgsId}/new-campaign?modal=true`
            : `/pages/${currentPage || "1"}`
        }
      />
    );
  }

  const tempData = (
    (isNewsLetter ? emailTempData : templateData) as unknown as {
      [key: string]: Record<string, TemplateEntry>;
    }
  )[category][label];

  const htmlData: { [key: string]: string } = tempData.content;

  const createPage = async (category?: string, label?: string) => {
    if (pageName === "") return;
    const resp = await CreatePageAPI(pageName.trim());
    if (!resp || !resp.success) return;
    const page = resp?.Pages;
    const pageId = page?.id;

    dispatch(setToggleStep(1));
    localStorage.setItem("isNewsLetter", JSON.stringify(false));
    dispatch(setIsNewsLetter(false));
    localStorage.setItem("initialized", "true");
    localStorage.setItem("pageName", pageName);

    // Dispatch if in Step Two
    if (category && label && step[2]) {
      localStorage.setItem("category", JSON.stringify(category));
      localStorage.setItem("label", JSON.stringify(label));
      dispatch(setTemplate({ category, label }));
    }

    navigate(`/editor/${pageId}`);
  };

  const navigateToEditor = async (label?: string) => {
    localStorage.setItem("isNewsLetter", JSON.stringify(true));
    localStorage.setItem("initialized", "true");
    dispatch(setIsNewsLetter(true));

    if (label) {
      localStorage.setItem("category", JSON.stringify("Email"));
      localStorage.setItem("label", JSON.stringify(label));
      dispatch(setTemplate({ category: "Email", label }));
    }

    const campaign = await campaignDB.get(cmpId);
    if (campaign) {
      await campaignDB.delete(cmpId);
    }

    navigate(`/editor/${campaignId}?orgsId=${orgsId}&orgsNum=${orgsNum}`);
  };

  const handleGoBack = () => {
    if (isNewsLetter) {
      navigate(
        `/organization/${orgsId}/new-campaign/${campaignId}?modal=true&orgsNum=${orgsNum}`,
        { replace: true }
      );

      return;
    }

    navigate(`/pages/${currentPage || "1"}`, { replace: true });
    if (!step[2]) dispatch(setToggleStep(2));
  };

  return (
    <div>
      {showPanel && (
        <div className="panelTop">
          <div className="logoContainer">
            <div className="logo">
              <Link to="/" className="logoLink">
                <img src="/Mailrion/Logo-main.png" alt="mailrion logo" />
              </Link>
            </div>
            <div className="back" onClick={handleGoBack}>
              <MdKeyboardBackspace />
              <p>Back To Templates</p>
            </div>
          </div>

          <div className="responsive">
            <div
              className={`desktopWindow ${deviceWidth === 0 ? "active" : ""}`}
              title="Desktop"
              onClick={() => setDeviceWidth(0)}
            ></div>
            <div
              className={`tabWindow ${deviceWidth === 768 ? "active" : ""}`}
              title="Tablet"
              onClick={() => setDeviceWidth(768)}
            ></div>
            <div
              className={`mobileWindow ${deviceWidth === 375 ? "active" : ""}`}
              title="Mobile"
              onClick={() => setDeviceWidth(375)}
            ></div>
          </div>

          <div className="panelAction">
            <button
              className="btn btn-primary"
              onClick={() => setShowPanel(false)} // Hide the panel
            >
              Preview
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                isNewsLetter
                  ? navigateToEditor(label)
                  : createPage(category, label)
              }
            >
              Edit this Site
            </button>
          </div>
        </div>
      )}

      <div
        className="editorCanvas"
        style={{ height: showPanel ? "90vh" : "100vh" }}
      >
        {!showPanel && (
          <button
            title="Show Top Panel"
            className="floatingBtn"
            onClick={() => setShowPanel(true)}
          >
            <BiHide />
          </button>
        )}
        <iframe
          src={htmlData["home"]}
          style={{
            width: deviceWidth === 0 ? "100%" : `${deviceWidth}px`,
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default memo(Preview);
