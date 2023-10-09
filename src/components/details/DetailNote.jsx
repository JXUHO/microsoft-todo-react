const DetailNote = () => {




  
  return (


    <div className="flex flex-col flex-1 p-4 rounded my-2 bg-white overflow-hidden justify-center border border-transparent hover:border-gray-300">
        <input
          type="text"
          placeholder="Add note"
          className="placeholder:text-gray-500"
          style={{ outline:'none' }}
        />
        <div className="flex mt-6 text-xs" style={{ color: "#767678" }}>
          updated
        </div>
    </div>
  );
};

export default DetailNote;
