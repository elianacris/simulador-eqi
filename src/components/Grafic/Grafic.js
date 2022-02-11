import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
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
        },

    },
};

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export const data = {
    labels,
    datasets: [
        {
            label: "Com Aporte",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "#ed8e53"
        },
        {
            label: "Sem Aporte",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "#000000"
        }
    ]
};

export function Grafic() {
    return <Bar options={options} data={data} />;
}
