import React, {useState, useEffect} from 'react';
import {fetchDailyDataFromApi} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Charts.module.css';


const Charts = ({data: {confirmed, deaths, recovered} , country}) => {
    
    const [dailyData, setDailyData] = useState([]);

    useEffect( () => {
        const fetchApi = async() => {
            setDailyData(await fetchDailyDataFromApi());
        }
        fetchApi();
    }, [])

    const lineChart = (
        dailyData.length?
        (<Line 
            data = {{
                labels: dailyData.map(({date})=> date ),
                datasets: 
                [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    labels: 'Infected Count',
                    fill: true,
                    borderColor: '#3333ff'
                },
                {
                    data: dailyData.map(({deaths}) => deaths),
                    labels: 'Death Count',
                    fill: true,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)'
                }
                ]
            }}
        />): null
    );

    // console.log(data.confirmed.value , data.recovered.value , data.deaths);

    const barChart = (
        confirmed
        ?  (
            <Bar
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label:'People',
                        backgroundColor:[
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)', 
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value , recovered.value, deaths.value]
                    }]
                }}
                options ={{
                    legend: {display: false},
                    title: {display: true , text: `Current State of COVID in ${country}`}
                }}
            />
        ): null
    );
    
    return(
        <div className= {styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;