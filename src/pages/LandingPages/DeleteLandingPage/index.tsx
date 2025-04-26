import {
  DeletePageAPI,
  GetAllPagesAPI,
} from "@/redux/features/PagesSlice/services";
import {
  IPages,
} from "@/redux/features/PagesSlice";
import GeneralModal from "../../../components/GeneralModal";
import { useAppSelector, dispatch } from "@/redux/store";
import {
  IndexedDBCrud,
  IPageIndexedDB,
  dbOptions,
} from "@/helpers/indexedbd.helper";
import "./deleteLandingPage.scss";
import { FC } from "react";

interface props {
  handleClose: () => void;
  page: IPages | undefined;
  setYesDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteLandingPage: FC<props> = ({ handleClose, page, setYesDelete }) => {
  const { isLoadingDel } = useAppSelector(
    (state) => state.landingPage
  );

  const handleOnYesClick = async () => {
    try {
      if (page) {
        const { pageId } = page;

        await DeletePageAPI(pageId);

        // Initialize the class for `Page` type
        const pageDB = new IndexedDBCrud<IPageIndexedDB>(dbOptions);

        // Delete a page by key
        await pageDB.delete(`mlrPage-${pageId}`)

        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("pages-") || key.startsWith("meta-")) {
            sessionStorage.removeItem(key);
          }
        });

        handleClose();
        setYesDelete(true);
      }      
    } catch (error) {
      console.error("Error occurred when deleting ", error);
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
      <p className="text">{`Are you sure you want to delete, ${page?.pageName}?`}</p>
      <div className="btns-container">
        <button className="btn-no" onClick={handleClose}>
          No
        </button>
        <button
          onClick={handleOnYesClick}
          className="btn-yes"
          disabled={isLoadingDel}
        >
          {isLoadingDel ? "Deleting..." : "Yes"}
        </button>
      </div>
    </GeneralModal>
  );
};

export default DeleteLandingPage;
