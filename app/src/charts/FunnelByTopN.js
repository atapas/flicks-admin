import React, { useState, useEffect } from "react";

import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Heading from "../Heading";

const FunnelByTopN = () => {
  const [data, setData] = useState([]);
	const [metric, setMetric] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);
	const getColor = value => {
		if (metric === 'rating') {
			if (value >= 1 && value < 2) {
				return "#ff5328";
			} else if (value >= 2 && value < 3) {
				return "#FF8042";
			} else if (value >= 3 && value < 4) {
				return "#FFBB28";
			} else if (value >= 4 && value < 5) {
				return "#28dfffcf";
			} else if (value === 5) {
				return  "#4eaf0d";
			}
		} else if (metric === 'views') {
			if (value >= 0 && value < 100) {
				return "#ff5328";
			} else if (value >= 100 && value < 200) {
				return "#FF8042";
			} else if (value >= 200 && value < 500) {
				return "#FFBB28";
			} else if (value >= 500 && value < 1000) {
				return "#28dfffcf";
			} else if (value >= 1000) {
				return  "#4eaf0d";
			}
		}
	}
	const transform = (data) => {
		const transformed = data.map(book => {
			return {'name': book.title, 'value': book[metric], 'fill': getColor(book[metric])}
		});
		// sort by value
		transformed.sort((a, b) => {
			return b.value - a.value;
		});
		// return top 5
		return transformed.slice(0, 5);
	}
  useEffect(() => {
    fetch(
      "https://functions-app-greenroots.harperdbcloud.com/library/books"
    )
      .then((res) => res.json())
      .then((data) => {
				const transformed = transform(data);
				console.log(transformed);
        setData(transformed);
        setIsLoading(false);
      });
  }, [metric]);

	const toggleMetric = () => {
		if (metric === 'rating') {
			setMetric('views');
		} else {
			setMetric('rating');
		}
	}

  return (
	<div>
		<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline'}}>
			<Heading text={`Top 5 books`}/>
			<button
				className="topNToggleBtn" 
				style ={{marginLeft: '0.5rem'}}
				onClick={toggleMetric}>{metric === 'rating' ? 'by Rating' : 'by Views'}</button>
		</div>			
		{
			isLoading ? (
				<div>Loading...</div>
			) : (  
				<ResponsiveContainer width="100%" height={300}>
				<FunnelChart>
					<Tooltip />
					<Funnel dataKey="value" data={data} isAnimationActive>
					<LabelList
						position="insideTop"
						fill="#000"
						stroke="none"
						dataKey="name"
					/>
					</Funnel>
				</FunnelChart>
				</ResponsiveContainer>
			)
		}
	</div>
  );
};

export default FunnelByTopN;
