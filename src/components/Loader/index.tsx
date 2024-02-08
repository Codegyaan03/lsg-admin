import { Rings } from "react-loader-spinner";
import { useDataSelector } from "reduxStore/store";

const Loader = () => {
  const { isLoad } = useDataSelector("loader");

  if (!isLoad) return <></>;

  return (
    <div className="h-screen w-screen bg-[#000000ba] fixed top-0 left-0 z-[99] flex justify-center items-center">
      <Rings
        height="100"
        width="100"
        color="#1585ed"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
