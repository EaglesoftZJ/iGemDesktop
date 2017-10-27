const { BrowserWindow } = require('electron');
const isMacOS = require('./constant').isMacOS;
const url = require('url');
const path = require('path');

const notificationManager = {
    notificationWindow: null,
    notificationMap: {},
    showTime: 100,
    init(screenWidth, screenHeight) {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;

        this.width = 150;
        this.height = 100;
        this.offsetX = 180;

        this.offSetY = this.height + 10;

        if (!isMacOS) {
            this.offSetY += 50;
        }

        this.notificationWindow = new BrowserWindow({
            width: this.width,
            height: this.height,
            resizable: true,
            frame: false,
            alwaysOnTop: true,
            skipTaskbar: true,
            x: this.screenWidth - this.offsetX,
            y: this.screenHeight - this.offSetY
        });

        this.notificationWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'update.html'),
            protocol: 'file:',
            slashes: true
        }))


        // this.notificationWindow.loadURL(url)

        setInterval(() => {
            this.showTime = this.showTime - 1 <= 0 ? 0 : this.showTime - 1;
            if (this.notificationWindow)
                if (this.showTime > 0) {
                    if (!this.notificationWindow.isVisible) {
                        this.notificationWindow.show();
                    }

                } else {
                    if (this.notificationWindow.isVisible) {
                        this.notificationWindow.hide();
                    }
                    
                }
        }, 1000);

    },
    addShowTime(time) {
        this.showTime = this.showTime + time > 5 ? 5 : this.showTime + time;
    },
    clearShowTime() {
        this.showTime = 0;
    }

};
module.exports = notificationManager;
