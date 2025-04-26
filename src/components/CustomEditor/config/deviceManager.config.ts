import { DeviceManagerConfig } from "grapesjs";

export const deviceManager: DeviceManagerConfig | undefined = {
  devices: [
    {
      id: "set-device-lg",
      name: "Desktop", // Device name
      width: "", // No media query for desktop (default device)
    },
    {
      id: "set-device-md",
      name: "Tablet", // Device name
      width: "768px", // Screen width for the tablet
    },
    {
      id: "set-device-sm",
      name: "Mobile", // Device name
      width: "375px", // Screen width for mobile
      widthMedia: "480px", // Optional, you can specify width for media query
    },
  ],
};
