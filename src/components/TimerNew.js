import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";

const TimerNew = ({
  timer,
  restartTimer,
  isPlaying,
  setIsPlaying,
  setTimer,
}) => {
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0 && !timeOver) {
            setTimeOver(true);
            playSound();
            return 0;
          } else if (timeOver) {
            return prevTimer + 1;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeOver, timer]);

  const playSound = () => {
    const audio = new Audio("/path_to_your_audio_file.mp3");
    audio.play();
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    restartTimer();
  };

  const addTime = () => setTimer((prev) => prev + 60);
  const reduceTime = () => setTimer((prev) => prev - 60);
  // Format time display
  const formatTime = (seconds) => {
    const sign = timeOver ? "+" : "";
    const minutes = Math.abs(Math.floor(seconds / 60));
    const remainingSeconds = Math.abs(seconds % 60);
    return `${sign}${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const backgroundClass = timeOver ? "bg-red-500" : "bg-white";
  // const progress = Math.floor((timeRemaining / initialTime) * 100);

  return (
    <div
      className={`flex justify-center flex-col items-center px-4 py-2 w-full ${backgroundClass}`}
    >
      <div className="w-fit text-center">
        <div className="text-[62px] font-bold">{formatTime(timer)}</div>
      </div>

      <div className="flex gap-4 mt-2">
        {isPlaying ? (
          <Button className="gap-1 w-24" onClick={handlePause}>
            <FaPause size={14} />
          </Button>
        ) : (
          <Button className="gap-1 w-24" onClick={handleStart}>
            <FaPlay size={14} />
          </Button>
        )}
        <Button className="gap-1" onClick={handleReset}>
          <RotateCcw size={14} />
        </Button>
        <Button className="gap-1" onClick={addTime}>
          Add Minute
        </Button>
        <Button className="gap-1" onClick={reduceTime}>
          Reduce Minute
        </Button>
      </div>
    </div>
  );
};
export default TimerNew;

// const Timer = ({ timer, restartTimer, isPlaying, setIsPlaying }) => {
//   return (
//     <div className="mb-4 flex items-center justify-between p-2 rounded-lg">
//       <div className="flex items-center">
//         {isPlaying ? (
//           <button
//             className="text-slate-600 hover:text-slate-800 mr-2"
//             onClick={() => setIsPlaying(false)}
//           >
//             <FaPause size={12} />
//           </button>
//         ) : (
//           <button
//             className="text-slate-600 hover:text-slate-800 mr-2"
//             onClick={() => setIsPlaying(true)}
//           >
//             <FaPlay size={12} />
//           </button>
//         )}
//       </div>

//       <div className="text-lg font-semibold text-slate-600">
//         {Math.floor(timer / 60)}:
//         {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
//       </div>
//       <button
//         className="text-slate-600 hover:text-slate-800"
//         onClick={() => restartTimer()}
//       >
//         <FaRedo size={12} />
//       </button>
//     </div>
//   );
// };
