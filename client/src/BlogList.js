import React, { Component } from 'react';

class BlogList extends Component{
    constructor(props) {
        super(props);
        this.state={
            todos:[],
            mappedTodos:[],
        };
    }

    componentDidMount() {
        this.fetchUserToDoData();
    }

    signInUser=(e)=>{
        e.preventDefault();
        console.log("Submitting Log in");
        fetch('/users/login',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
            .then(data=>{ return data.text()})
            .then(data=>{if(data) {
                this.props.loggedInUserInfo(data, true);
                return this.fetchUserToDoData();
            }
            else
                return this.props.loggedInUserInfo(data, false)});
    };

    // Fetch the signed in user's collection and save it in todos
    fetchUserToDoData(){
        fetch('/users/grabToDo')
            .then(data=>data.json())
            .then(response=> {
                return this.setState({todos: response.todo}, () => this.mappedTodoFunction())
            });
    }

    // Map the user's todos into a new state mappedTodos
    mappedTodoFunction(){
        let mapArray = [];
        console.log(this.state.todos);
        console.log(this.state.todos.length);
        if(this.state.todos.length>0) {
            mapArray = this.state.todos.map(
                (eachElement, index) => {
                    return (<div key={index}>
                                <p>{eachElement}</p>
                            </div>)
                }
            );
            console.log(mapArray);
        }
        else {
            console.log("no todo data for " + this.props.logInfo.username);
            mapArray = [];
        }
        this.setState({mappedTodos:mapArray});
    }

    render(){
        return(
            <div>
                {this.props.logInfo.loggedIn?
                    (<div>
                        <h1>{this.props.logInfo.username}'s data</h1>
                        {this.state.mappedTodos}
                    </div>):
                    (<div>
                        <p>Please log in</p>
                        <form onSubmit={this.signInUser}>
                            <p>
                                <label htmlFor={"username"}>Enter username:</label>
                                <input type="text" name={"username"} id={"username"}/>
                            </p>

                            <p>
                                <label htmlFor={"password"}>Enter password:</label>
                                <input type="text" name={"password"} id={"password"}/>
                            </p>
                            <button>Sign In</button>
                        </form>
                    </div>
                    )}
            </div>
        );
    }
}
export default BlogList;