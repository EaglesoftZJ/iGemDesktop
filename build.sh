mkdir build
mkdir build/out

echo "Building All Platforms"

electron-packager . 飞鸟 --platform=darwin --overwrite  --arch=all --app-bundle-id=cn.eaglesoft.飞鸟 --version=1.7.8 --out=build --icon=assets/app_icon --osx-sign.identity="Mac Developer: shanbo zhang (739HWZ3BL4)"

cd build/飞鸟-darwin-x64/


zip --symlinks -r 飞鸟-Mac.zip 飞鸟.app/
mv 飞鸟-Mac.zip ../out/
cd ../../

# echo "Building Windows"

electron-packager . 飞鸟 --platform=win32 --overwrite  --arch=all --app-bundle-id=cn.eaglesoft.飞鸟 --version=1.7.8 --out=build --icon=assets/app_icon.icns

cd build
zip --symlinks -r 飞鸟-Win-x86.zip 飞鸟-win32-ia32/
mv 飞鸟-Win-x86.zip out/

zip --symlinks -r 飞鸟-Win-x64.zip 飞鸟-win32-x64/
mv 飞鸟-Win-x64.zip out/
cd ../
