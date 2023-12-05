import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RiBarcodeFill } from "react-icons/ri";
import "./styles.css";
const DropdownBarcode = ({ isBarcodeOpen, setIsBarcodeOpen }: any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  useEffect(() => {
    if (dropdownOpen == true) {
      setIsBarcodeOpen(true);
    } else {
      setIsBarcodeOpen(false);
    }
  }, [dropdownOpen]);
  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
      >
        <div className="text-4xl ml-4 bg-backgroundGray border-4 border-backgroundGray rounded-xl flex">
          <RiBarcodeFill className="text-3xl" />
          <RiBarcodeFill className="text-3xl" />
        </div>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`w-1/2 h-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3 flex flex-col items-center justify-center">
          <h5 className="text-2xl font-semibold text-bodydark2 pt-4">
            Scan Products
          </h5>
          <img
            src={"/barcode.gif"}
            alt="Barcode Gif"
            height={"100px"}
            width={"180px"}
            className="pt-4"
          />
          <p className="pt-8 animate-opacity text-xl">Scanning...</p>
        </div>
      </div>
    </div>
  );
};

export default DropdownBarcode;
