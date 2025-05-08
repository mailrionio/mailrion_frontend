import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { IoGridOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi";
import { LandscapePlaceholder } from "@/assets";
import {
  dbOptions,
  IndexedDBCrud,
  IPageIndexedDB,
} from "@/helpers/indexedbd.helper";
import "./landingpages.scss";

// Types
interface ModalState {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface PageMeta {
  perPage: number;
  total: number;
}

// Constants
const ITEMS_PER_PAGE = 16;
const CACHE_PREFIX = {
  PAGES: 'pages-',
  META: 'meta-'
};

// Memoized Components
const PageCard = memo(({ data, onView, onEdit, onDelete }: {
  data: IPages;
  onView: (pageId: string, userId: string) => void;
  onEdit: (page: IPages) => void;
  onDelete: (page: IPages) => void;
}) => (
  <li className="gridItem">
    <div className="imgContainer">
      <img
        src={data.screenshot?.src || LandscapePlaceholder}
        alt={data.pageName}
      />
      <div className="btnContainer">
        <button className="btnView" onClick={() => onView(data.pageId, data.userId)}>
          View
        </button>
        <button className="btnView" onClick={() => onEdit(data)}>
          Edit
        </button>
        <button className="btnEdit">Publish</button>
        <button className="btnEdit" onClick={() => onDelete(data)}>
          Delete
        </button>
      </div>
    </div>
    <h4>{truncateText(data.pageName, 28)}</h4>
    <p>Opened {formatDate(data.updatedDate)}</p>
  </li>
));

const PageTable = memo(({ pages, onView, onEdit, onDelete }: {
  pages: IPages[];
  onView: (pageId: string, userId: string) => void;
  onEdit: (page: IPages) => void;
  onDelete: (page: IPages) => void;
}) => (
  <div className="table-container">
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
          <tr key={data.pageId}>
            <td>{index + 1}</td>
            <td>{data.pageName}</td>
            <td>{formatDate(data.createdDate)}</td>
            <td>{formatDate(data.updatedDate)}</td>
            <td className="action-buttons">
              <button className="view-btn" onClick={() => onView(data.pageId, data.userId)}>
                <HiOutlineEye /> <span className="btn-text">View</span>
              </button>
              <button className="edit-btn" onClick={() => onEdit(data)}>
                <MdOutlineEdit /> <span className="btn-text">Edit</span>
              </button>
              <button className="edit-btn">
                <MdPublishedWithChanges /> <span className="btn-text">Publish</span>
              </button>
              <button className="delete-btn" onClick={() => onDelete(data)}>
                <FaTrashAlt /> <span className="btn-text">Delete</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

const LandingPages = () => {
  // State
  const [openModal, setOpenModal] = useState<ModalState>({
    create: false,
    edit: false,
    delete: false,
  });
  const [activeOrgId, setActiveOrgId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<PageMeta>({ perPage: ITEMS_PER_PAGE, total: 0 });
  const [pages, setPages] = useState<IPages[]>([]);
  const [yesDelete, setYesDelete] = useState<boolean>(false);
  const [page, setPage] = useState<IPages>();
  const [pageData, setPageData] = useState<IPageIndexedDB[]>([]);
  const [cardView, setCardView] = useState<boolean>(() => {
    const saved = localStorage.getItem("cardView");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Hooks
  const { admin: user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.landingPage);
  const { theme } = useAppSelector((state) => state.utils);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageDB = useMemo(() => new IndexedDBCrud<IPageIndexedDB>(dbOptions), []);

  // Derived state
  const { edit: isEdit, create: isCreate, delete: isDelete } = openModal;
  const timeOfDay = useMemo(() => getTimeOfDay(), []);
  const totalPgs = useMemo(() => Math.ceil(meta.total / meta.perPage), [meta.total, meta.perPage]);
  const hasOnePage = useMemo(() => totalPgs <= 1, [totalPgs]);
  const cacheKey = useMemo(() => `${CACHE_PREFIX.PAGES}${currentPage}`, [currentPage]);
  const cacheMetaKey = useMemo(() => `${CACHE_PREFIX.META}${currentPage}`, [currentPage]);

  // Page metadata
  usePageMetadata({
    title: "Landing Pages",
    description: "Create and mange landing pages by simply drag and drop",
  });

  // Handlers
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/pages/${newPage}`);
  }, [navigate]);

  const toggleModal = useCallback((name: keyof ModalState) => {
    setOpenModal(prev => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const handleOnEdit = useCallback((page: IPages) => {
    setPage(page);
    setOpenModal(prev => ({ ...prev, edit: true }));
    localStorage.setItem("initialized", "false");
    localStorage.setItem("pageName", page.pageName);
  }, []);

  const handleOnDelete = useCallback((page: IPages) => {
    setPage(page);
    toggleModal("delete");
  }, [toggleModal]);

  const handleOnClose = useCallback(() => {
    setOpenModal(prev => ({ ...prev, edit: false, create: false }));
  }, []);

  const viewPage = useCallback(async (pageId: string, userId: string) => {
    const page = pageData.find(item => item.pageId === pageId && item.userId === userId);
    if (!page) return;

    const content = contentHTML({
      html: page.content?.html || "",
      css: page.content?.css || "",
      showIcon: true,
      showScripts: true,
      showTailwindScript: true,
      canvasData: page.canvasData,
    });

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(content);
      newWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this page!");
    }
  }, [pageData]);

  // Data fetching
  const fetchPages = useCallback(async () => {
    const cachedData = sessionStorage.getItem(cacheKey);
    const cachedMetaData = sessionStorage.getItem(cacheMetaKey);

    if (cachedData && cachedMetaData) {
      setPages(JSON.parse(cachedData));
      setMeta(JSON.parse(cachedMetaData));
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

      sessionStorage.setItem(cacheKey, JSON.stringify(transformedPages));
      sessionStorage.setItem(cacheMetaKey, JSON.stringify(resp.meta));

      setPages(transformedPages);
      setMeta({ perPage: resp.meta.per_page, total: resp.meta.total });
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  }, [currentPage, cacheKey, cacheMetaKey]);

  // Effects
  useEffect(() => {
    const pageFromUrl = parseInt(pathname.split("/").pop() || "1", 10);
    if (isNaN(pageFromUrl)) {
      navigate("/pages/1");
    } else {
      setCurrentPage(pageFromUrl);
    }
  }, [pathname, navigate]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (yesDelete) {
      fetchPages();
      if (meta.total % meta.perPage === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
      setYesDelete(false);
    }
  }, [yesDelete, meta.total, meta.perPage, currentPage, fetchPages]);

  useEffect(() => {
    const getPages = async () => {
      const pageData = await pageDB.getAll();
      setPageData(pageData);
    };
    getPages();
  }, [pageDB]);

  useEffect(() => {
    localStorage.setItem("cardView", JSON.stringify(cardView));
  }, [cardView]);

  useEffect(() => {
    const handleRefresh = () => {
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX.PAGES) || key.startsWith(CACHE_PREFIX.META)) {
          sessionStorage.removeItem(key);
        }
      });
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, []);

  return (
    <div className="LandingPage" data-theme={theme}>
      {activeOrgId !== "" && (
        <div className="overlay" onClick={() => setActiveOrgId("")} />
      )}

      <DesignWebsiteOptions />

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
                  onClick={() => setCardView(prev => !prev)}
                />
              ) : (
                <FaListOl
                  fontSize={24}
                  onClick={() => setCardView(prev => !prev)}
                />
              )}
            </span>
          </div>
        </div>

        {isLoading && <ButtonSpinner />}

        {cardView ? (
          <ul className="gridContainer">
            {pages.length === 0 && !isLoading ? (
              <h3 className="empty-text">No page created yet!</h3>
            ) : (
              pages.map(data => (
                <PageCard
                  key={data.pageId}
                  data={data}
                  onView={viewPage}
                  onEdit={handleOnEdit}
                  onDelete={handleOnDelete}
                />
              ))
            )}
          </ul>
        ) : (
          <PageTable
            pages={pages}
            onView={viewPage}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          />
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
