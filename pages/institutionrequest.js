import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useS3Upload } from "next-s3-upload";

export default function MakeLists() {
  let { uploadToS3 } = useS3Upload();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  const onSubmit = async (d) => {
    const file = d.imageUpload[0];
    let { url } = await uploadToS3(file);
    console.log(url);
    axios.post(
      `/api/create?institution_name=${d.institution_name}{
       &image=${encodeURIComponent(url)}`
    );
  };

  return (
    <>
      <section className="w-auto mx-6 md:mx-9 lg:w-1/2 lg:mx-auto bg-geruleancrayola-grad border-2 border-black rounded-xl p-10 mt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <label htmlFor="institution_name" className="text-gamboge">
            Teacher Name (required)
          </label>
          <input
            className="bg-transparent border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600 dark:text-black"
            type="text"
            id="institution_name"
            placeholder="UCLA"
            {...register("institution_name", {
              required: { value: true, message: "You need to enter the name of the institution." },
            })}
          />

          <input
            type="file"
            className="custom-file-input bg-transparent border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600 dark:text-black"
            {...register("imageUpload", {
              required: { value: true, message: "You need an image." },
            })}
          />

          <div>
            <ErrorMessage
              errors={errors}
              name="institution_name"
              render={({ message }) => (
                <p className="text-red-500 font-medium">{message}</p>
              )}
            />
          </div>
          <input
            type="submit"
            className="bg-white text-maroonx-11 hover:bg-maroonx-11 hover:text-white rounded-xl font-bold p-3 w-1/2 mx-auto text-xl"
            value="Submit"
            disabled={isSubmitting}
          />
          {isSubmitted && <div className="text-green-500">List created!</div>}
        </form>
      </section>
    </>
  );
}
