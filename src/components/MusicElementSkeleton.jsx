const MusicElementSkeleton = ({ color }) => {
  return (
    <div className=" bg-black/40 flex-shrink-0 w-[176px] rounded-xl shadow-xl">
      <div className="flex flex-col p-4 rounded-lg blur-md">
        <div
          className="w-36 h-36 bg_primary rounded-md mb-4"
          style={{
            backgroundColor: color,
          }}
        />
        <p className="text-white font-semibold truncate">Title</p>
        <p className="text-gray-400 text-xs font-semibold truncate">Artist</p>
      </div>
    </div>
  );
};

export default MusicElementSkeleton;
