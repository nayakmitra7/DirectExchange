import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import ReactTable from "react-table"; 
import 'react-table/react-table.css';
import Card from 'react-bootstrap/Card';
import './prevailingRate.css';

export default class PrevailingRate extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading:true
        }
    }
    async getUsersData(){
        const res = await axios.get('');
        console.log(res.data);
        this.setState({users: res.data, loading:false});
    }
    componentDidMount() {
        if (!this.state.hasMetRequirement) {
            this.getUsersData();
        }
    }
    render() {
        const columns = [{  
            Header: 'Currency',  
            accessor: 'id',
           }
           ,{  
            Header: 'USD - US Dollar',  
            accessor: 'name' ,
            }
           ,{  
           Header: 'EUR - Euro',  
           accessor: 'username' ,
           }
           ,{  
           Header: 'INR - Indian Rupee',  
           accessor: 'phone',
           },
           {  
            Header: 'GBP - British Pound',  
            accessor: 'email',
            },
            {  
              Header: 'RMB - Ren Min Bi',  
              accessor: 'website',
              }
        ]
          return (
            <div>        
            <Navbar></Navbar>
            <Container>
                <Card className="card-prevailing-rates">
                    <Card.Header className="card-header-prevailing-rates" style={{textAlign:'center'}}><h2>Currency Exchange Rates</h2></Card.Header>                  
                        <ReactTable  
                        data={this.state.users}  
                        columns={columns}  
                        showPagination={false}
                        defaultPageSize={5}
                        />
                    </Card>
            </Container>
            </div> 
          )
    }
}
//export Home Component
