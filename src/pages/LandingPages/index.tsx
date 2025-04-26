import { GetAllPagesAPI } from "@/redux/features/PagesSlice/services";
import { MdOutlineEdit, MdPublishedWithChanges } from "react-icons/md";
import { formatDate, getTimeOfDay, truncateText } from "../../helpers";
import HeadingEffect from "../../components/TransitionEffects/Heading";
import DesignWebsiteOptions from "@/components/DesignWebsiteOptions";
import usePageMetadata from "../../components/UsePageMetadata";
import CustomPagination from "@/components/CustomPagination";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonSpinner from "@/components/ButtonSpiner";
import { IPages } from "@/redux/features/PagesSlice";
import { contentHTML } from "@/helpers/content.helper";
import { FaListOl, FaTrashAlt } from "react-icons/fa";
import CreateLandingPage from "./CreateLandingPage";
import DeleteLandingPage from "./DeleteLandingPage";
import { useAppSelector } from "../../redux/store";
import { memo, useEffect, useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi";
import { LandscapePlaceholder } from "@/assets";
import {
  dbOptions,
  IndexedDBCrud,
  IPageIndexedDB,
} from "@/helpers/indexedbd.helper";
import "./landingpages.scss";

const LandingPages = () => {
  const [openModal, setOpenModal] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const { admin: user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.landingPage);
  const [activeOrgId, setActiveOrgId] = useState<string>("");
  const { theme } = useAppSelector((state) => state.utils);
  const { pathname } = useLocation();
  let pageFromUrl = parseInt(pathname.split("/").pop() || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [meta, setMeta] = useState({ perPage: 16, total: 0 });
  const [pages, setPages] = useState<IPages[]>([]);
  const [yesDelete, setYesDelete] = useState<boolean>(false);
  const { edit: isEdit, create: isCreate, delete: isDelete } = openModal;
  const pageDB = new IndexedDBCrud<IPageIndexedDB>(dbOptions);
  const [page, setPage] = useState<IPages>();
  const [pageData, setPageData] = useState<IPageIndexedDB[]>([]);
  const getCardView = localStorage.getItem("cardView");
  const [cardView, setCardView] = useState<boolean>(
    getCardView !== null ? JSON.parse(getCardView) : true
  );
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();
  const totalPgs = Math.ceil(meta.total / meta.perPage);
  const [hasOnePage, setHasOnePage] = useState(totalPgs <= 1);
  const cacheKey = `pages-${currentPage}`;
  const cacheMetaKey = `meta-${currentPage}`;

  if (isNaN(pageFromUrl)) {
    pageFromUrl = 1;
    navigate("/pages/1");
  }

  usePageMetadata({
    title: "Landing Pages",
    description: "Create and mange landing pages by simply drag and drop",
  });

  useEffect(() => {
    navigate(`/pages/${currentPage}`);
  }, [currentPage, navigate]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleModal = (name: "create" | "delete" | "edit") => {
    setOpenModal((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleOnEdit = (page: IPages) => {
    setPage(page);
    setOpenModal((prevState) => ({ ...prevState, edit: true }));
    localStorage.setItem("initialized", "false");
    localStorage.setItem("pageName", page.pageName);
  };

  const handleOnDelete = (page: IPages) => {
    setPage(page);
    toggleModal("delete");
  };

  const handleOnClose = () => {
    setOpenModal((prevState) => ({ ...prevState, edit: false, create: false }));
  };

  const content = (pageId: string, userId: string) => {
    const page = pageData.find(
      (item) => item.pageId === pageId && item.userId === userId
    );

    if (!page) return "";
    const html = page.content?.html || "";
    const css = page.content?.css || "";
    const canvasData = page.canvasData;
    const content = contentHTML({
      html,
      css,
      canvasData,
      hideScrollbar: true,
      showScripts: true,
      showXtraStyle: true,
      hideLoader: true,
    });

    return content.trim();
  };

  const viewPage = async (pageId: string, userId: string) => {
    const page = pageData.find(
      (item) => item.pageId === pageId && item.userId === userId
    );

    if (!page) return;

    const html = page.content?.html || "";
    const css = page.content.css || "";
    const canvasData = page.canvasData;
    const newWindow = window.open("", "_blank");

    if (newWindow) {
      const content = contentHTML({
        html,
        css,
        showIcon: true,
        showScripts: true,
        showTailwindScript: true,
        canvasData,
      });
      newWindow.document.write(content);
      newWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this page!");
    }
  };

  const fetchPages = async () => {
    const cachedData = sessionStorage.getItem(cacheKey);
    const cachedMetaData = sessionStorage.getItem(cacheMetaKey);

    if (cachedData && cachedMetaData) {
      const parsedData = JSON.parse(cachedData);
      const parsedMetaData = JSON.parse(cachedMetaData);

      setPages(parsedData);
      setMeta({
        perPage: parsedMetaData.per_page,
        total: parsedMetaData.total,
      });
      return;
    }

    try {
      const resp = await GetAllPagesAPI(currentPage);
      if (!resp) return;

      const transformedPages = resp.data.map((page: any) => ({
        userId: page.attributes.userId,
        pageId: page.id,
        pageName: page.attributes.pageName,
        screenshot: page.attributes.screenshot,
        createdDate: page.attributes.createdDate,
        updatedDate: page.attributes.updatedDate,
      }));

      // Store fresh response in sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(transformedPages));
      sessionStorage.setItem(cacheMetaKey, JSON.stringify(resp.meta));

      setPages(transformedPages);
      setMeta({ perPage: resp.meta.per_page, total: resp.meta.total });
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [currentPage]);

  // This logic control the main div style height
  useEffect(() => {
    const totalPgs = Math.ceil(meta.total / meta.perPage);
    setHasOnePage(totalPgs <= 1);
  }, [meta.total, meta.perPage]);

  useEffect(() => {
    if (yesDelete) {
      fetchPages();

      // Check if we deleted the last item on the current page
      if (meta.total % meta.perPage === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      setYesDelete(false);
    }
  }, [yesDelete, meta.total]);

  useEffect(() => {
    const getPages = async () => {
      const pageData = await pageDB.getAll();
      setPageData(pageData);
    };

    getPages();

    localStorage.setItem("cardView", JSON.stringify(cardView));
  }, [cardView]);

  // Clear Cache and Fetch Data Afresh
  useEffect(() => {
    // If sessionStorage is empty, re-fetch Pages and Meta
    if (
      !sessionStorage.getItem(cacheKey) &&
      !sessionStorage.getItem(cacheMetaKey)
    ) {
      fetchPages();
    }

    const handleRefresh = () => {
      // Loop through sessionStorage and remove keys that start with "pages-" or "meta-"
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("pages-") || key.startsWith("meta-")) {
          sessionStorage.removeItem(key);
        }
      });
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, [location.pathname, currentPage]);

  return (
    <div className="LandingPage" data-theme={theme}>
      {activeOrgId !== "" && (
        <div className="overlay" onClick={() => setActiveOrgId("")} />
      )}

      {<DesignWebsiteOptions />}

      {isCreate || isEdit ? (
        <CreateLandingPage
          page={page}
          isEdit={isEdit}
          handleClose={handleOnClose}
        />
      ) : null}

      {isDelete && (
        <DeleteLandingPage
          page={page}
          handleClose={() => toggleModal("delete")}
          setYesDelete={setYesDelete}
        />
      )}

      <div
        className="LandingPage__main"
        style={{ height: `calc(100vh - ${hasOnePage ? 80 : 136}px)` }}
      >
        <div className="title">
          Good {timeOfDay} 👋
          <HeadingEffect>
            <h1>{user.name}</h1>
          </HeadingEffect>
        </div>

        <p className="manage">
          Create and manage landing pages by simply drag and drop
        </p>

        <div className="landingpage-count">
          <div className="orgCount">
            <h2>Landing Pages</h2>
            {meta && <span className="length">{meta.total}</span>}
          </div>
          <div className="btnContainer">
            <div className="create-new">
              <div onClick={() => toggleModal("create")} className="create">
                <p className="add_text">+</p>
                <p>Create New Page</p>
              </div>
            </div>
            <span>
              {cardView ? (
                <IoGridOutline
                  fontSize={24}
                  onClick={() => setCardView((prevState) => !prevState)}
                />
              ) : (
                <FaListOl
                  fontSize={24}
                  onClick={() => setCardView((prevState) => !prevState)}
                />
              )}
            </span>
          </div>
        </div>

        {isLoading && <ButtonSpinner />}

        {cardView ? (
          <ul className="gridContainer">
            {pages && pages.length === 0 && !isLoading ? (
              <h3 className="empty-text">No page created yet!</h3>
            ) : (
              pages?.map((data, idx) => (
                <li className="gridItem" key={idx}>
                  <div className="imgContainer">
                    <img
                      src={
                        data.screenshot
                          ? data?.screenshot?.src
                          : LandscapePlaceholder
                      }
                      alt={data.pageName}
                    />

                    <div className="btnContainer">
                      <button
                        className="btnView"
                        onClick={() => viewPage(data.pageId, data.userId)}
                      >
                        View
                      </button>
                      <button
                        className="btnView"
                        onClick={() => handleOnEdit(data)}
                      >
                        Edit
                      </button>
                      <button className="btnEdit">Publish</button>
                      <button
                        className="btnEdit"
                        onClick={() => handleOnDelete(data)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h4>{truncateText(data.pageName, 28)}</h4>
                  <p>Opened {formatDate(data.updatedDate)}</p>
                </li>
              ))
            )}
          </ul>
        ) : (
          <div className="table-container">
            {pages && pages.length === 0 && !isLoading ? (
              <h3 className="empty-text">No page created yet!</h3>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Page Name</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.pageName}</td>
                      <td>{formatDate(data.createdDate)}</td>
                      <td>{formatDate(data.updatedDate)}</td>
                      <td className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => viewPage(data.pageId, data.userId)}
                        >
                          <HiOutlineEye />{" "}
                          <span className="btn-text">View</span>
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handleOnEdit(data)}
                        >
                          <MdOutlineEdit />{" "}
                          <span className="btn-text">Edit</span>
                        </button>
                        <button className="edit-btn">
                          <MdPublishedWithChanges />{" "}
                          <span className="btn-text">Publish</span>
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleOnDelete(data)}
                        >
                          <FaTrashAlt />{" "}
                          <span className="btn-text">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <CustomPagination
        currentPage={currentPage}
        totalCount={meta.total || 0}
        pageSize={meta.perPage || 16}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(LandingPages);
