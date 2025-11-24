# YouTube TV (Unofficial Fork)

This is an actively maintained fork of the abandoned YouTube TV Electron client.  
It recreates the YouTube TV experience on desktop, allowing casting from a phone or Chrome browser just like a smart TV or Chromecast device.

I will only be releasing **Windows** binaries for convenience.  
Users on Linux and macOS should **build from source**, as their platforms are not officially supported in this fork.

---

## Overview

This client implements a DIAL server (SSDP-based) to allow pairing with devices that support the protocol.  
Only YouTube functionality is implemented.

The application uses the official user agent expected by YouTube TV:

```
Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/092754
```

You can launch the project using:

- `npm start`
- `npx electron .`
- or `electron .` if Electron is installed globally.

---

## Builds

The original project shipped binaries for all major desktops.  
This fork ships **Windows builds only**.  
Linux and macOS users must compile the app themselves.

---

## Keyboard Shortcuts

- Max resolution settings window: `Ctrl + S`
- Fullscreen toggle: `Ctrl + F` or `F11`
- Developer Tools: `Ctrl + D` or `Ctrl + Shift + I`
- Toggle cursor visibility: `Ctrl + A`

Behavior on ARM platforms (Windows/macOS) remains untested. ARM Linux is usable on Raspberry Pi (armv7l).

---

## Changes (Unofficial Fork)

### 2.4.2
- Removed the buggy connection handler that caused banners to get stuck.
- Restored missing fullscreen and DevTools shortcuts.
- Converted global shortcuts into local event listeners to prevent interference with other applications.
- Fixed selector visibility issues and restored dark theme styling.
- Reintroduced the YouTube icon in the settings window.
- General cleanup, UI consistency fixes, and minor renderer improvements.

---

## Previous Changes (Original Project)

### 2.4.1
- Fixed incomplete shutdown behavior on non-macOS platforms.
- Transparent title bar on macOS.
- Corrected missing Spanish title.

### 2.4.0
- Window position, size, fullscreen state, and cursor visibility are now stored persistently.

---

## Configuration

A window for adjusting maximum playback resolution can be opened with `Ctrl + S`.

Default resolution limits exist due to typical integrated GPU performance constraints, as higher resolutions (2K/4K) can cause severe degradation on shared-memory systems.  
Users may change this manually, but YouTube may override settings based on detected bandwidth.

