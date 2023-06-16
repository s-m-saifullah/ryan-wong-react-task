import React from "react";
import ProfileImage from "../../assets/profile.png";
import UpArrow from "../../assets/up_arrow.png";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link
      to='#'
      className='flex justify-start gap-4 border items-center border-white border-opacity-10 rounded-2xl px-6 py-4'
    >
      <div className='w-8 text-lightGray'>{video.id}</div>
      <div className='w-7/12 flex items-center gap-8'>
        <div>
          <img
            src={video.photo}
            className='w-32 rounded-xl'
            alt={`${video.title.slice(0, 50)}-thumbnail`}
          />
        </div>
        <h3>{video.title}</h3>
      </div>
      <div className='w-2/12 text-secondary flex gap-2'>
        <img
          src={ProfileImage}
          className='w-7 inline'
          alt={`${video.username} image`}
        />
        {video.username}
      </div>
      <div className='w-2/12 text-right flex items-center justify-end'>
        {video.like} <img src={UpArrow} className='inline' alt='up arrow' />
      </div>
    </Link>
  );
};

export default VideoCard;
