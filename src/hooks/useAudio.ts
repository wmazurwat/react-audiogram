
export function useAudio() {
  const audioCtx = new(window.AudioContext)();
  return audioCtx;
}