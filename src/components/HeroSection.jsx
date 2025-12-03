import { Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* GET LOST Card */}
      <div className="relative h-52 rounded-2xl gradient-pink overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="relative h-full p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-bold text-white mb-2">GET LOST</h2>
            <p className="text-white/70 text-lg">in your music.</p>
          </div>
          <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
        </div>
      </div>

      {/* MELLOW Card */}
      <div className="relative h-52 rounded-2xl gradient-blue overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="relative h-full p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-bold text-white mb-2">MELLOW</h2>
            <p className="text-white/70 text-lg">beats.</p>
          </div>
          <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
