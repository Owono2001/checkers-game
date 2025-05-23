// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"game.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CheckersGame = /*#__PURE__*/function () {
  function CheckersGame() {
    _classCallCheck(this, CheckersGame);
    this.boardSize = 8;
    this.pieces = [];
    this.selectedPiece = null;
    this.currentPlayer = 'black';
    this.validMoves = [];
    this.canvas = document.getElementById('game-board');
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = this.canvas.width / this.boardSize;
    this.initBoard();
    this.drawBoard();
    this.setupEventListeners();
  }
  return _createClass(CheckersGame, [{
    key: "initBoard",
    value: function initBoard() {
      this.pieces = [];
      for (var row = 0; row < this.boardSize; row++) {
        for (var col = 0; col < this.boardSize; col++) {
          if ((row + col) % 2 === 1) {
            if (row < 3) {
              this.pieces.push({
                color: 'white',
                king: false,
                x: col,
                y: row
              });
            } else if (row > 4) {
              this.pieces.push({
                color: 'black',
                king: false,
                x: col,
                y: row
              });
            }
          }
        }
      }
    }
  }, {
    key: "drawBoard",
    value: function drawBoard() {
      var _this = this;
      // Draw board squares
      for (var row = 0; row < this.boardSize; row++) {
        for (var col = 0; col < this.boardSize; col++) {
          this.ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        }
      }
      // Draw pieces
      this.pieces.forEach(function (piece) {
        _this.ctx.beginPath();
        _this.ctx.arc(piece.x * _this.cellSize + _this.cellSize / 2, piece.y * _this.cellSize + _this.cellSize / 2, _this.cellSize / 2.5, 0, Math.PI * 2);
        _this.ctx.fillStyle = piece.color === 'black' ? '#2c3e50' : '#ecf0f1';
        _this.ctx.fill();
        if (piece.king) {
          _this.ctx.fillStyle = piece.color === 'black' ? '#f1c40f' : '#f39c12';
          _this.ctx.beginPath();
          _this.ctx.arc(piece.x * _this.cellSize + _this.cellSize / 2, piece.y * _this.cellSize + _this.cellSize / 2, _this.cellSize / 6, 0, Math.PI * 2);
          _this.ctx.fill();
        }
      });
      // Highlight selected piece and valid moves
      if (this.selectedPiece) {
        this.ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
        this.ctx.fillRect(this.selectedPiece.x * this.cellSize, this.selectedPiece.y * this.cellSize, this.cellSize, this.cellSize);
        this.validMoves.forEach(function (move) {
          _this.ctx.beginPath();
          _this.ctx.arc(move.x * _this.cellSize + _this.cellSize / 2, move.y * _this.cellSize + _this.cellSize / 2, _this.cellSize / 6, 0, Math.PI * 2);
          _this.ctx.fillStyle = 'rgba(46, 204, 113, 0.6)';
          _this.ctx.fill();
        });
      }
    }
  }, {
    key: "getValidMoves",
    value: function getValidMoves(piece) {
      var _this2 = this;
      var moves = [];
      var directions = piece.king ? [-1, 1] : piece.color === 'black' ? [-1] : [1];
      directions.forEach(function (dy) {
        [-1, 1].forEach(function (dx) {
          var newX = piece.x + dx;
          var newY = piece.y + dy;
          if (_this2.isValidPosition(newX, newY)) {
            var targetPiece = _this2.getPieceAt(newX, newY);
            if (!targetPiece) {
              moves.push({
                x: newX,
                y: newY
              });
            } else if (targetPiece.color !== piece.color) {
              var jumpX = newX + dx;
              var jumpY = newY + dy;
              if (_this2.isValidPosition(jumpX, jumpY) && !_this2.getPieceAt(jumpX, jumpY)) {
                moves.push({
                  x: jumpX,
                  y: jumpY
                });
              }
            }
          }
        });
      });
      return moves;
    }
  }, {
    key: "hasMandatoryCaptures",
    value: function hasMandatoryCaptures() {
      var _this3 = this;
      return this.pieces.some(function (piece) {
        return piece.color === _this3.currentPlayer && _this3.getValidMoves(piece).some(function (move) {
          return Math.abs(move.x - piece.x) === 2;
        });
      });
    }
  }, {
    key: "isValidPosition",
    value: function isValidPosition(x, y) {
      return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }
  }, {
    key: "getPieceAt",
    value: function getPieceAt(x, y) {
      return this.pieces.find(function (p) {
        return p.x === x && p.y === y;
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var _this4 = this;
      var rect = this.canvas.getBoundingClientRect();
      var x = Math.floor((event.clientX - rect.left) / this.cellSize);
      var y = Math.floor((event.clientY - rect.top) / this.cellSize);
      var clickedPiece = this.getPieceAt(x, y);
      var hasMandatoryCaptures = this.hasMandatoryCaptures();
      if (clickedPiece && clickedPiece.color === this.currentPlayer) {
        var pieceMoves = this.getValidMoves(clickedPiece);
        var pieceCaptures = pieceMoves.filter(function (move) {
          return Math.abs(move.x - clickedPiece.x) === 2;
        });
        if (hasMandatoryCaptures) {
          if (pieceCaptures.length > 0) {
            this.selectedPiece = clickedPiece;
            this.validMoves = pieceCaptures;
          }
        } else {
          this.selectedPiece = clickedPiece;
          this.validMoves = pieceMoves;
        }
      } else if (this.selectedPiece) {
        var move = this.validMoves.find(function (m) {
          return m.x === x && m.y === y;
        });
        if (move) {
          var wasCapture = Math.abs(move.x - this.selectedPiece.x) === 2;
          this.movePiece(this.selectedPiece, move.x, move.y);
          if (wasCapture) {
            var newCaptures = this.getValidMoves(this.selectedPiece).filter(function (m) {
              return Math.abs(m.x - _this4.selectedPiece.x) === 2;
            });
            if (newCaptures.length > 0) {
              this.validMoves = newCaptures;
            } else {
              this.endTurn();
            }
          } else {
            this.endTurn();
          }
        }
      }
      this.drawBoard();
    }
  }, {
    key: "movePiece",
    value: function movePiece(piece, newX, newY) {
      if (Math.abs(newX - piece.x) === 2) {
        var capturedX = (newX + piece.x) / 2;
        var capturedY = (newY + piece.y) / 2;
        this.pieces = this.pieces.filter(function (p) {
          return !(p.x === capturedX && p.y === capturedY);
        });
      }
      piece.x = newX;
      piece.y = newY;
      if (piece.color === 'black' && newY === 0 || piece.color === 'white' && newY === 7) {
        piece.king = true;
      }
    }
  }, {
    key: "endTurn",
    value: function endTurn() {
      this.selectedPiece = null;
      this.validMoves = [];
      this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
      this.updateTurnIndicator();
      this.checkWinCondition();
    }
  }, {
    key: "updateTurnIndicator",
    value: function updateTurnIndicator() {
      document.getElementById('turn-indicator').textContent = "".concat(this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1), "'s Turn");
    }
  }, {
    key: "checkWinCondition",
    value: function checkWinCondition() {
      var blackPieces = this.pieces.filter(function (p) {
        return p.color === 'black';
      });
      var whitePieces = this.pieces.filter(function (p) {
        return p.color === 'white';
      });
      if (blackPieces.length === 0) {
        alert('White wins!');
        this.resetGame();
      } else if (whitePieces.length === 0) {
        alert('Black wins!');
        this.resetGame();
      }
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.pieces = [];
      this.currentPlayer = 'black';
      this.selectedPiece = null;
      this.validMoves = [];
      this.initBoard();
      this.drawBoard();
      this.updateTurnIndicator();
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this5 = this;
      this.canvas.addEventListener('click', function (e) {
        return _this5.handleClick(e);
      });
      document.getElementById('reset-btn').addEventListener('click', function () {
        return _this5.resetGame();
      });
    }
  }]);
}();
new CheckersGame();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58611" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game.ts"], null)
//# sourceMappingURL=/game.4fb5d41c.js.map