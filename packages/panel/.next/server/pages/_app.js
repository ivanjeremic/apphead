"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Context),
  "b": () => (/* binding */ useAppContext)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "react-resize-detector"
const external_react_resize_detector_namespaceObject = require("react-resize-detector");
;// CONCATENATED MODULE: ./admin-panel/Context.jsx



const ContextProvider = /*#__PURE__*/ (0,external_react_.createContext)({});
function Context({ children  }) {
    const { width , height , ref  } = (0,external_react_resize_detector_namespaceObject.useResizeDetector)();
    return /*#__PURE__*/ jsx_runtime_.jsx(ContextProvider.Provider, {
        value: {
            width,
            height,
            ref
        },
        children: children
    });
};
const useAppContext = ()=>(0,external_react_.useContext)(ContextProvider)
;


/***/ }),

/***/ 4744:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DatabaseSelect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const people = [
    {
        id: 1,
        name: "Wade Cooper",
        avatar: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 2,
        name: "Arlene Mccoy",
        avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 3,
        name: "Devon Webb",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
        id: 4,
        name: "Tom Cook",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 5,
        name: "Tanya Fox",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 6,
        name: "Hellen Schmidt",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 7,
        name: "Caroline Schultz",
        avatar: "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 8,
        name: "Mason Heaney",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 9,
        name: "Claudie Smitham",
        avatar: "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 10,
        name: "Emil Schaefer",
        avatar: "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }, 
];
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function DatabaseSelect({ label  }) {
    const { 0: selected1 , 1: setSelected  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(people[3]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox, {
        value: selected1,
        onChange: setSelected,
        children: ({ open  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Label, {
                        className: "block text-sm font-medium text-gray-700",
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-1 relative mb-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Button, {
                                className: "relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus-ring-input sm:text-sm",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "flex items-center",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "ml-3 block truncate",
                                            children: selected1.name
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__.SelectorIcon, {
                                            className: "h-5 w-5 text-gray-400",
                                            "aria-hidden": "true"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition, {
                                show: open,
                                as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                                leave: "transition ease-in duration-100",
                                leaveFrom: "opacity-100",
                                leaveTo: "opacity-0",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Options, {
                                    className: "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",
                                    children: [
                                        people.map((person)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Option, {
                                                className: ({ active  })=>classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")
                                                ,
                                                value: person,
                                                children: ({ selected , active  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: person.avatar,
                                                                        alt: "",
                                                                        className: "flex-shrink-0 h-6 w-6 rounded-full"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate"),
                                                                        children: person.name
                                                                    })
                                                                ]
                                                            }),
                                                            selected ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4"),
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__.CheckIcon, {
                                                                    className: "h-5 w-5",
                                                                    "aria-hidden": "true"
                                                                })
                                                            }) : null
                                                        ]
                                                    })
                                            }, person.id)
                                        ),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: "s"
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Directory)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__);


const directory = {
    A: [
        {
            id: 1,
            name: "Leslie Abbott",
            role: "Co-Founder / CEO",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 2,
            name: "Hector Adams",
            role: "VP, Marketing",
            imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 3,
            name: "Blake Alexander",
            role: "Account Coordinator",
            imageUrl: "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 4,
            name: "Fabricio Andrews",
            role: "Senior Art Director",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    B: [
        {
            id: 5,
            name: "Angela Beaver",
            role: "Chief Strategy Officer",
            imageUrl: "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 6,
            name: "Yvette Blanchard",
            role: "Studio Artist",
            imageUrl: "https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 7,
            name: "Lawrence Brooks",
            role: "Content Specialist",
            imageUrl: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    C: [
        {
            id: 8,
            name: "Jeffrey Clark",
            role: "Senior Art Director",
            imageUrl: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 9,
            name: "Kathryn Cooper",
            role: "Associate Creative Director",
            imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    E: [
        {
            id: 10,
            name: "Alicia Edwards",
            role: "Junior Copywriter",
            imageUrl: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 11,
            name: "Benjamin Emerson",
            role: "Director, Print Operations",
            imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 12,
            name: "Jillian Erics",
            role: "Designer",
            imageUrl: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 13,
            name: "Chelsea Evans",
            role: "Human Resources Manager",
            imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    G: [
        {
            id: 14,
            name: "Michael Gillard",
            role: "Co-Founder / CTO",
            imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 15,
            name: "Dries Giuessepe",
            role: "Manager, Business Relations",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    M: [
        {
            id: 16,
            name: "Jenny Harrison",
            role: "Studio Artist",
            imageUrl: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 17,
            name: "Lindsay Hatley",
            role: "Front-end Developer",
            imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 18,
            name: "Anna Hill",
            role: "Partner, Creative",
            imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    S: [
        {
            id: 19,
            name: "Courtney Samuels",
            role: "Designer",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 20,
            name: "Tom Simpson",
            role: "Director, Product Development",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    T: [
        {
            id: 21,
            name: "Floyd Thompson",
            role: "Principal Designer",
            imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 22,
            name: "Leonard Timmons",
            role: "Senior Designer",
            imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 23,
            name: "Whitney Trudeau",
            role: "Copywriter",
            imageUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    W: [
        {
            id: 24,
            name: "Kristin Watson",
            role: "VP, Human Resources",
            imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 25,
            name: "Emily Wilson",
            role: "VP, User Experience",
            imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ],
    Y: [
        {
            id: 26,
            name: "Emma Young",
            role: "Senior Front-end Developer",
            imageUrl: "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }, 
    ]
};
function Directory() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-6 pt-6 pb-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "text-lg font-medium text-gray-900",
                        children: "Directory"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-sm text-gray-600",
                        children: "Search directory of 3,018 employees"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        className: "mt-6 flex space-x-4",
                        action: "#",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "search",
                                        className: "sr-only",
                                        children: "Search"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative rounded-md shadow-sm",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.SearchIcon, {
                                                    className: "h-5 w-5 text-gray-400",
                                                    "aria-hidden": "true"
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "search",
                                                name: "search",
                                                id: "search",
                                                className: "focus-ring-input block w-full pl-10 sm:text-sm border-gray-300 rounded-md",
                                                placeholder: "Search"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "submit",
                                className: "inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.FilterIcon, {
                                        className: "h-5 w-5 text-gray-400",
                                        "aria-hidden": "true"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "sr-only",
                                        children: "Search"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                className: "flex-1 min-h-0 overflow-y-auto",
                "aria-label": "Directory",
                children: Object.keys(directory).map((letter)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    children: letter
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                className: "relative z-0 divide-y divide-gray-200",
                                children: directory[letter].map((person)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "flex-shrink-0",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        className: "h-10 w-10 rounded-full",
                                                        src: person.imageUrl,
                                                        alt: ""
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        href: "#",
                                                        className: "focus:outline-none",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "absolute inset-0",
                                                                "aria-hidden": "true"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: person.name
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "text-sm text-gray-500 truncate",
                                                                children: person.role
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    }, person.id)
                                )
                            })
                        ]
                    }, letter)
                )
            })
        ]
    });
};


/***/ }),

/***/ 9560:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export default */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_3__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* This example requires Tailwind CSS v2.0+ */ 



const positions = [
    {
        id: 1,
        title: "Back End Developer",
        type: "Active",
        department: "JavaScript"
    },
    {
        id: 2,
        title: "Front End Developer",
        type: "Active",
        department: "JavaScript"
    },
    {
        id: 3,
        title: "User Interface Designer",
        type: "Active",
        department: "JavaScript"
    }, 
];
function FunctionsAside() {
    const { 0: enabled , 1: setEnabled  } = useState(false);
    return /*#__PURE__*/ _jsx("div", {
        className: "bg-white shadow overflow-hidden",
        children: /*#__PURE__*/ _jsx("ul", {
            className: "divide-y divide-gray-200",
            children: positions.map((position)=>/*#__PURE__*/ _jsx("li", {
                    children: /*#__PURE__*/ _jsx("a", {
                        href: "#",
                        className: "block hover:bg-gray-50",
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: "px-4 py-4 sm:px-6",
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className: "flex items-center justify-end"
                                }),
                                /*#__PURE__*/ _jsxs(Switch.Group, {
                                    as: "div",
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ _jsxs("span", {
                                            className: "flex-grow flex flex-col",
                                            children: [
                                                /*#__PURE__*/ _jsx(Switch.Label, {
                                                    as: "span",
                                                    className: "text-sm font-medium text-gray-900",
                                                    passive: true,
                                                    children: "Available to hire"
                                                }),
                                                /*#__PURE__*/ _jsx(Switch.Description, {
                                                    as: "span",
                                                    className: "text-sm text-gray-500",
                                                    children: "Nulla amet tempus sit"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx(Switch, {
                                            checked: enabled,
                                            onChange: setEnabled,
                                            className: classNames(enabled ? "bg-indigo-600" : "bg-gray-200", "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),
                                            children: /*#__PURE__*/ _jsx("span", {
                                                "aria-hidden": "true",
                                                className: classNames(enabled ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }, position.id)
            )
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_2__);



function GalleryAside() {
    const currentFile = {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        information: {
            "Uploaded by": "Marie Culver",
            Created: "June 8, 2020",
            "Last modified": "June 8, 2020",
            Dimensions: "4032 x 3024",
            Resolution: "72 x 72"
        },
        sharedWith: [
            {
                id: 1,
                name: "Aimee Douglas",
                imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
            },
            {
                id: 2,
                name: "Andrea McMillan",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }, 
        ]
    };
    return /*#__PURE__*/ _jsx("aside", {
        className: "hidden w-96 bg-white p-8 overflow-y-auto lg:block",
        children: /*#__PURE__*/ _jsxs("div", {
            className: "pb-16 space-y-6",
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden",
                            children: /*#__PURE__*/ _jsx("img", {
                                src: currentFile.source,
                                alt: "",
                                className: "object-cover"
                            })
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "mt-4 flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsxs("h2", {
                                            className: "text-lg font-medium text-gray-900",
                                            children: [
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "sr-only",
                                                    children: "Details for "
                                                }),
                                                currentFile.name
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className: "text-sm font-medium text-gray-500",
                                            children: currentFile.size
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs("button", {
                                    type: "button",
                                    className: "ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                                    children: [
                                        /*#__PURE__*/ _jsx(HeartIcon, {
                                            className: "h-6 w-6",
                                            "aria-hidden": "true"
                                        }),
                                        /*#__PURE__*/ _jsx("span", {
                                            className: "sr-only",
                                            children: "Favorite"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx("h3", {
                            className: "font-medium text-gray-900",
                            children: "Information"
                        }),
                        /*#__PURE__*/ _jsx("dl", {
                            className: "mt-2 border-t border-b border-gray-200 divide-y divide-gray-200",
                            children: Object.keys(currentFile.information).map((key)=>/*#__PURE__*/ _jsxs("div", {
                                    className: "py-3 flex justify-between text-sm font-medium",
                                    children: [
                                        /*#__PURE__*/ _jsx("dt", {
                                            className: "text-gray-500",
                                            children: key
                                        }),
                                        /*#__PURE__*/ _jsx("dd", {
                                            className: "text-gray-900",
                                            children: currentFile.information[key]
                                        })
                                    ]
                                }, key)
                            )
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx("h3", {
                            className: "font-medium text-gray-900",
                            children: "Description"
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "mt-2 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ _jsx("p", {
                                    className: "text-sm text-gray-500 italic",
                                    children: "Add a description to this image."
                                }),
                                /*#__PURE__*/ _jsxs("button", {
                                    type: "button",
                                    className: "bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                                    children: [
                                        /*#__PURE__*/ _jsx(PencilIcon, {
                                            className: "h-5 w-5",
                                            "aria-hidden": "true"
                                        }),
                                        /*#__PURE__*/ _jsx("span", {
                                            className: "sr-only",
                                            children: "Add description"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx("h3", {
                            className: "font-medium text-gray-900",
                            children: "Shared with"
                        }),
                        /*#__PURE__*/ _jsxs("ul", {
                            className: "mt-2 border-t border-b border-gray-200 divide-y divide-gray-200",
                            children: [
                                currentFile.sharedWith.map((person)=>/*#__PURE__*/ _jsxs("li", {
                                        className: "py-3 flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ _jsx("img", {
                                                        src: person.imageUrl,
                                                        alt: "",
                                                        className: "w-8 h-8 rounded-full"
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className: "ml-4 text-sm font-medium text-gray-900",
                                                        children: person.name
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("button", {
                                                type: "button",
                                                className: "ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                                                children: [
                                                    "Remove",
                                                    /*#__PURE__*/ _jsxs("span", {
                                                        className: "sr-only",
                                                        children: [
                                                            " ",
                                                            person.name
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, person.id)
                                ),
                                /*#__PURE__*/ _jsx("li", {
                                    className: "py-2 flex justify-between items-center",
                                    children: /*#__PURE__*/ _jsxs("button", {
                                        type: "button",
                                        className: "group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500",
                                        children: [
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400",
                                                children: /*#__PURE__*/ _jsx(PlusIconSolid, {
                                                    className: "h-5 w-5",
                                                    "aria-hidden": "true"
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500",
                                                children: "Share"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "flex",
                    children: [
                        /*#__PURE__*/ _jsx("button", {
                            type: "button",
                            className: "flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: "Download"
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            type: "button",
                            className: "flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: "Delete"
                        })
                    ]
                })
            ]
        })
    });
};


/***/ }),

/***/ 6916:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6577);
/* harmony import */ var _DatabaseSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4744);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Directory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6398);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_classNames__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5104);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9097);
/* harmony import */ var _hooks_useMainNavigation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(784);
/* harmony import */ var _hooks_useSecondaryNavigation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8170);
/* harmony import */ var _GalleryAside__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4554);
/* harmony import */ var _FunctionsAside__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9560);
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5223);
/* harmony import */ var _hooks_useWindowSize__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8299);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__, _DatabaseSelect__WEBPACK_IMPORTED_MODULE_5__, _FunctionsAside__WEBPACK_IMPORTED_MODULE_13__]);
([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__, _DatabaseSelect__WEBPACK_IMPORTED_MODULE_5__, _FunctionsAside__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const userNavigation = [
    {
        name: "Your profile",
        href: "#"
    },
    {
        name: "Sign out",
        href: "#"
    }, 
];
const team = [
    {
        name: "Leslie Alexander",
        handle: "lesliealexander",
        role: "Co-Founder / CEO",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        name: "Michael Foster",
        handle: "michaelfoster",
        role: "Co-Founder / CTO",
        imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        name: "Dries Vincent",
        handle: "driesvincent",
        role: "Manager, Business Relations",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        role: "Front-end Developer",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }, 
];
const user = {
    name: "Tom Cook",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
function Layout({ children , title , actions , aside  }) {
    const { pathname , query  } = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { width , height , ref  } = (0,_Context__WEBPACK_IMPORTED_MODULE_14__/* .useAppContext */ .b)();
    const size = (0,_hooks_useWindowSize__WEBPACK_IMPORTED_MODULE_15__/* .useWindowSize */ .i)();
    const { 0: sidebarOpen , 1: setSidebarOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: isExpanded , 1: setIsExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const navigation = (0,_hooks_useMainNavigation__WEBPACK_IMPORTED_MODULE_10__/* .useMainNavigation */ .z)(pathname, query.db);
    const secondaryNavigation = (0,_hooks_useSecondaryNavigation__WEBPACK_IMPORTED_MODULE_11__/* .useSecondaryNavigation */ .T)(pathname, query.db);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex overflow-hidden bg-white",
                style: {
                    height: size.height - 32 || 0
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Root, {
                        show: sidebarOpen,
                        as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
                            as: "div",
                            static: true,
                            className: "fixed inset-0 flex z-40 lg:hidden",
                            open: sidebarOpen,
                            onClose: setSidebarOpen,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Child, {
                                    as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                                    enter: "transition-opacity ease-linear duration-300",
                                    enterFrom: "opacity-0",
                                    enterTo: "opacity-100",
                                    leave: "transition-opacity ease-linear duration-300",
                                    leaveFrom: "opacity-100",
                                    leaveTo: "opacity-0",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Dialog.Overlay, {
                                        className: "fixed inset-0 bg-gray-600 bg-opacity-75"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Child, {
                                    as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                                    enter: "transition ease-in-out duration-300 transform",
                                    enterFrom: "-translate-x-full",
                                    enterTo: "translate-x-0",
                                    leave: "transition ease-in-out duration-300 transform",
                                    leaveFrom: "translate-x-0",
                                    leaveTo: "-translate-x-full",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition.Child, {
                                                as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                                                enter: "ease-in-out duration-300",
                                                enterFrom: "opacity-0",
                                                enterTo: "opacity-100",
                                                leave: "ease-in-out duration-300",
                                                leaveFrom: "opacity-100",
                                                leaveTo: "opacity-0",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "absolute top-0 right-0 -mr-12 pt-2",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
                                                        onClick: ()=>setSidebarOpen(false)
                                                        ,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "sr-only",
                                                                children: "Close sidebar"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__.XIcon, {
                                                                className: "h-6 w-6 text-white",
                                                                "aria-hidden": "true"
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "flex-shrink-0 flex items-center px-4",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            className: "h-8 w-auto",
                                                            src: "https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg",
                                                            alt: "Workflow"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                                        "aria-label": "Sidebar",
                                                        className: "mt-5",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "px-2 space-y-1",
                                                                children: navigation.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        href: item.href,
                                                                        className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-green-500 hover:text-gray-900", "group flex items-center px-2 py-2 text-base font-medium rounded-md"),
                                                                        "aria-current": item.current ? "page" : undefined,
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(item.icon, {
                                                                                className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-4 h-6 w-6"),
                                                                                "aria-hidden": "true"
                                                                            }),
                                                                            item.name
                                                                        ]
                                                                    }, item.name)
                                                                )
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                                className: "border-t border-gray-200 my-5",
                                                                "aria-hidden": "true"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "px-2 space-y-1",
                                                                children: secondaryNavigation.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        href: item.href,
                                                                        className: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(item.icon, {
                                                                                className: "text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6",
                                                                                "aria-hidden": "true"
                                                                            }),
                                                                            item.name
                                                                        ]
                                                                    }, item.name)
                                                                )
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "flex-shrink-0 flex border-t border-gray-200 p-4",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    href: "#",
                                                    className: "flex-shrink-0 group block",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    className: "inline-block h-10 w-10 rounded-full",
                                                                    src: user.imageUrl,
                                                                    alt: ""
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "ml-3",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: "text-base font-medium text-gray-700 group-hover:text-gray-900",
                                                                        children: user.name
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: "text-sm font-medium text-gray-500 group-hover:text-gray-700",
                                                                        children: "View profile"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "flex-shrink-0 w-14",
                                    "aria-hidden": "true"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "hidden lg:flex lg:flex-shrink-0",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(isExpanded ? "w-64" : " w-14", "flex flex-col transition-all ease-in-out duration-300"),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)("", "flex flex-col h-0 flex-1 border-r border-gray-200"),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 flex flex-col pt-5 pb-4 overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "h-[67px]",
                                                children: isExpanded ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                                    width: 300,
                                                    height: 67,
                                                    layout: "responsive",
                                                    src: "/logo.png",
                                                    alt: "DomeDB Logo"
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "flex justify-center",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                                        width: 40,
                                                        height: 40,
                                                        src: "/logo_sm.png",
                                                        alt: "DomeDB Logo"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                                className: "flex-1",
                                                "aria-label": "Sidebar",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "px-2 space-y-1 h-24",
                                                        children: isExpanded ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "text-gray-600 px-2 py-2 text-sm font-medium rounded-md",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DatabaseSelect__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                                label: "Projects"
                                                            })
                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_9__["default"], {
                                                                href: "#",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__.HomeIcon, {
                                                                            className: "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6",
                                                                            "aria-hidden": "true"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(!isExpanded ? "hidden" : ""),
                                                                            children: "DB"
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "px-2 space-y-1",
                                                        children: navigation.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_9__["default"], {
                                                                href: item.href,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(item.current ? "bg-[#EAEAEA] text-gray-900" : "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900", "group flex items-center px-2 py-2 text-sm font-medium rounded-md"),
                                                                    "aria-current": item.current ? "page" : undefined,
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(item.icon, {
                                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-3 flex-shrink-0 h-6 w-6"),
                                                                            "aria-hidden": "true"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(!isExpanded ? "hidden" : "whitespace-nowrap"),
                                                                            children: item.name
                                                                        })
                                                                    ]
                                                                })
                                                            }, item.name)
                                                        )
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                                        className: "border-t border-gray-200 my-5",
                                                        "aria-hidden": "true"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "flex-1 px-2 space-y-1",
                                                        children: secondaryNavigation.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_9__["default"], {
                                                                href: item.href,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(item.current ? "bg-[#EAEAEA] text-gray-900" : "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900", "group flex items-center px-2 py-2 text-sm font-medium rounded-md"),
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(item.icon, {
                                                                            className: "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6",
                                                                            "aria-hidden": "true"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(!isExpanded ? "hidden" : ""),
                                                                            children: item.name
                                                                        })
                                                                    ]
                                                                })
                                                            }, item.name)
                                                        )
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "flex-shrink-0 flex border-t border-gray-200 p-4 overflow-hidden",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "#",
                                            className: "flex-shrink-0 w-full group block",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                    className: "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__.HomeIcon, {
                                                            className: "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6",
                                                            "aria-hidden": "true"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(!isExpanded ? "hidden" : ""),
                                                            children: "DBs"
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        onClick: ()=>setIsExpanded(isExpanded ? false : true)
                        ,
                        className: "bg-gray-200 w-4 opacity-70 flex items-center justify-center hover:bg-gray-300 transition-all ease-in-out duration-75 cursor-pointer",
                        children: "<"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col min-w-0 flex-1 overflow-hidden border-l border-gray-200",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "lg:hidden",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                className: "h-8 w-auto",
                                                src: "https://tailwindui.com/img/logos/workflow-mark-pink-500.svg",
                                                alt: "Workflow"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                className: "-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600",
                                                onClick: ()=>setSidebarOpen(true)
                                                ,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "sr-only",
                                                        children: "Open sidebar"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__.MenuIcon, {
                                                        className: "h-6 w-6",
                                                        "aria-hidden": "true"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex-1 relative z-0 flex overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                                        ref: ref,
                                        className: "flex-1 relative z-0 focus:outline-none xl:order-last",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                                                className: "flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden",
                                                "aria-label": "Breadcrumb",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                    href: "#",
                                                    className: "inline-flex items-center space-x-3 text-sm font-medium text-gray-900",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__.ChevronLeftIcon, {
                                                            className: "-ml-2 h-5 w-5 text-gray-400",
                                                            "aria-hidden": "true"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            children: "Directory"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "border-b border-gray-200 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "mx-auto px-4 sm:px-6 lg:px-8",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "sm:flex sm:items-end sm:space-x-5",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                            className: "sm:hidden 2xl:block mt-6 min-w-0 flex-1",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                                                className: "text-2xl font-bold text-gray-900 truncate",
                                                                                children: title
                                                                            })
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                            className: "mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4",
                                                                            children: actions
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                                    className: "text-2xl font-bold text-gray-900 truncate",
                                                                    children: title
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1 h-16 flex justify-between px-4 sm:px-6 lg:px-8",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "flex-1 flex",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                                                    className: "w-full flex md:ml-0",
                                                                    action: "#",
                                                                    method: "GET",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                            htmlFor: "search-field",
                                                                            className: "sr-only",
                                                                            children: "Search all files"
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                            className: "relative w-full text-gray-400 focus-within:text-gray-600",
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                    className: "pointer-events-none absolute inset-y-0 left-0 flex items-center",
                                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_3__.SearchIcon, {
                                                                                        className: "flex-shrink-0 h-5 w-5",
                                                                                        "aria-hidden": "true"
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                                    name: "search-field",
                                                                                    id: "search-field",
                                                                                    className: "h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden",
                                                                                    placeholder: "Search",
                                                                                    type: "search"
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                                    name: "search-field",
                                                                                    id: "search-field",
                                                                                    className: "hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block",
                                                                                    placeholder: "Search all files",
                                                                                    type: "search"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Menu, {
                                                                        as: "div",
                                                                        className: "relative flex-shrink-0",
                                                                        children: ({ open  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                                                                                children: [
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Menu.Button, {
                                                                                            className: "bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                                                                                            children: [
                                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                                    className: "sr-only",
                                                                                                    children: "Open user menu"
                                                                                                }),
                                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                                                    className: "h-8 w-8 rounded-full",
                                                                                                    src: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
                                                                                                    alt: ""
                                                                                                })
                                                                                            ]
                                                                                        })
                                                                                    }),
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition, {
                                                                                        show: open,
                                                                                        as: react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                                                                                        enter: "transition ease-out duration-100",
                                                                                        enterFrom: "transform opacity-0 scale-95",
                                                                                        enterTo: "transform opacity-100 scale-100",
                                                                                        leave: "transition ease-in duration-75",
                                                                                        leaveFrom: "transform opacity-100 scale-100",
                                                                                        leaveTo: "transform opacity-0 scale-95",
                                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Menu.Items, {
                                                                                            static: true,
                                                                                            className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
                                                                                            children: userNavigation.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Menu.Item, {
                                                                                                    children: ({ active  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                            href: item.href,
                                                                                                            className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_16__/* .classNames */ .A)(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"),
                                                                                                            children: item.name
                                                                                                        })
                                                                                                }, item.name)
                                                                                            )
                                                                                        })
                                                                                    })
                                                                                ]
                                                                            })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                        type: "button",
                                                                        className: "flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_8__.PlusIcon, {
                                                                                className: "h-6 w-6",
                                                                                "aria-hidden": "true"
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: "sr-only",
                                                                                children: "Add file"
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mx-auto",
                                                    children: children
                                                })
                                            })
                                        ]
                                    }),
                                    aside && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("aside", {
                                        className: "hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200",
                                        children: aside
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "bg-black text-white flex items-center justify-end p-2",
                style: {
                    height: "32px"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: "version: 0.2"
                })
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8233:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ClusterActions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1143);
/* harmony import */ var _heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_classNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5104);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const user = {
    name: "Whitney Francis",
    email: "whitneyfrancis@example.com",
    imageUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const navigation = [
    {
        name: "Dashboard",
        href: "#",
        current: true
    },
    {
        name: "Jobs",
        href: "#",
        current: false
    },
    {
        name: "Applicants",
        href: "#",
        current: false
    },
    {
        name: "Company",
        href: "#",
        current: false
    }, 
];
const userNavigation = [
    {
        name: "Your Profile",
        href: "#"
    },
    {
        name: "Settings",
        href: "#"
    },
    {
        name: "Sign out",
        href: "#"
    }, 
];
const tabs = [
    {
        name: "Applied",
        href: "#",
        count: "2",
        current: false
    },
    {
        name: "Phone Screening",
        href: "#",
        count: "4",
        current: false
    },
    {
        name: "Interview",
        href: "#",
        count: "6",
        current: true
    },
    {
        name: "Offer",
        href: "#",
        current: false
    },
    {
        name: "Disqualified",
        href: "#",
        current: false
    }, 
];
const candidates = [
    {
        name: "Emily Selman",
        email: "emilyselman@example.com",
        imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        applied: "January 7, 2020",
        appliedDatetime: "2020-07-01T15:34:56",
        status: "Completed phone screening"
    }
];
const publishingOptions = [
    {
        name: "Published",
        description: "This job posting can be viewed by anyone who has the link.",
        current: true
    },
    {
        name: "Draft",
        description: "This job posting will no longer be publicly accessible.",
        current: false
    }, 
];
function ClusterActions() {
    const { 0: selected1 , 1: setSelected  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(publishingOptions[0]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "hidden sm:block",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.PencilIcon, {
                            className: "-ml-1 mr-2 h-5 w-5 text-gray-400",
                            "aria-hidden": "true"
                        }),
                        "Edit"
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "hidden sm:block ml-3",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.LinkIcon, {
                            className: "-ml-1 mr-2 h-5 w-5 text-gray-400",
                            "aria-hidden": "true"
                        }),
                        "View"
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "sm:ml-3 relative z-0",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox, {
                    value: selected1,
                    onChange: setSelected,
                    children: ({ open  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Label, {
                                    className: "sr-only",
                                    children: "Change published status"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "inline-flex shadow-sm rounded-md divide-x divide-purple-600",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.CheckIcon, {
                                                                className: "h-5 w-5",
                                                                "aria-hidden": "true"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "ml-2.5 text-sm font-medium",
                                                                children: selected1.name
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Button, {
                                                        className: "relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "sr-only",
                                                                children: "Change published status"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.ChevronDownIcon, {
                                                                className: "h-5 w-5 text-white",
                                                                "aria-hidden": "true"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Transition, {
                                            show: open,
                                            as: react__WEBPACK_IMPORTED_MODULE_3__.Fragment,
                                            leave: "transition ease-in duration-100",
                                            leaveFrom: "opacity-100",
                                            leaveTo: "opacity-0",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Options, {
                                                static: true,
                                                className: "origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0",
                                                children: publishingOptions.map((option)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Listbox.Option, {
                                                        className: ({ active  })=>(0,_utils_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(active ? "text-white bg-purple-500" : "text-gray-900", "cursor-default select-none relative p-4 text-sm")
                                                        ,
                                                        value: option,
                                                        children: ({ selected , active  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex justify-between",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                className: selected ? "font-semibold" : "font-normal",
                                                                                children: option.name
                                                                            }),
                                                                            selected ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                className: active ? "text-white" : "text-purple-500",
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_solid__WEBPACK_IMPORTED_MODULE_1__.CheckIcon, {
                                                                                    className: "h-5 w-5",
                                                                                    "aria-hidden": "true"
                                                                                })
                                                                            }) : null
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: (0,_utils_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(active ? "text-purple-200" : "text-gray-500", "mt-2"),
                                                                        children: option.description
                                                                    })
                                                                ]
                                                            })
                                                    }, option.name)
                                                )
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                })
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ useMainNavigation)
/* harmony export */ });
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__);

const useMainNavigation = (pathname, db)=>{
    const navigation = [
        {
            name: "Dashboard",
            href: "/domedb",
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.HomeIcon,
            current: pathname === "domedb"
        },
        {
            name: "Clusters",
            href: `/domedb/${db}/clusters`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.CalendarIcon,
            current: pathname.includes("clusters")
        },
        {
            name: "Users",
            href: `/domedb/${db}/users`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.UserGroupIcon,
            current: pathname.includes("users")
        },
        {
            name: "Media",
            href: `/domedb/${db}/media`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.SearchCircleIcon,
            current: pathname.includes("media")
        },
        {
            name: "Triggers",
            href: `/domedb/${db}/triggers`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.SpeakerphoneIcon,
            current: pathname.includes("triggers")
        },
        {
            name: "Functions",
            href: `/domedb/${db}/functions`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.MapIcon,
            current: pathname.includes("functions")
        },
        {
            name: "Web Hosting",
            href: `/domedb/${db}/web-hosting`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.MapIcon,
            current: pathname.includes("web-hosting")
        }, 
    ];
    return navigation;
};


/***/ }),

