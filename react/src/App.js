import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

const { ethereum } = window;

class App extends React.Component {

  state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: '',
      accounts: [],
      lastWinner: ''
  };
  
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
    this.getMetamaskAccounts();
  }

  getMetamaskAccounts = async () => {
    let accounts= [];
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
    this.setState({ accounts })
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = this.state.accounts;

    if (accounts.length > 0 && accounts[0]) {
      this.setState({ message: 'Waiting on transaction success...' });

      try {  
        await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });
        this.setState({ message: 'You have been entered!' });
      }
      catch (error) {
        this.setState({ message: error.message });
      }
    }
  }

  onClick = async () => {
    const accounts = this.state.accounts;

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const lastWinner = await lottery.methods.lastWinner().call();
    this.setState({ lastWinner });
    this.setState({ message: 'A winner has been picked!' });
  }

  render() {  
     return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by: {this.state.manager}.
          There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        {
          this.state.lastWinner && (
            <p>The winner of the lottery is: {this.state.lastWinner}.</p>
          )  
        }
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
