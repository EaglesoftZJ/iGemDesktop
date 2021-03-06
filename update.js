const { remote } = require('electron');
let percent = 0;
const updater = remote.require('electron-simple-updater');
window.alert("update还是没载入");
updater.on('update-available', (meta) => {
    window.alert(meta.version);
    window.alert(meta.readme);
    updater.downloadUpdate();
});
updater.on('update-downloading', (value) => { 
    if (percent === 0) {
        window.alert(value);
    }
});
updater.on('update-downloaded', () => {
    if (window.confirm('Restart and install updates?')) {
        updater.quitAndInstall();
    }
});
updater.on('error', (err) => {
    window.alert(err);
});

updater.checkForUpdates();