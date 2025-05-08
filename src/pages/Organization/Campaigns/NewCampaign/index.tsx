/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import html2canvas from "html2canvas";

// Components
import HeadingEffect from "../../../../components/TransitionEffects/Heading";
import usePageMetadata from "../../../../components/UsePageMetadata";
import InputField from "../../../../components/InputField";
import TextEditor from "../../../../components/TextEditor";
import EmailTemplatesModal from "../EmailTemplatesModal";
import ButtonSpinner from "@/components/ButtonSpiner";
import Toast from "@/components/Toast";
import UseAiPrompt from "@/components/UseAiPrompt";
import ScheduleCampaign from "../ScheduleCampaign";

// Assets
import backArr from "../../../../assets/backArr.svg";
import ideaIcon from "../../../../assets/idea.svg";
import { LandscapePlaceholder } from "@/assets";

// Redux & Services
import { useAppSelector } from "@/redux/store";
import { setShowBuilder } from "@/redux/features/utilSlice";
import { GetListsAPI } from "@/redux/features/ListManagement/services";
import {
  CreateCampaignAPI,
  ICampaignData,
  ICampaignResp,
  IEmailBuilder,
  ShowCampaignAPI,
  UpdateCampaignAPI,
} from "@/redux/features/campaign/service";

// Helpers
import { contentHTML } from "@/helpers/content.helper";
import { baseURL } from "@/helpers";
import { stripQuotes } from "@/helpers/strip";
import { flattenArray } from "@/helpers/flat.array";
import {
  IndexedDBCrud,
  ICampaignDB,
  dbCampaignOpts,
} from "@/helpers/indexedbd.helper";

import "./new-campaign.scss";

// Types
interface CampaignFormData {
  campaignName: string;
  subject: string;
}

