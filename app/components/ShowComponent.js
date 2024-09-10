import React from 'react'
import Image from 'next/image'

function ShowComponent({image}) {
  return (
    <div className="show w-[80vw] h-[50svh] border  my-10 rounded-xl flex p-5">
        <div className="image w-[30%] h-full overflow-hidden border rounded-xl">
          <Image className="h-full w-full object-cover" src={image} width={1000} height={1000} alt="museum image"/>
        </div>
        <div className="des px-5 w-[50%] border-r border-dashed   border-slate-300">
          <h2 className="text-2xl mb-3">Famous Ticket Options with Multimedia Guide</h2>
          <ul className="des-ul list-disc list-inside overflow-auto h-[80%]">
            <li>Explore any one of these Buckingham Palace sites: the Royal Mews, the King's Gallery, or the State Rooms, with the State Rooms open from 11th July to 29th September.</li>
            <li>Opting for State Rooms gives you entry into the Palace, whereas the other 2 options are located outside, in the Buckingham Palace Grounds..</li>
            <li>Get a State Rooms ticket to wander through Buckingham Palace's grand State Rooms. You’ll stroll through royal chambers and marvel at the monarchy's stunning art collection.</li>
            <li>Go for the Royal Mews ticket for a peek inside the working royal stables. Up close, you’ll meet the magnificent Windsor Greys and Cleveland Bays, and check out the official carriages.</li>
            <li>Check out The King's Gallery ticket for a journey through a century of royal portraits. Don’t miss the pop art reimagination of Queen Elizabeth II by Andy Warhol—it’s an absolute must-see!</li>
          </ul>
        </div>
        <div className="px-5 w-[20%]">
          <div className="from">
            from
          </div>
          <div className="rs text-xl font-bold  ">
            ₹100
          </div>
          <div className=''>
            <button className="w-full bg-violet-600 text-white my-3 border-none py-3 rounded-lg">Check availibility</button>
          </div>
        </div>
      </div>
  )
}

export default ShowComponent
