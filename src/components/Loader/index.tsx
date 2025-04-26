import style from "./loader.module.scss";
const PageLoader = () => (
  <div className={style.spinner}>
    <div className={style.spinner__ring}></div>
  </div>
);

export default PageLoader;
