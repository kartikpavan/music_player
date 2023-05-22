import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
   return (
      <div>
         <h1>Resource not found</h1>
         <Link className="text-red-700 underline underline-offset-4" to={"/"}>
            &lt;- Back to homepage
         </Link>
      </div>
   );
};

export default Notfound;
