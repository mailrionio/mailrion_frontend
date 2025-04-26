import { setIsNewsLetter, setTemplate } from "@/redux/features/utilSlice";
import GeneralModal from "../../../../components/GeneralModal";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { emailTempData } from "@/templates";
import { useDispatch } from "react-redux";
import {
  dbCampaignOpts,
  ICampaignDB,
  IndexedDBCrud,
} from "@/helpers/indexedbd.helper";
import { Fragment } from "react";
import "./email-templates.scss";

interface props {
  handleClose: () => void;
  hasContent: boolean;
  campaignName: string;
}

const EmailTemplatesModal = ({ handleClose, hasContent, campaignName }: props) => {
  const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
  const { id: orgsId, campaignId } = useParams();
  const param = useSearchParams()[0];
  const orgsNum = param.get("orgsNum");
  const cmpId = `mlrCampaign-${campaignId}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToPreview = (label: string) => {
    localStorage.setItem("isNewsLetter", JSON.stringify(true));
    localStorage.setItem("campaignName", campaignName);
    dispatch(setIsNewsLetter(true));
    navigate(
      `/editor/Email/${label}?campaignId=${campaignId}&orgsId=${orgsId}&orgsNum=${orgsNum}`
    );
  };

  const navigateToEditor = async (resetCanvas = true, isInit = true, label?: string) => {
    localStorage.setItem("isNewsLetter", JSON.stringify(true));
    localStorage.setItem("initialized", JSON.stringify(isInit));
    localStorage.setItem("campaignName", campaignName);
    dispatch(setIsNewsLetter(true));

    if (label) {
      localStorage.setItem("category", JSON.stringify("Email"));
      localStorage.setItem("label", JSON.stringify(label));
      dispatch(setTemplate({ category: "Email", label }));
    }

    const campaign = await campaignDB.get(cmpId);
    if (resetCanvas && campaign) {
      await campaignDB.delete(cmpId);
    }

    navigate(`/editor/${campaignId}?orgsId=${orgsId}&orgsNum=${orgsNum}`);
  };

  const handleOnContinue = () => {
    localStorage.setItem("initialized", "false");
    navigateToEditor(false, false);
  };

  const handleOnClickBlank = () => {
    localStorage.setItem("initialized", "true");
    navigateToEditor();
  };

  return (
    <GeneralModal
      title={"Email Templates"}
      subTitle="Select from these email templates or create from scratch"
      width={"800px"}
      height={"580px"}
      handleClose={handleClose}
    >
      <>
        <div className="email-templates">
          <div className="templateContainer">
            <ul className="gridContainer">
              {Object.entries(emailTempData["Email"]).map(
                ([key, { media, label }], idx) => (
                  <Fragment key={key}>
                    {idx === 0 && (
                      <li className="gridItem blank">
                        <div onClick={handleOnClickBlank}>
                          <AiOutlinePlus />
                        </div>
                        <p>Blank</p>
                      </li>
                    )}
                    <li className="gridItem">
                      <div className="imgContainer">
                        <img src={media} alt={label} />
                        <div className="btnContainer">
                          <button
                            className="btnView"
                            onClick={() => navigateToPreview(label)}
                          >
                            View
                          </button>
                          <button
                            className="btnEdit"
                            onClick={() => navigateToEditor(true, true, label)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <p>{label}</p>
                    </li>
                  </Fragment>
                )
              )}
            </ul>
          </div>
        </div>
        {hasContent && (
          <div className="btnContainerEdit">
            <button className="btnContinueEdit" onClick={handleOnContinue}>
              Continue Editing
            </button>
          </div>
        )}
      </>
    </GeneralModal>
  );
};

export default EmailTemplatesModal;
