const NodeMediaServer = require('node-media-server');
const config = require('./config.json').rtmp_server;
const spawn = require('child_process').spawn;
const axios = require('axios');

const generateStreamThumbnail = (stream_key, liveId) => {
    const url = `http://localhost:8888/live/${stream_key}/index.m3u8`;
    const args = [
        '-y',
        '-i', url,
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        `thumbnails/${liveId}.png`,
    ];

    let i = 0;
    const waiting = () => {
        if (i > 50) {
            console.log("Stop trying...");
            return;
        }
        console.log("Trying to reach the live file...", i);
        i++;

        axios.get(url)
            .then(res => {
                if (res.status >= 300) setTimeout(waiting, 1000);
                else {
                    console.log("-- The live is reachable ! --");
                    spawn(config.trans.ffmpeg, args, {
                        detached: true,
                        stdio: 'ignore'
                    }).unref();
                }
            })
            .catch(() => setTimeout(waiting, 1000));
    };
    waiting();
};

nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log(' -- NodeEvent on prePublish -- ', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    generateStreamThumbnail(stream_key, id);
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

nms.run();