const NewCampaign = () => {
  const { id, campaignId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [isSchedule, setIsSchedule] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: "",
    subject: "",
  });
  const [textEditorValue, setTextEditorValue] = useState("");
  const [emailBuilder, setEmailBuilder] = useState<Omit<IEmailBuilder, "id" | "type"> | null>(null);
  const [list, setList] = useState("");
  const [excludeList, setExcludeList] = useState("");
  const [campaign, setCampaign] = useState<ICampaignDB>();
  const [loading, setLoading] = useState(false);
  const [ifrLoading, setIFRLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [useAIGen, setUseAIGen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Derived state
  const showModal = searchParams.get("modal") === "true";
  const isEditMode = localStorage.getItem("editCampaign") === "true";
  const campaignDB = useMemo(() => new IndexedDBCrud<ICampaignDB>(dbCampaignOpts), []);

  // Redux selectors
  const { lists } = useAppSelector((state) => state.listManagement);
  const { showBuilder } = useAppSelector((state) => state.utils);
  const { selectedOrganization: { id: orgID, primaryMember } } = useAppSelector((state) => state.organization);

  // Computed values
  const hasContent = useMemo(() => campaign && campaign?.content?.html !== "", [campaign]);
  const fetchloading = useMemo(() => ({
    list: false,
    campaign: false,
  }), []);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchLists(),
          fetchCampaignData(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        Toast({ type: "error", message: "Failed to fetch required data" });
      }
    };

    fetchData();
  }, [campaignId, isEditMode]);

  useEffect(() => {
    const txt = textEditorValue;
    setIsDisabled(
      !formData.campaignName.trim() ||
      !formData.subject.trim() ||
      !String(list).trim() ||
      (showBuilder ? !hasContent : txt === "<p><br></p>" || txt === "")
    );
  }, [formData, textEditorValue, list, hasContent, showBuilder]);

  // Callbacks
  const fetchLists = useCallback(async () => {
    try {
      if (!orgID) return;
      await GetListsAPI(orgID);
    } catch (error) {
      console.error("Error fetching lists:", error);
      throw error;
    }
  }, [orgID]);

  const fetchCampaignData = useCallback(async () => {
    try {
      if (!orgID || !campaignId) return;
      const resp = await ShowCampaignAPI(orgID, campaignId);
      if (resp === "No Campaign Activities") {
        navigate(`/organization/${id}/campaigns`);
        return;
      }

      const data = (resp as ICampaignResp).attributes;
      const { title, subject, content, lists, excluded_lists, email_builder } = data;

      await updateCampaignToDB(data);
      setFormData({
        campaignName: stripQuotes(title),
        subject: stripQuotes(subject),
      });
      
      if (content && !content.endsWith("</html>")) {
        setTextEditorValue(stripQuotes(content));
      }
      
      setList(stripQuotes(lists));
      setExcludeList(stripQuotes(excluded_lists));
      
      if (email_builder?.attributes) {
        const builderAttributes = email_builder.attributes as unknown as Omit<IEmailBuilder, "id" | "type">;
        setEmailBuilder(builderAttributes);
      }

      const campaignData = await campaignDB.get(`mlrCampaign-${campaignId}`);
      setCampaign(campaignData);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      throw error;
    }
  }, [orgID, campaignId, id, navigate, campaignDB]);

  const updateCampaignToDB = useCallback(async (data: Omit<ICampaignData, "email_builder">) => {
    try {
      const campaignID = `mlrCampaign-${campaignId}`;
      const existingCampaign = await campaignDB.get(campaignID);
      if (!existingCampaign) return false;

      await campaignDB.update(campaignID, {
        ...existingCampaign,
        campaign: data,
      });

      return true;
    } catch (error) {
      console.error("Error updating campaign in DB:", error);
      return false;
    }
  }, [campaignId, campaignDB]);

  const htmlContent = useCallback(() => {
    if (!campaign) return "";
    const { content, canvasData } = campaign;
    if (!content) return "";
    
    const html = content.html?.trim() || "";
    const css = content.css?.trim() || "";

    return contentHTML({
      html,
      css,
      dimension: { scale: 1, width: 100, height: 100 },
      canvasData,
      hideScrollbar: true,
      showScripts: true,
      showXtraStyle: true,
      hideLoader: true,
    }).trim();
  }, [campaign]);

  const captureScreenshot = useCallback(async (): Promise<Blob | null> => {
    const isBuilder = hasContent && showBuilder;
    const content = isBuilder ? htmlContent() : textEditorValue;

    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.width = "900px";
      iframe.style.height = "700px";
      iframe.style.position = "absolute";
      iframe.style.top = "-999px";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();
        iframe.onload = async () => {
          try {
            const canvas = await html2canvas(iframeDoc.body, {
              useCORS: true,
              allowTaint: false,
              logging: true,
              width: iframe.clientWidth,
              height: iframe.clientHeight,
            });

            canvas.toBlob((blob) => {
              document.body.removeChild(iframe);
              resolve(blob || null);
            }, "image/png");
          } catch (error) {
            console.error("Error capturing screenshot:", error);
            document.body.removeChild(iframe);
            resolve(null);
          }
        };
      } else {
        resolve(null);
      }
    });
  }, [hasContent, showBuilder, htmlContent, textEditorValue]);

  const saveCampaign = useCallback(async (showToast = true) => {
    const scrshot = await captureScreenshot();
    if (!scrshot) return;

    try {
      setLoadingSave(true);
      const fetchedPlaceholderImg = await fetch("/placeholder.png");
      const plaHolderImg = await fetchedPlaceholderImg.blob();
      const txt = textEditorValue;
      const isTxt = txt !== "<p><br></p>" && txt !== "";
      const isBuilder = hasContent && showBuilder;
      const screenshot = isBuilder ? scrshot : isTxt ? scrshot : plaHolderImg;
      
      if (!orgID || !campaignId) return;
      
      const formDataObj = new FormData();
      formDataObj.append("_method", "put");
      formDataObj.append("name", formData.campaignName.trim());
      formDataObj.append("subject", formData.subject.trim());
      isTxt && formDataObj.append("content", JSON.stringify(txt));
      formDataObj.append("lists", JSON.stringify(flattenArray(list)));
      formDataObj.append("exclude_lists", JSON.stringify(flattenArray(excludeList)));
      formDataObj.append("sender_email", primaryMember.id);
      formDataObj.append("sender_name", primaryMember.id);
      formDataObj.append("organization_id", orgID);
      formDataObj.append("email_builder", JSON.stringify(emailBuilder));
      formDataObj.append("screenshot", screenshot, "screenshot.png");

      const resp = await UpdateCampaignAPI(formDataObj, orgID, campaignId);

      if (!resp || (resp as string) === "Something went wrong") return null;

      const { email_builder, ...rest } = (resp as ICampaignResp).attributes;
      await updateCampaignToDB(rest);

      if (showToast) {
        Toast({
          type: "success",
          message: "Campaign saved successfully",
        });
      }
    } catch (error: any) {
      Toast({
        type: "error",
        message: error.message || "Failed to save campaign",
      });
    } finally {
      setLoadingSave(false);
    }
  }, [captureScreenshot, textEditorValue, hasContent, showBuilder, list, excludeList, primaryMember.id, orgID, campaignId, emailBuilder, updateCampaignToDB, formData]);

  const handleSubmit = useCallback(async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const { campaignName, subject } = formData;
    if (!campaignName.trim() || !subject.trim() || !textEditorValue.trim() || !list.trim()) {
      Toast({ type: "error", message: "All Fields with * are required" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", campaignName);
      formData.append("subject", subject);
      formData.append("content", JSON.stringify(textEditorValue));
      formData.append("lists", JSON.stringify([list]));
      formData.append("exclude_lists", JSON.stringify([excludeList]));
      formData.append("sender_email", primaryMember.id);
      formData.append("sender_name", primaryMember.id);

      const resp = await CreateCampaignAPI(formData);

      if (resp?.status === 200 || resp?.status === 201) {
        Toast({ type: "success", message: "Campaign created" });
        navigate(`/${baseURL()}/campaigns`);
      } else {
        Toast({
          type: "error",
          message: "Failed to create campaign, something went wrong. Try again!",
        });
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      Toast({
        type: "error",
        message: "Failed to create campaign",
      });
    } finally {
      setLoading(false);
    }
  }, [formData, textEditorValue, list, excludeList, primaryMember.id, navigate]);

  const handleShowBuilder = useCallback((status: boolean) => {
    setIFRLoading(true);
    localStorage.setItem("showBuilder", JSON.stringify(status));
    dispatch(setShowBuilder(status));
  }, [dispatch]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const goBack = useCallback(() => {
    saveCampaign(false);
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("lists-") || key.startsWith("campaigns-")) {
        sessionStorage.removeItem(key);
      }
    });
    navigate(`/${baseURL()}/campaigns`);
  }, [saveCampaign, navigate]);

  if (!campaignId) {
    return <Navigate to={`/organization/${id}/campaigns`} />;
  }

  usePageMetadata({
    title: "Create a new campaign",
    description: "Campaigns are great way to reach wider audience.",
  });

  return (
    <div className="new-campaign">
      {isSchedule && (
        <ScheduleCampaign handleClose={() => setIsSchedule(false)} />
      )}
      {showModal && (
        <EmailTemplatesModal
          hasContent={hasContent || false}
          handleClose={() => navigate(-1)}
          campaignName={formData.campaignName}
        />
      )}
      {useAIGen && (
        <UseAiPrompt
          onClose={() => setUseAIGen(false)}
          title="Generate a campaign body"
          promptType="for campaign body"
          samples={[]}
          handleUse={(sample) => setTextEditorValue(sample)}
        />
      )}

      {fetchloading.campaign || fetchloading.list ? (
        <div className="loader">
          <ButtonSpinner />
        </div>
      ) : (
        <>
          <div className="new-campaign__header">
            <HeadingEffect>
              <h2>New Campaign</h2>
            </HeadingEffect>
            <div className="back-link">
              <span onClick={goBack}>
                <img src={backArr} alt="back arrow" />
                <p>Back to Campaigns</p>
              </span>
              <div className="action-btns">
                <div />
                {loading ? (
                  <ButtonSpinner />
                ) : (
                  <div className="btns">
                    <div className="btn-elements">
                      <button
                        className="btn-option"
                        onClick={() => saveCampaign()}
                        disabled={loadingSave}
                      >
                        <FiSave fontSize={17} style={{ marginRight: "10px" }} />
                        {loadingSave ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="btn-option"
                        onClick={() => setIsSchedule(true)}
                        disabled={isDisabled}
                      >
                        <IoMdTime
                          fontSize={20}
                          style={{ marginRight: "10px" }}
                        />
                        Schedule Post
                      </button>
                      <button
                        type="submit"
                        className="btn-option bg-fill"
                        disabled={isDisabled}
                      >
                        <div className="sent">Publish Now</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <form className="new-campaign__body" onSubmit={handleSubmit}>
            <InputField
              handleChange={handleOnChange}
              name="campaignName"
              classes=""
              value={formData.campaignName}
              placeholder="Campaign name"
              label="Name"
              required
            />
            <InputField
              handleChange={handleOnChange}
              name="subject"
              classes=""
              value={formData.subject}
              placeholder="Subject"
              label="Subject"
              required
            />
            <div className="editor-wrapper">
              <label>{showBuilder ? "Email Builder" : "Body"}</label>
              {showBuilder ? (
                <div className="iframe-container">
                  {!hasContent && (
                    <div className="placeholder">
                      <img src={LandscapePlaceholder} alt="img-placeholder" />
                    </div>
                  )}
                  {ifrLoading && (
                    <div className="iframeLoader">
                      <ButtonSpinner />
                    </div>
                  )}
                  <iframe
                    srcDoc={htmlContent()}
                    style={{ width: "100%", height: "100%" }}
                    onLoad={() => setIFRLoading(false)}
                  />
                </div>
              ) : (
                <div className="text-editor">
                  <TextEditor
                    onChange={setTextEditorValue}
                    value={textEditorValue}
                  />
                </div>
              )}
              <div className="body-generators">
                {showBuilder ? (
                  <div className="gen-group">
                    <div
                      className="gen"
                      onClick={() => handleShowBuilder(false)}
                    >
                      Use Email Body
                    </div>
                    <div
                      className="gen"
                      onClick={() => setSearchParams({ modal: "true", orgsNum: orgID })}
                    >
                      Edit Builder
                    </div>
                  </div>
                ) : (
                  <div className="gen-group">
                    <div className="gen" onClick={() => setUseAIGen(true)}>
                      Generate body with AI{" "}
                      <img src={ideaIcon} alt="Idea Icon" />
                    </div>
                    <div className="gen" onClick={() => handleShowBuilder(true)}>
                      Use Email Builder
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="list-selection">
              <label htmlFor="lists">
                List<span className="required">*</span>
              </label>
              <select
                name="lists"
                id="lists"
                value={String(list)}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setList(e.target.value)
                }
              >
                <option value="">Select a List</option>
                {lists.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="list-selection">
              <label htmlFor="excludeLists">Exclude List (optional)</label>
              <select
                name="excludeLists"
                id="excludeLists"
                value={String(excludeList)}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setExcludeList(e.target.value)
                }
              >
                <option value="">Select a List to Exclude</option>
                {lists.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default memo(NewCampaign);
