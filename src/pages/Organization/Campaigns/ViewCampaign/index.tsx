import ButtonSpinner from "@/components/ButtonSpiner";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { ICampaign } from "@/config";
import { GetCampaignAPI } from "@/redux/features/campaign/service";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import sentIcon from "../../../../assets/sent.svg";
import toggleArrow from "../../../../assets/toggleArr.svg";
import Button from "../../../../components/Button";
import GeneralModal from "../../../../components/GeneralModal";
import "./view-campaign.scss";

interface props {
  campaignID: string | number;
  handleClose: () => void;
  handleDeleteCampaign: () => void;
  deleteLoading: boolean;
}

const ViewCampaign = ({
  handleClose,
  campaignID,
  handleDeleteCampaign,
  deleteLoading,
}: props) => {
  const [toggleSubject, setToggleSubject] = useState<boolean>(false);
  const [toggleBody, setToggleBody] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<ICampaign>({
    created_on: "",
    id: "",
    subject: "",
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { admin } = useAppSelector((state) => state.user);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);
      const res = await GetCampaignAPI(campaignID);
      setCampaign(res as ICampaign);
      setIsLoading(false);
    };

    fetchCampaign();
  }, [campaignID]);

  return (
    <div className="view-campaign">
      <GeneralModal
        title={"Campaign details"}
        // subTitle={campaign?.title as string}
        width={"720px"}
        height={"620px"}
        handleClose={handleClose}
      >
        {confirmDel && (
          <DeleteConfirmation
            title="Delete the campaign"
            content="Are you sure you want to delete this campaign? This action is irreversible."
            width="400px"
            height="250px"
            isLoading={deleteLoading}
            handleClose={() => setConfirmDel(false)}
            actionBtnClick={handleDeleteCampaign}
          />
        )}
        {isLoading ? (
          <ButtonSpinner />
        ) : (
          <div className="view-campaign__content mt-4">
            <div className="view-campaign__content__header">
              <div className="left">
                {/* <div className="left__image">
                  <img src={dummy} alt="" />
                </div> */}
                <div className="left__items">
                  <h2>{campaign?.title}</h2>
                  {/* <div className="social-tag">
                    <FaFacebook />
                    <span>Facebook</span>
                  </div> */}
                  {/* <p className="date">
                    {dateWithTime(campaign.created_on as string)}
                  </p> */}
                </div>
              </div>
              {/* <div className="center">
              <p>Opens: 0 (100%)</p>
              <p>Clicked: 0 (100%)</p>
              <p>Bounced: 0 (100%)</p>
              <p>Reported: 0 (100%)</p>
              <p>Unsubscribed: 0 (100%)</p>
            </div> */}
            </div>
            <div className="filter-options">
              <div className="filter-elements">
                {/* <div className="filter-option">
                  <img src={editIcon} alt="" style={{ marginRight: "10px" }} />
                  Edit
                </div> */}
                <div
                  className="filter-option"
                  onClick={() => setConfirmDel(true)}
                >
                  Delete
                </div>
                <div className="filter-option">{admin.email}</div>
                <div className="filter-option">
                  <div className="sent">
                    <img src={sentIcon} alt="" />
                    Sent
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="recipients">
              <p>Send to:</p>
              <div className="recipients__list">
                <div className="recipient">test1</div>
                <div className="recipient">test2</div>
                <div className="recipient">test3</div>
              </div>
            </div> */}
            <div className="view-campaign__content__body">
              <div className={`subject ${toggleSubject ? "active" : ""}`}>
                <div className={`info`}>
                  <p>Subject</p>
                  <div className="color-hr"></div>
                  <img
                    src={toggleArrow}
                    alt=""
                    onClick={() => setToggleSubject(!toggleSubject)}
                  />
                </div>
                {toggleSubject && (
                  <p className="subject__text">{campaign.subject}</p>
                )}
              </div>
              <div className={`body ${toggleBody ? "active" : ""}`}>
                <div className={`info `}>
                  <p>Body:</p>
                  <div className="color-hr"></div>
                  <img
                    src={toggleArrow}
                    alt=""
                    onClick={() => setToggleBody(!toggleBody)}
                  />
                </div>
                {toggleBody && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: campaign.content as string,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="view-campaign__content__btn flex-items">
              <Button text="Close" className="outline" onClick={handleClose} />
              {/* <Button text="Delete" onClick={handleDeleteCampaign} /> */}
            </div>
          </div>
        )}
      </GeneralModal>
    </div>
  );
};

export default ViewCampaign;
