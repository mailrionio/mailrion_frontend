import { BuilderUpdData } from "@/redux/features/BuilderUploadSlice/services";
import { AssetManagerConfig } from "grapesjs";

export const assetManager = (
  assetsArr: BuilderUpdData[]
): AssetManagerConfig | undefined => {
  const opts = {
    upload: "https://api.mailrion.net/api/v1/builders/upload",
    uploadName: "upload",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("mailrionAdminToken")}`,
    },
    credentials: "omit" as RequestCredentials,
    autoAdd: true, // Automatically add the images to the canvas
    assets: [
      ...assetsArr.map((data) => ({ type: "image", src: data.src, name: data.name, id: data.id })),
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s",
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg",
        height: 350,
        width: 250,
        name: "Image 1",
      },
      {
        src: "https://cdn.pixabay.com/photo/2018/05/02/02/01/new-york-city-3367571_960_720.jpg",
        height: 350,
        width: 250,
        name: "Image 2",
      },
    ],
  };

  return opts;
};
