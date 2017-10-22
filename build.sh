mkdir build
mkdir build/out

echo "Building All Platforms"

electron-packager . iGem --platform=darwin --arch=all --app-bundle-id=cn.eaglesoft.igem --version=1.7.8 --out=build --icon=assets/app_icon

cd build/iGem-darwin-x64/

zip --symlinks -r iGem-Mac.zip iGem.app/
mv iGem-Mac.zip ../out/
cd ../../

# echo "Building Windows"

electron-packager . iGem --platform=win32 --arch=all --app-bundle-id=cn.eaglesoft.igem --version=1.7.8 --out=build --icon=assets/app_icon.icns

cd build
zip --symlinks -r iGem-Win-x86.zip iGem-win32-ia32/
mv iGem-Win-x86.zip out/

zip --symlinks -r iGem-Win-x64.zip iGem-win32-x64/
mv iGem-Win-x64.zip out/
cd ../
