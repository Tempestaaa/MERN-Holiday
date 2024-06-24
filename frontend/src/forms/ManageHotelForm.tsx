import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelAdd, HotelDataAdd } from "../types/hotel";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSave: (data: HotelAdd) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelAdd>({
    resolver: zodResolver(HotelDataAdd),
  });
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data: HotelAdd) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("starRating", data.starRating.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });
    Array.from(data.imageFiles).forEach((image) => {
      formData.append(`imageFiles`, image);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-10">
        <DetailSection />
        <TypeSection />
        <FacitiliesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold text-xl hover:bg-blue-500 p-2"
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
