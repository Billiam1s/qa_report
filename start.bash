curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install unzip
mkdir logs
curl -sl https://github.com/Billiam1s/qa_report/archive/master.zip --output master.zip
unzip master.zip
mv qa_report-master app
cd app
npm install
npm start