import { IMedia } from "~/types/media";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect, useRef, useState } from "react";
function Media(props: { index: number; media: IMedia; medias: IMedia[] }) {
  const [onValue, setOnValue] = useState(true);
  const refVideo = useRef(null);
  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.autoplay = true;
      refVideo.current.loop = true;
      refVideo.current.muted = onValue;
      refVideo.current.play();
    }
  }, [onValue]);
  return (
    props.media && (
      <div
        className={`${
          props.medias.length >= 2 && "relative flex-shrink-0 h-[240px]"
        }`}
      >
        {props.media && (
          <>
            {props.media.media && (
              <>
                {props.media.media.endsWith(".jpg") ||
                props.media.media.endsWith(".jpeg") ||
                props.media.media.endsWith(".png") ? (
                  <img
                    className={`${
                      props.medias.length > 1 ? "max-h-[240px] w-full" : ""
                    } ${props.index === 0 && "ml-3"} ${
                      props.medias.length >= 2 ? "max-h-[240px] w-full" : ""
                    } ${
                      props.index !== 0 && "ml-2"
                    } rounded-lg max-w-[532px] h-full object-cover`}
                    src={props.media.media}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={props.media.media}
                      className={`${
                        props.medias.length > 1
                          ? "max-h-[240px] w-full"
                          : "max-h-[450px]"
                      }  rounded-lg object-cover`}
                      ref={refVideo}
                    ></video>
                    <div
                      className="absolute right-2 bottom-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setOnValue(!onValue);
                      }}
                    >
                      {onValue ? (
                        <VolumeOffIcon className="text-[#f3f5f7]" />
                      ) : (
                        <VolumeUpIcon className="text-[#f3f5f7]" />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    )
  );
}

export default Media;
