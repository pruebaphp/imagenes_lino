/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cargarCards.js":
/*!*******************************!*\
  !*** ./src/js/cargarCards.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(function(){\r\n    //variables\r\n    const containerCards = document.querySelector('.contenedor_galeria');\r\n    const footer = document.querySelector('.pie');\r\n\r\n\r\n    window.onload = ()=>{\r\n        obtenerDatosAPI();\r\n    }\r\n    \r\n    async function obtenerDatosAPI(){\r\n        const url = '/api/mis-publicaciones'\r\n        const respuesta = await fetch(url);\r\n        const data = await respuesta.json();\r\n        cargarCards(data);\r\n    }\r\n    \r\n    function cargarCards(publicaciones){\r\n\r\n        if(!publicaciones.length){\r\n\r\n            containerCards.classList.remove('contenedor_galeria');\r\n            footer.style.marginTop = '500px';\r\n\r\n            let parrafo = document.createElement('p');\r\n            parrafo.textContent = 'No hay publicaciones por mostrar';\r\n            parrafo.style.fontSize = '28px';\r\n            parrafo.style.textAlign = 'center';\r\n            parrafo.style.color = 'white';\r\n            parrafo.style.fontFamily = `'Staatliches', cursive`;\r\n\r\n            containerCards.appendChild(parrafo);\r\n            \r\n\r\n            return;\r\n            \r\n        }\r\n\r\n        publicaciones.forEach((publicacion)=>{\r\n\r\n            let div = document.createElement('div');\r\n            div.classList.add('card_imagen');\r\n\r\n            let img = document.createElement('img');\r\n            img.classList.add('card_imagen_img');\r\n            img.src = `/uploads/${publicacion.imagen}`\r\n            img.alt = `Publicacion de ${publicacion.imagen}`\r\n\r\n            let p1 = document.createElement('p');\r\n            p1.classList.add('card_imagen_titulo');\r\n            p1.textContent = publicacion.titulo;\r\n\r\n            let p2 = document.createElement('p');\r\n            p2.classList.add('card_imagen_descri');\r\n            p2.textContent = publicacion.descripcion;\r\n\r\n            let btnEditar = document.createElement('button');\r\n            btnEditar.classList.add('card_imagen_editar','btnAction');\r\n            btnEditar.textContent = 'editar';\r\n\r\n            let btnEliminar = document.createElement('button');\r\n            btnEliminar.classList.add('card_imagen_eliminar','btnAction');\r\n            btnEliminar.textContent = 'eliminar';\r\n\r\n            \r\n            div.appendChild(img)\r\n            div.appendChild(p1)\r\n            div.appendChild(p2)\r\n            div.appendChild(btnEditar)\r\n            div.appendChild(btnEliminar)\r\n\r\n            containerCards.appendChild(div);\r\n\r\n            console.log(publicacion)\r\n            \r\n        })\r\n    }\r\n\r\n\r\n})();\r\n\n\n//# sourceURL=webpack://bn_raices/./src/js/cargarCards.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/cargarCards.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;