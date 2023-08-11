import { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState('#000000');

  console.log("colorPicker", color);

    return (
        <div className="flex flex-row">
            {/* <p className="mb-0 mr-4 text-xl font-light tracking-widest text-gray-400">{color}</p> */}
            <input
                className="w-full rounded-xl h-10"
                type="color" value={color} onChange={e => setColor(e.target.value)} />
            
        </div>
  );
}

export default ColorPicker;