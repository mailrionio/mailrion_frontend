import HeadingEffect from "../../../components/TransitionEffects/Heading";
import { GetListsAPI } from "@/redux/features/ListManagement/services";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import usePageMetadata from "../../../components/UsePageMetadata";
import CustomPagination from "@/components/CustomPagination";
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react";
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

// Constants
const CACHE_PREFIX = {
  CAMPAIGNS: 'campaigns',
  LISTS: 'lists'
};

const ITEMS_PER_PAGE = 16;

const Campaigns = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const campaignDB = useMemo(() => new IndexedDBCrud<ICampaignDB>(dbCampaignOpts), []);

  // Redux state
  const { admin: user } = useAppSelector((state) => state.user);
  const {
    selectedOrganization: { id: orgID, primaryMember },
  } = useAppSelector((state) => state.organization);

  // Local state
  const [campaigns, setCampaigns] = useState<IViewCampaigns>();
  const [loadCampaigns, setLoadCampaigns] = useState<boolean>(false);
  const [campaignData, setCampaignData] = useState<ICampaignDB[]>([]);
  const [campaign, setIsCampaign] = useState<IViewCampaignData>();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [yesDelete, setYesDelete] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<IViewCampaigns["meta"]>({
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [],
    path: "",
    per_page: ITEMS_PER_PAGE,
    to: ITEMS_PER_PAGE,
    total: 0,
  });

  // Derived state
  const totalPgs = useMemo(() => Math.ceil(meta?.total / meta?.per_page), [meta?.total, meta?.per_page]);
  const hasOnePage = useMemo(() => totalPgs <= 1, [totalPgs]);

  // Parse query parameters
  const queryParams = useMemo(() => {
    return location.search
      .substring(1)
      .split("&")
      .reduce((acc, param) => {
        const [key, value] = param.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  }, [location.search]);

  const [selectedOption, setSelectedOption] = useState(queryParams.filter || "all");

  // Cache management
  const getCacheKey = useCallback((type: string, ...args: any[]) => {
    return `${type}-${args.join('-')}`;
  }, []);

  const clearCache = useCallback(() => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX.CAMPAIGNS) || key.startsWith(CACHE_PREFIX.LISTS)) {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  // Data fetching
  const fetchCampaign = useCallback(async (filterOption = "all") => {
    setLoadCampaigns(true);

    const cacheKey = getCacheKey(CACHE_PREFIX.CAMPAIGNS, orgID, filterOption, currentPage.toString());
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

      sessionStorage.setItem(cacheKey, JSON.stringify(filteredCampaigns));
      setCampaigns(filteredCampaigns);
      setMeta(filteredCampaigns.meta);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      Toast({
        type: "error",
        message: "Failed to fetch campaigns",
      });
    } finally {
      setLoadCampaigns(false);
    }
  }, [orgID, currentPage, getCacheKey]);

  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    const cacheKey = getCacheKey(CACHE_PREFIX.LISTS, orgID);
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setIsLoading(false);
      return;
    }

    try {
      await GetListsAPI(orgID);
      sessionStorage.setItem(cacheKey, 'true');
    } catch (error) {
      console.error("Error fetching lists:", error);
      Toast({
        type: "error",
        message: "Failed to fetch lists",
      });
    } finally {
      setIsLoading(false);
    }
  }, [orgID, getCacheKey]);

  // Event handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOptionChange = useCallback((option: string) => {
    const newOption = option.toLowerCase();
    setSelectedOption(newOption);
    fetchCampaign(newOption);
  }, [fetchCampaign]);

  const saveCampaign = useCallback(async () => {
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

      if (!resp?.id) {
        throw new Error("Failed to create campaign");
      }

      localStorage.setItem("editCampaign", "false");
      navigate(`/organization/${id}/new-campaign/${resp.id}?page=${currentPage}`);
    } catch (error) {
      Toast({
        type: "error",
        message: "Failed to create campaign",
      });
    } finally {
      setLoadingSave(false);
    }
  }, [primaryMember.id, orgID, id, currentPage, navigate]);

  const handleOnEdit = useCallback((data: IViewCampaignData) => {
    localStorage.setItem("editCampaign", "true");
    navigate(`/organization/${id}/new-campaign/${data.id}?page=${currentPage}`);
  }, [id, currentPage, navigate]);

  const handleOnDelete = useCallback((data: IViewCampaignData) => {
    setIsCampaign(data);
    setShowModal(true);
  }, []);

  // Effects
  useEffect(() => {
    dispatch(setPageSearch({ content: "Campaigns", show: true }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("filter", selectedOption.toLowerCase());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [currentPage, selectedOption, navigate, location.pathname]);

  useEffect(() => {
    fetchCampaign(selectedOption);
  }, [currentPage, selectedOption, fetchCampaign]);

  useEffect(() => {
    if (yesDelete) {
      fetchCampaign(selectedOption);
      if ((meta?.total % meta?.per_page) === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      setYesDelete(false);
    }
  }, [yesDelete, meta?.total, meta?.per_page, selectedOption, fetchCampaign, currentPage]);

  useEffect(() => {
    const getCampaigns = async () => {
      const campaignData = await campaignDB.getAll();
      setCampaignData(campaignData);
    };

    getCampaigns();
    fetchLists();
  }, [campaignDB, fetchLists]);

  useEffect(() => {
    if (!sessionStorage.getItem(getCacheKey(CACHE_PREFIX.CAMPAIGNS, orgID, 'all', currentPage.toString()))) {
      fetchCampaign("all");
    }

    if (!sessionStorage.getItem(getCacheKey(CACHE_PREFIX.LISTS, orgID))) {
      fetchLists();
    }

    window.addEventListener("beforeunload", clearCache);
    return () => window.removeEventListener("beforeunload", clearCache);
  }, [location.pathname, orgID, currentPage, fetchCampaign, fetchLists, getCacheKey, clearCache]);

  usePageMetadata({
    title: "Campaigns | Mailrion",
    description: "Create and manage your campaigns here",
  });

  // Render helpers
  const renderCampaignGrid = useCallback(() => {
    if (loadCampaigns) {
      return (
        <div className="loader">
          <ButtonSpinner />
        </div>
      );
    }

    if (!campaigns?.data || campaigns.data.length === 0) {
      return <h3 className="empty-text">No campaign created yet!</h3>;
    }

    return (
      <ul className="gridContainer">
        {campaigns.data.map((data, idx) => {
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
                      text={loadingSave ? "Creating..." : "New campaign"}
                      onClick={saveCampaign}
                    />
                  </div>
                </li>
              )}
              <li className="gridItem">
                <div className="imgContainer">
                  <img
                    src={data?.attributes?.screenshot?.src || LandscapePlaceholder}
                    alt="Thumbnail"
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
        })}
      </ul>
    );
  }, [campaigns, loadCampaigns, loadingSave, saveCampaign, handleOnEdit, handleOnDelete]);

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
            onOptionChange={handleOptionChange}
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
          {renderCampaignGrid()}
        </div>
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalCount={meta?.total || 0}
        pageSize={meta?.per_page || ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default memo(Campaigns);
