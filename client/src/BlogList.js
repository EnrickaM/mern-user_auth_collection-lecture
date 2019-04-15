import React, { Component } from 'react';

class BlogList extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData=()=>{
        fetch('/users/')
            .then(data=>data.json())
            .then(response=>this.setState({data:response}));
    };

    render(){
        let userMap = this.state.data.map(
            (eachElement)=>{
                return(<h4 key={eachElement._id}>{eachElement.name}@{eachElement.email}</h4>)
            }
        );

        return(
            <div>
                <p>Users</p>
                {userMap}
            </div>
        );
    }
}
export default BlogList;