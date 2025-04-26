import Routes from "./Routes";
import GlassLoader from "./components/GlassLoader";
import { useAppSelector } from "./redux/store";

const App = () => {
  const { globalLoader } = useAppSelector((state) => state.utils);

  return (
    <>
      {globalLoader.loading && <GlassLoader />}
      <Routes />
    </>
  );
};

export default App;
