export const playNote = (ctx: AudioContext, note: number[]) => {
    const [frequency, duration ] = note;
    var oscillator = ctx.createOscillator();
  
    oscillator.type = 'square';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(ctx.destination);
    oscillator.start();
  
    setTimeout(
      ()  => {
        oscillator.stop();
      }, duration * 100);
  }


function playSound(context: AudioContext, arr: number[]) {
  var buf = new Float32Array(arr.length)
  for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
  var buffer = context.createBuffer(1, buf.length, context.sampleRate)
  buffer.copyToChannel(buf, 0)
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

function sineWaveAt(context: AudioContext ,sampleNumber: number, tone: number) {
  var sampleFreq = context.sampleRate / tone
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
}
const getSaoundCinfig = (ctx: AudioContext,volume:number = 0.1, seconds:number = 1, tone:number = 1000) => {
  const arr = [];
  for (var i = 0; i < ctx.sampleRate * seconds; i++) {
    arr[i] = sineWaveAt(ctx, i, tone) * volume
  }
  return {
    arr,
    volume,
    seconds,
    tone
  }
}
export const playSound2 = (ctx: AudioContext): NodeJS.Timer => {
  const coef = Math.pow(10, 5/20);

  const s1 = getSaoundCinfig(ctx)
  const s2 = getSaoundCinfig(ctx,s1.volume * coef)
  const i = setInterval(()=> {
    playSound(ctx, s1.arr)
    setTimeout(
      ()  => {
        playSound(ctx, s2.arr)
      }, s1.seconds * 1000);
  }, 2000)
  return i;
}