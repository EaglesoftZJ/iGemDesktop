mkdir build
mkdir build/out

echo "Building All Platforms"

electron-packager . FlyChat --platform=darwin --overwrite  --arch=all --app-bundle-id=cn.eaglesoft.flychat --version=1.7.8 --out=build --icon=assets/app_icon --osx-sign.identity="Mac Developer: shanbo zhang (739HWZ3BL4)"

cd build/FlyChat-darwin-x64/


zip --symlinks -r FlyChat-Mac.zip FlyChat.app/
mv FlyChat-Mac.zip ../out/
cd ../../

# echo "Building Windows"

electron-packager . FlyChat --platform=win32 --overwrite  --arch=all --app-bundle-id=cn.eaglesoft.flychat --version=1.7.8 --out=build --icon=assets/app_icon.icns

cd build
zip --symlinks -r FlyChat-Win-x86.zip FlyChat-win32-ia32/
mv FlyChat-Win-x86.zip out/

zip --symlinks -r FlyChat-Win-x64.zip FlyChat-win32-x64/
mv FlyChat-Win-x64.zip out/
cd ../
