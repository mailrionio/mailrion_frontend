import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import PageHeader from "@/components/PageHeader";
import usePageMetadata from "@/components/UsePageMetadata";
import { truncateText } from "@/helpers";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import "./tutorials.scss";
interface vidProps {
  id: number;
  title: string;
  description: string;
  thumb: string;
  video: string;
}
const tutorialsData: vidProps[] = [
  {
    id: 1,
    title: "How to create a design content",
    description:
      "This is a tutorial on how to create a design content using React.",
    thumb:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    video: "https://www.youtube.com/embed/UV8y80Zyrmw?si=8XVb4ts_Pgj88FbW",
  },
  {
    id: 2,
    title: "Adding leads to your custom list",
    description:
      "This is a tutorial on how to add leads to your custom list using Vue.js.",
    thumb:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    video: "https://www.youtube.com/embed/_qRQgorg4LU?si=I3EFllw5RDHOYdwV",
  },
  {
    id: 3,
    title: "Configuring your MX records",
    description:
      "This is a tutorial on how to configure your MX records on mailrion domain",
    thumb:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",

    video: "https://www.youtube.com/embed/QZdkX4_9Fng?si=E9Klw2k5GVWxrPsZ",
  },
  {
    id: 4,
    description: "The first Blender Open Movie from 2006",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumb:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    id: 5,
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",

    thumb:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    title: "For Bigger Escape",
  },
];
const Tutorials = () => {
  usePageMetadata({
    title: "Tutorials",
    description:
      "Use our carefully crafted tutorials to learn how to use our products.",
  });
  const { theme } = useAppSelector((state) => state.utils);
  const [playViDetails, setPlayViDetails] = useState<vidProps>({} as vidProps);
  const [showPlayVidModal, setShowPlayVidModal] = useState(false);

  const detectVideoType = (url: string) => {
    if (url.match(/\.(mp4|webm|ogg|mov|avi)$/)) {
      return "video-link";
    } else return "unknown";
  };

  function PlayvideoModal() {
    return (
      <GeneralModal
        width="1000px"
        height="620px"
        title={playViDetails.title}
        subTitle={truncateText(playViDetails.description, 151)}
        handleClose={() => {
          setPlayViDetails({} as vidProps);
          setShowPlayVidModal(false);
        }}
      >
        {detectVideoType(playViDetails.video) === "video-link" ? (
          <video
            width="100%"
            height="100%"
            controls
            autoPlay
            src={playViDetails.video}
          />
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={playViDetails.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </GeneralModal>
    );
  }
  return (
    <div className="tutorials" data-theme={theme}>
      <PageHeader title="Tutorials" useBackArrow backLink={-1} />
      {showPlayVidModal && <PlayvideoModal />}
      <div className="tutorials__list">
        {tutorialsData.map((tutorial) => (
          <div className="tutorials__list__item" key={tutorial.id}>
            <h4>{tutorial.title}</h4>
            <div className="tutorial-img">
              <img src={tutorial.thumb} alt={tutorial.title} />
              <div className="desc-hover">
                <p>{tutorial.description}</p>
              </div>
            </div>
            <Button
              text="Play tutorial"
              fullWidth
              arrIcon
              onClick={() => {
                setPlayViDetails(tutorial);
                setShowPlayVidModal(true);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
