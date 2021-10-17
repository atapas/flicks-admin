import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const BarByTopics = () => {
  const [data, setData] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    fetch("https://functions-app-greenroots.harperdbcloud.com/library/books/by-topic")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);
  

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Books by Topics</h2>
    { 
      isLoading 
      ? (<h3>Loading...</h3>)
      : (
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="numberOfBooks" fill="#8491d8" />
      </BarChart>
      ) 
    }
    </div>
  );
};

export default BarByTopics;
