import { Editor } from "grapesjs";

export const plugin1 = (editor: Editor, opts = {}) => {
  const labels = {
    block1: true,
    block2: true,
    block3: true,
  };

  const categories = {
    category1: "Header",
    category2: "category2",
    category3: "category2",
  };

  // This is our custom script (avoid using arrow functions)
  const script = function () {
    alert("Hi");
    // `this` is bound to the component element
    console.log("the element");
  };

  // Define a new custom component
  editor.Components.addType("comp-with-js", {
    model: {
      defaults: {
        script,
        // Add some style, just to make the component visible
        // style: {
        //   width: "100px",
        //   height: "100px",
        //   background: "red",
        // },
      },
    },
  });

  opts = { labels: labels, categories: categories };
  loadComponents(editor, opts);
};

const loadComponents = (
  editor: Editor,
  options: { labels?: any; categories?: any }
) => {
  const { labels, categories } = options;
  if (labels?.block1) {
    editor.BlockManager.add("my-first-block", {
      label: "Simple block",
      category: categories?.category1,
      content: {
        type: "comp-with-js",
        content: `
            <!--
  This example requires updating your template:

  <html class="h-full bg-gray-100">
  <body class="h-full">
-->
<div class="min-h-full">
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>

              <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>

              <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>

              <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>

              <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reports</a>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </button>
              </div>

              <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>

        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Reports</a>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">Tom Cook</div>
            <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
          </div>
          <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>

          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>

          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
        </div>
      </div>
    </div>
  </nav>

  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
    </div>
  </main>
</div>

            `,
      },
    });
  }

  if (labels?.block2) {
    editor.BlockManager.add("my-second-block", {
      label: "Simple block 2",
      category: categories?.category2,
      content: '<div class="my-block">This is a simple block 2</div>',
    });
  }

  if (labels.block3) {
    editor.BlockManager.add("my-third-block", {
      label: "Simple block 3",
      category: categories.categories2,
      content: {
        type: "comp-with-js",
        content: `
          <header class="site-header">
              <div class="container">
                  <div class="site-header-inner">
                      <div class="brand header-brand">
                              <h1 class="m-0">
                    <a href="#">
                      <img class="header-logo-image" src="dist/images/logo.svg" alt="Logo">
                                  </a>
                              </h1>
                      </div>
                  </div>
              </div>
          </header>
      `,
      },
    });
  }
};

