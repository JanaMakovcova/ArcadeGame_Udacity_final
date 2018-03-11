### Classic Arcade Game Clone - Udacity FEND Project
This simple game was made as project for Front-End Nanodegreee Udacity. Application uses HTML, CSS and Javascript and it isn't build from scratch. I have used [art assets and game engine from Udacity](https://github.com/udacity/frontend-nanodegree-arcade-game).
## Installation
Clone GitHub repository and open `index.html` file in browser.
## Game behavior
Click `game start` button to start game.

Player can move with arrow keys and can not move off canvas. One step is long one block. Total amount of time for successful finish of the game is 120 seconds. When time is over, game ends.

Player win when reaches the water in time, otherwise loose.

Enemies are crossing screen with random speed during game play. Each time bug-player collisions happens player position resets to starter point and player loose 10 points (seconds of time).
