import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { HotelAdd } from "../types/hotel";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error adding hotel", type: "ERROR" });
    },
  });

  const handleSave = (data: HotelAdd) => {
    mutate(data);
  };

  return (
    <div className="w-full">
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
