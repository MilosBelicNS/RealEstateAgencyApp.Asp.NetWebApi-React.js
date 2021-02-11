import React, {Component} from 'react'
import axios from 'axios'




class RegLogForms extends Component {
    constructor() {
        super()
        this.state = {
            isLog: true,
            email: "",
            password: "",
            password2: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({ [name]: value })  //metoda koja setuje stanje atributa klase

    }
    register = () => { //register metoda


        const registerData = {  //json objekat za registraciju
            Email: this.state.email,
            Password: this.state.password,
            ConfirmPassword: this.state.password2,
        }

        axios("https://localhost:44378/api/Account/Register", { //komanda za ajax
            method: "POST",
            data: registerData
        }).then(() => {
            this.setState({ email: "", password: "", password2: "" })
            alert("Registration successful!")
        })
            .catch(() => {
                alert("User Registration failed! \n Please fill all fields. The password must contain at least a combination of 6 symbols, an uppercase letter and a number!")
            })
    }

    login = () => {
        fetch("https://localhost:44378/Token", { 
            method: "POST",
            body: 'grant_type=password&username=' + this.state.email + '&password=' + this.state.password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => response.json())//prebaci mi odgovor u json odgovor, parsira se u json jer smo ga dobili kao string
            .then(data => {
                if (!data.access_token) {
                    alert("Login failed! \nPlease try again! ")
                    this.setState({ email: "", password: "" })
                    return;
                }
                
                sessionStorage.setItem("token", data.access_token) //snimi token u sesion storage
                console.log(sessionStorage.getItem("token"))
                sessionStorage.setItem("user", this.state.email)//snimi ime korisnika u session storage tj email
                this.setState({ email: "", password: "" })// isprazni inpute
                window.location.reload() //ocitaj stranicu ovog puta ulogovan
            })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState(prevState => {
            return ({ isLog: !prevState.isLog })
        })  //metoda koja menja atribut prijave na true ili false

    }

    navigateBack = function () {
        this.goHomePage();
        
    }  //reload homepage 

    handleSubmit = (event) => {
        event.preventDefault()
        if (!this.state.isLog) {
            this.register()
        } else {
            this.login()
        }   //u slucaju da je prijava daj mi formu prijave, a ako nije prijava daj mi registraciju
    }

    render() {
        return (
            
            <div className= "container">
               {/**/}
   
                  <div className='row'>


                    <form className="form-horizontal" style={{ marginLeft:'36%', marginTop: "10%"}}>
                        <h3>Register and login</h3>
                       <br/>
                      <div className='form-inline'>
                          <label style={{marginRight:'8px'}} > <strong> Username: </strong> </label>
                          <div className='col-sm-8'>
                             <input style={{width:'120%'}}
                              type="text"
                              placeholder="Username/email"
                              className="form-control"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                           />
                           </div>
                       </div>
                <br />
                <div className='form-inline'>
                    <label style={{marginRight:'10px'}}> <strong> Password: </strong> </label>
                    <div className='col-sm-8'>
                    <input type="password"
                           placeholder="Password"
                           className="form-control"
                           name="password"
                           value={this.state.password}
                           onChange={this.handleChange}
                      />
                      </div>
                      </div>
                <br />

                {this.state.isLog ? null : <div className='form-inline'>
                    <label style={{marginRight:'10px'}}> <strong>Password: </strong> </label>
                    <div className='col-sm-8'>
                    <input type="password"
                        placeholder="Repeat password"
                        className="form-control"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleChange}
                    />
                    </div>
                    <br />
                </div>
                
                }
                 <br /> 
                 <br />
                 
                <button onClick={this.handleClick} className="btn btn-info" style={{ marginRight: "25px" }}> {this.state.isLog ? "Registration" : "Log"} </button>
                <button onClick={this.navigateBack} className="btn btn-danger" style={{ marginLeft: "15px" }}> Back </button> 
                <button onClick={this.handleSubmit} className="btn btn-info" style={{ marginLeft: "40px" }}> {this.state.isLog ? "Login" : "Register"}  </button>
                
               
            </form>
            
            </div>
            </div>
            
        )
    }
}

export default RegLogForms