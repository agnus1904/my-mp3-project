# Build reactjs app with production mode
npm run build

# Deploy  to firebase
firebase deploy

# Move to build folder
cd build

# Clone index.html into 200.html
cp index.html 200.html

# Start deploying via Surge
# The command means deploy current folder to domain paul-photo-app.surge.sh
surge . mp3-typescript-app.surge.sh

