import HeadingEffect from "../../../components/TransitionEffects/Heading";
import { GetListsAPI } from "@/redux/features/ListManagement/services";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import usePageMetadata from "../../../components/UsePageMetadata";
import CustomPagination from "@/components/CustomPagination";
import { Fragment, memo, useEffect, useState } from "react";
import { setPageSearch } from "@/redux/features/utilSlice";
import { dispatch, useAppSelector } from "@/redux/store";
import FilterOptions from "@/components/FilterOptions";
import ButtonSpinner from "@/components/ButtonSpiner";
import { formatDate, truncateText } from "@/helpers";
import { LandscapePlaceholder } from "@/assets";
import { stripQuotes } from "@/helpers/strip";
import DeleteCampaign from "./DeleteCampaign";
import alarm from "../../../assets/alarm.svg";
import {
  IViewCampaignData,
  IViewCampaigns,
  SaveCampaignAPI,
  ViewCampaignsAPI,
} from "@/redux/features/campaign/service";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import {
  IndexedDBCrud,
  ICampaignDB,
  dbCampaignOpts,
} from "@/helpers/indexedbd.helper";
import "./campaign.scss";

const Campaigns = () => {
  const { id } = useParams<{ id: string }>();
  const [campaigns, setCampaigns] = useState<IViewCampaigns>();
  const { searchQuery } = useAppSelector((state) => state.utils);
  const [loadCampaigns, setLoadCampaigns] = useState<boolean>(false);
  const { admin: user } = useAppSelector((state) => state.user);
  const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
  const {
    selectedOrganization: { id: orgID, primaryMember },
  } = useAppSelector((state) => state.organization);
  const [campaignData, setCampaignData] = useState<ICampaignDB[]>([]);
  const [campaign, setIsCampaign] = useState<IViewCampaignData>();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [yesDelete, setYesDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<IViewCampaigns["meta"]>({
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [],
    path: "",
    per_page: 16,
    to: 16,
    total: 0,
  });
  const totalPgs = Math.ceil(meta.total / meta.per_page);
  const [hasOnePage, setHasOnePage] = useState(totalPgs <= 1);
  const location = useLocation();

  // Utility function to parse query parameters
  const getQueryParams = (query: string) => {
    return query
      .substring(1)
      .split("&")
      .reduce((acc, param) => {
        const [key, value] = param.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  };

  // Parse the query parameters
  const queryParams = getQueryParams(location.search);

  // State initialization
  const [selectedOption, setSelectedOption] = useState(
    queryParams.filter || "all"
  );

  // Update URL when currentPage or selectedOption changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("filter", selectedOption.toLowerCase());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [currentPage, selectedOption, navigate, location.pathname]);

  usePageMetadata({
    title: "Campaigns | Mailrion",
    description: "Create and manage your campaigns here",
  });

  useEffect(() => {
    dispatch(setPageSearch({ content: "Campaigns", show: true }));
  }, []);

  const fetchCampaign = async (filterOption = "all") => {
    setLoadCampaigns(true);

    const cacheKey = `campaigns-${orgID}-${filterOption}-${currentPage}`;
    const cacheKeyData = {orgID, filterOption, currentPage};
    sessionStorage.setItem("cacheKeyData", `${cacheKeyData}`);
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCampaigns(parsedData);
      setMeta(parsedData.meta);
      setLoadCampaigns(false);
      return;
    }

    try {
      const resp = await ViewCampaignsAPI(orgID, currentPage);
      let filteredCampaigns = resp;

      if (filterOption !== "all") {
        filteredCampaigns = {
          ...resp,
          data: resp.data.filter(
            (campaign) => campaign.attributes.status === filterOption
          ),
        };
      }

      // Store fresh response in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(filteredCampaigns));

      setCampaigns(filteredCampaigns);
      setMeta(filteredCampaigns.meta);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoadCampaigns(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // This logic control the main div style height
  useEffect(() => {
    const totalPgs = Math.ceil(meta.total / meta.per_page);
    setHasOnePage(totalPgs <= 1);
  }, [meta.total, meta.per_page]);

  useEffect(() => {
    if (yesDelete) {
      fetchCampaign(selectedOption);

      // Check if we deleted the last item on the current page
      if (meta.total % meta.per_page === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      setYesDelete(false);
    }
  }, [yesDelete, meta.total, selectedOption]);

  const saveCampaign = async () => {
    try {
      setLoadingSave(true);
      const userId = primaryMember.id;
      const response = await fetch("/placeholder.png");
      const screenshot = await response.blob();
      const formData = new FormData();
      formData.append("name", "New Campaign");
      formData.append("subject", "Campaign Subject");
      formData.append("content", JSON.stringify(undefined));
      formData.append("lists", JSON.stringify([]));
      formData.append("exclude_lists", JSON.stringify([]));
      formData.append("sender_email", userId);
      formData.append("sender_name", userId);
      formData.append("organization_id", orgID);
      formData.append("email_builder", JSON.stringify(null));
      formData.append("campaign_id", "AAS");
      formData.append("screenshot", screenshot, "screenshot.png");

      const resp = await SaveCampaignAPI(formData);

      if (!resp || !resp.id) return;

      localStorage.setItem("editCampaign", "false");
      navigate(
        `/organization/${id}/new-campaign/${resp?.id}?page=${currentPage}`
      );
    } catch (error: any) {
      Toast({
        type: "error",
        message: "Failed to create campaign",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  const handleOnEdit = (data: IViewCampaignData) => {
    localStorage.setItem("editCampaign", "true");
    navigate(`/organization/${id}/new-campaign/${data.id}?page=${currentPage}`);
  };

  const handleOnDelete = (data: IViewCampaignData) => {
    setIsCampaign(data);
    setShowModal(true);
  };

  const fetchLists = async () => {
    setIsLoading(true);

    const cacheKey = `lists-${orgID}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setIsLoading(false);
      return;
    }

    try {
      await GetListsAPI(orgID as string);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCampaigns = async () => {
      const campaignData = await campaignDB.getAll();
      setCampaignData(campaignData);
    };

    getCampaigns();
    fetchLists();
  }, []);

  // Clear Cache and Fetch Data Afresh
  useEffect(() => {
    // If sessionStorage is empty, re-fetch campaigns and lists
    if (!sessionStorage.getItem(`campaigns-${orgID}-all-${currentPage}`)) {
      fetchCampaign("all");
    }

    if (!sessionStorage.getItem(`lists-${orgID}`)) {
      fetchLists();
    }

    const handleRefresh = () => {
      // Loop through sessionStorage and remove keys that start with "lists-" or "campaigns-"
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("lists-") || key.startsWith("campaigns-")) {
          sessionStorage.removeItem(key);
        }
      });
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, [location.pathname, orgID, currentPage]);

  return (
    <>
      <div
        style={{ height: `calc(100vh - ${hasOnePage ? 84 : 138}px)` }}
        className="campaigns-container"
      >
        {showModal && (
          <DeleteCampaign
            campaign={campaign}
            handleClose={() => setShowModal(false)}
            setYesDelete={setYesDelete}
          />
        )}
        <div className="title">
          <HeadingEffect>
            <h1>Campaigns</h1>
          </HeadingEffect>
        </div>
        <div className="space-between filters border-bottom">
          <FilterOptions
            options={["All", "Published", "Saved"]}
            activeOption={selectedOption}
            onOptionChange={(option) => {
              setSelectedOption(option.toLowerCase());
              fetchCampaign(option.toLowerCase());
            }}
          />
          <Button
            plusIcon
            disabled={loadingSave}
            className="link"
            text={loadingSave ? "Creating..." : "New campaign"}
            onClick={saveCampaign}
          />
        </div>
        <div className="campaigns-content flex-wrap">
          {loadCampaigns ? (
            <div className="loader">
              <ButtonSpinner />
            </div>
          ) : (
            <ul className="gridContainer">
              {campaigns?.data && campaigns.data.length === 0 ? (
                <h3 className="empty-text">No campaign created yet!</h3>
              ) : (
                campaigns?.data &&
                campaigns.data.map((data, idx) => {
                  let title = stripQuotes(data.attributes.title);
                  const newtxt = "New Campaign";
                  const txtId = data.id.slice(0, 5);
                  title = title === newtxt ? `${newtxt} ${txtId}` : title;
                  return (
                    <Fragment key={idx}>
                      {idx === 0 && (
                        <li className="gridItem">
                          <div className="blank">
                            <div className="icon">
                              <img src={alarm} alt="Alarm Icon" />
                            </div>
                          </div>
                          <div className="btn-container">
                            <Button
                              plusIcon
                              disabled={loadingSave}
                              className="link"
                              text={
                                loadingSave ? "Creating..." : "New campaign"
                              }
                              onClick={saveCampaign}
                            />
                          </div>
                        </li>
                      )}
                      <li className="gridItem" key={idx}>
                        <div className="imgContainer">
                          <img
                            src={
                              data?.attributes?.screenshot?.src ||
                              LandscapePlaceholder
                            }
                            alt={`Thumbnail`}
                          />
                          <div className="btnContainer">
                            <button
                              className="btnView"
                              onClick={() => handleOnEdit(data)}
                            >
                              Edit
                            </button>
                            <button
                              className="btnEdit"
                              onClick={() => handleOnDelete(data)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <h4>{truncateText(title || `Untitled${idx}`, 28)}</h4>
                        <p>Opened {formatDate(data.attributes.created_on)}</p>
                      </li>
                    </Fragment>
                  );
                })
              )}
            </ul>
          )}
        </div>
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalCount={meta?.total || 0}
        pageSize={meta?.per_page || 16}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default memo(Campaigns);
