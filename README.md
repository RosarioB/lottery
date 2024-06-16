# lottery
A simple Ethereum application that simulates a lottery consisting of:
- A lottery smart contract acting as the back-end in the folder `smart contract`.
- A front-end application in React that interacts with the smart contract, using the web3.js library, in the folder `react`.

![alt text](https://github.com/RosarioB/lottery/blob/main/github_images/lottery.png?raw=true)

1. Add a .env file in the root of the project smart_contract with `PRIVATE_KEY` and `INFURA_URL`
2. Run `npm install` on both the folders `smart contract` and `react`
3. Compile and deploy the smart contract: `node deploy.js`
4. Run the React application `npm start`