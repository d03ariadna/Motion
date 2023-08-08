import { DatePicker } from "../components/general/DatePicker"
import { CircularProgressbar } from 'react-circular-progressbar';
import ColorPicker from "../components/general/ColorPicker";
import 'react-circular-progressbar/dist/styles.css';
export default function Settings() {
    const percentage = 66;
    return (
        <>
            
            <h1>Settings</h1>
            <DatePicker />
            <div className="w-32"><CircularProgressbar value={percentage} text={`${percentage}%`} /></div>
            <ColorPicker/>
        </>
        
    )
}


