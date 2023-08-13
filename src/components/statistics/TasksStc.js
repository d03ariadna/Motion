import { useTranslation } from "react-i18next";
import { Chart } from "./RadialChart";

import { useTasks } from "../../context/TasksContext";

export default function TasksStc() {

    const [t, i18n] = useTranslation("global");

    const tasks = useTasks();

    const getPercentages = () => {
        let total = [0, 0, 0]
        
        //Get number of Tasks
        tasks.map((task) => {

            if (task.status === 'TO DO') {
                total[0] = total[0] + 1;
            } else if (task.status === 'DOING') {
                total[1] = total[1] + 1;
            } else if (task.status === 'DONE') {
                total[2] = total[2] + 1;
            }
            

        });

        //Calculate Percentages
        total[0] = (total[0] / tasks.length) * 100;
        total[1] = (total[1] / tasks.length) * 100;
        total[2] = (total[2] / tasks.length) * 100;
        

        return total;
    }

    const percentages = getPercentages();


    return (
        <>
            <div className="bg-white border-[1px] border-gray-200 w-[35%] h-full rounded-3xl flex flex-row ">
              <div className="w-[45%] pt-10 pl-8">
                <div className="flex flex-row  items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-[#B1B2FF] rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.do")}
                  </p>
                </div>
                <div className="flex flex-row  items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-black rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.doing")}
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-[#E8A0BF] rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.done")}
                  </p>
                </div>
              </div>
              <div className="w-[55%]">
                <div className="w-[75%] h-[85%] ml-3 mt-3">
                        <Chart percentages={percentages}/>
                </div>
              </div>
            </div>
        </>
    )
}