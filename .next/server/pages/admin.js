"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/admin";
exports.ids = ["pages/admin"];
exports.modules = {

/***/ "./pages/admin/index.jsx":
/*!*******************************!*\
  !*** ./pages/admin/index.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ index),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction index({ data: data1  }) {\n    // handler\n    const create = ()=>{\n        const data2 = {\n            username: \"example\"\n        };\n        fetch(\"/create\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify(data2)\n        }).then((response)=>response.json()\n        ).then((data)=>{\n            console.log(\"Success:\", data);\n        }).catch((error)=>{\n            console.error(\"Error:\", error);\n        });\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"Dashboard\"\n    }, void 0, false, {\n        fileName: \"/home/ivje/domedb/pages/admin/index.jsx\",\n        lineNumber: 21,\n        columnNumber: 10\n    }, this));\n};\nasync function getServerSideProps(context) {\n    return {\n        props: {\n            data: \"foo\"\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hZG1pbi9pbmRleC5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBZSxRQUFRLENBQUNBLEtBQUssQ0FBQyxDQUFDLENBQUNDLElBQUksRUFBSkEsS0FBSSxFQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLEVBQVU7SUFDVixLQUFLLENBQUNDLE1BQU0sT0FBUyxDQUFDO1FBQ3BCLEtBQUssQ0FBQ0QsS0FBSSxHQUFHLENBQUM7WUFBQ0UsUUFBUSxFQUFFLENBQVM7UUFBQyxDQUFDO1FBQ3BDQyxLQUFLLENBQUMsQ0FBUyxVQUFFLENBQUM7WUFDaEJDLE1BQU0sRUFBRSxDQUFNO1lBQ2RDLE9BQU8sRUFBRSxDQUFDO2dCQUNSLENBQWMsZUFBRSxDQUFrQjtZQUNwQyxDQUFDO1lBQ0RDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUNSLEtBQUk7UUFDM0IsQ0FBQyxFQUNFUyxJQUFJLEVBQUVDLFFBQVEsR0FBS0EsUUFBUSxDQUFDQyxJQUFJO1VBQ2hDRixJQUFJLEVBQUVULElBQUksR0FBSyxDQUFDO1lBQ2ZZLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQVUsV0FBRWIsSUFBSTtRQUM5QixDQUFDLEVBQ0FjLEtBQUssRUFBRUMsS0FBSyxHQUFLLENBQUM7WUFDakJILE9BQU8sQ0FBQ0csS0FBSyxDQUFDLENBQVEsU0FBRUEsS0FBSztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sNkVBQUVDLENBQUU7a0JBQUMsQ0FBUzs7Ozs7O0FBQ3RCLENBQUM7QUFFTSxlQUFlQyxrQkFBa0IsQ0FBQ0MsT0FBTyxFQUFFLENBQUM7SUFDakQsTUFBTSxDQUFDLENBQUM7UUFDTkMsS0FBSyxFQUFFLENBQUM7WUFDTm5CLElBQUksRUFBRSxDQUFLO1FBQ2IsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9tZWRiLy4vcGFnZXMvYWRtaW4vaW5kZXguanN4PzVkYmEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5kZXgoeyBkYXRhIH0pIHtcbiAgLy8gaGFuZGxlclxuICBjb25zdCBjcmVhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHsgdXNlcm5hbWU6IFwiZXhhbXBsZVwiIH07XG4gICAgZmV0Y2goXCIvY3JlYXRlXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vIG9yICdQVVQnXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzczpcIiwgZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiA8aDE+RGFzaGJvYXJkPC9oMT47XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoY29udGV4dCkge1xuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBkYXRhOiBcImZvb1wiLFxuICAgIH0sIC8vIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBwYWdlIGNvbXBvbmVudCBhcyBwcm9wc1xuICB9O1xufVxuIl0sIm5hbWVzIjpbImluZGV4IiwiZGF0YSIsImNyZWF0ZSIsInVzZXJuYW1lIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJoMSIsImdldFNlcnZlclNpZGVQcm9wcyIsImNvbnRleHQiLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/admin/index.jsx\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/admin/index.jsx"));
module.exports = __webpack_exports__;

})();