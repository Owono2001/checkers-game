
type Piece = {
    color: 'black' | 'white';
    king: boolean;
    x: number;
    y: number;
};

type Position = {
    x: number;
    y: number;
};


// New interface for YouTube Player
interface YouTubePlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    destroy: () => void;
    loadVideoById: (videoId: string) => void;
}


class CheckersGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private boardSize = 8;
    private cellSize: number;
    private pieces: Piece[] = [];
    private selectedPiece: Piece | null = null;
    private currentPlayer: 'black' | 'white' = 'black';
    private validMoves: Position[] = [];

     // YouTube-related properties
     private youtubePlayer: YouTubePlayer | null = null;
     private youtubeSearchResults: any[] = [];
     private youtubeApiKey = 'your-api_key'; // Replace with your actual API key

    constructor() {
        this.canvas = document.getElementById('game-board') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.cellSize = this.canvas.width / this.boardSize;
        
        this.initBoard();
        this.drawBoard();
        this.setupYouTubePlayer(); // Initialize YouTube player setup
        this.setupEventListeners();
    }

    private initBoard(): void {
        this.pieces = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if ((row + col) % 2 === 1) {
                    if (row < 3) {
                        this.pieces.push({ color: 'white', king: false, x: col, y: row });
                    } else if (row > 4) {
                        this.pieces.push({ color: 'black', king: false, x: col, y: row });
                    }
                }
            }
        }
    }

    private drawBoard(): void {
        // Draw board squares
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                this.ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
                this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        // Draw pieces
        this.pieces.forEach(piece => {
            this.ctx.beginPath();
            this.ctx.arc(
                piece.x * this.cellSize + this.cellSize / 2,
                piece.y * this.cellSize + this.cellSize / 2,
                this.cellSize / 2.5,
                0,
                Math.PI * 2
            );
            
            this.ctx.fillStyle = piece.color === 'black' ? '#2c3e50' : '#ecf0f1';
            this.ctx.fill();
            
            if (piece.king) {
                this.ctx.fillStyle = piece.color === 'black' ? '#f1c40f' : '#f39c12';
                this.ctx.beginPath();
                this.ctx.arc(
                    piece.x * this.cellSize + this.cellSize / 2,
                    piece.y * this.cellSize + this.cellSize / 2,
                    this.cellSize / 6,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
            }
        });

        // Highlight selected piece and valid moves
        if (this.selectedPiece) {
            this.ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
            this.ctx.fillRect(
                this.selectedPiece.x * this.cellSize,
                this.selectedPiece.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );

            this.validMoves.forEach(move => {
                this.ctx.beginPath();
                this.ctx.arc(
                    move.x * this.cellSize + this.cellSize / 2,
                    move.y * this.cellSize + this.cellSize / 2,
                    this.cellSize / 6,
                    0,
                    Math.PI * 2
                );
                this.ctx.fillStyle = 'rgba(46, 204, 113, 0.6)';
                this.ctx.fill();
            });
        }
    }

    private getValidMoves(piece: Piece): Position[] {
        const moves: Position[] = [];
        const directions = piece.king ? [-1, 1] : piece.color === 'black' ? [-1] : [1];
        
        directions.forEach(dy => {
            [-1, 1].forEach(dx => {
                const newX = piece.x + dx;
                const newY = piece.y + dy;
                
                if (this.isValidPosition(newX, newY)) {
                    const targetPiece = this.getPieceAt(newX, newY);
                    if (!targetPiece) {
                        moves.push({ x: newX, y: newY });
                    } else if (targetPiece.color !== piece.color) {
                        const jumpX = newX + dx;
                        const jumpY = newY + dy;
                        if (this.isValidPosition(jumpX, jumpY) && !this.getPieceAt(jumpX, jumpY)) {
                            moves.push({ x: jumpX, y: jumpY });
                        }
                    }
                }
            });
        });
        
        return moves;
    }

    private hasMandatoryCaptures(): boolean {
        return this.pieces.some(piece => 
            piece.color === this.currentPlayer && 
            this.getValidMoves(piece).some(move => Math.abs(move.x - piece.x) === 2)
        );
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    private getPieceAt(x: number, y: number): Piece | undefined {
        return this.pieces.find(p => p.x === x && p.y === y);
    }

    private handleClick(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.cellSize);
        const y = Math.floor((event.clientY - rect.top) / this.cellSize);
        
        const clickedPiece = this.getPieceAt(x, y);
        const hasMandatoryCaptures = this.hasMandatoryCaptures();
        
        if (clickedPiece && clickedPiece.color === this.currentPlayer) {
            const pieceMoves = this.getValidMoves(clickedPiece);
            const pieceCaptures = pieceMoves.filter(move => Math.abs(move.x - clickedPiece.x) === 2);
            
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
            const move = this.validMoves.find(m => m.x === x && m.y === y);
            if (move) {
                const wasCapture = Math.abs(move.x - this.selectedPiece.x) === 2;
                this.movePiece(this.selectedPiece, move.x, move.y);
                
                if (wasCapture) {
                    const newCaptures = this.getValidMoves(this.selectedPiece)
                        .filter(m => Math.abs(m.x - this.selectedPiece!.x) === 2);
                    
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

    private movePiece(piece: Piece, newX: number, newY: number): void {
        if (Math.abs(newX - piece.x) === 2) {
            const capturedX = (newX + piece.x) / 2;
            const capturedY = (newY + piece.y) / 2;
            this.pieces = this.pieces.filter(p => !(p.x === capturedX && p.y === capturedY));
        }

        piece.x = newX;
        piece.y = newY;

        if ((piece.color === 'black' && newY === 0) || (piece.color === 'white' && newY === 7)) {
            piece.king = true;
        }
    }

    private endTurn(): void {
        this.selectedPiece = null;
        this.validMoves = [];
        this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        this.updateTurnIndicator();
        this.checkWinCondition();
    }

    private updateTurnIndicator(): void {
        document.getElementById('turn-indicator')!.textContent = 
            `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s Turn`;
    }

    private checkWinCondition(): void {
        const blackPieces = this.pieces.filter(p => p.color === 'black');
        const whitePieces = this.pieces.filter(p => p.color === 'white');
        
        if (blackPieces.length === 0) {
            alert('White wins!');
            this.resetGame();
        } else if (whitePieces.length === 0) {
            alert('Black wins!');
            this.resetGame();
        }
    }

    private resetGame(): void {
        this.pieces = [];
        this.currentPlayer = 'black';
        this.selectedPiece = null;
        this.validMoves = [];
        this.initBoard();
        this.drawBoard();
        this.updateTurnIndicator();
    }

    // YouTube-related methods
    private setupYouTubePlayer(): void {
        // Create the YouTube player when the API is ready
        (window as any).onYouTubeIframeAPIReady = () => {
            this.youtubePlayer = new YT.Player('player', {
                events: {
                    'onReady': (event: any) => this.onPlayerReady(event),
                    'onStateChange': (event: any) => this.onPlayerStateChange(event)
                }
            });
        };
    }

    private onPlayerReady(event: any): void {
        this.youtubePlayer = event.target;
        document.getElementById('player')!.style.display = 'block';
    }

    private onPlayerStateChange(event: any): void {
        // Handle player state changes if needed
        console.log('Player state changed:', event);
    }

    private async searchMusic(): Promise<void> {
        const searchInput = document.getElementById('music-search') as HTMLInputElement;
        const query = searchInput.value;
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&type=video&key=${this.youtubeApiKey}`
            );
            
            const data = await response.json();
            this.youtubeSearchResults = data.items;
            this.displaySearchResults();
        } catch (error) {
            console.error('Error searching YouTube:', error);
        }
    }

    private displaySearchResults(): void {
        const resultsContainer = document.getElementById('search-results')!;
        resultsContainer.innerHTML = '';
        
        this.youtubeSearchResults.forEach(video => {
            const div = document.createElement('div');
            div.className = 'video-result';
            div.innerHTML = `
                <img src="${video.snippet.thumbnails.default.url}" style="width: 100px; height: 75px; margin-right: 0.5rem;">
                <span>${video.snippet.title}</span>
            `;
            div.addEventListener('click', () => this.playVideo(video.id.videoId));
            resultsContainer.appendChild(div);
        });
    }

    private playVideo(videoId: string): void {
        if (this.youtubePlayer) {
            this.youtubePlayer.loadVideoById(videoId);
            this.youtubePlayer.playVideo();
        }
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        document.getElementById('reset-btn')!.addEventListener('click', () => this.resetGame());
    }
}

new CheckersGame();