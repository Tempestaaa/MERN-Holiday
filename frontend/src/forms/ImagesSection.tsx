import { useFormContext } from "react-hook-form";
import { HotelAdd } from "../types/hotel";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelAdd>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          type="file"
          {...register("imageFiles")}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-xs font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
