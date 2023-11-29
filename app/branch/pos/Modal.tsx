import React, { useEffect, useState } from "react";
import CustomScrollbar from "@/components/ScrollBar";
import {
  useGetProductByIdQuery,
  useGetMemberByIDQuery,
  useCreateSalesMutation,
} from "../../../redux/api/secureApi";
import { addItems, emptyCartItems } from "@/redux/slices/counterSlice";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import { AiOutlineDollarCircle } from "react-icons/ai";
const Modal = ({ isOpen, closeModal, refetch }: any) => {
  const dispatch = useDispatch();
  const [productID, setProductID] = useState();
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [billPrice, setBillPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [memberData, setMemberData] = useState<any>([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showMemberData, setShowMemberData] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const cartItems: any = useSelector(
    (state: RootState) => state.counter.cartItem
  );
  const { data: productIdData, isSuccess: isProductIdSuccess } =
    useGetProductByIdQuery(productID);
  const {
    data: MemberData,
    isSuccess: MemberSearchSuccess,
    isError,
  } = useGetMemberByIDQuery(phoneNumber);
  const [sendData, { isSuccess, data, isLoading }] = useCreateSalesMutation();
  const resetSalesProcess = () => {
    setPaymentMethod("");
    setNewName("");
    setPhoneNumber("");
    setBillPrice(0);
    dispatch(emptyCartItems());
    setIsPaymentModal(false);
    closeModal();
  };
  const handleCreateSales: SubmitHandler<any> = async (data) => {
    const salesData = {
      paymentMethod,
      products: cartItems,
      newName,
      phoneNumber,
      totalAmount: grandTotal,
    };
    await sendData(salesData);
    resetSalesProcess();
  };
  const handleChange = (e: any) => {
    setProductID(e.target.value);
  };
  const handleNumberChange = (e: any) => {
    setShowMemberData(true);
    setPhoneNumber(e.target.value);
  };
  const handleValueChanges = (item: any) => {
    setShowMemberData(false);
    setMemberData(null);
    setPhoneNumber(item?.phone);
    setNewName(item?.name);
  };
  const handleNameChange = (e: any) => {
    setNewName(e.target.value);
  };
  const addItemToCart = () => {
    if (!productID) {
      toast.error("Please Enter Item Code");
    } else if (productIdData && isProductIdSuccess) {
      dispatch(addItems(productIdData.products));
    } else {
      toast.error("Item Not Found");
    }
  };
  const openPaymentModal = () => {
    if (cartItems.length > 0) {
      setIsPaymentModal(true);
      let totalDiscount = 0;
      const itemsWithDiscount = cartItems.map((item: any) => {
        const sellingPrice = item.sellingPrice;
        const discountPercentage = item.discount;
        const discountAmount = (discountPercentage / 100) * sellingPrice;
        totalDiscount += discountAmount;
        return {
          ...item,
          discountAmount: discountAmount,
        };
      });
      const totalPrice = cartItems.reduce(
        (accumulator: number, currentObject: any) => {
          return accumulator + currentObject.sellingPrice;
        },
        0
      );
      const totalDiscountPercent = (totalDiscount / totalPrice) * 100;
      const grandTotalAmount = totalPrice - totalDiscount;
      setDiscountPercent(totalDiscountPercent);
      setDiscountAmount(totalDiscount);
      setBillPrice(totalPrice);
      setGrandTotal(grandTotalAmount);
    } else {
      toast.error("Please select at least one item");
    }
  };
  const handleSalesCancel = () => {
    resetSalesProcess();
  };
  const handleBackSales = () => {
    setIsPaymentModal(false);
  };
  useEffect(() => {
    if (phoneNumber.length > 1 && phoneNumber !== "") {
      if (MemberData && MemberSearchSuccess) {
        setMemberData(MemberData.member);
      } else if (isError) {
        setMemberData([]);
      } else {
      }
    }
  }, [MemberData, isError]);
  useEffect(() => {
    if (phoneNumber == "") {
      setNewName("");
      setMemberData([]);
    }
  }, [phoneNumber]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Created Sale");
      refetch();
    }
  }, [isSuccess]);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (isOpen && e.target.classList.contains("modal-container")) {
        setMemberData("");
        setIsPaymentModal(false);
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);
  if (!isOpen) return null;
  console.log("memeber data is", memberData);
  return (
    <div
      className={`fixed inset-0 top-12 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-modalBackground p-6 w-2/3 h-2/3 sm:w-1/2 rounded-3xl shadow-2xl mt-5 sm:h-[75vh]">
        {isPaymentModal ? (
          <>
            <div className="w-full h-full ">
              <div className="h-8 ">
                <h2>Payment</h2>
              </div>
              <div className="lg:flex block w-full justify-between md:h-1/2 sm:h-1/2 ">
                <div className="lg:w-1/2 w-full max-w-full items-center justify-center pr-8 pt-4">
                  <div className="pr-1">
                    <div className="pb-2 flex justify-between pt-1 font-semibold">
                      <p className="flex">
                        <p className="pr-1">Discount </p>(
                        <p className="text-green-600 ">
                          {discountPercent.toFixed(2)}%
                        </p>
                        )
                      </p>
                      <p>Rs {discountAmount.toFixed(2)}</p>
                    </div>
                    <div className="w-full border-t-2 border-white"></div>
                    <div className="pb-2 flex justify-between pt-1 font-semibold">
                      <p className="flex">
                        <p className="pr-1">Sub Total </p>(
                        <p className="text-green-600 ">Inclusive Tax</p>)
                      </p>
                      <p>Rs {billPrice.toFixed(2)}</p>
                    </div>
                    <div className="w-full border-t-2 border-white"></div>
                    <div className="pb-2 flex justify-between pt-1 font-bold">
                      <p>Grand Total</p>
                      <p>Rs {grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full max-w-full relative">
                  <div className="pl-1 pr-1">
                    <h3 className="pb-2">Phone Number</h3>
                    <div className="items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-full relative">
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                        type="text"
                        placeholder="Enter Phone Number"
                        onChange={handleNumberChange}
                        value={phoneNumber}
                      />
                    </div>
                    {phoneNumber.length != 10 && (
                      <ul
                        className="absolute bg-slate-200  rounded-xl p-2 z-40"
                        style={{ width: "98%" }}
                      >
                        {memberData &&
                          memberData.map((item: any, index: number) => {
                            return (
                              <li
                                className="hover:cursor-pointer hover:bg-slate-100 pb-1"
                                key={item?._id}
                              >
                                <button
                                  onClick={() => handleValueChanges(item)}
                                >
                                  {item?.phone}
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                  <div className="pl-1 pr-1 pt-2">
                    <h3 className="pb-2">Name</h3>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-full">
                      <input
                        className="outline-none placeholder-gray-500 text-black bg-transparent"
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full items-center justify-center h-1/4 md:h-1/5 sm:h-1/5">
                <p className="p-2 font-semibold">Payment Methods</p>
                <div className="flex items-center justify-around ">
                  <div className="text-center">
                    <div
                      className={`border px-10 py-4 lg:px-16 md:px-8 sm:px-6 hover:cursor-pointer rounded-lg shadow-xl ${
                        paymentMethod == "cash"
                          ? "bg-black text-white"
                          : "bg-white"
                      } " `}
                      onClick={() => {
                        setPaymentMethod("cash");
                      }}
                    >
                      <AiOutlineDollarCircle className="text-green-600 text-3xl" />
                    </div>
                    <p>Cash</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`border px-10 py-4 lg:px-16 md:px-8 sm:px-6 hover:cursor-pointer rounded-lg shadow-xl  ${
                        paymentMethod == "online"
                          ? "bg-black text-white"
                          : "bg-white"
                      } " `}
                      onClick={() => {
                        setPaymentMethod("online");
                      }}
                    >
                      <AiOutlineDollarCircle className="text-green-600 text-3xl" />
                    </div>
                    <p>Debit</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`border px-10 py-4 lg:px-16 md:px-8 sm:px-6 hover:cursor-pointer rounded-lg shadow-xl ${
                        paymentMethod == "wallet"
                          ? "bg-black text-white"
                          : "bg-white"
                      } " `}
                      onClick={() => {
                        setPaymentMethod("wallet");
                      }}
                    >
                      <AiOutlineDollarCircle className="text-green-600 text-3xl" />
                    </div>
                    <p>E-Wallet</p>
                  </div>
                </div>
              </div>
              <div className="flex mt-6 w-full justify-between p-4">
                <button
                  className="bg-white text-black pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                  onClick={handleBackSales}
                >
                  Back
                </button>
                <button
                  className="bg-black text-white pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                  onClick={handleCreateSales}
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Item Details</h2>
            </div>
            <div className="flex">
              <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-4/5">
                <input
                  className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                  type="text"
                  placeholder="Enter Product ID"
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-black text-white ml-8 pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                onClick={addItemToCart}
              >
                Add Items
              </button>
            </div>
            <div className="flex items-center justify-center h-2/3">
              <CustomScrollbar scrollHeight={250}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="">
                    <tr>
                      <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                        SN
                      </th>
                      <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                        Discount(%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.length > 0 &&
                      cartItems.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.category?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.sellingPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.discount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CustomScrollbar>
            </div>
            <div className="w-full flex justify-between px-4 ">
              <button
                className="bg-white text-black pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                onClick={handleSalesCancel}
              >
                Cancel
              </button>

              <button
                className="bg-black text-white pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                onClick={openPaymentModal}
              >
                Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
