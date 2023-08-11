
// import React from "react";
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// const style = {
//   top: 0,
//   left: 350,
//   lineHeight: "24px"
// };

// export default function Example({data}) {

  

//   const dataToUse = data;
//   console.log(dataToUse);
  
//   return (
//     <RadialBarChart
//       width={200}
//       height={200}
//       cx={100}
//       cy={82}
//       innerRadius={25}
//       outerRadius={115}
//       barSize={10}
//           data={dataToUse}
          
//     >
//       <RadialBar
//         minAngle={15}
//         background
//         clockWise
//         dataKey="uv"
//       />
//     </RadialBarChart>
//   );
// }





import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function Chart() {

    const percentage = 66;

  return (
    <>
      <CircularProgressbarWithChildren
        value={75}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: "#b1b2ff",
          trailColor: "#f2f2f2"
        })}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: "75%" }}>
          <CircularProgressbarWithChildren
            value={70}
            strokeWidth={11}
            styles={buildStyles({
              pathColor: "#000",
              trailColor: "#f2f2f2"
            })}
          >
            <div style={{ width: "62%" }}>
                <CircularProgressbar
                  value={70}
                  strokeWidth={16}
                styles={buildStyles({
                    pathColor: "#e8a0bf",
                    trailColor: "#f2f2f2"
                  })}
                />
            </div>
            
          </CircularProgressbarWithChildren>
        </div>
      </CircularProgressbarWithChildren>
    </>
    )
    
}


export function Progress() {
  const data = 80;
  return (
    <>
      <CircularProgressbar
        value={data} text={`${data}%`}
        styles={buildStyles({
            textColor: "#404555",
            pathColor: "#b1b2ff",
            trailColor: "#e5e7eb",
            textWidth: "900"
        })}
      />
    </>
  )
}
