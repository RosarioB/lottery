import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const { ethereum } = window;

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [lastWinner, setLastWinner] = useState("");

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
      getMetamaskAccounts();  // Call the function directly without 'this'
    }

    fetchData();
  }, []);

  const getMetamaskAccounts = async () => {
    let accounts = [];
    try {
      // Request account access
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected', accounts[0]);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected the request
        console.error('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    }
    setAccounts(accounts);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (accounts.length > 0 && accounts[0]) {
      setMessage("Waiting on transaction success...");

      try {  
        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(value, "ether")
        });
        setMessage("You have been entered!");
      } catch (error) {
        setMessage(error.message);
      }
    }
  }

  const handleClick = async () => {
    if (accounts.length > 0 && accounts[0]) {
      setMessage("Waiting on transaction success...");

      try {
        await lottery.methods.pickWinner().send({
          from: accounts[0]
        });

        const lastWinner = await lottery.methods.lastWinner().call();
        setLastWinner(lastWinner);
        setMessage("A winner has been picked!");
      } catch (error) {
        setMessage(error.message);
      }
    }
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </p>

      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input 
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={handleClick}>Pick a winner!</button>
      <hr />
      {lastWinner && (
        <p>The winner of the lottery is: {lastWinner}.</p>
      )}
      <h1>{message}</h1>
    </div>
  );
}

export default App;
