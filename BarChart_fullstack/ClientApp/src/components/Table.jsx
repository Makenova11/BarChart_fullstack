import React, { Component } from 'react'
import axios from 'axios';
import './Table.css';
import BodyTable from './RowTable';
import { Bar, Chart } from 'react-chartjs-2';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRegistration: new Date(),
            dateActivity: new Date(),
            chartData: {},
            data: [],
            labels: []
        }

    }
    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead className="thead-inverse">
                        <tr>
                            <th className="tableRow">Data Registration</th>
                            <th className="tableRow">Date Last Activity</th>
                        </tr>
                    </thead>
                    <BodyTable />
                </table>
                <button type="submit" className="buttonInsert btn btn-outline-primary mr-4" onClick={this.insertItemList.bind(this)}>Save</button>
                {/* <button type="submit" className="buttonInsert btn btn-outline-primary" onClick={this.getData.bind(this)}>Get Data</button> */}
                <button type="submit" className="buttonInsert" onClick={this.GetChart.bind(this)}>Calculate</button>
                <div>
                    <Bar data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                label: "Duration",
                                data: this.state.data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            }
                        ],
                    }
                    }
                    />
                </div>
            </div>
        )
    };

    /*  Не получилось сделать динамическую подгрузку строк, поэтому каждый элемент добавляется отдельно */
    async insertItemList() {
        let dataData = document.getElementById('111')
        let dataData1 = document.getElementById('222')
        this.setState({dateRegistration : dataData, dateLastActivity:dataData1})
        console.log(JSON.stringify(dataData.value), JSON.stringify(dataData1.value))
        
        /* let dataData2 = document.getElementById('333')
        let dataData3 = document.getElementById('444')

        let dataData4 = document.getElementById('555')
        let dataData5 = document.getElementById('666')

        let dataData6 = document.getElementById('777')
        let dataData7 = document.getElementById('888')

        let dataData8 = document.getElementById('999')
        let dataData9 = document.getElementById('121') */


        /* await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData.value,
            'dateLastActivity': dataData1.value
        }); */
        /* console.log(dataData.value) */

        await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData.value,
            'dateLastActivity': dataData1.value
        }).then(response => {
            console.log(response)
        }).catch((error=> { console.log(error.response)}));
        
       
        /* await fetch('http://localhost:17133/api/Employee/Post', {
            method: 'POST',
            mode: 'cors',

            headers: {
                'content-type': 'application/json'
            },
            
            'dateRegistration': dataData.value,
            'dateLastActivity': dataData1.value

        }) */
        
       /*  const response1 = await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData2.value,
            'dateLastActivity': dataData3.value
        });
        const response2 = await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData4.value,
            'dateLastActivity': dataData5.value
        });
        const response3 = await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData6.value,
            'dateLastActivity': dataData7.value
        });
        const response4 = await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData8.value,
            'dateLastActivity': dataData9.value
        }); */
        alert("Data is inserted successfully");
    }
    /* async getData() {
        this.setState({ items: [] });
        const response = await axios.get("http://localhost:17133/api/Employee/Get");
        let items;
        items = response.data.map((item) =>
            <table className="table" >
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Data Registration</th>
                        <th>Date Last Activity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.userID}</td>
                        <td>{item.dateRegistration}</td>
                        <td>{item.dateLastActivity}</td>
                    </tr>
                </tbody>
            </table>
        );
        this.setState({ items: items });
    } */
    async GetChart() {
        this.setState({ items: [] });
        const response = await axios.get("http://localhost:17133/api/Employee/Get");
        let data = [];
        let labels = [];
        this.setState({ response: response });
        let daysLag = Math.ceil(Math.abs(response.dateLastActivity - response.dateRegistration) / (1000 * 3600 * 24));
        
        response.data.forEach((item, i) => {
            data.push(item.dateRegistration)
            labels.push(item.userID)
        })
        this.setState({ data: data, labels: labels })
        console.log(this.state)
        let items;
    }
}
export default Table;