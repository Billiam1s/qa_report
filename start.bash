#!/bin/bash
sudo yum -y update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
sudo yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
mkdir logs
curl -sL https://github.com/Billiam1s/qa_report/archive/master.zip --output master.zip
unzip master.zip
mv qa_report-master app
cd app
npm install
npm start