import React from "react";

const DashboardHeader = () => {
  const date = new Date();
  const dateToday = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <div className='mb-7'>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl'>Today's leaderboard</h2>
        <div className='flex items-center gap-2 bg-[#1d1d1d] px-6 py-4 rounded-2xl'>
          <span>{`${dateToday} ${month} ${year}`}</span> <span>&#183;</span>
          <span className='bg-primary px-2.5 py-1 rounded-lg text-black uppercase'>
            Submissions Open
          </span>{" "}
          <span>&#183;</span>
          <span>
            {hour}:{minute}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
