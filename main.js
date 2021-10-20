// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

// Live reload module which watches `public` folder
// const _ = require('electron-reload')(__dirname + '/public')

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let particleWindow
let consellationWindow

// A function to create the browser window when the app is ready
function createWindow() {

    // Create the browser window.
    particleWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // useContentSize: true 
        /*when false, width/height will set the size of the whole app, including frames. If true, 
        innerWindow will be set instead, resulting in a bigger app window */
    })

    consellationWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
    })

    // Load the index.html of the app
    particleWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    consellationWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public', 'constellation.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools on start
    consellationWindow.webContents.openDevTools("undock")

    // Emitted when the window is closed
    particleWindow.on('closed', function() {
        particleWindow = null
    })

    consellationWindow.on('closed', function() {
        consellationWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (particleWindow === null) {
        createWindow()
    }
    if (consellationWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.