import subprocess, cv2, yaml

with open('config.yml', 'r') as file:
    config = yaml.safe_load(file)

live_name = "test"

cap = cv2.VideoCapture(config['base_file'])

if not cap.isOpened():
    print("Error opening the video file")
else:
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"FPS: {fps}\nFrames: {frame_count}\nSize: {width}x{height}")

    # command and params for ffmpeg
    command = ['ffmpeg',
            '-y',
            '-f', 'rawvideo',
            '-vcodec', 'rawvideo',
            '-pix_fmt', 'bgr24',
            '-s', "{}x{}".format(width, height),
            '-r', str(fps),
            '-i', '-',
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-preset', 'ultrafast',
            '-f', 'flv',
            config['url'] + live_name]

    print(command)
    # using subprocess and pipe to fetch frame data
    p = subprocess.Popen(command, stdin=subprocess.PIPE)

while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        cv2.line(frame,(0,0),(100,100),(255,0,0),5)

        # cv2.imshow('Frame',frame)
        p.stdin.write(frame.tobytes())

        # 20 is in milliseconds, try to increase the value, say 50 and observe
        key = cv2.waitKey(20)
        
        if key == ord('q'):
            break
    else:
       cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
       continue

# Release the video capture object
cap.release()
cv2.destroyAllWindows()