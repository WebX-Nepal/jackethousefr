import { useSubmitQRCodeForPrintQuery } from "@/redux/api/secureApi";
export const usePrintQRCode = (id: string) => {
  const { data, error } = useSubmitQRCodeForPrintQuery(id);

  if (error) {
    // Handle error
    console.error("Error occurred:", error);
  }

  return {
    result:
      data?.yourResultProperty || "Default value if result is not available",
  };
};
