import { getFirstLetters } from "../../helpers";

interface Props {
  name: string;
  bgColor?: string;
  color?: string;
  className?: string;
  bgColorList?: string[];
}

const GenerateImage = ({
  name,
  bgColor,
  color,
  className,
  bgColorList,
}: Props) => {
  const styles = {
    image: {
      backgroundColor: bgColorList
        ? bgColorList[Math.floor(Math.random() * bgColorList.length)]
        : bgColor
        ? bgColor
        : "#D4B5AD",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.2rem",
      fontWeight: 600,
      color: color ? color : "#fff",
      border: "1px solid var(--border-color)",
    },
  };
  return (
    <div className={className} style={styles.image}>
      {getFirstLetters(name)}
    </div>
  );
};

export default GenerateImage;
