import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

import { LeftIcon, RightIcon } from "../icons/icons";


export function DatePicker(props) {
	
	const options = {
		autoHide: true,
		todayBtn: false,
		clearBtn: false,
		maxDate: new Date("2050-01-01"),
		minDate: new Date("2000-01-01"),
		theme: {
			background: "bg-gray-100 ",
			todayBtn: "bg-purple-500",
			clearBtn: "",
			icons: "",
			text: "",
			disabledText: "text-gray-400",
			input: "font-normal text-base text-gray-600 bg-white border-2 border-gray-200 rounded-xl",
			inputIcon: "text-gray-300",
			selected: "bg-black",
		},
		icons: {
			// () => ReactElement | JSX.Element
			prev: () => <LeftIcon/>,
			next: () => <RightIcon/>,
		},
		datepickerClassNames: "top-54",
		defaultDate: props.dateSet,
		language: "en",
	}


    const [show, setShow] = useState(false);
	
	const handleClose = (state) => {
        setShow(state);
	}

	return (
		<div>
            <Datepicker
                options={options}
                onChange={(e) => {
                    props.setDate(e)
                }}
                show={show}
                setShow={handleClose}
            />
		</div>
	)
}

