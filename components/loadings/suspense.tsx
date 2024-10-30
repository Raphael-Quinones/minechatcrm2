import React from "react";
import Image from "next/image";

type Props = {};

const SuspenseLoading = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="flex items-center p-20 space-x-5">
        <div className="border p-2 rounded-full animate-spin">
          <Image
            src="/favicon.ico"
            alt="Loading"
            width={10}
            height={10}
            className="w-4 h-4"
          />
        </div>
        <span className="animate-pulse">Loading ...</span>
      </div>
    </div>
  );
};

export default SuspenseLoading;
