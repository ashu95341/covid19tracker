import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for(let date in data.cases){
        if (lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint= data[casesType][date];
        // console.log(data[casesType][date])
    }
    return chartData;
};

function LineGraph({casesType="cases"}) {
    const [data, setData] = useState({});
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    // console.log(data)
    

    useEffect(() => {
        const fetchData = async() => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response)=>(response.json()))
            .then((data)=>{
                 //added this line 
            // data = JSON.parse(data);
            // console.log(data)

            const chartData = buildChartData(data, casesType);
            // console.log(chartData)

            setData(chartData);
            // console.log(data)

        });
        }
        fetchData();
            // console.log(data)
            // console.log(data.cases[date])
            
            // console.log(data['cases'])
            // data.cases.forEach((date)=>(
            //    console.log(date) 
                       
                    
                
                
            // )
           
    }, [casesType]);

        
    
    
    return (
        <div> 
            <h1>I am a graph</h1>
            {/*optional chaining*/}
            {data?.length > 0 && (
                <Line
                data={{
                    datasets: [{
                        //backkgroundcolor and border color skipped
                        border: 'black',
                        data: data
                    }],
                }}
                
            />
            )}
            
        </div>
    )
}

export default LineGraph
