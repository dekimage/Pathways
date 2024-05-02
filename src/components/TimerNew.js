import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { FaPause, FaPlay } from "react-icons/fa";

const TimerNew = ({ timer, restartTimer, isPlaying, setIsPlaying }) => {
  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    restartTimer();
  };

  // Helper to format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  // const progress = Math.floor((timeRemaining / initialTime) * 100);

  return (
    <div className="flex justify-center  flex-col  items-center  px-4 py-2 w-full">
      <div className="w-fit text-center">
        <div className="text-[62px] font-bold">{formatTime(timer)}</div>
      </div>

      <div className="flex gap-4 mt-2">
        {isPlaying ? (
          <Button className="gap-1 w-24" onClick={handlePause}>
            <FaPause size={14} />
          </Button>
        ) : (
          <Button className="gap-1 px-4 w-24" onClick={handleStart}>
            <FaPlay size={14} />
          </Button>
        )}
        <Button variant="outline" className="gap-1" onClick={handleReset}>
          <RotateCcw size={14} />
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
