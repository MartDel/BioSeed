FROM fedora

RUN dnf -y update && dnf clean all
RUN dnf -y install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm && dnf clean all
RUN dnf -y install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm && dnf clean all
RUN dnf -y install python3-pip opencv opencv-contrib opencv-doc python3-opencv python3-matplotlib python3-numpy ffmpeg && dnf clean all

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "streamer.py"]