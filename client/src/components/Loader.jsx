import { Dna, Radio } from "react-loader-spinner";
const Loader = ({ isImage }) => {
   return (
      <div className="w-full h-full flex items-center justify-center">
         {isImage ? (
            <Dna
               visible={true}
               height="80"
               width="80"
               ariaLabel="dna-loading"
               wrapperStyle={{}}
               wrapperClass="dna-wrapper"
            />
         ) : (
            <Radio
               visible={true}
               height="80"
               width="80"
               ariaLabel="radio-loading"
               wrapperStyle={{}}
               wrapperClass="radio-wrapper"
            />
         )}
      </div>
   );
};

export default Loader;
