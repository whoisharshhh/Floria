"use client";

import React, { useState, useRef } from "react";

export default function ExtractPage() {
  const [status, setStatus] = useState("Click button to start extraction");
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startExtraction = async () => {
    if (extracting) return;
    setExtracting(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    try {
      setStatus("Loading video 1...");
      if (video.readyState < 2) {
        await new Promise<void>((resolve) => {
          video.onloadeddata = () => resolve();
          video.onloadedmetadata = () => resolve();
          video.load();
        });
      }

      const duration = video.duration || 8;
      const totalFrames = 232;
      const w = video.videoWidth || 1920;
      const h = video.videoHeight || 1080;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      setStatus(`Extracting ${totalFrames} frames for Video 1...`);

      for (let i = 1; i <= totalFrames; i++) {
        const targetTime = ((i - 1) / (totalFrames - 1)) * duration;

        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
          video.currentTime = targetTime;
        });

        ctx.drawImage(video, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        const frameNum = String(i).padStart(3, "0");

        const res = await fetch("/api/extract-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frameNum, dataUrl, dirName: "frames-part1" }),
        });
        if (!res.ok) {
          throw new Error(`API error at frame ${i}`);
        }

        const pct = Math.round((i / totalFrames) * 100);
        setProgress(pct);
        setStatus(`Extracted frame ${i}/${totalFrames} (${pct}%)`);
      }

      setStatus("PART 1 COMPLETE! All 232 frames saved to frames-part1.");
      setIsDone(true);
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + err.message);
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center font-mono">
      <h1 className="text-xl font-bold mb-3 tracking-wider text-pink-400">FLORIA HD FRAME GENERATOR (PART 1)</h1>

      <video
        ref={videoRef}
        src="/discovery/videos/Create_animated_video_from_image_20260911235105.mp4"
        muted
        playsInline
        preload="auto"
        className="w-96 rounded border border-zinc-800 mb-6 shadow-2xl"
      />
      <canvas ref={canvasRef} className="hidden" />

      <button
        id="start-btn"
        onClick={startExtraction}
        disabled={extracting}
        className="px-8 py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold rounded cursor-pointer transition-colors mb-4"
      >
        {extracting ? "Extracting..." : "Start Extracting Part 1"}
      </button>

      <div id="status-text" className="text-sm font-semibold text-zinc-200 mb-3">{status}</div>
      <div className="w-80 h-3 bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-150 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isDone && (
        <div id="done-text" className="mt-6 text-emerald-400 font-bold text-sm">
          ✓ Video 1 frames extracted successfully!
        </div>
      )}
    </div>
  );
}