/***/ 8170:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ useSecondaryNavigation)
/* harmony export */ });
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8768);
/* harmony import */ var _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__);

const useSecondaryNavigation = (pathname, db)=>{
    const secondaryNavigation = [
        {
            name: "Plugins",
            href: `/domedb/${db}/plugins`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.ViewGridAddIcon,
            current: pathname.includes("plugins")
        },
        {
            name: "Settings",
            href: `/domedb/${db}/settings`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.CogIcon,
            current: pathname.includes("settings")
        },
        {
            name: "Documention",
            href: `#`,
            icon: _heroicons_react_outline__WEBPACK_IMPORTED_MODULE_0__.CogIcon,
            current: pathname.includes("#")
        }, 
    ];
    return secondaryNavigation;
};


/***/ }),

/***/ 8299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ useWindowSize)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const { 0: windowSize , 1: setWindowSize  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        width: undefined,
        height: undefined
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return ()=>window.removeEventListener("resize", handleResize)
        ;
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}


/***/ }),

/***/ 5104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ classNames)
/* harmony export */ });
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


/***/ }),

/***/ 8438:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_panel_components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6916);
/* harmony import */ var _admin_panel_Context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5223);
/* harmony import */ var _admin_panel_components_clusters_ClustersActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8233);
/* harmony import */ var _admin_panel_components_Directory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6398);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_admin_panel_components_Layout__WEBPACK_IMPORTED_MODULE_3__, _admin_panel_components_clusters_ClustersActions__WEBPACK_IMPORTED_MODULE_5__]);
([_admin_panel_components_Layout__WEBPACK_IMPORTED_MODULE_3__, _admin_panel_components_clusters_ClustersActions__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const useLayoutProps = (pathname)=>{
    if (pathname.includes("clustersdd")) {
        return {
            title: "Clusters",
            actions: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_admin_panel_components_clusters_ClustersActions__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
            aside: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_admin_panel_components_Directory__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
        };
    }
    if (pathname.includes("media")) {
        return {
            title: "Media"
        };
    }
    if (pathname.includes("users")) {
        return {
            title: "Users"
        };
    }
    return {};
};
function LayoutContainer({ children  }) {
    const { pathname  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const props = useLayoutProps(pathname);
    if (pathname === "/" || pathname === "/domedb") {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: children
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_admin_panel_components_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        ...props,
        children: children
    });
}
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_admin_panel_Context__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LayoutContainer, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8768:
/***/ ((module) => {

module.exports = require("@heroicons/react/outline");

/***/ }),

/***/ 1143:
/***/ ((module) => {

module.exports = require("@heroicons/react/solid");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = import("@headlessui/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [577,274,97], () => (__webpack_exec__(8438)));
module.exports = __webpack_exports__;

})();