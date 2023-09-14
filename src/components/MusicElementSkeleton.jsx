const MusicElementSkeleton = () => {
  return (
    <div className=" bg-black/40 flex-shrink-0 w-[176px] rounded-xl shadow-xl">
      <div className="flex flex-col gap-1 p-4 rounded-lg ">
        <div className="w-36 h-36 bg_secondary rounded-md mb-4 blur-sm" />
        <div className=" bg_secondary rounded-2xl w-28 h-4"></div>
        <div className=" bg_secondary rounded-2xl w-20 h-4"></div>
      </div>
    </div>
  );
};

export default MusicElementSkeleton;
