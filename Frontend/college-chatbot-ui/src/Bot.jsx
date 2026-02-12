import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatIconSVG from "/message.svg";
import SpeakerSVG from "/speaker-71.svg"; 
import MicSVG from "/mic-29.svg";
import "./Bot.css";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "en-IN";
      recog.continuous = false;
      recog.interimResults = false;
      recog.onresult = (e) => setInput(e.results[0][0].transcript);
      recog.onend = () => setMicActive(false); // stop mic button when recognition ends
      recognitionRef.current = recog;
    }
  }, []);

  // Speak / Stop speaking toggle
  const speak = (text) => {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();         // stop current speech
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    utter.voice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          ["zira", "susan", "google"].some((n) =>
            v.name.toLowerCase().includes(n)
          )
      ) || voices.find((v) => v.lang.startsWith("en"));
    utter.lang = "en-IN";
    utter.rate = 1;
    utter.pitch = 1.1;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    synth.speak(utter);
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.response }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Server error" }]);
    }
  };

  // Toggle mic recording
  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (micActive) {
      recognitionRef.current.stop();
      setMicActive(false);
    } else {
      recognitionRef.current.start();
      setMicActive(true);
    }
  };

  return (
    <>
      {/* Chat FAB */}
      <div className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        <img src={ChatIconSVG} alt="Chat" />
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <span>College Chatbot</span>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div className={`msg ${m.sender}`} key={i}>
              <span>{m.text}</span>
              {m.sender === "bot" && (
                <button
                  className="speaker-btn"
                  onClick={() => speak(m.text)}
                  style={{ opacity: isSpeaking ? 0.7 : 1 }}
                >
                  <img src={SpeakerSVG} alt="Speak" />
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <button
            className={`mic-btn ${micActive ? "active" : ""}`}
            onClick={toggleMic}
          >
            <img src={MicSVG} alt="Mic" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type or speak..."
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Bot;
