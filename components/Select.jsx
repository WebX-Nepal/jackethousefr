import { useState } from "react";

const SelectSearch = () => {
  const [search, setSearch] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [selected, setSelected] = useState({ 1: "yellow" });
  const [options, setOptions] = useState([]);

  const clearOptions = () => {
    setSearch("");
    setShowSelector(false);
    setOptions([]);
  };

  const select = (id, name) => {
    setSelected({ ...selected, [id]: name });
    clearOptions();
    // Dispatch your event as needed (e.g., $dispatch('selected', Object.keys(selected));
  };

  const remove = (id) => {
    const updatedSelected = { ...selected };
    delete updatedSelected[id];
    setSelected(updatedSelected);
    // Dispatch your event as needed
  };

  const goSearch = () => {
    if (search) {
      setOptions({ 5: "red", 6: "blue", 7: "green" });
      setShowSelector(true);
    } else {
      setShowSelector(false);
    }
  };

  return (
    <div className="relative max-w-sm mx-auto text-xs">
      <div className="bg-white rounded-md p-2 flex gap-1 flex-wrap">
        {Object.keys(selected).map((id) => (
          <div key={id} className="bg-blue-200 rounded-md flex items-center">
            <div className="p-2">{selected[id]}</div>
            <div
              onClick={() => remove(id)}
              className="p-2 select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5745 1L1 12.5745"
                  stroke="#FEAD69"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1.00024 1L12.5747 12.5745"
                  stroke="#FEAD69"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setShowSelector(true)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 py-1 px-0"
            placeholder="Search"
          />
          {showSelector && (
            <div className="absolute left-0 bg-white z-30 w-full rounded-b-md font-medium">
              <div className="p-2 space-y-1">
                {Object.keys(options).map((id) => (
                  <div key={id}>
                    {!selected[id] && (
                      <div
                        onClick={() => select(id, options[id])}
                        className="bg-blue-200 border-2 border-blue-200 cursor-pointer rounded-md p-2 hover:border-light-blue-1"
                      >
                        {options[id]}
                      </div>
                    )}
                  </div>
                ))}
                {Object.keys(options).length === 0 && (
                  <div className="text-gray-500">No result</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSearch;
