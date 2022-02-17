import React from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',

        },
    },
    type: 'bar',
    scales: {
        x: {
            grid: {
                display: false,
            },

        },
        y: {

            grid: {
                display: false,
            },
            ticks: {
                display: false,

            },
            label: {
                display: true,
                fontSize: 15,
                fontColor: "black",
                fontStyle: "bold",
                labelString: "True Positive Rate"
            }
        },

    },
    
};



export function Grafic(props) {
    return <Bar options={options} data={
        {
            labels: props.labels,
            datasets: [
                {
                    stack: 1,
                    label: "Com Aporte",
                    data: props.dataSetSemAporte,
                    backgroundColor: "#000000"
                },
                {
                    stack: 1,
                    label: "Sem Aporte",
                    data: props.dataSetComAporte,
                    backgroundColor: "#ed8e53"
                }
            ]
        }
    } />;
}
