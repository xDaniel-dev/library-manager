import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { IBook } from "../interfaces/user";

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartDataLabels
);

export function createCategoryChart(books: IBook[]): void {

    const categories: Record<string, number> = {};

    books.forEach(book => {
        categories[book.category] =
            (categories[book.category] || 0) + 1;
    });

    const canvas = document.getElementById("categoryChart") as HTMLCanvasElement;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: Object.keys(categories),

            datasets: [{

                label: "Livros",

                data: Object.values(categories),

                backgroundColor: [
                    "#198754",
                    "#0d6efd",
                    "#fd7e14",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                    "#ffc107",
                    "#0dcaf0",
                    "#6c757d",
                    "#6610f2"
                ],

                borderRadius: 12,

                borderSkipped: false,

                barThickness: 45

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1800,

                easing: "easeOutExpo"

            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#212529",

                    displayColors: false,

                    callbacks: {

                        label(context) {
                            return `${context.raw} livro(s)`;
                        }

                    }

                },

                datalabels: {

                    anchor: "end",

                    align: "top",

                    color: "#495057",

                    font: {

                        size: 14,

                        weight: "bold"

                    }

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    },

                    ticks: {

                        font: {

                            size: 13,

                            weight: "bold"

                        }

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0,

                        stepSize: 1

                    },

                    grid: {

                        color: "#ececec"

                    }

                }

            }

        }

    });

}