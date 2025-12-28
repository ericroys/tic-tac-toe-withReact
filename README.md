# Tic-Tac-Toe

## The game
The game is a traditional version of tic-tac-toe.
There are two players where a player is either X or O.
For the current version, the NPC is always X (sorry), 
and always makes the first move (sorry again). 

The goal of the game is to get three squares, horizontal, vertical, or diagonal
with your O, while also preventing the NPC from doing the same with its X.

The game can be reset for additional fun in statistical probabilities. The algorithm is not 
smart. It's just random chance for where an NPC will move.

## Features

### The Game Board
The game board is a 3x3 matrix. When hovering over a cell, it will show a dotted line border
when you are allowed to move there. When a game is won, the color of the Xs or Os will change
color to indicate which series provides the win.

### Reset
The game can be reset at any point in time by pressing the Reset button. This will clear the board
and the game will start anew. 

### Settings
For anyone preferring things less black and white, there is the Settings feature. 
This dialog allows you to customize the styling colors for the screen, board, cells, player colors,
and the color used to signify a win. Additionally, you can set a background image for the screen
and/or the board. 

Feel free to make the game more challenging by making your cells and player colors the same. 

A note on backgrounds: Images selected will stretch, so if you have a larger screen, select an
image that is viewed better in landscape. Smaller image sizes are always better for performance
but there is no restriction on size at the moment (user discretion advised). 

## The Technicals
Vite and Vitest (testing).
React with Typescript
React Redux for state management of settings and overall game state
IDB is used for local file storage for the background images
React Hook Forms is used for all things form related (handling selection/update of values in settings)

## Play
This project is currently deployed on Netlify
https://tic-tac-toe-react-edr.netlify.app