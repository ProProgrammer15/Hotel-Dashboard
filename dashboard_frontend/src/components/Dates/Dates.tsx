import React from "react";
import { formatDate } from "../../utils/utils";

const Dates: React.FC = ({ createdAt, updatedAt }) => {
  return (
    <div className="bg-neutral text-dark p-4">
      <h3 className="font-sans text-2xl font-semibold mb-4">Dates</h3>
      <div className="flex justify-between text-sm  space-y-2">
        <div>
          <p className="font-medium">Created</p>
          <p id="created_at_date" className="font-merriweather">
            {createdAt ? formatDate(createdAt) : "-"}
          </p>
        </div>
        <div>
          <p className="font-medium">Updated</p>
          <p id="updated_at_date" className="font-merriweather">
            {updatedAt ? formatDate(updatedAt) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dates;
