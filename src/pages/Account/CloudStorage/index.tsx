import usePageMetadata from "@/components/UsePageMetadata";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllFiles from "./AllFiles";
import Sidebar from "./Sidebar";
import Trashed from "./Trashed";

const CloudStorage = () => {
  usePageMetadata({
    title: `Cloud Storage | Mailrion`,
    description: "Manage all your storage files here",
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const checkpoint = query.get("checkpoint");
  // const { id } = useParams<{ id: string }>();
  const topbarQuery = query.get("openSidebar");
  console.log(topbarQuery);

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(
    Boolean(topbarQuery)
  );
  console.log(toggleSidebar);

  const { adminToken } = useAppSelector((state) => state.user);
  const { theme } = useAppSelector((state) => state.utils);
  const navigate = useNavigate();

  useEffect(() => {
    if (topbarQuery !== null) {
      setToggleSidebar(true);
    }
  }, [topbarQuery]);

  const closeSidebar = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setToggleSidebar(false);
  };
  const componentToRender = () => {
    switch (checkpoint) {
      case "all-files":
        return <AllFiles />;
      case "trash":
        return <Trashed />;
      default:
        return <AllFiles />;
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/login");
    }
  }, [adminToken, navigate]);
  return (
    <div className="cloudStorage" data-theme={theme}>
      <Sidebar closeSidebar={closeSidebar} toggleSidebar={toggleSidebar}>
        <> {componentToRender()}</>
      </Sidebar>
    </div>
  );
};

export default CloudStorage;
