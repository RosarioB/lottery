import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";

class App extends React.Component {

  render() {
      // request access to the user's MetaMask account
      window.ethereum.request({"method": "eth_requestAccounts"});
      
      // get the user's accounts
      web3.eth.getAccounts()
      .then(function (accounts) {
        console.log("The first account is " + accounts[0]);
      })

    
     return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;
