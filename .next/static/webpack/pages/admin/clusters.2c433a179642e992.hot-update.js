"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/admin/clusters",{

/***/ "./components/AddClusterBox.jsx":
/*!**************************************!*\
  !*** ./components/AddClusterBox.jsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AddClusterBox; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction AddClusterBox() {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        type: \"button\",\n        className: \"relative block w-full h-screen border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                className: \"mx-auto h-12 w-12 text-gray-400\",\n                xmlns: \"http://www.w3.org/2000/svg\",\n                stroke: \"currentColor\",\n                fill: \"none\",\n                viewBox: \"0 0 48 48\",\n                \"aria-hidden\": \"true\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                    strokeLinecap: \"round\",\n                    strokeLinejoin: \"round\",\n                    strokeWidth: 2,\n                    d: \"M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6\"\n                }, void 0, false, {\n                    fileName: \"/home/ivje/domedb/components/AddClusterBox.jsx\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/ivje/domedb/components/AddClusterBox.jsx\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"mt-2 block text-sm font-medium text-gray-900\",\n                children: \"Create a new cluster\"\n            }, void 0, false, {\n                fileName: \"/home/ivje/domedb/components/AddClusterBox.jsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/ivje/domedb/components/AddClusterBox.jsx\",\n        lineNumber: 3,\n        columnNumber: 5\n    }, this));\n};\n_c = AddClusterBox;\nvar _c;\n$RefreshReg$(_c, \"AddClusterBox\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0FkZENsdXN0ZXJCb3guanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBZSxRQUFRLENBQUNBLGFBQWEsR0FBRyxDQUFDO0lBQ3ZDLE1BQU0sNkVBQ0hDLENBQU07UUFDTEMsSUFBSSxFQUFDLENBQVE7UUFDYkMsU0FBUyxFQUFDLENBQW1NOzt3RkFFNU1DLENBQUc7Z0JBQ0ZELFNBQVMsRUFBQyxDQUFpQztnQkFDM0NFLEtBQUssRUFBQyxDQUE0QjtnQkFDbENDLE1BQU0sRUFBQyxDQUFjO2dCQUNyQkMsSUFBSSxFQUFDLENBQU07Z0JBQ1hDLE9BQU8sRUFBQyxDQUFXO2dCQUNuQkMsQ0FBVyxjQUFDLENBQU07c0dBRWpCQyxDQUFJO29CQUNIQyxhQUFhLEVBQUMsQ0FBTztvQkFDckJDLGNBQWMsRUFBQyxDQUFPO29CQUN0QkMsV0FBVyxFQUFFLENBQUM7b0JBQ2RDLENBQUMsRUFBQyxDQUFtTjs7Ozs7Ozs7Ozs7d0ZBR3hOQyxDQUFJO2dCQUFDWixTQUFTLEVBQUMsQ0FBOEM7MEJBQUMsQ0FFL0Q7Ozs7Ozs7Ozs7OztBQUdOLENBQUM7S0ExQnVCSCxhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvQWRkQ2x1c3RlckJveC5qc3g/NjJmOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZGRDbHVzdGVyQm94KCkge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgYmxvY2sgdy1mdWxsIGgtc2NyZWVuIGJvcmRlci0yIGJvcmRlci1ncmF5LTMwMCBib3JkZXItZGFzaGVkIHJvdW5kZWQtbGcgcC0xMiB0ZXh0LWNlbnRlciBob3Zlcjpib3JkZXItZ3JheS00MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLW9mZnNldC0yIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXG4gICAgPlxuICAgICAgPHN2Z1xuICAgICAgICBjbGFzc05hbWU9XCJteC1hdXRvIGgtMTIgdy0xMiB0ZXh0LWdyYXktNDAwXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCA0OCA0OFwiXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBkPVwiTTggMTR2MjBjMCA0LjQxOCA3LjE2MyA4IDE2IDggMS4zODEgMCAyLjcyMS0uMDg3IDQtLjI1Mk04IDE0YzAgNC40MTggNy4xNjMgOCAxNiA4czE2LTMuNTgyIDE2LThNOCAxNGMwLTQuNDE4IDcuMTYzLTggMTYtOHMxNiAzLjU4MiAxNiA4bTAgMHYxNG0wLTRjMCA0LjQxOC03LjE2MyA4LTE2IDhTOCAyOC40MTggOCAyNG0zMiAxMHY2bTAgMHY2bTAtNmg2bS02IDBoLTZcIlxuICAgICAgICAvPlxuICAgICAgPC9zdmc+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJtdC0yIGJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICBDcmVhdGUgYSBuZXcgY2x1c3RlclxuICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkFkZENsdXN0ZXJCb3giLCJidXR0b24iLCJ0eXBlIiwiY2xhc3NOYW1lIiwic3ZnIiwieG1sbnMiLCJzdHJva2UiLCJmaWxsIiwidmlld0JveCIsImFyaWEtaGlkZGVuIiwicGF0aCIsInN0cm9rZUxpbmVjYXAiLCJzdHJva2VMaW5lam9pbiIsInN0cm9rZVdpZHRoIiwiZCIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/AddClusterBox.jsx\n");

/***/ })

});