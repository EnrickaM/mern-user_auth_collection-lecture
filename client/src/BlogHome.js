import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BlogList from "./BlogList";
import Login from "./Login";
import AddUser from "./AddUser";
import Loggedout from "./Loggedout";
import LoggedInData from "./LoggedInData";

class BlogHome extends Component{

    constructor(props) {
        super(props);
        this.state={
            logInfo:{
                username: null,
                loggedIn: false,
            },
        };
    }

    componentDidMount() {
        this.checkForUser();
    }

    checkForUser(){
        fetch('/users')
            .then(response=>{
                // console.log(response.text());
                return response.text();
            })
                .then(data=>{
                this.setState(
                    {
                        logInfo:{
                            username: data,
                            loggedIn: true,
                        }
                    });
            });
    }

    loggedInUserInfo =(username, loggedIn)=>{
        console.log("Clear");
        console.log(username + "-" + loggedIn);
        this.setState({
            logInfo:{
                username: username,
                loggedIn: loggedIn,
            }
        });
    };

    logUserOut=()=>{
        console.log("Clicked Logout");
        fetch('/users/logout')
            .then(data=>{return data.text()})
            .then(data=>console.log(data))
            .then(()=>this.loggedInUserInfo(undefined, false))
            .catch(()=>console.log("Test"));


        // if(this.state.logInfo.loggedIn){
        //     this.loggedInUserInfo(null, false);
        // }
    };

    render(){
        return(
            <div>
                <Router>
                    <h1>Start of Page</h1>

                    <Link className="linkSpacing" to='/'>Home</Link>
                    <Link className="linkSpacing" to='/login'>Sign In</Link>
                    <Link className="linkSpacing" to='/adduser'>Add User</Link>
                    <Link className="linkSpacing" to='/loggedIn'>Logged In User's Info</Link>
                    <Link className="linkSpacing" to='/loggedout' onClick={this.logUserOut}>Log Out</Link>

                    <Route exact path='/list' component={BlogList}/>
                    <Route exact path='/login' component={()=>{return <Login logInfo={this.state.logInfo} loggedInUserInfo={this.loggedInUserInfo}/>} }/>
                    <Route exact path='/adduser' component={AddUser}/>
                    <Route exact path='/loggedIn' component={()=>{return <LoggedInData logInfo={this.state.logInfo} loggedInUserInfo={this.loggedInUserInfo}/>} }/>
                    <Route exact path='/loggedout' component={()=>{return <Loggedout/>} }/>
                </Router>
            </div>
        );
    }
}

export default BlogHome;