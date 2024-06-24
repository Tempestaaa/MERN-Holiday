import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../configs/hotel.options.config";
import { HotelAdd } from "../types/hotel";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelAdd>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((item) => (
          <label
            key={item}
            className={
              typeWatch === item
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={item}
              {...register("type", {
                required: "At least one type should be chosen",
              })}
              className="hidden"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <p className="text-xs text-red-500 font-bold">{errors.type.message}</p>
      )}
    </div>
  );
};

export default TypeSection;
