import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import usePageMetadata from "@/components/UsePageMetadata";
import { useAppSelector } from "@/redux/store";
import "./resources.scss";
interface resProps {
  id: number;
  title: string;
  description: string;
  btnText: string;
}
const resourcesData: resProps[] = [
  {
    id: 1,
    title: "Frequently Asked Questions?",
    description:
      "We’ve curated a list of the most common questions we have answered",
    btnText: "Read answered questions",
  },
  {
    id: 2,
    title: "Video Tutorials",
    description:
      "We have a simple documented and free to access app video guides!",
    btnText: "View Video Tutorials",
  },
  {
    id: 3,
    title: "Email us",
    description:
      "Can’t find the answer? We are here to help. Get in touch with us.",
    btnText: "Email us",
  },
];
const Resources = () => {
  usePageMetadata({
    title: "Resources and support ",
    description:
      "Use our carefully crafted tutorials to learn how to use our products.",
  });
  const { theme } = useAppSelector((state) => state.utils);

  return (
    <div className="resources" data-theme={theme}>
      <PageHeader title="Resoruces and support" useBackArrow backLink={-1} />
      <div className="resources__list">
        {resourcesData.map((tutorial) => (
          <div className="resources__list__item" key={tutorial.id}>
            <h4>{tutorial.title}</h4>
            <p>{tutorial.description}</p>
            <Button text={tutorial.btnText} fullWidth arrIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
