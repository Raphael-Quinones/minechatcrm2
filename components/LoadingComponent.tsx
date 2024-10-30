import Image from "next/image";

const LoadingComponent = () => {
  return (
    <div className="flex w-full h-full items-center justify-center gap-5">
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
  );
};

export default LoadingComponent;
