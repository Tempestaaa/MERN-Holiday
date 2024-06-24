import { useFormContext } from "react-hook-form";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import { HotelAdd } from "../types/hotel";

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelAdd>();
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <Input
        label="Name"
        {...register("name", {
          required: "This field is required",
        })}
        error={errors.name}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input
          label="City"
          {...register("city", {
            required: "This field is required",
          })}
          error={errors.city}
        />
        <Input
          label="Country"
          {...register("country", {
            required: "This field is required",
          })}
          error={errors.country}
        />
      </div>
      <Textarea
        label="Description"
        rows={10}
        {...register("description", {
          required: "This field is required",
        })}
        error={errors.description}
      />
      <Input
        type="number"
        min={1}
        label="Price Per Night"
        {...register("pricePerNight", {
          required: "This field is required",
        })}
        error={errors.pricePerNight}
        styles="max-w-[50%]"
      />
      <Select
        label="Star Rating"
        options={[1, 2, 3, 4, 5]}
        {...register("starRating", {
          required: "This field is required",
        })}
        error={errors.starRating}
        styles="max-w-[50%]"
      />
    </div>
  );
};

export default DetailSection;
