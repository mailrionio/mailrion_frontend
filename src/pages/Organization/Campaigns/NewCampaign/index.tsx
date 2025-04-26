/* eslint-disable @typescript-eslint/no-explicit-any */
import HeadingEffect from "../../../../components/TransitionEffects/Heading";
import usePageMetadata from "../../../../components/UsePageMetadata";
import { GetListsAPI } from "@/redux/features/ListManagement/services";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { setShowBuilder } from "@/redux/features/utilSlice";
import InputField from "../../../../components/InputField";
import TextEditor from "../../../../components/TextEditor";
import EmailTemplatesModal from "../EmailTemplatesModal";
import { contentHTML } from "@/helpers/content.helper";
import ButtonSpinner from "@/components/ButtonSpiner";
import backArr from "../../../../assets/backArr.svg";
import UseAiPrompt from "@/components/UseAiPrompt";
import ideaIcon from "../../../../assets/idea.svg";
import ScheduleCampaign from "../ScheduleCampaign";
import { useAppSelector } from "@/redux/store";
import {
  CreateCampaignAPI,
  ICampaignData,
  ICampaignResp,
  IEmailBuilder,
  ShowCampaignAPI,
  UpdateCampaignAPI,
} from "@/redux/features/campaign/service";
import { IoMdTime } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import Toast from "@/components/Toast";
import {
  IndexedDBCrud,
  ICampaignDB,
  dbCampaignOpts,
} from "@/helpers/indexedbd.helper";
import { baseURL } from "@/helpers";
import "./new-campaign.scss";
import {
  Navigate,
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { LandscapePlaceholder } from "@/assets";
import html2canvas from "html2canvas";
import { stripQuotes } from "@/helpers/strip";
import { flattenArray } from "@/helpers/flat.array";

const NewCampaign = () => {
  const { id, campaignId } = useParams();

  if (!campaignId) {
    return <Navigate to={`/organization/${id}/campaigns`} />;
  }

  const [isSchedule, setIsSchedule] = useState<boolean>(false);
  const [value, setValue] = useState({
    subject: "",
    campaignName: "",
  });
  const [textEditorValue, setTextEditorValue] = useState<string>("");
  const { lists } = useAppSelector((state) => state.listManagement);
  const [emailBuilder, setEmailBuilder] = useState<
    Omit<IEmailBuilder, "id" | "type"> | null | undefined
  >(null);
  const [list, setList] = useState<string>("");
  const { showBuilder } = useAppSelector((state) => state.utils);
  const [hasContent, setHasContent] = useState(false);
  const [campaign, setCampaign] = useState<ICampaignDB>();
  const [excludeList, setExcludeList] = useState<string>("");
  const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
  const [loading, setLoading] = useState(false);
  const [ifrLoading, setIFRLoading] = useState(true);
  const [fetchloading, setFetchLoading] = useState({
    list: false,
    campaign: false,
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [param, setParam] = useSearchParams();
  const showModal = param.get("modal") === "true";
  const {
    selectedOrganization: { id: orgID, primaryMember },
  } = useAppSelector((state) => state.organization);
  const [useAIGen, setUseAIGen] = useState<boolean>(false);
  localStorage.setItem("editCampaign", "true");
  const isEditMode = localStorage.getItem("editCampaign");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchList = async () => {
      try {
        setFetchLoading((prev) => ({ ...prev, list: true }));
        await GetListsAPI(orgID as string);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchLoading((prev) => ({ ...prev, list: false }));
      }
    };

    const showCampaignData = async () => {
      try {
        const resp = await ShowCampaignAPI(orgID, campaignId);

        if (resp === "No Campaign Activities") {
          redirect(`/organization/${id}/campaigns`);
          return;
        }

        const data = (resp as ICampaignResp).attributes;
        let { title, subject, content, lists, excluded_lists } = data;

        content = stripQuotes(content);
        await updateCampaignToDB(data);
        setValue({
          campaignName: stripQuotes(title),
          subject: stripQuotes(subject),
        });
        if (content && !content.endsWith("</html>"))
          setTextEditorValue(content);
        setList(stripQuotes(lists));
        setExcludeList(stripQuotes(excluded_lists));

        return resp as ICampaignResp;
      } catch (error) {
        Toast({
          type: "error",
          message: "Fail to fetch campaign data",
        });
      }
    };

    const fetchCampaignData = async () => {
      try {
        setFetchLoading((prev) => ({ ...prev, campaign: true }));
        const showCamp = await showCampaignData();
        const showCampaign = isEditMode === "true" ? showCamp : undefined;
        const emailBuilder = showCampaign?.attributes?.email_builder;

        type EmailBuilderType = Omit<IEmailBuilder, "id" | "type">;
        setEmailBuilder(
          emailBuilder?.attributes as unknown as EmailBuilderType
        );

        const getCampaignDB = await campaignDB.get(`mlrCampaign-${campaignId}`);

        setCampaign(getCampaignDB);
        setHasContent(
          getCampaignDB ? getCampaignDB.content.html !== "" : false
        );
      } catch (error) {
        console.error("Error fetching campaign from IndexedDB:", error);
      } finally {
        setFetchLoading((prev) => ({ ...prev, campaign: false }));
      }
    };

    fetchCampaignData();
    fetchList();
  }, [campaignId, isEditMode]);

  useEffect(() => {
    const txt = textEditorValue;
    setIsDisabled(
      !value.campaignName.trim() ||
        !value.subject.trim() ||
        !String(list).trim() ||
        !String(excludeList).trim() ||
        (showBuilder ? !hasContent : txt === "<p><br></p>" || txt === "")
    );
  }, [value, textEditorValue, list, excludeList, hasContent, showBuilder]);

  usePageMetadata({
    title: "Create a new campaign",
    description: "Campaigns are great way to reach wider audience.",
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { campaignName, subject } = value;
    if (
      !campaignName.trim() ||
      !subject.trim() ||
      !textEditorValue.trim() ||
      !list.trim()
    ) {
      Toast({ type: "error", message: "All Fields with * are required" });
      return;
    }
    const formdata = new FormData();
    formdata.append("name", campaignName);
    formdata.append("subject", subject);
    formdata.append("content", JSON.stringify(textEditorValue));
    formdata.append("lists", JSON.stringify([list]));
    formdata.append("exclude_lists", JSON.stringify([excludeList]));
    formdata.append("sender_email", primaryMember.id);
    formdata.append("sender_name", primaryMember.id);

    const resp = await CreateCampaignAPI(formdata);

    if (resp?.status === 200 || resp?.status === 201) {
      Toast({ type: "success", message: "Campaign created" });
      setLoading(false);
      navigate(`/${baseURL()}/campaigns`);
    } else {
      setLoading(false);
      Toast({
        type: "error",
        message: "Failed to create campaign, something went wrong. Try again!",
      });
    }
  };

  const handleShowBuilder = (status: boolean) => {
    setIFRLoading(true);
    localStorage.setItem("showBuilder", JSON.stringify(status));
    dispatch(setShowBuilder(status));
  };

  const setIsBuilder = () => {
    handleShowBuilder(true);
    if (!hasContent) {
      setParam({ modal: "true", orgsNum: orgID });
    }
  };

  const updateCampaignToDB = async (
    data: Omit<ICampaignData, "email_builder">
  ) => {
    try {
      const campaignID = `mlrCampaign-${campaignId}`;
      const campaign = await campaignDB.get(campaignID);
      if (!campaign) return false;

      await campaignDB.update(campaignID, {
        ...campaign,
        campaign: data,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const htmlContent = () => {
    if (!campaign) return "";
    const { content, canvasData } = campaign;
    const html = content?.html.trim() || "";
    const css = content?.css?.trim() || "";

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
  };

  const captureScreenshot = async (): Promise<Blob | null> => {
    const isBuilder = hasContent && showBuilder;
    const content = isBuilder ? htmlContent() : textEditorValue;

    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.width = "900px";
      iframe.style.height = "700px";
      iframe.style.position = "absolute";
      iframe.style.top = "-999px"; // Keep it off-screen initially
      document.body.appendChild(iframe);

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();
        iframe.onload = async () => {
          const canvas = await html2canvas(iframeDoc.body, {
            useCORS: true,
            allowTaint: false,
            logging: true,
            width: iframe.clientWidth,
            height: iframe.clientHeight,
          });

          canvas.toBlob((blob) => {
            document.body.removeChild(iframe);
            resolve(blob || null); // Resolve with Blob or null
          }, "image/png");
        };
      } else {
        resolve(null);
      }
    });
  };

  const saveCampaign = async (showToast = true) => {
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
      const flatList = flattenArray(list);
      const exclude_lists = flattenArray(excludeList);
      const name = value.campaignName.trim();
      const subject = value.subject.trim();
      const primMemId = primaryMember.id;
      const formData = new FormData();

      formData.append("_method", "put");
      name && formData.append("name", name);
      subject && formData.append("subject", subject);
      isTxt && formData.append("content", JSON.stringify(txt));
      formData.append("lists", JSON.stringify(flatList));
      formData.append("exclude_lists", JSON.stringify(exclude_lists));
      formData.append("sender_email", primMemId);
      formData.append("sender_name", primMemId);
      formData.append("organization_id", orgID);
      formData.append("email_builder", JSON.stringify(emailBuilder));
      formData.append("screenshot", screenshot, "screenshot.png");

      /*const formdata = new FormData();
      formdata.append("file", screenshot, "screenshot.png");

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formdata,
      });

      const data = await response.json();
      console.log("UPLOADED SUCCESSFULLY ===> ", data);*/

      const resp = await UpdateCampaignAPI(formData, orgID, campaignId);

      if (!resp || (resp as string) === "Something went wrong") return null;

      const { email_builder, ...rest } = (resp as ICampaignResp).attributes;

      await updateCampaignToDB(rest);

      if (showToast)
        Toast({
          type: "success",
          message: "Campaign saved successfully",
        });
    } catch (error: any) {
      Toast({
        type: "error",
        message: error.messsage || "Failed to save campaign",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  const goBack = () => {
    saveCampaign(false);

    // Loop through sessionStorage and remove keys that start with "lists-" or "campaigns-"
    // This clear the cache and reloads affresh
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("lists-") || key.startsWith("campaigns-")) {
        sessionStorage.removeItem(key);
      }
    });

    navigate(`/${baseURL()}/campaigns`);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="new-campaign">
      {isSchedule && (
        <ScheduleCampaign handleClose={() => setIsSchedule(false)} />
      )}
      {showModal && (
        <EmailTemplatesModal
          hasContent={hasContent}
          handleClose={() => navigate(-1)}
          campaignName={value.campaignName}
        />
      )}
      {useAIGen && (
        <UseAiPrompt
          onClose={() => setUseAIGen(false)}
          title="Generate a campaign body "
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
              name={"campaignName"}
              classes={""}
              value={value.campaignName || ""}
              placeholder={"Campaign name"}
              label={"Name"}
              required={true}
            />
            <InputField
              handleChange={handleOnChange}
              name="subject"
              classes={""}
              value={value.subject || ""}
              placeholder={"Subject"}
              label={"Subject"}
              required={true}
            />
            <div className="editor-wrapper">
              <label htmlFor="">{showBuilder ? "Email Builder" : "Body"}</label>
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
                  ></iframe>
                </div>
              ) : (
                <div className="text-editor">
                  <TextEditor
                    onChange={(content) => setTextEditorValue(content)}
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
                      onClick={() =>
                        setParam({ modal: "true", orgsNum: orgID })
                      }
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
                    <div className="gen" onClick={setIsBuilder}>
                      Use Email Builder
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="list-selection">
              <label htmlFor="lists">List *</label>
              <select
                name="lists"
                id="lists"
                value={String(list) || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setList(e.target.value)
                }
              >
                <option value="">Select a List</option>
                {lists.length > 0 &&
                  lists.map((item) => (
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
                value={String(excludeList) || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setExcludeList(e.target.value)
                }
              >
                <option value="">Select a List to Exclude</option>
                {lists.length > 0 &&
                  lists.map((item) => (
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
