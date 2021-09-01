import React, { Component } from 'react'
import axios from 'axios';
import './Table.css';
import BodyTable from './RowTable';
import { Bar, Chart } from 'react-chartjs-2';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            data: [],
            labels: [],
            rollingRetention: null,
            getFullTime: "",
            getActionTime: "",
            getDataTime: ""
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
                <button type="submit" className="buttonInsert btn btn-outline-primary mr-4 mb-4" onClick={this.insertItemList.bind(this)}>Save</button>
                <button type="submit" className="buttonInsert btn btn-outline-primary mr-4 mb-4" onClick={this.GetChart.bind(this)}>Calculate</button>
                <button type="submit" className="buttonInsert btn btn-outline-primary mr-4 mb-4" onClick={this.RemoveData.bind(this)}>Remove Data</button>
                <div className="rolling">
                    Rolling Retention 7 Day = {this.state.rollingRetention} %
                </div>
                {/* /*Скелет графика*/}
                <div>
                    <Bar data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                label: "Duration Days Live",
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
                </div >
                {/*Профилирование*/} 
                <div className="rolling">
                <p>Время на обращение и взятие данных из БД: {this.state.getDataTime} мс.</p>
                <p>Время на подсчёт значений для графика: {this.state.getActionTime} мс.</p>
                <p>Общее время выполнения: {this.state.getFullTime} мс.</p>
                </div>
            </div>
        )
    };

    /* Добавление данных в БД */
    /*  Не получилось сделать динамическую подгрузку строк, поэтому каждый элемент добавляется отдельно */
    async insertItemList() {
        let dataData = document.getElementById('111')
        let dataData1 = document.getElementById('222')
        
        let dataData2 = document.getElementById('333')
        let dataData3 = document.getElementById('444')

        let dataData4 = document.getElementById('555')
        let dataData5 = document.getElementById('666')

        let dataData6 = document.getElementById('777')
        let dataData7 = document.getElementById('888')

        let dataData8 = document.getElementById('999')
        let dataData9 = document.getElementById('121') 


        const response = await axios.post("http://localhost:17133/api/Employee/Post", {
            'dateRegistration': dataData.value,
            'dateLastActivity': dataData1.value
        }).then(response => {
            console.log(response)
        }).catch((error=> { console.log(error.response)}));
        
        
        const response1 = await axios.post("http://localhost:17133/api/Employee/Post", {
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
        });
        alert("Data inserted successfully");
    }

    /*Построение графика и рассчёт Rolling Retention */
    async GetChart() {
        this.setState({ items: [] });
        const response = await axios.get("http://localhost:17133/api/Employee/GetChart");
        let data = [];
        let labels = [];
        let getActionTime = "";
        let getDataTime = "";
        let getFullTime = "";

        this.setState({ response: response });
        response.data.forEach((item, i) => {
            data.push(item.num)
            labels.push(item.userID)
        })
        getActionTime = response.data[5].getActionTime
        getDataTime = response.data[4].getDataTime
        getFullTime = response.data[5].getFullTime
        this.setState({ data: data,
             labels: labels,
             getActionTime: getActionTime,
             getDataTime: getDataTime,
             getFullTime: getFullTime
             })
        console.log(response.data)
        const response2 = await axios.get("http://localhost:17133/api/Employee/GetRetention");
        let num;
        num = response2.data;
        this.setState({rollingRetention : num});
    }

    /*Удаление данных из БД */
    async RemoveData(){
        const response = await axios.delete("http://localhost:17133/api/Employee/DeleteBulk");
        alert("Data removed successfully ");
    }
}
export default Table;