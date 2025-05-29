import React from "react"

const Dates: React.FC = () => {
    return(
    <div className="bg-[#c2bab2] p-4 rounded-md shadow-md">
      <h3 className="text-gray-800 font-semibold mb-4">Dates</h3>
      <div className="flex justify-between text-sm text-gray-700 space-y-2">
        <div>
          <p className="font-medium">Created</p>
          <p>17/03/25</p>
        </div>
        <div>
          <p className="font-medium">Updated</p>
          <p>–</p>
        </div>
      </div>
    </div>
    );
}

export default Dates;