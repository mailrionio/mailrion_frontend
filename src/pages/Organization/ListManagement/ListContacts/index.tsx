import ButtonSpinner from "@/components/ButtonSpiner";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";
import HeadingEffect from "@/components/TransitionEffects/Heading";
import { IContacts } from "@/config";
import { formatDateAndTime, searchData, sortData } from "@/helpers";
import {
  DeleteListContact,
  GetListContacts,
} from "@/redux/features/ListManagement/services";
import { setPageSearch } from "@/redux/features/utilSlice";
import { dispatch, useAppSelector } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import NoItemFound from "../../../../components/NoItemFound/index";
import "./list-contacts.scss";

const itemsPerPage = 20;
const ListContacts = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<IContacts[]>([]);
  const { theme, searchQuery } = useAppSelector((state) => state.utils);
  const { selectedLists } = useAppSelector((state) => state.listManagement);
  const [listContacts, setListContacts] = useState<IContacts[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDeleteList, setOpenDeleteList] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // pagination logic to be passed to the pagination component
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return listContacts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, listContacts]);

  useEffect(() => {
    dispatch(
      setPageSearch({
        content: selectedLists[0]?.title + " contacts",
        show: true,
      })
    );
  }, [selectedLists]);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    const selectedRows = selectAll ? [] : listContacts.slice();

    setSelectedRows(selectedRows);
  };

  const handleRowClick = (row: IContacts) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const fetchLists = async () => {
    setIsloading(true);
    const res = await GetListContacts(selectedLists[0].id as string);

    setListContacts(res || []);
    setIsloading(false);
  };
  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, id]);

  let deleteCount = 0;

  const handleDeleteList = async () => {
    setDeleteLoading(true);
    for (const list of selectedRows) {
      const res = await DeleteListContact(selectedLists[0].id, list.id);
      if (res?.status === 200 || res?.status === 201) deleteCount++;

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (deleteCount > 0) {
      setDeleteLoading(false);
      setOpenDeleteList(false);
      Toast({
        type: "success",
        message: `${deleteCount} list contacts deleted successfully`,
      });
      setSelectedRows([]);
      fetchLists();
    } else {
      setDeleteLoading(false);
      setOpenDeleteList(false);
      Toast({
        type: "error",
        message: `something went wrong, try again`,
      });
      setSelectedRows([]);
    }
  };

  // const RenderMoreOptions = ({ row }: props) => {
  //   return (
  //     <div
  //       className="more-options more-card"
  //       style={{
  //         right: "9.5rem",
  //       }}
  //     >
  //       <p>Delete</p>
  //     </div>
  //   );
  // };
  return (
    <div data-theme={theme} className="list-contacts">
      {openDeleteList && (
        <DeleteConfirmation
          title={"Delete list contact?"}
          content={"Are you sure you want to delete this list contact?"}
          subtitle="This can't be undone"
          handleClose={() => setOpenDeleteList(false)}
          actionBtnClick={handleDeleteList}
          isLoading={deleteLoading}
          width="400px"
          height="250px"
        />
      )}
      <div className="header space-between border-bottom">
        <HeadingEffect>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BsArrowLeft
              color="var(--secondary-color)"
              onClick={() => navigate(-1)}
              style={{
                fontSize: "20px",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            />
            <h2>{selectedLists[0].title.toUpperCase()} contacts</h2>
          </div>
        </HeadingEffect>
      </div>
      {selectedRows.length > 0 && (
        <div className="bulkselect">
          <strong>{`${selectedRows.length} File(s) Selected`}</strong>
          <div
            onClick={() => setOpenDeleteList(true)}
            className={`bulkselect_children`}
          >
            <p>Delete</p>
          </div>
        </div>
      )}
      <div className="list-data padding-round">
        <div className="lists">
          {" "}
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <>
              {listContacts.length > 0 ? (
                <table className="list-contacts-table">
                  <thead>
                    <tr>
                      <th
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                        />
                        List name
                      </th>
                      <th>User</th>
                      <th>User email</th>
                      <th>Created date</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {searchData(
                      sortData(
                        currentTableData,
                        (item) => new Date(item.created_date),
                        new Date()
                      ),
                      searchQuery,
                      "user"
                    ).map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                        style={{
                          backgroundColor: selectedRows.includes(item)
                            ? "red"
                            : "blue",
                        }}
                      >
                        <td
                          style={{
                            color: "#101828",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item)}
                            onChange={() => handleRowClick(item)}
                          />
                          {item.list_name}
                        </td>
                        <td>{item.user}</td>
                        <td>{item.email}</td>
                        <td>{formatDateAndTime(item.created_date).date}</td>
                        {/* <td>
                          <button className="action-btn">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.75 4.48486C13.2525 4.23736 10.74 4.10986 8.235 4.10986C6.75 4.10986 5.265 4.18486 3.78 4.33486L2.25 4.48486"
                                stroke="#dc143c"
                                strokeWidth="1.125"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
                                stroke="#dc143c"
                                strokeWidth="1.125"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.1375 6.85498L13.65 14.4075C13.5675 15.585 13.5 16.5 11.4075 16.5H6.59255C4.50005 16.5 4.43255 15.585 4.35005 14.4075L3.86255 6.85498"
                                stroke="#dc143c"
                                strokeWidth="1.125"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.7475 12.375H10.245"
                                stroke="#dc143c"
                                strokeWidth="1.125"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.125 9.375H10.875"
                                stroke="#dc143c"
                                strokeWidth="1.125"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoItemFound content="List contacts you add will appear here!" />
              )}
            </>
          )}
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={listContacts.length}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListContacts;
