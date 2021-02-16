import ReactEcharts from 'echarts-for-react'
import { useState, useEffect } from 'react';

const EchartStacked = ({generate, setGenerate, ipAddress, setIpAddress}) => {
    const host = `http://${ipAddress}/api/battery-series/data`
    const toPercentage = (params) => {
        return `${Math.round(params.value / 950 * 100)}%`
    }
    const chartOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show: false
        },
        xAxis: [
            {
                show: false,
                type: 'category',
                data: ['value'],
            }
        ],
        yAxis: [
            {
                show: false,
                type: 'value',
                max: 950,
                min: 0,
            }
        ],
        series: [
            {
                name: 'LVD',
                type: 'bar',
                stack: 'a',
                data: [0],
                itemStyle: {
                    color: 'rgba(0, 135, 222, 1)'
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 18,
                    fontWeight: 'bold',
                    formatter: (params) => toPercentage(params)
                },
                tooltip: {
                    formatter: (params) => `${params.value + 2700}`
                }
            },
            {
                name: 'Min',
                type: 'bar',
                stack: 'a',
                data: [0],
                itemStyle: {
                    color: 'darkorange'
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 15,
                    formatter: (params) => toPercentage(params),
                },
                tooltip: {
                    formatter: (params) => params.value
                }
            },
            {
                name: 'Average',
                type: 'bar',
                stack: 'a',
                data: [0]
            },
            {
                name: 'Max',
                type: 'bar',
                stack: 'a',
                data: [0],
                itemStyle: {
                    color: '#fec000'
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 15,
                    formatter: (params) => toPercentage(params)
                },
                tooltip: {
                    formatter: (params) => params.value
                }
            },
            {
                name: 'HVD',
                type: 'bar',
                stack: 'a',
                data: [0],
                itemStyle: {
                    color: 'silver'
                },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 18,
                    fontWeight: 'bold',
                    formatter: (params) => toPercentage(params)
                },
                tooltip: {
                    formatter: (params) => `${3650 - params.value}`
                }
            },
        ]
    }

    const [option, setOption] = useState(chartOption)
    const getData = async () => {
        const data = await fetch(host)
        const dataJson = await data.json()
        return dataJson
    }
    const [avgVolt, setAvgVolt] = useState(0)
    const processData = (data) => {
        const lvd = data.cell_min_volt - 2700
        const hvd = 3650 - data.cell_max_volt
        const min = data.avg_cell_volt - data.cell_min_volt
        const max = data.cell_max_volt - data.avg_cell_volt
        setAvgVolt(data.avg_cell_volt)
        return [lvd,min,0,max,hvd]
    }
    const updateData = (data) => {
        const updateOption = {
            ...option,
            series: option.series.map((opt,i) => opt ? {
                ...opt, data: [data[i]]} : opt
            )
        }
        setOption(updateOption)
    }

    const getOption = () => {
        return option
    }

    useEffect(() => {
        const timer = setInterval(async () => {
            const data = await getData()
            const dataArray = processData(data)
            updateData(dataArray)
        }, 1000)
        return () => clearInterval(timer)
    })

    return (
        <div style={{padding: '10px'}}>
            <div style={{height: '800px', display: generate ? "block" : "none", backgroundColor: 'whitesmoke'}}>
                <btn className='btn' style={{dislay: 'none', '-webkit-app-region': 'no-drag'}} onClick={() => {setGenerate(false); setIpAddress('')}}>Back</btn>
                <h1>RMS Monitoring</h1>
                <ReactEcharts
                    style={{height: `90%`, width: '30%', display: generate ? 'block' : 'none', marginLeft:'auto', marginRight:'auto', backgroundColor: 'whitesmoke', "-webkit-app-region": "no-drag"}}
                    option={getOption()}
                    opts={{ renderer: 'svg'}}
                />
            </div>
        </div>
    )
}

export default EchartStacked
