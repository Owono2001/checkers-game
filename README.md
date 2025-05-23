# Modern Checkers Game ♟️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE) 
[![Profile Views](https://komarev.com/ghpvc/?username=Owono2001&style=for-the-badge&color=blueviolet)](https://github.com/Owono2001/) 
> A clean and professional web-based implementation of the classic game of Checkers (Draughts), featuring smooth animations and clear win/loss detection.

<br>

<p align="center">
  <img src="./Picture/screenshots.jpg" alt="Modern Checkers Game Screenshot" width="80%">
  <br>
  <em>Screenshot of the Modern Checkers game interface.</em>
</p>

---

## ✨ Key Features

* **👑 Classic Rules:** Implements standard American Checkers / English Draughts rules.
* **♟️ Smooth Movement:** Enjoy fluid animations for piece selection and movement.
* **♚ King Promotion:** Pieces are correctly promoted to Kings upon reaching the opponent's back rank.
* **🚩 Turn Indicator:** Clearly displays whose turn it is.
* **🏆 Win Detection:** Automatically detects and announces the winner when conditions are met.
* **📱 Responsive Layout:** Adapts cleanly to various screen sizes for play on different devices.
* **🖱️ Intuitive UI:** Simple and easy-to-understand interface for selecting and moving pieces.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Development Server/Bundler:** Likely [Parcel](https://parceljs.org/) (inferred from `localhost:1234`) or similar.
* **Version Control:** Git & GitHub

---

## 🚀 Getting Started

To run this project locally, follow these simple steps:

### Prerequisites

* **Node.js:** Version 14 or higher recommended. ([Download Node.js](https://nodejs.org/))
* **npm:** Version 6 or higher recommended (usually included with Node.js).

### Installation & Launch

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Owono2001/checkers-game.git](https://github.com/Owono2001/checkers-game.git)
    ```

2.  **Navigate to Project Directory:**
    ```bash
    cd checkers-game
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    ```bash
    npm start
    ```
    *This command typically bundles the application and starts a local server.*

5.  **Open in Browser:**
    Navigate to `http://localhost:1234` in your web browser to play the game.

---

## 룰 How to Play (Briefly)

* Pieces move diagonally forward one square.
* Capture opponent pieces by jumping over them diagonally (must be an empty square beyond). Multiple jumps are possible if available.
* If a capture is available, it **must** be taken.
* Pieces reaching the opponent's back row become **Kings**.
* Kings can move and capture diagonally **forwards and backwards**.
* You win by capturing all your opponent's pieces or by blocking them so they have no legal moves.

---

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  Enjoy the game! 🎉
</p>
