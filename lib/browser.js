"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _jsonmlToReactElement = _interopRequireDefault(require("jsonml-to-react-element"));

var _utils = _interopRequireDefault(require("jsonml.js/lib/utils"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isHeading(node) {
  return /h[1-6]/i.test(_utils["default"].getTagName(node));
}

function generateSluggedId(children) {
  var headingText = children.map(function (node) {
    if (_utils["default"].isElement(node)) {
      if (_utils["default"].hasAttributes(node)) {
        return node[2] || '';
      }

      return node[1] || '';
    }

    return node;
  }).join('');
  var sluggedId = headingText.trim().replace(/\s+/g, '-');
  return sluggedId;
} // export default doesn't work


module.exports = function (_, props) {
  return {
    converters: [[function (node) {
      return _utils["default"].isElement(node) && isHeading(node);
    }, function (node, index) {
      var children = _utils["default"].getChildren(node);

      var sluggedId = generateSluggedId(children);
      var hash = sluggedId.replace(/[?.]$/g, '');
      return /*#__PURE__*/_react["default"].createElement(_utils["default"].getTagName(node), _objectSpread({
        key: index,
        id: sluggedId
      }, _utils["default"].getAttributes(node)), [/*#__PURE__*/_react["default"].createElement("span", {
        key: "title"
      }, children.map(function (child) {
        return (0, _jsonmlToReactElement["default"])(child);
      })), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#".concat(hash),
        className: "anchor",
        key: "anchor"
      }, "#")]);
    }]]
  };
};