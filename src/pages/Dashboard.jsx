import React, { useState } from 'react';
import { Home, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [emails, setEmails] = useState(['']);
  const [creating,setCreating]=useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const url = import.meta.env.VITE_API_URL;

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const onSubmit = async (data) => {
    data.emails = emails; 
    try {
      setCreating(true)
      const response = await axios.post(`${url}/create-interview`, data);
      if(response.status==200){
        toast('Interview created and Message sent.',{type:'success'});
      }
      reset();
      setIsCreating(false); 
    } catch (error) {
      setCreating(false);
      console.error('Error creating interview:', error.message);
    }
  };

  return (
    <section className='border flex'>
      <aside className='w-16 flex justify-center border h-screen'>
        <ul className='list-none pt-10 flex flex-col'>
          <li className='cursor-pointer'>{<Home />}</li>
        </ul>
      </aside>
      <div className='w-full flex justify-center'>
        <div className='p-8 w-[50%]'>
          {!isCreating ? (
            <button
              onClick={handleCreateClick}
              className='bg-blue-600 p-2 rounded-md text-white'
            >
              Create Interview
            </button>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
              <div>
                <label htmlFor='jobTitle' className='block text-sm font-medium'>
                  Job Title
                </label>
                <input
                  type='text'
                  id='jobTitle'
                  {...register('jobTitle', { required: 'Job title is required' })}
                  className='mt-1 w-full p-2 border rounded-md'
                />
                {errors.jobTitle && <p className='text-red-500'>{errors.jobTitle.message}</p>}
              </div>

              <div>
                <label htmlFor='jobDesc' className='block text-sm font-medium'>
                  Job Description
                </label>
                <textarea
                  id='jobDesc'
                  {...register('jobDesc', { required: 'Job description is required' })}
                  className='mt-1 w-full p-2 border rounded-md'
                />
                {errors.jobDesc && <p className='text-red-500'>{errors.jobDesc.message}</p>}
              </div>

              <div>
                <label htmlFor='experienceLevel' className='block text-sm font-medium'>
                  Experience Level
                </label>
                <select
                  id='experienceLevel'
                  {...register('experienceLevel', { required: 'Experience level is required' })}
                  className='mt-1 w-full p-2 border rounded-md'
                >
                  <option value=''>Select Experience Level</option>
                  <option value='Fresher'>Fresher</option>
                  <option value='Mid-Level'>Mid-Level</option>
                  <option value='Senior'>Senior</option>
                </select>
                {errors.experienceLevel && <p className='text-red-500'>{errors.experienceLevel.message}</p>}
              </div>

              <div>
                <label className='block text-sm font-medium'>Add Candidate</label>
                {emails.map((email, index) => (
                  <div key={index} className='flex items-center space-x-2 mt-2'>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => handleEmailChange(index, e)}
                      placeholder='xyz@gmail.com'
                      className='w-full p-2 border rounded-md'
                    />
                    {emails.length > 1 && (
                      <button
                        type='button'
                        onClick={() => handleRemoveEmail(index)}
                        className='text-red-500'
                      >
                        <XCircle size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  onClick={handleAddEmail}
                  className='mt-2 text-blue-500'
                >
                  + Add another candidate
                </button>
              </div>

              <div>
                <label htmlFor='endDate' className='block text-sm font-medium'>
                  End Date
                </label>
                <input
                  type='date'
                  id='endDate'
                  {...register('endDate', { required: 'End date is required' })}
                  className='mt-1 w-full p-2 border rounded-md'
                />
                {errors.endDate && <p className='text-red-500'>{errors.endDate.message}</p>}
              </div>

              <button type='submit' className='bg-blue-600 text-white p-2 rounded-md'>
                {creating ?"Sending..":'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
