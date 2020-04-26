(function() {
    const btnSetEl = document.querySelector('.btn-set');
    const btnEl = btnSetEl.querySelector('.btn--all-cameras');

    btnEl.addEventListener('click', function() {
        const videoWrapEls = document.querySelectorAll('.video-wrap--fullscreen');
        videoWrapEls.forEach((el) => el.classList.remove('video-wrap--fullscreen'));
        btnSetEl.classList.remove('btn-set--show');
    });

    function initVideo(video, url) {
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
    
        video.addEventListener('click', function(){
            const videoWrap = video.closest('.video-wrap');
            videoWrap.classList.toggle('video-wrap--fullscreen');
            
            btnSetEl.classList.add('btn-set--show');
        });
    };

    initVideo(
        document.getElementById('video-1'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-2'),
        'http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstairs%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-3'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-4'),
        'http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstreet%2Fmaster.m3u8'
    );
}());
