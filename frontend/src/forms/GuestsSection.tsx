import { useFormContext } from "react-hook-form";
import Input from "../components/Input";
import { HotelAdd } from "../types/hotel";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelAdd>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-300 p-4">
        <Input
          type="number"
          label="Adults"
          {...register("adultCount", {
            required: "This field is required",
          })}
          error={errors.adultCount}
        />
        <Input
          type="number"
          label="Children"
          {...register("childCount", {
            required: "This field is required",
          })}
          error={errors.childCount}
        />
      </div>
    </div>
  );
};

export default GuestsSection;
