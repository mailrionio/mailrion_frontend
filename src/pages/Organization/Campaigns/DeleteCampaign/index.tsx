import GeneralModal from "@/components/GeneralModal";
import {
  IndexedDBCrud,
  ICampaignDB,
  dbCampaignOpts,
} from "@/helpers/indexedbd.helper";
import "./deleteCampaign.scss";
import { FC, useState } from "react";
import {
  DeleteCampaignAPI,
  IViewCampaignData,
} from "@/redux/features/campaign/service";
import Toast from "@/components/Toast";

interface props {
  handleClose: () => void;
  campaign: IViewCampaignData | undefined;
  setYesDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCampaign: FC<props> = ({
  handleClose,
  campaign,
  setYesDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnYesClick = async () => {
    try {
      if (campaign) {
        setIsDeleting(true);
        const { id: campaignId } = campaign;
        const cmpId = `mlrCampaign-${campaignId}`;

        // Call the delete campaign API
        const response = await DeleteCampaignAPI(campaignId);

        if (response?.status === 200 || response?.status === 201) {
          // Initialize the class for `Page` type and delete from IndexedDB
          const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
          const getCampaign = await campaignDB.get(cmpId);

          if (getCampaign) {
            await campaignDB.delete(cmpId);
          }

          // Loop through sessionStorage and remove keys that start with "lists-" or "campaigns-"
          Object.keys(sessionStorage).forEach((key) => {
            if (key.startsWith("lists-") || key.startsWith("campaigns-")) {
              sessionStorage.removeItem(key);
            }
          });

          Toast({ type: "success", message: "Campaign deleted successfully" });
          handleClose();
          setYesDelete(true);
        } else {
          Toast({ type: "error", message: "Failed to delete campaign" });
        }
      }
    } catch (error) {
      console.error("Error occurred when deleting ", error);
      Toast({ type: "error", message: "Failed to delete campaign" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <GeneralModal
      title="Delete Page"
      subTitle=""
      width="400px"
      height="auto"
      handleClose={handleClose}
    >
      <p className="text">{`Are you sure you want to delete, ${campaign?.attributes.title}?`}</p>
      <div className="btns">
        <div className="btn-no" onClick={handleClose}>
          No
        </div>
        <button
          onClick={handleOnYesClick}
          className="btn-yes"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Yes"}
        </button>
      </div>
    </GeneralModal>
  );
};

export default DeleteCampaign;
