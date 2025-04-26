const logo = `
        <a
          data-gjs-highlightable="true"
          id="iucn"
          data-gjs-type="link"
          draggable="true"
          class="flex title-font cursor-pointer font-medium items-center text-gray-900 md:mb-0"
        >          
          <svg id="iia7" data-gjs-type="svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="40px" height="40px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fillRule:evenodd; clipRule:evenodd"
            viewBox="0 0 1491 2134"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
            <defs>
            <style type="text/css">
            <![CDATA[
                .fil0 {fill:#FB8500}
            ]]>
            </style>
            </defs>
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"/>
                <path class="fil0" d="M1148 1246c25,-6 28,3 44,12 -10,49 -34,99 -58,133 -45,-6 -102,-18 -136,-36l1 -52 149 -56zm-261 -382l76 32c45,10 22,-25 33,-57l-109 25zm82 930c-291,-75 -495,-314 -547,-586 -28,-141 -10,-216 -3,-352 -42,50 -80,233 -86,315 -10,121 11,239 52,339 75,184 225,329 373,421 50,-13 186,-109 212,-138zm-193 204c-44,23 -54,6 -96,-16 -387,-203 -678,-622 -507,-1068 41,-107 71,-126 97,-179 -87,40 -134,126 -164,156 -4,-280 -12,-319 238,-319 179,0 377,9 553,0l107 1 -55 155c31,19 75,51 105,64l0 85 167 113c6,5 23,18 27,21 17,17 14,26 -10,30l-53 1c16,17 37,28 57,44 -3,20 -10,40 -16,60 -9,31 -9,23 -44,35 -221,76 -192,103 -319,4 11,-25 67,-62 105,-107l-208 15 -86 -188c-33,187 29,346 119,446 74,82 248,167 414,165 32,-36 76,-171 89,-231 22,-103 20,-183 20,-290 0,-308 36,-358 -114,-357 -52,0 -105,0 -157,0 5,-22 11,-56 30,-66 77,0 191,-14 250,25 64,42 56,123 56,218 0,177 12,351 -29,521 -72,299 -310,527 -576,662zm121 -1491l-431 0c-21,-11 -28,-54 -36,-75 -22,-58 -81,-203 -91,-245 28,13 39,29 68,39l101 70 -35 67c66,89 231,139 232,23 0,-41 -32,-50 -49,-74 5,-16 73,-183 89,-202l85 202c-31,40 -52,31 -49,79 6,113 178,55 233,-28l-34 -67 168 -109c-12,50 -41,114 -60,164 -71,190 -25,156 -191,155zm-618 -419c-89,51 -27,153 9,247 14,38 38,91 47,130 -144,0 -207,3 -280,88 -70,80 -55,192 -55,315 0,265 -12,423 87,649 109,252 317,435 540,561 136,77 107,65 182,28 293,-142 553,-416 643,-729 52,-181 36,-410 36,-604 0,-123 -6,-174 -77,-242 -74,-71 -139,-66 -260,-66 13,-52 46,-127 66,-179 24,-63 64,-131 8,-184 -62,-59 -123,-3 -170,27 -41,27 -110,78 -151,98 -56,-67 -53,-225 -159,-227 -112,-2 -107,162 -164,227 -82,-38 -221,-186 -303,-139z"/>
            </g>
          </svg>
          <span
            id="iwx9"
            data-gjs-type="text"
            draggable="true"
            class="ml-2 text-xl"
          >
            MailRion
          </span>
        </a>
      `;

const hamburgMenu = `
    <button
      id="nav-toggle"
      data-gjs-highlightable="true"
      data-gjs-type="default"
      draggable="true"
      class="md:hidden cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            data-gjs-type="svg"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
      </button>
`;

const linksArr = [
  { id: "i1ceb", text: "First Link" },
  { id: "i2ceb", text: "Second Link" },
  { id: "i3ceb", text: "Third Link" },
  { id: "i4ceb", text: "Fourth Link" },
];

