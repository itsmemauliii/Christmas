import React, { useState, useEffect } from "react";
import { FaTree, FaMusic, FaPause, FaPlay } from "react-icons/fa";
import { BsSendFill, BsSnow } from "react-icons/bs";

const VirtualChristmasParty = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [resolutions, setResolutions] = useState([]);
  const [newResolution, setNewResolution] = useState("");
  const [ornaments, setOrnaments] = useState([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      const difference = christmas - now;

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user", time: new Date() }]);
      setNewMessage("");
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { text: "Merry Christmas! 🎄✨", sender: "bot", time: new Date() }
        ]);
      }, 1000);
    }
  };

  const handleAddResolution = () => {
    if (newResolution.trim()) {
      setResolutions([...resolutions, { text: newResolution, completed: false }]);
      setNewResolution("");
    }
  };

  const toggleResolution = (index) => {
    const updatedResolutions = [...resolutions];
    updatedResolutions[index].completed = !updatedResolutions[index].completed;
    setResolutions(updatedResolutions);
  };

  const addOrnament = (e) => {
    const treeRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - treeRect.left;
    const y = e.clientY - treeRect.top;
    setOrnaments([...ornaments, { x, y, color: getRandomColor() }]);
  };

  const getRandomColor = () => {
    const colors = ["#FF0000", "#FFD700", "#00FF00", "#0000FF", "#FF69B4"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6">
      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <BsSnow
            key={i}
            className="absolute text-white animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Countdown Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Christmas Countdown</h2>
          <div className="text-white text-4xl font-bold">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m
          </div>
        </div>

        {/* Music Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white text-xl flex items-center gap-2 hover:text-red-400 transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <FaMusic />
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>

        {/* Interactive Tree */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 relative min-h-[400px]" onClick={addOrnament}>
          <FaTree className="text-green-600 text-9xl mx-auto cursor-pointer" />
          {ornaments.map((ornament, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: ornament.x,
                top: ornament.y,
                backgroundColor: ornament.color,
              }}
            />
          ))}
        </div>

        {/* Chat Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="h-80 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-red-400" : "bg-green-400"} text-white`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 p-2 text-white placeholder-white/50"
              placeholder="Send a festive message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-400 p-2 rounded-lg text-white hover:bg-red-500"
            >
              <BsSendFill />
            </button>
          </div>
        </div>

        {/* Resolutions */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">New Year's Resolutions</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newResolution}
              onChange={(e) => setNewResolution(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 p-2 text-white placeholder-white/50"
              placeholder="Add a resolution..."
            />
            <button
              onClick={handleAddResolution}
              className="bg-green-400 px-4 py-2 rounded-lg text-white hover:bg-green-500"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {resolutions.map((resolution, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/20 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={resolution.completed}
                  onChange={() => toggleResolution(index)}
                  className="w-5 h-5"
                />
                <span className={`text-white ${resolution.completed ? "line-through" : ""}`}>
                  {resolution.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualChristmasParty;
