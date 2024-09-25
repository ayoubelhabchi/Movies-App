import React, { useState } from "react";
import YouTube from "react-youtube";
import './youtube.css'
const TrailerPlayer = ({ movieDetails,seriesDetails, playTrailer, handleTrailerClose }) => {
  const [isTrailerReady, setIsTrailerReady] = useState(false);

  const findTrailer = () => {
    const details = movieDetails?.details || seriesDetails?.details;

if (details?.videos?.results) {
      const trailer = details.videos.results.find((vid) => vid.name === "Official Trailer");
      const key = trailer ? trailer.key : details.videos.results[0]?.key;
      return key;
    }
  };

  const videoKey = findTrailer();

  return (
    <>
    {playTrailer && videoKey ? (
      <div className="trailer-container"> {/* Add parent container */}
        <div className="youtube_wrapper">
          <YouTube
            videoId={videoKey}
            containerClassName={"youtube_container"}
            className="youtube_container"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
            onReady={() => setIsTrailerReady(true)}
          />
        </div>
        {isTrailerReady && (
          <button onClick={handleTrailerClose} className="trailer_close">
            Close
          </button>
        )}
      </div>
    ) : null}
  </>
  );
};

export default TrailerPlayer;
