import { Ear } from "../components/hearingTest";

export function playSound(context: AudioContext, arr: number[], ear?: Ear) {
  var buf = new Float32Array(arr.length);
  for (var i = 0; i < arr.length; i++) buf[i] = arr[i];
  var buffer = context.createBuffer(1, buf.length, context.sampleRate);
  buffer.copyToChannel(buf, 0);
  var source = context.createBufferSource();
  source.buffer = buffer;
  if (ear) {
    var merger = context.createChannelMerger(2);
    merger.connect(context.destination);
    if (ear === Ear.Left) {
      source.connect(merger, 0, 0);
    } else {
      source.connect(merger, 0, 1);
    }
  } else {
    source.connect(context.destination);
  }

  source.start(0);
}

function sineWaveAt(context: AudioContext, sampleNumber: number, tone: number) {
  var sampleFreq = context.sampleRate / tone;
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
}
export const getSaoundCinfig = (
  ctx: AudioContext,
  volume: number = 0.1,
  seconds: number = 1,
  tone: number = 1000
) => {
  const arr = [];
  for (var i = 0; i < ctx.sampleRate * seconds; i++) {
    arr[i] = sineWaveAt(ctx, i, tone) * volume;
  }
  return {
    arr,
    volume,
    seconds,
    tone,
  };
};
export const playCalibrationSound = (ctx: AudioContext): NodeJS.Timer => {
  const coef = Math.pow(10, 5 / 20);

  const s1 = getSaoundCinfig(ctx);
  const s2 = getSaoundCinfig(ctx, s1.volume * coef);
  const i = setInterval(() => {
    playSound(ctx, s1.arr);
    setTimeout(() => {
      playSound(ctx, s2.arr);
    }, s1.seconds * 1000);
  }, 2000);
  return i;
};
