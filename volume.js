(function () {
  const video = document.getElementById('video');
  const url = 'http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstreet%2Fmaster.m3u8';

  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.addEventListener('loadedmetadata', function () {
      video.play();
    });
  }

  const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32;
  analyser.connect(audioCtx.destination);

  const source = audioCtx.createMediaElementSource(video);
  source.connect(analyser);

  function getVolume() {
    const bufferLength = analyser.frequencyBinCount;
    const streamData = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(streamData);
    return streamData.reduce((acc, value) => acc + value, 0) / 255 / bufferLength;
  }

  const canvas = document.querySelector('#volume');
  canvasCtx = canvas.getContext('2d');
  canvasCtx.fillStyle = 'lightblue';

  const WIDTH = 600;
  const HEIGHT = 10;

  function draw() {
    const volume = getVolume();

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillRect(0, 0, WIDTH * volume, HEIGHT);

    requestAnimationFrame(draw);
  }

  draw();
}());