export const headerBlockContent1 = `<header
      data-gjs-highlightable="true"
      id="iwrt"
      draggable="true"
      class="text-gray-600 body-font"
    >
      <div
        data-gjs-highlightable="true"
        id="ixmf"
        draggable="true"
        class="container relative mx-auto flex justify-between p-5 md:flex-row items-center"
      >
        ${logo}
        ${hamburgMenu}

        <div id="nav-links" class="hidden md:flex flex-col md:flex-row w-full md:items-center justify-between gap-y-3 md:gap-y-0 py-2 md:p-0 absolute z-30 shadow-sm md:!shadow-none top-[6rem] left-0 md:static bg-white md:bg-transparent">
          <nav
            data-gjs-highlightable="true"
            draggable="true"
            class="flex-grow flex flex-col md:flex-row text-base justify-center md:gap-x-5 w-full md:w-auto"
          >  
            ${linksArr
              .map(
                ({ id, text }) => `
            <span
              id=${id}
              data-gjs-highlightable="true"
              draggable="true"
              class="px-5 py-2 md:!py-0 md:!px-0 hover:bg-gray-300 hover:md:bg-transparent hover:md:underline hover:md:underline-offset-[6px] hover:text-gray-900 cursor-pointer"
            >
              <a data-gjs-type="link" class="no-underline text-gray-600 hover:text-gray-900">
                ${text}
              </a>
            </span>`
              )
              .join("")}
          </nav>

          <div data-gjs-highlightable="true" draggable="true" class="px-5 md:!px-0 flex gap-x-2 my-2 md:my-0">
            <button
              id="ihtjx"
              data-gjs-type="button"
              draggable="true"
              type="button"
              autocomplete="off"
              class="items-center w-fit bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </header>`;

export const headerBlockContent2 = `<header
    data-gjs-highlightable="true"
    id="iwrv"
    draggable="true"
    class="text-gray-600 body-font"
  >
    <div
      data-gjs-highlightable="true"
      id="ixmg"
      draggable="true"
      class="container relative mx-auto flex justify-between p-5 md:flex-row items-center"
    >
      ${logo}
      ${hamburgMenu}

      <div id="nav-links" class="hidden md:flex flex-col md:flex-row md:items-center w-full md:w-auto gap-y-3 md:gap-y-0 absolute z-30 shadow-sm md:!shadow-none top-[6rem] left-0 md:static bg-white md:bg-transparent">
        <nav
          data-gjs-highlightable="true"
          draggable="true"
          class="flex flex-col md:flex-row text-base justify-center md:gap-x-5 w-full md:w-auto"
        >          
          ${linksArr
            .map(
              ({ id, text }) => `
                <span 
                  id=${id}
                  data-gjs-highlightable="true"
                  draggable="true"
                  class="px-5 py-2 md:!py-0 md:!px-0 hover:bg-gray-300 hover:md:bg-transparent hover:md:underline hover:md:underline-offset-[6px] hover:text-gray-900 cursor-pointer"
                >
                  <a data-gjs-type="link" class="no-underline text-gray-600 hover:text-gray-900">${text}</a>
                </span>`
            )
            .join("")}
        </nav>
      </div>
    </div>
  </header>`;

export const headerBlockContent3 = `<header
  data-gjs-highlightable="true"
  id="iwrt"
  draggable="true"
  class="text-gray-600 body-font"
>
  <div
    data-gjs-highlightable="true"
    id="ixmf"
    draggable="true"
    class="container relative mx-auto flex justify-between p-5 md:flex-row items-center"
  >
    ${logo}
    ${hamburgMenu}

    <div id="nav-links" class="hidden md:flex flex-col md:flex-row w-full md:w-auto md:items-center md:gap-x-5 gap-y-3 md:gap-y-0 py-2 md:p-0 absolute z-30 shadow-sm md:!shadow-none top-[6rem] left-0 md:static bg-white md:bg-transparent">
      <nav
        data-gjs-highlightable="true"
        draggable="true"
        class="flex flex-col md:flex-row text-base justify-center md:gap-x-5 w-full md:w-auto"
      >  
        ${linksArr
          .map(
            ({ id, text }) => `
        <span
          id=${id}
          data-gjs-highlightable="true"
          draggable="true"
          class="px-5 py-2 md:!py-0 md:!px-0 hover:bg-gray-300 hover:md:bg-transparent hover:md:underline hover:md:underline-offset-[6px] hover:text-gray-900 cursor-pointer"
        >
          <a data-gjs-type="link" class="no-underline text-gray-600 hover:text-gray-900">
            ${text}
          </a>
        </span>`
          )
          .join("")}
      </nav>

      <div data-gjs-highlightable="true" draggable="true" class="px-5 md:!px-0 flex gap-x-5 my-2 md:my-0">
        <button
          id="ihtjx"
          data-gjs-type="button"
          draggable="true"
          type="button"
          autocomplete="off"
          class="items-center w-fit bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</header>`;
