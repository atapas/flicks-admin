import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import Heading from "../Heading";

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
      <Heading text={`All books by topics`}/>
    { 
      isLoading 
      ? (<h3>Loading...</h3>)
      : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
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
      </ResponsiveContainer>
      ) 
    }
    </div>
  );
};

export default BarByTopics;
