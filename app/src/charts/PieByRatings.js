import React, { useState, useEffect } from "react";

import { 
    PieChart, 
    Pie, 
    Sector, 
    Cell,
    Tooltip,
    Legend } from 'recharts';

const PieByRatings = () => {
    const [data, setData] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        fetch("https://functions-app-greenroots.harperdbcloud.com/library/books/by-rating")
        .then((res) => res.json())
        .then((data) => {
            const dataArray = [];
            Reflect.ownKeys(data).forEach((key) => {
                dataArray.push({
                    name: key,
                    value: data[key]
                });
            });

            console.log(dataArray);
            
            setData(dataArray);
            setIsLoading(false);
        });
    }, []);
    const COLORS = ["#ff5328","#FF8042", "#FFBB28", "#28dfffcf", "#4eaf0d"];

    return(
        <div>
            <h2 style={{textAlign: 'center'}}>Books by Ratings</h2>
            {
                isLoading ?
                (<h3>Loading...</h3>) :
                (<PieChart width={500} height={300}>
                    <Pie
                        data={data}
                        cx={250}
                        cy={130}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>)
            }

        </div>
    )
}

export default PieByRatings;
