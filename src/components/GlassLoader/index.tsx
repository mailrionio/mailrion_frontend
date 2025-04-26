import { useAppSelector } from "@/redux/store";
import ButtonSpinner from "../ButtonSpiner";
import "./loader.scss";

const GlassLoader = () => {
  const { globalLoader, theme } = useAppSelector((state) => state.utils);
  return (
    <div className="loader-container" data-theme={theme}>
      <div className="glass-loader">
        <ButtonSpinner />
        <p>{globalLoader?.message}</p>
      </div>
    </div>
  );
};

export default GlassLoader;
