import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DownArrow from "../../assets/down_arrow.webp";
import MkdSDK from "../../utils/MkdSDK";
import VideoCard from "./VideoCard";

const VideoCards = () => {
  const [videos, setVideos] = useState([]);
  const [numOfPages, setNumOfPages] = useState(null);
  const [page, setPage] = useState(1);
  const sdk = new MkdSDK();
  sdk.setTable("video");
  const body = { payload: {}, page, limit: 10 };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await sdk.callRestAPI(body, "PAGINATE");
        setVideos(response.list);
        setNumOfPages(response.num_pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, [page]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = videos[dragIndex];
    setVideos((prevVideos) => {
      const updatedVideos = [...prevVideos];
      updatedVideos.splice(dragIndex, 1);
      updatedVideos.splice(hoverIndex, 0, draggedCard);
      if (hoverIndex < 0 || hoverIndex >= updatedVideos.length) {
        return;
      }
      return updatedVideos;
    });
  };

  const VideoCardItem = ({ video, index }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
      accept: "VIDEO_CARD",
      hover(item) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: "VIDEO_CARD",
      item: { id: video.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    useEffect(() => {
      // visual effects to the dragged card
      if (isDragging) {
        ref.current.style.transform = "scale(1.1)";
      } else {
        ref.current.style.transform = "scale(1)";
      }
    }, [isDragging]);

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
      <div ref={ref} style={{ opacity }}>
        <VideoCard key={video.id} video={video} />
      </div>
    );
  };

  const renderVideos = () => {
    return videos.map((video, index) => (
      <VideoCardItem key={video.id} video={video} index={index} />
    ));
  };

  const handlePagination = (direction) => {
    if (direction === "next") setPage((prevPage) => prevPage + 1);
    if (direction === "prev") setPage((prevPage) => prevPage - 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className='text-lightGray flex justify-between gap-4 mb-2'>
          <div className='w-8'>#</div>
          <div className='w-7/12'>Title</div>
          <div className='w-2/12'>Author</div>
          <div className='w-2/12 text-right'>
            Most Liked{" "}
            <img className='inline' src={DownArrow} alt='Down arrow' />
          </div>
        </div>
        <div className=''>
          <div className='overflow-y-auto max-h-full grid grid-cols-1 gap-4'>
            {renderVideos()}
          </div>
        </div>
        <div className='text-center flex justify-center items-center gap-5 py-10'>
          {page > 1 && (
            <>
              <button
                onClick={() => handlePagination("prev")}
                className='bg-primary text-black w-28 px-6 py-2 rounded-lg hover:bg-secondary'
              >
                Previous
              </button>
              <p className='bg-[#1d1d1d] px-4 py-2 rounded-lg'>{page}</p>
            </>
          )}
          {page < numOfPages && (
            <button
              onClick={() => handlePagination("next")}
              className='bg-primary text-black w-28 px-6 py-2 rounded-lg hover:bg-secondary'
            >
              Next
            </button>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default VideoCards;
