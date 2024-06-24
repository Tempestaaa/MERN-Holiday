import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../configs/hotel.options.config";
import { HotelAdd } from "../types/hotel";

const FacitiliesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelAdd>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((item) => (
          <label
            key={item}
            className="text-sm flex gap-1 text-gray-700 items-center"
          >
            <input value={item} type="checkbox" {...register("facilities")} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <p className="text-xs text-red-500 font-bold">
          {errors.facilities.message}
        </p>
      )}
    </div>
  );
};

export default FacitiliesSection;
