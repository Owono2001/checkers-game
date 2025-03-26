(()=>{var e=globalThis,t={},i={},s=e.parcelRequire94c2;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var l={id:e,exports:{}};return t[e]=l,s.call(l.exports,l,l.exports),l.exports}var c=Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){i[e]=t},e.parcelRequire94c2=s),(0,s.register)("4msXI",function(e,t){new class{constructor(){this.boardSize=8,this.pieces=[],this.selectedPiece=null,this.currentPlayer="black",this.validMoves=[],this.canvas=document.getElementById("game-board"),this.ctx=this.canvas.getContext("2d"),this.cellSize=this.canvas.width/this.boardSize,this.initBoard(),this.drawBoard(),this.setupEventListeners()}initBoard(){this.pieces=[];for(let e=0;e<this.boardSize;e++)for(let t=0;t<this.boardSize;t++)(e+t)%2==1&&(e<3?this.pieces.push({color:"white",king:!1,x:t,y:e}):e>4&&this.pieces.push({color:"black",king:!1,x:t,y:e}))}drawBoard(){for(let e=0;e<this.boardSize;e++)for(let t=0;t<this.boardSize;t++)this.ctx.fillStyle=(e+t)%2==0?"#f0d9b5":"#b58863",this.ctx.fillRect(t*this.cellSize,e*this.cellSize,this.cellSize,this.cellSize);this.pieces.forEach(e=>{this.ctx.beginPath(),this.ctx.arc(e.x*this.cellSize+this.cellSize/2,e.y*this.cellSize+this.cellSize/2,this.cellSize/2.5,0,2*Math.PI),this.ctx.fillStyle="black"===e.color?"#2c3e50":"#ecf0f1",this.ctx.fill(),e.king&&(this.ctx.fillStyle="black"===e.color?"#f1c40f":"#f39c12",this.ctx.beginPath(),this.ctx.arc(e.x*this.cellSize+this.cellSize/2,e.y*this.cellSize+this.cellSize/2,this.cellSize/6,0,2*Math.PI),this.ctx.fill())}),this.selectedPiece&&(this.ctx.fillStyle="rgba(46, 204, 113, 0.3)",this.ctx.fillRect(this.selectedPiece.x*this.cellSize,this.selectedPiece.y*this.cellSize,this.cellSize,this.cellSize),this.validMoves.forEach(e=>{this.ctx.beginPath(),this.ctx.arc(e.x*this.cellSize+this.cellSize/2,e.y*this.cellSize+this.cellSize/2,this.cellSize/6,0,2*Math.PI),this.ctx.fillStyle="rgba(46, 204, 113, 0.6)",this.ctx.fill()}))}getValidMoves(e){let t=[];return(e.king?[-1,1]:"black"===e.color?[-1]:[1]).forEach(i=>{[-1,1].forEach(s=>{let l=e.x+s,c=e.y+i;if(this.isValidPosition(l,c)){let h=this.getPieceAt(l,c);if(h){if(h.color!==e.color){let e=l+s,h=c+i;this.isValidPosition(e,h)&&!this.getPieceAt(e,h)&&t.push({x:e,y:h})}}else t.push({x:l,y:c})}})}),t}hasMandatoryCaptures(){return this.pieces.some(e=>e.color===this.currentPlayer&&this.getValidMoves(e).some(t=>2===Math.abs(t.x-e.x)))}isValidPosition(e,t){return e>=0&&e<this.boardSize&&t>=0&&t<this.boardSize}getPieceAt(e,t){return this.pieces.find(i=>i.x===e&&i.y===t)}handleClick(e){let t=this.canvas.getBoundingClientRect(),i=Math.floor((e.clientX-t.left)/this.cellSize),s=Math.floor((e.clientY-t.top)/this.cellSize),l=this.getPieceAt(i,s),c=this.hasMandatoryCaptures();if(l&&l.color===this.currentPlayer){let e=this.getValidMoves(l),t=e.filter(e=>2===Math.abs(e.x-l.x));c?t.length>0&&(this.selectedPiece=l,this.validMoves=t):(this.selectedPiece=l,this.validMoves=e)}else if(this.selectedPiece){let e=this.validMoves.find(e=>e.x===i&&e.y===s);if(e){let t=2===Math.abs(e.x-this.selectedPiece.x);if(this.movePiece(this.selectedPiece,e.x,e.y),t){let e=this.getValidMoves(this.selectedPiece).filter(e=>2===Math.abs(e.x-this.selectedPiece.x));e.length>0?this.validMoves=e:this.endTurn()}else this.endTurn()}}this.drawBoard()}movePiece(e,t,i){if(2===Math.abs(t-e.x)){let s=(t+e.x)/2,l=(i+e.y)/2;this.pieces=this.pieces.filter(e=>e.x!==s||e.y!==l)}e.x=t,e.y=i,("black"===e.color&&0===i||"white"===e.color&&7===i)&&(e.king=!0)}endTurn(){this.selectedPiece=null,this.validMoves=[],this.currentPlayer="black"===this.currentPlayer?"white":"black",this.updateTurnIndicator(),this.checkWinCondition()}updateTurnIndicator(){document.getElementById("turn-indicator").textContent=`${this.currentPlayer.charAt(0).toUpperCase()+this.currentPlayer.slice(1)}'s Turn`}checkWinCondition(){let e=this.pieces.filter(e=>"black"===e.color),t=this.pieces.filter(e=>"white"===e.color);0===e.length?(alert("White wins!"),this.resetGame()):0===t.length&&(alert("Black wins!"),this.resetGame())}resetGame(){this.pieces=[],this.currentPlayer="black",this.selectedPiece=null,this.validMoves=[],this.initBoard(),this.drawBoard(),this.updateTurnIndicator()}setupEventListeners(){this.canvas.addEventListener("click",e=>this.handleClick(e)),document.getElementById("reset-btn").addEventListener("click",()=>this.resetGame())}}}),s("4msXI")})();
//# sourceMappingURL=game.fe3f64a2.js.map
