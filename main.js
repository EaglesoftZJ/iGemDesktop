// const appUrl = 'http://61.175.100.14:5433/' 

const iconPath = __dirname + '/assets/favicon.png';
const blinkIconPath = __dirname + '/assets/favicon_blink.png';

let blinkTrayFlag = false;

const electron = require('electron');
const { app, Menu, Tray, ipcMain, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

const constant = require('./constant')

const appUrl = constant.AppDevUrl;;
const isMacOS = constant.isMacOS;

const notificationManager = require('./notification');
const updateManager = require('./update');

let tray = null;

var player = require('play-sound')(opts = {});


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {



  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 700 })

  let offsetX = 200;
  let offsetY;

  if (isMacOS) {
    offsetY = -9999; //超过屏幕自动居于底部 不用管
  } else {
    offsetY = 150;
  }


  Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(appUrl);

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('close', function(e) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if (mainWindow && !isMacOS) {
      e.preventDefault();
    }

    hideWindow();

  })



  mainWindow.webContents.session.on('will-download', function(e, item) {

    // By default electron doesn't
    let { dialog } = require('electron')
    var savePath = dialog.showSaveDialog(mainWindow, { defaultPath: item.getFilename() });
    if (savePath != undefined) {
      item.setSavePath(savePath)
    } else {
      item.cancel()
      return
    }

    console.log(item.getMimeType());
    console.log(item.getFilename());
    console.log(item.getTotalBytes());
    item.on('updated', function() {
      console.log('Received bytes: ' + item.getReceivedBytes());
    });


    item.on('done', function(e, state) {
      if (state == "completed") {
        console.log("Download successfully");

        player.play('./assets/close.wav', function(err, stdout, stderr) {
          if (err) throw err
          console.log(stdout)
          console.log(stderr)
        });

      } else {
        console.log("Download is cancelled or interrupted that can't be resumed");
      }
    })
  })
}

function showWindow() {
  if (mainWindow && !isMacOS) {
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
  }
}

function hideWindow() {
  if (mainWindow && !isMacOS) {
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
  }
}



function createTray() {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click() {
        mainWindow = null;
        app.quit();
      }
    }
  ])
  tray.setToolTip('iGem');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? hideWindow() : showWindow()
  })

  var count = 0;
  setInterval(function() {
    count = (count + 1) % 2;
    if (count == 1) {
      tray.setImage(iconPath);
    } else {
      if (blinkTrayFlag) {
        tray.setImage(blinkIconPath);
      }

    }
  }, 500);
}

function blinkTray() {
  blinkTrayFlag = true;
}

function stopBlinkTray() {
  blinkTrayFlag = false;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  createTray();
  notificationManager.init(electron.screen.getPrimaryDisplay().workAreaSize.width,electron.screen.getPrimaryDisplay().workAreaSize.height);
  updateManager.init();
})

app.on('browser-window-blur', (event, window) => {
  //if(!isMacOS)
  window.webContents.executeJavaScript('window.messenger.onAppHidden()');


})

app.on('browser-window-focus', (event, window) => {
  //if(!isMacOS)
  window.webContents.executeJavaScript('window.messenger.onAppVisible()');


})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Qvb
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// app.on('before-quit', function(event) {
//   if (process.platform !== 'darwin') {
//     event.preventDefault();
//     mainWindow.minimize();
//     mainWindow.setSkipTaskbar(true);
//   }
// })


app.on('activate-with-no-open-windows', createWindow);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// ipc on
ipcMain.on('new-messages-show', function(event, arg) {
  if (isMacOS) {
    app.dock.bounce();
    app.dock.setBadge('.');
  }

});

ipcMain.on('tray-badge', function(event, arg) {
  blinkTray();
  if (isMacOS) {
    app.dock.bounce();
    //app.dock.setBadge(arg.count.toString());
  }

});

ipcMain.on('new-messages-hide', function(event, arg) {
  stopBlinkTray();
  if (isMacOS) {
    app.dock.setBadge('');
  }

});

ipcMain.on('tray-bounce', function(event, arg) {
  if (isMacOS) {
    app.dock.bounce();
  }

});

ipcMain.on('new-messages-notification', function(event, arg) {
  if (!mainWindow.isFocused()) {
    notificationManager.addShowTime(5);

  }
  if (isMacOS) {
    
  }

});

function showNotification() {
  notificationWindow.setBounds({ width: 200, height: 300, x: screenWidth - 200, y: screenHeight - 300 });
}



