import { useAppSelector } from "@/redux/store";

interface props {
  content: string;
}
const NoItemFound = ({ content }: props) => {
  const { theme } = useAppSelector((state) => state.utils);
  return (
    <div
      data-theme={theme}
      className="content-center"
      style={{ height: "50vh" }}
    >
      <h3 className="h3-style">{content}</h3>
    </div>
  );
};

export default NoItemFound;
