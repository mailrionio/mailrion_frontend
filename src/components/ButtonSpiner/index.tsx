import styles from "./spinner.module.scss";

const ButtonSpinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinner__ring}></div>
    <div className={styles.spinner__ring__small}></div>
  </div>
);

export default ButtonSpinner;
