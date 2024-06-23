# lottery
A simple Ethereum application that simulates a lottery consisting of:
- A lottery smart contract acting as the back-end in the folder `smart contract`.
- A front-end application in React that interacts with the smart contract, using the web3.js library, in the folder `react`.

![alt text](https://github.com/RosarioB/lottery/blob/main/github_images/lottery.png?raw=true)

1. Add a .env file in the root of the project smart_contract with `PRIVATE_KEY` and `INFURA_URL`
2. Run `npm install` on both the folders `smart contract` and `react`
3. To run the tests on the smart contract `cd smart_contract` and then `npm run test` 
4. Compile and deploy the smart contract: `node deploy.js`
5. Run the React application `npm start`

This code is adapted from the course [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/?couponCode=24T6MT62024) by Stephen Grider, with some modifications.
