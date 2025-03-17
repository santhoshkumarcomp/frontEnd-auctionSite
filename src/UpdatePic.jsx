'use client'
import { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { AuthContext } from './App'
// import { useNavigate } from 'react-router'


const UpdatePic =  ({fromChild}) => {
  const [open, setOpen] = useState(true)
  const [fileUploaded, setFileUploaded] = useState(false);
  const [picture,setPicture] = useState(null);
  const {user} = useContext(AuthContext);
  // const navigate = useNavigate();

  const handlePic =async()=>{
    const response = await axios.put(`https://be-capstone-5rvf.onrender.com/auth/${user}/editprofile`,{"picture" : picture},{withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }})
    console.log(response);
    fromChild();
    setOpen(false);
    
  }
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Profile PIC
                  </DialogTitle>
                  <div className="mt-2">
                  <div className='flex '>
        <label>Upload Picture:</label>
        <input className={`bg-blue-400 opacity-75 hover:cursor-pointer w-[112px] drop-shadow-md rounded-md hover:cursor-pointer ${
          fileUploaded ? '!bg-green-400' : '' // Change color when file is uploaded
        }`}
      
        type="file"
        name="picture"
        onChange={(e) => {
          const file = e.target.files[0];
          if (e.target.files.length > 0) {
            setFileUploaded(true); // File is uploaded
          } else {
            setFileUploaded(false); // No file uploaded
          }
          setPicture(file);
        }}
        />
      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handlePic}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Upload
              </button>
              <button
                type="button"
                data-autofocus
                onClick={ () => {setOpen(false)}}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdatePic