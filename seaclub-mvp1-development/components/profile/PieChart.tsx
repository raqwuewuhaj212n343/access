import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IChartProps {
    showLegend: boolean,
    labels?: string[]
    series: number[]
    width: number
}

const PieChart = ({ showLegend, labels, series, width }: IChartProps) => {
    const options = {
        labels: labels ? labels : [''],
        stroke: {
            show: false,
        },
        chart: {
            offsetX: labels ? -25 : 0,
        },
        responsive: [{
            breakpoint: 1050,
            options: {
                chart: {
                    width: 300,

                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'left',
                    height: '100%'
                }
            }
        }, {
            breakpoint: 900,
            options: {
                chart: {
                    width: 275
                },
                plotOptions: {
                    pie: {
                        offsetY: 20,
                        customScale: 1.9,
                    }
                }
            }
        }, {
            breakpoint: 700,
            options: {
                chart: {
                    width: 275
                },
                plotOptions: {
                    pie: {
                        offsetX: -40,
                        offsetY: 20,
                        customScale: 1.8,
                    }
                }
            }
        }],

        colors: ['#222D4E', '#415387', '#8797C7', '#96A9DC', '#C7D1F3'],
        legend: {
            show: showLegend,
            fontSize: '12px',
            fontFamily: 'var(--helvetica-font-family)',
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: '#999999'
            },
            markers: {
                width: 12,
                height: 12,
                radius: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (value: any) => '', // Empty string to hide the series value
            },
        },

    }

    if (typeof window === 'undefined') {
        return null;
    } else {
        return <Chart options={options} series={series} type="pie" width={width} />;
    }
};

export default PieChart;