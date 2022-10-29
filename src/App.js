import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    adress: "",
    email: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      adress: false,
      email: false,
      accept: false,
    },
  };

  errorMessages = {
    userNameError: "Wpisałeś błędną nazwę użytkownika",
    userAdressError: "Podałeś za krótki adres zamieszkania",
    userEmailError: "Podaj poprawny adres email",
    userAcceptError: "Wciśnij przycik!",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;

    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;

      this.setState({
        [name]: value,
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      console.log(checked);

      this.setState({
        [name]: checked,
      });
    }

    console.log(name);
  };

  formValidation = () => {
    const { username, adress, email, accept } = this.state;
    let userName = false;
    let userAdress = false;
    let userEmail = false;
    let userAccept = false;

    let correct = false;

    if (username.length <= 5 || username.indexOf(" ") !== -1) {
      userName = true;
    }

    if (adress.length <= 3) {
      userAdress = true;
    }

    if (email.length <= 3 || email.indexOf("@") === -1) {
      userEmail = true;
    }

    if (!accept) {
      userAccept = true;
    }

    if (!userName && !userAdress && !userEmail && !userAccept) {
      correct = true;
    } else {
      correct = false;
    }

    return {
      userName,
      userAdress,
      userEmail,
      userAccept,

      correct,
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();
    console.log(validation);

    if (validation.correct) {
      this.setState({
        username: "",
        adress: "",
        email: "",
        accept: false,
        message: "Brawo! zostałeś zapisany do newslettera",

        errors: {
          username: false,
          adress: false,
          email: false,
          accept: false,
        },
      });
    } else {
      this.setState({
        errors: {
          username: validation.userName,
          adress: validation.userAdress,
          email: validation.userEmail,
          accept: validation.userAccept,
        },
      });
    }
  };

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 3000);
    }
  }

  render() {
    return (
      <div className="formular">
        <h1>Newsletter</h1>
        <form>
          <label htmlFor="user">
            User Name:
            <input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <span>
              {this.state.errors.username && this.errorMessages.userNameError}
            </span>
          </label>

          <label htmlFor="user">
            Addres:
            <input
              type="text"
              name="adress"
              id="adress"
              value={this.state.adress}
              onChange={this.handleChange}
            />
            <span>
              {this.state.errors.adress && this.errorMessages.userAdressError}
            </span>
          </label>

          <label htmlFor="user">
            E-mail:
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <span>
              {this.state.errors.email && this.errorMessages.userEmailError}
            </span>
          </label>

          <label htmlFor="accept">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            />
            Wyrażam zgodę
            <span>
              {this.state.errors.accept && this.errorMessages.userAcceptError}
            </span>
          </label>

          <button onClick={this.handleSubmit}>Zapisz się!</button>
        </form>

        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
    );
  }
}

export default App;
