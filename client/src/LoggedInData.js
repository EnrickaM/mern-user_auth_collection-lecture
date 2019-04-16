import React, { Component } from 'react';

class LoggedInData extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            message: "",
        };
        console.log(this.props.logInfo);
    }

    ToDoItemSubmit=(e)=>{
        e.preventDefault();
        fetch('/users/addToDo',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.props.logInfo.username,
                todoItem: e.target.todoItem.value,
            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({message: response}));
    };

    render(){
        if(!this.props.logInfo.loggedIn){
            return(<div>
                <h1>NOT LOGGED IN!!!</h1>
            </div>);
        }

        else {
            return (
                <div>
                    <h1>Welcome {this.props.logInfo.username}</h1>
                    <form onSubmit={this.ToDoItemSubmit}>
                        <p>
                            <label htmlFor={"todoItem"}>Enter an additional to do item:</label>
                            <input type="text" id={"todoItem"} name={"todoItem"}/>
                        </p>
                        <button>Submit</button>
                    </form>
                    {this.state.message}
                </div>
            );
        }
    }
}

export default LoggedInData;