# YouTube TV (Unofficial Fork)

This is a maintained fork of the abandoned YouTube TV Electron client.  
It provides a simple desktop interface that behaves like a YouTube-capable TV device: you can connect from a phone or Chrome browser and cast videos directly to the app.

I will not be providing prebuilt binaries.  
If you want to use this project, you must build it yourself from source.

---

## Overview

This client implements a DIAL server (based on SSDP) to allow pairing with devices that use the same protocol.  
Only YouTube functionality is implemented.

The application uses the official user agent expected by YouTube TV:

```
Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/092754
```

You can launch the project with either:

- `npm start`
- `npx electron .`
- or `electron .` if Electron is installed globally.

---

## Builds

The original project distributed binaries for Linux, macOS, and Windows across various architectures.  
This fork does *not* provide any binaries.  
All users must build from source.

---

## Keyboard Shortcuts

- Max resolution configuration panel: `Ctrl + S`
- Fullscreen: `Ctrl + F`
- Developer Tools: `Ctrl + D`
- Toggle cursor visibility: `Ctrl + A`

Functionality on Windows/macOS ARM platforms remains untested; ARM Linux is supported via Raspberry Pi (armv7l).

---

## Last Changes (2.4.0 / 2.4.1 from the original)

### 2.4.1
- Fixed an issue where the YouTube TV process failed to fully close on non-macOS platforms.
- Transparent title bar on macOS.
- Fixed missing Spanish title in the window bar.

### 2.4.0
- Persistent storage of main-window state: size, position, fullscreen, and cursor visibility.

---

## Configuration

A window for configuring maximum playback resolution is included.  
Open it with `Ctrl + S`.

Resolution defaults are limited due to typical hardware constraints.  
Most systems use integrated GPUs that share system memory, which can cause extreme performance degradation at resolutions above 2K/4K.

Users may override this, but YouTube may auto-adjust resolution based on measured bandwidth, sometimes choosing levels the hardware cannot comfortably handle.
