const { app, BrowserWindow, Tray, Menu, nativeImage, autoUpdater, dialog, shell } = require('electron');
const path = require('node:path');
const config = require("./config.json");
const icons = require("./icons.json");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let contextMenu;
let tray ;
let isUpdating = false;
let restartApp = () => {console.error("Not implemented.")};

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        dialog.showMessageBox({
            type: 'error',
            buttons: ['Ok'],
            title: 'Error',
            message: "There is already an instance of Crooms Bell Schedule running! Quit that instance first!"
        });
    })
}

const checkForUpdates = () => {
    if (isUpdating){
        return;
    }
    if (!app.isPackaged){
        return;
    }
    if (!contextMenu){
        return;
    }
    if (!tray){
        return;
    }

    isUpdating = true;
    contextMenu.getMenuItemById("checkForUpdatesButton").enabled = false;
    contextMenu.getMenuItemById("reopenWindowButton").enabled = false;
    tray.setContextMenu(contextMenu);

    autoUpdater.checkForUpdates();
}

if (app.isPackaged){
    const server = config.hazelUpdateURL;
    const url = `${server}/update/${process.platform}/${app.getVersion()}`;

    autoUpdater.setFeedURL({ url });

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        dialog.showMessageBox({
            type: 'info',
            buttons: ['Restart now', 'Restart later'],
            title: 'Application Update',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail:
                'A new version of the Crooms Bell Schedule has been\ndownloaded. Restart the application to apply the updates.'
        }).then((returnValue) => {
            if (returnValue.response === 0) autoUpdater.quitAndInstall()
        });
        contextMenu.getMenuItemById("checkForUpdatesButton").enabled = true;
        contextMenu.getMenuItemById("reopenWindowButton").enabled = true;
        tray.setContextMenu(contextMenu);
        isUpdating = false;
        try {
            autoUpdater.off("update-not-available", showUpToDateDialog);
        }
        catch (e) {
            console.warn(e);
        }
    })

    autoUpdater.on('error', (message) => {
        console.error('There was a problem updating the application');
        console.error(message);
        /*
        dialog.showMessageBox({
          type: 'error',
          buttons: ['Ok'],
          title: 'Update Error',
          message: "There was an error while trying to update the Crooms Bell Schedule:",
          detail: message.toString()
        });

         */
        contextMenu.getMenuItemById("checkForUpdatesButton").enabled = true;
        contextMenu.getMenuItemById("reopenWindowButton").enabled = true;
        tray.setContextMenu(contextMenu);
        isUpdating = false;

    });

    // Check for updates every 1 hour.
    setInterval(()=> {
        checkForUpdates();
        autoUpdater.on("update-not-available", enableButtonsOnAutoUpdate);
    }, 3600000);
}

const enableButtonsOnAutoUpdate = () => {
    contextMenu.getMenuItemById("checkForUpdatesButton").enabled = true;
    contextMenu.getMenuItemById("reopenWindowButton").enabled = true;
    tray.setContextMenu(contextMenu);
    isUpdating = false;
    autoUpdater.off("update-not-available", enableButtonsOnAutoUpdate);
}

const createWindow = () => {
    // Create the browser window.
    //preload: '/preload.ts',
    const mainWindow = new BrowserWindow({
        height: 83,
        width: 365,
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true,
        title: 'Crooms Bell Schedule',
        show: false,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        focusable: false,
        maximizable: false,
        closable: true,
        minimizable: false,
        hasShadow: false,
        maxHeight: 83,
        minHeight: 83,
        minWidth: 355
    });

    restartApp = () => {
        mainWindow.close();
        tray.destroy();
        createWindow();
    }

    // and load the index.html of the app.
    mainWindow.loadURL(path.join(__dirname, 'index.html')).then(() => {
        mainWindow.setOpacity(0.7);
    });

    // Open the DevTools.
    // Comment in a prod release.
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.showInactive()
    });

    // disable right click menu on move region
    const WM_INITMENU = 0x0116;
    mainWindow.hookWindowMessage(WM_INITMENU, () => {
        mainWindow.setEnabled(false);
        mainWindow.setEnabled(true);
    });

    createTray();
};

const aboutWindow = () => {
    const aboutWin = new BrowserWindow({
        height: 600,
        width: 400,
        alwaysOnTop: false,
        title: "Crooms Bell Schedule | About",
        show: false,
        autoHideMenuBar: true,
        focusable: true,
        maximizable: false,
        closable: true,
        minimizable: true,
        hasShadow: true
    });

    // And load the about page of the app.
    aboutWin.loadURL(path.join(__dirname, "about.html")).then(() => {
        aboutWin.setOpacity(1);
    });


    // Open the DevTools.
    // Comment in a prod release.
    // mainWindow.webContents.openDevTools();

    aboutWin.once('ready-to-show', () => {
        aboutWin.show()
    });
}

const manualUpdate = () => {
    autoUpdater.on("update-not-available", showUpToDateDialog);
    checkForUpdates();
}

const siteOpen = () => {
    shell.openExternal("https://croomssched.tech/");
}

const bugReport = () => {
    shell.openExternal("https://github.com/ajcoolcat/BellSchedOverlay/issues");
}

const quitApp = () => {
    app.quit();
}

const icon = nativeImage.createFromDataURL(icons.appIcon);

const createTray = () => {
    tray = new Tray(icon);
    contextMenu = Menu.buildFromTemplate([
        {label: "Crooms Bell Schedule v" + app.getVersion().toString(), type: "normal", click: aboutWindow, id: "title", enabled: true },
        {type: "separator"},
        {label: 'Check for Updates', type: 'normal', click: manualUpdate, id: "checkForUpdatesButton"},
        {label: 'Reopen Window', type: 'normal', click: restartApp, id: "reopenWindowButton"},
        {label: 'Open CBSH Website', type: 'normal', click: siteOpen, id: 'siteButton'},
        {label: 'Report a Bug', type: 'normal', click: bugReport, id: 'bugReportsButton'},
        {label: 'Quit', type: 'normal', click: quitApp, id: "quitButton"}
    ]);
    tray.setToolTip('Crooms Bell Schedule');
    tray.setContextMenu(contextMenu);
}

const showUpToDateDialog = () => {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'No Updates Available',
        message: "You're all set!",
        detail:
            "The application is up-to-date."
    })
    contextMenu.getMenuItemById("checkForUpdatesButton").enabled = true;
    contextMenu.getMenuItemById("reopenWindowButton").enabled = true;
    tray.setContextMenu(contextMenu);
    isUpdating = false;
    autoUpdater.off("update-not-available", showUpToDateDialog);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        checkForUpdates();
    }
});