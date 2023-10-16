import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

import { useS3Upload } from "next-s3-upload";

export default function Home() {
  let { uploadToS3 } = useS3Upload();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    let { url } = await uploadToS3(d.institution_picture[0]);
    axios
      .post(
        `/api/create?institution_name=${
          d.institution_name
        }&institution_picture=${encodeURIComponent(url)}`,
      )
      .then((r) => alert(r.data));
  };
  const institutions = useSWR("/api/all", fetcher).data;

  console.log("VALUE", institutions);
  return (
    <div className="dark:bg-black text-black ">
      <main>
        <Link href="/">
          <img
            src="/logo.png"
            className="w-16 s:w-20 md:w-32 lg:w-48 mx-auto pt-4"
          ></img>
        </Link>
        <section className="w-1/2 mx-auto bg-gray-200 rounded-xl p-10 mt-16">
          <p className="text-blue-700">
            In order to hold our institutions accountable, we need your help.
            Please upload a screenshot of an email from your institution that
            demonstrates their response to antisemitism. We will use this
            information to create a report that will expose any institutions
            that are failing to live up to their responsibility. It is important
            for us not to stay silent.
          </p>
          <br></br>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <label htmlFor="institution_name">
              Institution Name (required)
            </label>
            <input
              className="bg-gray-200 border-b-2 font-bold border-gray-400 focus-within:outline-none focus-within:border-gray-600 text-black"
              type="text"
              id="institution_name"
              placeholder="Harvard"
              {...register("institution_name", { required: true })}
            />
            <label htmlFor="institution_picture">
              Please upload a picture of the Institution's response.
            </label>
            <input
              className="text-black bg-gray-200 border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600"
              type="file"
              id="institution_picture"
              {...register("institution_picture", { required: true })}
            />

            <input
              type="submit"
              className="bg-blue-500  py-2 hover:bg-blue-600 rounded-xl"
              value="Submit"
            />
          </form>
        </section>
        <section className="flex flex-col bg-gray-200 w-1/2 mx-auto rounded-xl p-10 mt-16">
          <h1 className="font-bold text-xl mb-2">Institutions</h1>

          {institutions?.map(({ institution_name }) => (
            <p className="font-mono">- {institution_name}</p>
          ))}
        </section>
      </main>
    </div>
  );
}