let ty: any[] = [
  {
    property: "text-shadow-h",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "top",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "top",
    name: "Top",
    toRequire: true,
  },
  {
    property: "right",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "right",
    name: "Right",
    toRequire: true,
  },
  {
    property: "bottom",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "bottom",
    name: "Bottom",
    toRequire: true,
  },
  {
    property: "left",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "left",
    name: "Left",
    toRequire: true,
  },
  {
    property: "margin-top",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-right",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-bottom",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-left",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "padding-top",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-right",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-bottom",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-left",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    toRequire: true,
    name: "Width",
    id: "width",
  },
  {
    property: "min-width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Min Width",
    id: "min-width",
    toRequire: true,
  },
  {
    property: "max-width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Max Width",
    id: "max-width",
    toRequire: true,
  },
  {
    property: "height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    toRequire: true,
    name: "Height",
    id: "height",
  },
  {
    property: "min-height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Min Height",
    id: "min-height",
    toRequire: true,
  },
  {
    property: "max-height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Max Height",
    id: "max-height",
    toRequire: true,
  },
  {
    property: "flex-basis",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "font-size",
    type: "number",
    default: "medium",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: [
      "medium",
      "xx-small",
      "x-small",
      "small",
      "large",
      "x-large",
      "xx-large",
      "smaller",
      "larger",
      "length",
      "initial",
      "inherit",
    ],
    min: 0,
  },
  {
    property: "letter-spacing",
    type: "number",
    default: "normal",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["normal", "initial", "inherit"],
    name: "Letter Spacing",
    id: "letter-spacing",
    toRequire: true,
  },
  {
    property: "line-height",
    type: "number",
    default: "normal",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["normal", "initial", "inherit"],
    name: "Line Height",
    id: "line-height",
    toRequire: true,
  },
  {
    property: "text-shadow-v",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "text-shadow-blur",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-top-left-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-top-right-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-bottom-left-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-bottom-right-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-width",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "box-shadow-h",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "box-shadow-v",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "box-shadow-blur",
    type: "number",
    default: "5px",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "box-shadow-spread",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "transition-duration",
    type: "number",
    default: "2s",
    units: ["s", "ms"],
    min: 0,
  },
  {
    property: "perspective",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
    id: "perspective",
    name: "Perspective",
    toRequire: true,
  },
  {
    property: "order",
    type: "integer",
    default: "0",
    requiresParent: {
      display: ["flex"],
    },
    name: "order",
    defaults: "",
    toRequire: true,
  },
  {
    property: "flex-grow",
    type: "number",
    default: "0",
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "flex-shrink",
    type: "number",
    default: "1",
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "float",
    type: "radio",
    default: "none",
    options: [
      {
        id: "none",
      },
      {
        id: "left",
      },
      {
        id: "right",
      },
    ],
  },
  {
    property: "position",
    type: "radio",
    default: "static",
    options: [
      {
        id: "static",
      },
      {
        id: "relative",
      },
      {
        id: "absolute",
      },
      {
        id: "fixed",
      },
    ],
    name: "Position",
    id: "position",
    toRequire: true,
  },
  {
    property: "text-align",
    type: "radio",
    default: "left",
    options: [
      {
        id: "left",
      },
      {
        id: "center",
      },
      {
        id: "right",
      },
      {
        id: "justify",
      },
    ],
    defaults: "left",
    toRequire: true,
  },
  {
    property: "color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "text-shadow-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "border-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "box-shadow-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "background-color",
    type: "color",
    default: "none",
    full: true,
  },
  {
    property: "background-image",
    type: "file",
    functionName: "url",
    default: "none",
    full: true,
  },
  {
    property: "opacity",
    type: "slider",
    default: "1",
    min: 0,
    max: 1,
    step: 0.01,
    full: true,
    defaults: "",
    toRequire: true,
  },
  {
    property: "display",
    type: "select",
    default: "block",
    options: [
      {
        id: "block",
      },
      {
        id: "inline",
      },
      {
        id: "inline-block",
      },
      {
        id: "flex",
      },
      {
        id: "none",
      },
    ],
    name: "Display",
    id: "display",
    toRequire: true,
  },
  {
    property: "flex-direction",
    type: "select",
    default: "row",
    options: [
      {
        id: "row",
      },
      {
        id: "row-reverse",
      },
      {
        id: "column",
      },
      {
        id: "column-reverse",
      },
    ],
    requires: {
      display: ["flex"],
    },
    toRequire: true,
    id: "flex-direction",
    defaults: "row",
  },
  {
    property: "flex-wrap",
    type: "select",
    default: "nowrap",
    options: [
      {
        id: "nowrap",
      },
      {
        id: "wrap",
      },
      {
        id: "wrap-reverse",
      },
    ],
    requires: {
      display: ["flex"],
    },
  },
  {
    property: "justify-content",
    type: "select",
    default: "flex-start",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "space-between",
      },
      {
        id: "space-around",
      },
      {
        id: "space-evenly",
      },
    ],
    requires: {
      display: ["flex"],
    },
    name: "Justify-content",
    defaults: "flex-start",
    toRequire: true,
  },
  {
    property: "align-items",
    type: "select",
    default: "stretch",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "baseline",
      },
      {
        id: "stretch",
      },
    ],
    requires: {
      display: ["flex"],
    },
    name: "align-items",
    defaults: "center",
    toRequire: true,
  },
  {
    property: "align-content",
    type: "select",
    default: "stretch",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "space-between",
      },
      {
        id: "space-around",
      },
      {
        id: "stretch",
      },
    ],
    requires: {
      display: ["flex"],
    },
  },
  {
    property: "align-self",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "baseline",
      },
      {
        id: "stretch",
      },
    ],
    requiresParent: {
      display: ["flex"],
    },
    name: "align-self",
    defaults: "auto",
    toRequire: true,
  },
  {
    property: "font-family",
    type: "select",
    default: "Arial, Helvetica, sans-serif",
    options: [
      {
        id: "Arial, Helvetica, sans-serif",
        label: "Arial",
      },
      {
        id: "Arial Black, Gadget, sans-serif",
        label: "Arial Black",
      },
      {
        id: "Brush Script MT, sans-serif",
        label: "Brush Script MT",
      },
      {
        id: "Comic Sans MS, cursive, sans-serif",
        label: "Comic Sans MS",
      },
      {
        id: "Courier New, Courier, monospace",
        label: "Courier New",
      },
      {
        id: "Georgia, serif",
        label: "Georgia",
      },
      {
        id: "Helvetica, sans-serif",
        label: "Helvetica",
      },
      {
        id: "Impact, Charcoal, sans-serif",
        label: "Impact",
      },
      {
        id: "Lucida Sans Unicode, Lucida Grande, sans-serif",
        label: "Lucida Sans Unicode",
      },
      {
        id: "Tahoma, Geneva, sans-serif",
        label: "Tahoma",
      },
      {
        id: "Times New Roman, Times, serif",
        label: "Times New Roman",
      },
      {
        id: "Trebuchet MS, Helvetica, sans-serif",
        label: "Trebuchet MS",
      },
      {
        id: "Verdana, Geneva, sans-serif",
        label: "Verdana",
      },
    ],
  },
  {
    property: "font-weight",
    type: "select",
    default: "400",
    options: [
      {
        id: "100",
        label: "Thin",
      },
      {
        id: "200",
        label: "Extra-Light",
      },
      {
        id: "300",
        label: "Light",
      },
      {
        id: "400",
        label: "Normal",
      },
      {
        id: "500",
        label: "Medium",
      },
      {
        id: "600",
        label: "Semi-Bold",
      },
      {
        id: "700",
        label: "Bold",
      },
      {
        id: "800",
        label: "Extra-Bold",
      },
      {
        id: "900",
        label: "Ultra-Bold",
      },
    ],
    name: "Font Weight",
    id: "font-weight",
    toRequire: true,
  },
  {
    property: "border-style",
    type: "select",
    default: "solid",
    options: [
      {
        id: "none",
      },
      {
        id: "solid",
      },
      {
        id: "dotted",
      },
      {
        id: "dashed",
      },
      {
        id: "double",
      },
      {
        id: "groove",
      },
      {
        id: "ridge",
      },
      {
        id: "inset",
      },
      {
        id: "outset",
      },
    ],
  },
  {
    property: "box-shadow-type",
    type: "select",
    default: "",
    options: [
      {
        id: "",
        label: "Outside",
      },
      {
        id: "inset",
        label: "Inside",
      },
    ],
  },
  {
    property: "background-repeat",
    type: "select",
    default: "repeat",
    options: [
      {
        id: "repeat",
      },
      {
        id: "repeat-x",
      },
      {
        id: "repeat-y",
      },
      {
        id: "no-repeat",
      },
    ],
  },
  {
    property: "background-position",
    type: "select",
    default: "left top",
    options: [
      {
        id: "left top",
      },
      {
        id: "left center",
      },
      {
        id: "left bottom",
      },
      {
        id: "right top",
      },
      {
        id: "right center",
      },
      {
        id: "right bottom",
      },
      {
        id: "center top",
      },
      {
        id: "center center",
      },
      {
        id: "center bottom",
      },
    ],
  },
  {
    property: "background-attachment",
    type: "select",
    default: "scroll",
    options: [
      {
        id: "scroll",
      },
      {
        id: "fixed",
      },
      {
        id: "local",
      },
    ],
  },
  {
    property: "background-size",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "cover",
      },
      {
        id: "contain",
      },
    ],
  },
  {
    property: "transition-property",
    type: "select",
    default: "width",
    options: [
      {
        id: "all",
      },
      {
        id: "width",
      },
      {
        id: "height",
      },
      {
        id: "background-color",
      },
      {
        id: "transform",
      },
      {
        id: "box-shadow",
      },
      {
        id: "opacity",
      },
    ],
  },
  {
    property: "transition-timing-function",
    type: "select",
    default: "ease",
    options: [
      {
        id: "linear",
      },
      {
        id: "ease",
      },
      {
        id: "ease-in",
      },
      {
        id: "ease-out",
      },
      {
        id: "ease-in-out",
      },
    ],
  },
  {
    property: "cursor",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "pointer",
      },
      {
        id: "copy",
      },
      {
        id: "crosshair",
      },
      {
        id: "grab",
      },
      {
        id: "grabbing",
      },
      {
        id: "help",
      },
      {
        id: "move",
      },
      {
        id: "text",
      },
    ],
  },
  {
    property: "overflow",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
  {
    property: "overflow-x",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
  {
    property: "overflow-y",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
  {
    property: "margin",
    type: "composite",
    properties: [
      {
        property: "margin-top",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-top-sub",
      },
      {
        property: "margin-right",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-right-sub",
      },
      {
        property: "margin-bottom",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-bottom-sub",
      },
      {
        property: "margin-left",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-left-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "padding",
    type: "composite",
    properties: [
      {
        property: "padding-top",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-top-sub",
      },
      {
        property: "padding-right",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-right-sub",
      },
      {
        property: "padding-bottom",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-bottom-sub",
      },
      {
        property: "padding-left",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-left-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "border",
    type: "composite",
    properties: [
      {
        property: "border-width",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-width-sub",
      },
      {
        property: "border-style",
        type: "select",
        default: "solid",
        options: [
          {
            id: "none",
          },
          {
            id: "solid",
          },
          {
            id: "dotted",
          },
          {
            id: "dashed",
          },
          {
            id: "double",
          },
          {
            id: "groove",
          },
          {
            id: "ridge",
          },
          {
            id: "inset",
          },
          {
            id: "outset",
          },
        ],
        id: "border-style-sub",
      },
      {
        property: "border-color",
        type: "color",
        default: "black",
        full: true,
        id: "border-color-sub",
      },
    ],
  },
  {
    property: "border-radius",
    type: "composite",
    properties: [
      {
        property: "border-top-left-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-top-left-radius-sub",
      },
      {
        property: "border-top-right-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-top-right-radius-sub",
      },
      {
        property: "border-bottom-right-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-bottom-right-radius-sub",
      },
      {
        property: "border-bottom-left-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-bottom-left-radius-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "transition",
    type: "stack",
    properties: [
      {
        property: "transition-property",
        type: "select",
        default: "width",
        options: [
          {
            id: "all",
          },
          {
            id: "width",
          },
          {
            id: "height",
          },
          {
            id: "background-color",
          },
          {
            id: "transform",
          },
          {
            id: "box-shadow",
          },
          {
            id: "opacity",
          },
        ],
        id: "transition-property-sub",
      },
      {
        property: "transition-duration",
        type: "number",
        default: "2s",
        units: ["s", "ms"],
        min: 0,
        id: "transition-duration-sub",
      },
      {
        property: "transition-timing-function",
        type: "select",
        default: "ease",
        options: [
          {
            id: "linear",
          },
          {
            id: "ease",
          },
          {
            id: "ease-in",
          },
          {
            id: "ease-out",
          },
          {
            id: "ease-in-out",
          },
        ],
        id: "transition-timing-function-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "box-shadow",
    type: "stack",
    properties: [
      {
        property: "box-shadow-h",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-v",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-blur",
        type: "number",
        default: "5px",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
      },
      {
        property: "box-shadow-spread",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-color",
        type: "color",
        default: "black",
        full: true,
      },
      {
        property: "box-shadow-type",
        type: "select",
        default: "",
        options: [
          {
            id: "",
            label: "Outside",
          },
          {
            id: "inset",
            label: "Inside",
          },
        ],
      },
    ],
    preview: true,
    id: "box-shadow",
    toRequire: true,
  },
  {
    property: "text-shadow",
    type: "stack",
    properties: [
      {
        property: "text-shadow-h",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "text-shadow-v",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "text-shadow-blur",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
      },
      {
        property: "text-shadow-color",
        type: "color",
        default: "black",
        full: true,
      },
    ],
    preview: true,
    default: "none",
    toRequire: true,
  },
  {
    property: "background",
    type: "stack",
    properties: [
      {
        property: "background-image",
        type: "file",
        functionName: "url",
        default: "none",
        full: true,
        id: "background-image-sub",
      },
      {
        property: "background-repeat",
        type: "select",
        default: "repeat",
        options: [
          {
            id: "repeat",
          },
          {
            id: "repeat-x",
          },
          {
            id: "repeat-y",
          },
          {
            id: "no-repeat",
          },
        ],
        id: "background-repeat-sub",
      },
      {
        property: "background-position",
        type: "select",
        default: "left top",
        options: [
          {
            id: "left top",
          },
          {
            id: "left center",
          },
          {
            id: "left bottom",
          },
          {
            id: "right top",
          },
          {
            id: "right center",
          },
          {
            id: "right bottom",
          },
          {
            id: "center top",
          },
          {
            id: "center center",
          },
          {
            id: "center bottom",
          },
        ],
        id: "background-position-sub",
      },
      {
        property: "background-attachment",
        type: "select",
        default: "scroll",
        options: [
          {
            id: "scroll",
          },
          {
            id: "fixed",
          },
          {
            id: "local",
          },
        ],
        id: "background-attachment-sub",
      },
      {
        property: "background-size",
        type: "select",
        default: "auto",
        options: [
          {
            id: "auto",
          },
          {
            id: "cover",
          },
          {
            id: "contain",
          },
        ],
        id: "background-size-sub",
      },
    ],
    preview: true,
    detached: true,
    name: "Background",
    id: "background",
    toRequire: true,
  },
  {
    property: "transform",
    type: "stack",
    layerSeparator: " ",
    properties: [
      {
        property: "transform-type",
        name: "Type",
        type: "select",
        default: "rotateZ",
        full: true,
        options: [
          {
            id: "scaleX",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "scaleY",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "scaleZ",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "rotateX",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "rotateY",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "rotateZ",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "translateX",
            propValue: {
              units: ["px", "%", "em", "rem", "vh", "vw"],
              step: 1,
            },
          },
          {
            id: "translateY",
            propValue: {
              units: ["px", "%", "em", "rem", "vh", "vw"],
              step: 1,
            },
          },
        ],
      },
      {
        property: "transform-value",
        type: "number",
        default: "0",
        full: true,
      },
    ],
    id: "transform",
    toRequire: true,
  },
];

// let gety: string[] = []
// ty.map((v) => (gety.push(v.property)))
// console.log("GETY => ", gety);

// function classifyProperties(properties: any) {
//   const categories: { [key: string]: [] } = {
//     layout: [],
//     boxModel: [],
//     typography: [],
//     effects: [],
//     background: [],
//     transition: [],
//     other: []
//   };

//   properties.forEach((property: any) => {
//     const { property: propName } = property;

//     // Layout-related properties
//     if (["top", "right", "bottom", "left", "position", "display", "float"].includes(propName)) {
//       categories.layout.push(property);
//     }

//     // Box model-related properties (margin, padding, size)
//     else if (["margin", "padding", "margin-top", "margin-right", "margin-bottom", "margin-left",
//               "padding-top", "padding-right", "padding-bottom", "padding-left",
//               "width", "min-width", "max-width", "height", "min-height", "max-height",
//               "border-width", "border", "border-radius", "border-top-left-radius",
//               "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius"].includes(propName)) {
//       categories.boxModel.push(property);
//     }

//     // Typography-related properties
//     else if (["font-size", "font-family", "font-weight", "letter-spacing", "line-height",
//               "text-align", "color", "text-shadow-h", "text-shadow-v", "text-shadow-blur",
//               "text-shadow-color", "text-shadow"].includes(propName)) {
//       categories.typography.push(property);
//     }

//     // Background-related properties
//     else if (["background-color", "background-image", "background-repeat",
//               "background-position", "background-attachment", "background-size", "background"].includes(propName)) {
//       categories.background.push(property);
//     }

//     // Transition and animation-related properties
//     else if (["transition", "transition-duration", "transition-property",
//               "transition-timing-function", "transform", "perspective"].includes(propName)) {
//       categories.transition.push(property);
//     }

//     // Effects-related properties (box-shadow, text-shadow, etc.)
//     else if (["box-shadow", "box-shadow-h", "box-shadow-v", "box-shadow-blur",
//               "box-shadow-spread", "box-shadow-color", "box-shadow-type", "opacity"].includes(propName)) {
//       categories.effects.push(property);
//     }

//     // Flexbox and alignment properties
//     else if (["flex-direction", "flex-wrap", "justify-content", "align-items",
//               "align-content", "align-self", "order", "flex-grow", "flex-shrink", "flex-basis"].includes(propName)) {
//       categories.layout.push(property); // Flexbox properties added to layout
//     }

//     else {
//       categories.other.push(property);
//     }
//   });

//   // Convert to desired format
//   return Object.keys(categories).map((category) => ({
//     name: category,
//     properties: categories[category],
//   }));
// }

// const result = classifyProperties(ty);
// console.log("RESULT => ", result, "LEN = ", ty.length);
