import { CanvasConfig } from "grapesjs";

export const canvas = (isNewsLetter: boolean): CanvasConfig | undefined => {
  return {
    styles: [
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css",
      "/templates/Corporate/Artificial Intelligence/css/iframe.scroll.css",
      "/templates/assets/tailwind.css",
    ],
    scripts: [
      "https://code.jquery.com/jquery-3.4.1.slim.min.js",
      "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
      /*...(isNewsLetter
        ? [
            // AMP Email Project Bolerplate
            { async: true, src: "https://cdn.ampproject.org/v0.js" },
            // AMP Carousel
            {
              async: true,
              "custom-element": "amp-carousel",
              src: "https://cdn.ampproject.org/v0/amp-carousel-0.1.js",
            },
            // AMP Bind
            {
              async: true,
              "custom-template": "amp-bind",
              src: "https://cdn.ampproject.org/v0/amp-bind-0.1.js",
            },
            // AMP Accordion
            {
              async: true,
              "custom-element": "amp-accordion",
              src: "https://cdn.ampproject.org/v0/amp-accordion-0.1.js",
            },
            // AMP Image Lightbox
            {
              async: true,
              "custom-element": "amp-image-lightbox",
              src: "https://cdn.ampproject.org/v0/amp-image-lightbox-0.1.js",
            },
            // AMP List
            {
              async: true,
              "custom-element": "amp-list",
              src: "https://cdn.ampproject.org/v0/amp-list-0.1.js"
            },
            // AMP Mustache
            {
              async: true,
              "custom-template": "amp-mustache",
              src: "https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
            }
  
          ]
        : []),*/
    ],
    frameContent: "<!DOCTYPE html>",
    /* frameContent: isNewsLetter
      ? `<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>`
      : "<!DOCTYPE html>", */
  };
};
