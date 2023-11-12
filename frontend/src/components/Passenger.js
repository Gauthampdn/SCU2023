import React from 'react';
import { withRouter } from 'react-router-dom';
import './Passenger.css';

class RideForm extends React.Component {
  handleAskForFare = () => {
    // Logic for asking the passenger how much they are willing to pay
    alert('How much are you willing to pay for this ride?');
  };

  handleCancel = () => {
    // Logic for canceling the ride and redirecting to the homepage
    this.props.history.push('/'); // Redirect to homepage
  };

  render() {
    return (
      <div>
        <h2>Ride Request Form</h2>
        <form>
          <label>
            How much are you willing to pay for this ride?
            <input type="text" placeholder="$5.00" />
          </label>
          <button type="button" onClick={this.handleAskForFare}>
            Ask for Fare
          </button>
          <button type="button" className="cancel-button" onClick={this.handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(RideForm);