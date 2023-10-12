import { useForm } from 'react-hook-form'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    axios.get(`/api/create?name=${d.name}&picture=${d.institution_picture}`)
      .then(r => alert(r.data));
  }
  const names = useSWR('/api/all', fetcher).data;
  return (
    <div className="dark:text-white dark:bg-black">
      <main>
       
        <section className="w-1/2 mx-auto bg-gray-200 rounded-xl p-10 mt-16">
        <p className='text-blue-700'>
In order to hold our institutions accountable, we need your help. Please upload a screenshot of an email from your institution that demonstrates their response to antisemitism. We will use this information to create a report that will expose any institutions that are failing to live up to their responsibility. It is important for us not to stay silent.
</p>
<br></br>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <label htmlFor="name">Institution Name (required)</label>
            <input className="bg-gray-200 border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600" type="text" id="name" placeholder="Harvard" {...register("name", { required: true })} />
            <h1>Please upload a picture of the Institution's response.</h1>
            <input className="bg-gray-200 border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600" type="file" id="institution_picture" {...register("name", { required: true })} />
           
            <input type="submit" className="bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-xl font-bold" value="Submit"/>
          </form>
        </section>
        <section className="flex flex-col bg-gray-200 w-1/2 mx-auto rounded-xl p-10 mt-16">
          <h1 className="font-bold text-xl mb-2">Names</h1>
          {
            names?.map(({name}) => (
              <p className="font-mono">- {name}</p>
            ))
          }
        </section>
      </main>
    </div>
  )
}
