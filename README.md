# lottery

## Overview

This Ethereum application simulates a lottery system using a smart contract on the Ethereum blockchain, complemented by a React-based front-end. The project demonstrates how to deploy a smart contract, interact with it via a web interface, and manage Ether transactions.

## Structure

The project is organized into two main components:

- **Smart Contract**: The backend logic of the lottery, located in the `smart_contract` folder.

- **Front-End Application**: A React-based interface that interacts with the smart contract using the web3.js library, located in the `react` folder.

![alt text](https://github.com/RosarioB/lottery/blob/main/github_images/lottery.png?raw=true)

## How it works

1. **Manager Information**: The top of the application displays the manager's address, who is the account that deployed the contract.

2. **Lottery Details**: It shows the number of players entered and the total Ether in the pot.

3. **Enter the Lottery**: Players can join the lottery by entering an amount greater than 0.01 Ether and clicking the 'Enter' button. The application will connect to the player's MetaMask wallet, transfer the Ether, and add the player to the lottery.

4. **Pick a Winner**: Only the manager can click the 'Pick a Winner' button to randomly select a winner from the participants and transfer the Ether to the winner's address.

## Setting up the application

Follow these steps to set up and run the application:

1. **Environmental Setup**:
    - Create a `.env` file in the root of the `smart_contract` folder. 
    - Add your `PRIVATE_KEY` and `INFURA_URL` to the `.env` file
        ```
        PRIVATE_KEY=your_private_key
        INFURA_URL=https://infura.io/v3/your_infura_project_id
        ```
2. **Install Dependencies**:
    - Navigate to both the `smart_contract` and `react` folders and run `npm install` to install the necessary packages.
        ```
        cd smart_contract
        npm install
        cd ../react
        npm install
        ```
3. **Run Smart Contract Tests**:
    - To test the smart contract, navigate to the `smart_contract` folder and run:
        ```
        cd smart_contract
        npm run test
        ```
4. **Compile and Deploy the Smart Contract**:
    - Compile and deploy the smart contract by running:
        ```
        node deploy.js
        ```
5. **Start the React Application**:
    - Navigate to the `react` folder and start the React application:
        ```
        cd react
        npm start
        ```

## Acknowledgments

This code is adapted from the course [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide) by Stephen Grider, with some modifications.
