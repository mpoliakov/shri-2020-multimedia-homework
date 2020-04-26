(function () {
  const video = document.getElementById('video');
  const url = 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8';

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

  const filtersForm = document.forms.filters;
  const brightnessInput = filtersForm.brightness;
  const contrastInput = filtersForm.contrast;

  filtersForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const brightness = brightnessInput.value ? (brightnessInput.value / 100) : 1;
    const contrast = contrastInput.value ? (contrastInput.value / 100) : 1; 

    video.style.filter = `brightness(${brightness}) contrast(${contrast})`;
  });
}());