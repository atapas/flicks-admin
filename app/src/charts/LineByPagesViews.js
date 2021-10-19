import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import Heading from "../Heading";

const LineByPagesViews = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://functions-app-greenroots.harperdbcloud.com/library/books/by-pages-views"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Heading text={`All books by pages and views`}/>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
        <ResponsiveContainer width="98%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip labelStyle={{color: '#000'}}/>
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#746fcf" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pages" stroke="#63bd85" />
          </LineChart>
        </ResponsiveContainer>
        )
      }
    </div>
  );
};

export default LineByPagesViews;
