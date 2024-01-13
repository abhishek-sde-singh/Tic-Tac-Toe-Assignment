# React TicTacToe Game Assignment

This project implements a basic 1-player TicTacToe game using React. It's designed as per the requirements provided.

## Functionality

- **Player Interaction**: The player opens the app, selects their symbol ('X' or 'O'), and clicks on one of the 9 empty boxes to make a move.
- **Computer as the Second Player**: The computer's moves are determined through an API call. The API used is `https://hiring-react-assignment.vercel.app/api/bot` with a POST method.
- **Game End Conditions**: The game ends when a player wins, or if its a Tie.

## Technical Constraints

- **React Hooks**: The application exclusively uses React hooks for state and lifecycle management.
- **Functional Components**: Only functional components are used, with no class components involved.
- **Optimized Rendering**: The application is optimized.

## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install the required dependencies.
3. **Start the Application**: Execute `npm run start` to start the app. It will be available at `http://localhost:3000/`.

## Structure and Code

The core of the application lies in the `GameBoard` component, which manages the state and logic of the TicTacToe game. The `Box` component represents each square in the game board. The game logic includes player move handling, computer move API integration, and win-checking mechanism.
