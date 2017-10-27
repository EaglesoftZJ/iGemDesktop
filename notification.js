const {BrowserWindow } = require('electron');
const isMacOS = require('./constant').isMacOS;

const notificationManager = {
    notificationWindow: null,
    notificationMap: {},
    showTime: 5,
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
            height:this.height, 
            resizable: false, 
            frame: false,
            alwaysOnTop: true,
            skipTaskbar: true, 
            x: this.screenWidth - this.offsetX, 
            y: this.screenHeight - this.offSetY  
        });

        setInterval(() => {
            this.showTime = this.showTime - 1 <= 0 ? 0 : this.showTime - 1;
            if (this.notificationWindow)
                if (this.showTime > 0) {
                
                    this.notificationWindow.show();
                } else {
                    this.notificationWindow.hide();
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
