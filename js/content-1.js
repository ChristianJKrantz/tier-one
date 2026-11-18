/* Tier One content, Part I: Windows essentials (chapters 1-8).
   All lesson text is original study material written to follow the chapter outline of
   "Windows 11 Inside Out" (Ed Bott, Microsoft Press, 2023). It summarizes ideas in new words
   and does not reproduce the book.

   Format reference (see js/data.js for the loader):
   learn: [{t: section title, q: think-first question, p: [paragraphs or "- bullets"], key: [lock-it-in lines], trap: common mistake}]
   cards: [[front, back]]
   run:   [[task, accepted answers separated by | (or an array when an answer contains |), hint 1, hint 2]]
   quiz:  [[question, [options], index of best option, hint, learn section index, [why each wrong option misses], isTicket]] */
W.chapter({
  id: 'c1', num: '1', part: 1, title: 'Everything you need to know about Windows 11',
  short: 'Windows 11 at a glance', icon: 'spark',
  blurb: 'The big picture: what changed from Windows 10, how updates are delivered, and the hardware security baseline behind it all.',
  learn: [
    { t: 'What\'s new in Windows 11', q: 'If Windows 11 is built on the same core as Windows 10, why does it feel so different?',
      p: ['Windows 11 shares its foundation (kernel, drivers, NTFS, the registry) with Windows 10. Most of what changed sits on top: a **centered taskbar and a simplified Start menu**, rounded corners, a new Settings app, Snap layouts and a redesigned Microsoft Store.',
        'The biggest change you can\'t see is the **hardware baseline**. Windows 11 requires a TPM 2.0 chip, UEFI firmware with Secure Boot capability and a supported 64-bit CPU, so security features can be turned on by default instead of being optional.',
        'To check exactly which version and build a PC is running, run `winver`. Version names follow a year-and-half pattern such as **22H2** (2022, second half).'],
      key: ['Same core as Windows 10, new shell on top', 'Hardware baseline = TPM 2.0 + UEFI/Secure Boot + supported 64-bit CPU', '`winver` shows version and build'],
      trap: 'Assuming Windows 11 is a totally new OS. Old troubleshooting skills (registry, NTFS, Device Manager) still apply.' },
    { t: 'Setup, updates and upgrades', q: 'How often do you think Windows gets new features now?',
      p: ['Windows is delivered "as a service." Security and quality fixes arrive monthly through **Windows Update** (traditionally on the second Tuesday, nicknamed Patch Tuesday). **Feature updates** arrive about once a year and carry a new version number.',
        'Each feature update has a support lifecycle: Home and Pro releases get 24 months of servicing, Enterprise and Education releases get 36 months. Microsoft also slips smaller features into monthly updates.',
        'A PC running a supported Windows 10 build can upgrade in place to Windows 11 if it meets the hardware requirements.'],
      key: ['Monthly quality updates, yearly feature updates', 'Home/Pro: 24 months of support per release; Enterprise/Education: 36', 'Feature updates change the version (22H2, 23H2...)'] },
    { t: 'The user experience', p: ['Start, the taskbar, Quick Settings, the notification center and Widgets have all been rebuilt. Snap layouts (hover over a window\'s Maximize button) make it easy to tile windows, and **Snap groups** remember those arrangements.',
        'The Settings app takes over most jobs that used to live in Control Panel, though Control Panel still exists for older tools.'],
      key: ['Hover Maximize for Snap layouts', 'Settings is the main control center; Control Panel still exists'] },
    { t: 'Web, cloud and apps', q: 'What is the difference between a local account and a Microsoft account?',
      p: ['**Microsoft Edge** (built on the open-source Chromium engine) is the default browser; Internet Explorer is retired, but Edge has an **IE mode** for old business sites.',
        'Signing in with a **Microsoft account** connects Windows to cloud services: OneDrive file sync, settings sync across PCs, the Microsoft Store and BitLocker recovery-key backup. Work and school accounts connect to Azure Active Directory (now called Microsoft Entra ID) instead.',
        'The **Microsoft Store** now accepts traditional desktop apps and Progressive Web Apps alongside modern Windows apps.'],
      key: ['Edge is Chromium-based; IE mode handles legacy sites', 'Microsoft account = OneDrive, settings sync, Store, recovery key backup', 'Store now offers desktop apps and PWAs too'] },
    { t: 'Security and hardware', p: ['Windows 11 turns on protections that were optional before: **Secure Boot** blocks unsigned boot code, **virtualization-based security (VBS)** and **memory integrity (HVCI)** isolate sensitive processes, **Windows Hello** replaces passwords with face, fingerprint or PIN sign-in, and **device encryption/BitLocker** protects data at rest.',
        'The TPM (Trusted Platform Module) is a tamper-resistant chip that stores encryption keys and measures the boot process, which is why it is mandatory.'],
      key: ['Secure Boot, VBS/memory integrity, Windows Hello, BitLocker', 'TPM stores keys and measures boot integrity'],
      trap: 'Thinking the TPM requirement is about performance. It is about security features that depend on hardware.' }
  ],
  cards: [
    ['What does `winver` show?', 'The Windows version (for example 22H2) and OS build number.'],
    ['Three hardware security requirements for Windows 11', 'TPM 2.0, UEFI firmware with Secure Boot capability, and a supported 64-bit processor.'],
    ['How often do feature updates arrive?', 'About once a year; they change the version number.'],
    ['How often do quality (security) updates arrive?', 'Monthly, normally on the second Tuesday (Patch Tuesday).'],
    ['Support length for a Home/Pro feature update', '24 months (Enterprise and Education get 36).'],
    ['What is a TPM?', 'Trusted Platform Module: a hardware chip that stores encryption keys and measures the boot process.'],
    ['What engine is Microsoft Edge built on?', 'Chromium, the same open-source engine as Google Chrome.'],
    ['What is IE mode?', 'An Edge feature that renders legacy sites with the old Internet Explorer engine.'],
    ['Name 4 things a Microsoft account connects', 'OneDrive, settings sync, Microsoft Store purchases, BitLocker recovery key backup.'],
    ['What are Snap layouts?', 'Window-tiling templates you get by hovering over a window\'s Maximize button (or Windows key+Z).']
  ],
  run: [
    ['Open the dialog box that shows which Windows version and build is installed.', 'winver|winver.exe', 'The command is a short mash-up of two words: "Windows" and "version".', 'Six letters, starts with "win".'],
    ['Open the Settings app with a Run command (URI form).', 'ms-settings:|ms-settings', 'Settings pages have their own URI scheme, like a web address.', 'It starts with "ms-" and ends with a colon.']
  ],
  quiz: [
    ['Which component is a hard requirement for Windows 11 but was optional for Windows 10?', ['A dedicated graphics card', 'TPM 2.0', 'A solid-state drive', 'A touchscreen'], 1, 'Think about which requirement exists for security, not speed.', 4, ['Windows 11 runs on integrated graphics that meet the DirectX 12 spec.', '', 'SSDs help speed but a hard disk meets the minimum.', 'Touch is supported, never required.']],
    ['A user asks what "23H2" means in their Windows version. What does it describe?', ['The 23rd hotfix of the year', 'A feature update released in the second half of 2023', 'Build number 23, revision 2', 'A preview build from the Insider program'], 1, 'Read it as a year and a half of the year.', 1, ['Monthly fixes don\'t rename the version.', '', 'Builds are much larger numbers.', 'Insider builds are numbered differently.']],
    ['Which update type normally arrives every month?', ['Feature updates', 'Quality (security) updates', 'Edition upgrades', 'Firmware resets'], 1, 'One kind arrives yearly, the other on Patch Tuesday.', 1, ['These arrive about once a year.', '', 'Edition upgrades are something you buy or apply on purpose.', 'Windows Update doesn\'t reset firmware.']],
    ['Your coworker\'s company app only works in Internet Explorer. What is the supported option on Windows 11?', ['Reinstall Internet Explorer from the Store', 'Use IE mode in Microsoft Edge', 'Install Windows 10 in a dual boot', 'Run the site in Windows Sandbox'], 1, 'The default browser has a compatibility feature for this.', 3, ['IE is retired and not available from the Store.', '', 'Overkill and not the supported fix.', 'Sandbox still has no standalone IE.'], 1],
    ['Which benefit comes from signing in with a Microsoft account instead of a local account?', ['Faster boot times', 'Automatic backup of the BitLocker recovery key', 'Access to Safe Mode', 'Administrator rights'], 1, 'Think about what gets stored in the cloud.', 3, ['Account type doesn\'t change boot speed.', '', 'Safe Mode works with any account.', 'Either account type can be admin or standard.']],
    ['How long is a Windows 11 Pro feature update supported?', ['12 months', '18 months', '24 months', '36 months'], 2, 'Enterprise gets a year longer than Home and Pro.', 1, ['Shorter than the actual policy.', 'Shorter than the actual policy.', '', 'That is the Enterprise/Education number.']]
  ]
});

W.chapter({
  id: 'c2', num: '2', part: 1, title: 'Setting up a new Windows 11 PC',
  short: 'Setup, install & activation', icon: 'disc',
  blurb: 'Back up first, build install media, meet the hardware minimum, choose upgrade vs. clean install, then activate and license.',
  learn: [
    { t: 'Back up before you begin', q: 'What is the one thing that can\'t be undone during setup?',
      p: ['Before any upgrade or clean install, back up personal files and note your app list and license keys. A clean install that wipes the wrong partition is unrecoverable without a backup.',
        'Good options: copy files to an external drive, make sure OneDrive has finished syncing, or create a full system image.'],
      key: ['Always back up before upgrading or reinstalling', 'Check OneDrive sync is complete'] },
    { t: 'Installation media', p: ['The **Media Creation Tool** downloads Windows 11 and builds a bootable USB flash drive (8 GB or larger) or an ISO file.',
        'An **ISO** is a disk image. In Windows you can double-click to **mount** it as a virtual DVD drive and run `setup.exe` from it to upgrade, or write it to USB to boot from. ISOs are also what you attach to virtual machines.'],
      key: ['Media Creation Tool builds a USB (8 GB+) or ISO', 'Double-click an ISO to mount it; run setup.exe to upgrade'] },
    { t: 'Minimum hardware requirements', q: 'Can you name the RAM and storage minimums before reading?',
      p: ['- **Processor:** 1 GHz or faster, 2+ cores, 64-bit, on Microsoft\'s supported CPU list',
        '- **Memory:** 4 GB RAM',
        '- **Storage:** 64 GB or larger',
        '- **Firmware:** UEFI with Secure Boot capability',
        '- **TPM:** version 2.0',
        '- **Graphics:** DirectX 12 compatible with a WDDM 2.0 driver',
        '- **Display:** greater than 9 inches diagonally, 720p (HD)',
        '- **Home edition:** internet connection and Microsoft account required during setup',
        'The **PC Health Check** app tests a PC against these. Microsoft has documented a registry workaround to upgrade on unsupported CPUs and TPM 1.2, but such PCs are unsupported and may not get updates.'],
      key: ['1 GHz / 2 cores / 64-bit, 4 GB RAM, 64 GB storage', 'UEFI + Secure Boot, TPM 2.0, DirectX 12 / WDDM 2.0', 'PC Health Check tests compatibility'],
      trap: 'Mixing up 4 GB RAM / 64 GB storage. Memory is the small number, storage the big one.' },
    { t: 'Upgrade vs. clean install', q: 'When would wiping the drive be the better choice?',
      p: ['An **in-place upgrade** (run setup.exe from inside Windows 10) keeps your files, apps and most settings. Setup works in phases: it copies files, reboots into a temporary environment, migrates your data and finishes in the new OS. If anything fails it **rolls back** to the old version.',
        'For 10 days after an upgrade you can go back to the previous version via Settings > System > Recovery. After that the old files (Windows.old) are removed.',
        'A **clean install** (boot from USB) wipes the target partition and starts fresh: best for removing junk, malware or OEM bloat. You choose the partition in setup, so be careful with multi-disk systems.',
        'An **edition upgrade** (for example Home to Pro) doesn\'t reinstall anything; you just enter a Pro product key or buy the upgrade in the Store.'],
      key: ['In-place upgrade keeps files, apps and settings', '10-day rollback window via Settings > System > Recovery', 'Clean install wipes the partition', 'Home to Pro is just a key change'] },
    { t: 'Activation and licensing', q: 'Why might a PC never ask for a product key at all?',
      p: ['**Activation** proves the copy is licensed. Most PCs use a **digital license** (also called digital entitlement): the activation servers remember the hardware, so reinstalling the same edition activates automatically with no key.',
        'New PCs from manufacturers (OEM licenses) have a key embedded in the firmware. Retail licenses can move to a new PC; OEM licenses are tied to the original hardware.',
        'If you change major hardware (especially the motherboard), activation may fail; the **Activation troubleshooter** lets you reactivate if the license is linked to your Microsoft account.',
        'Organizations use volume licensing: **KMS** (Key Management Service, an on-premises server that PCs check in with) or **MAK** (Multiple Activation Key, activated once against Microsoft).',
        'The `slmgr` script (Software Licensing Management Tool) shows and manages license status, for example `slmgr /dlv` for detailed info.'],
      key: ['Digital license = reinstall activates without a key', 'OEM key lives in firmware and stays with that PC; retail can transfer', 'Link license to Microsoft account before a motherboard swap', 'KMS = local server; MAK = one-time key', '`slmgr /dlv` shows license details'] },
    { t: 'Multiple OSes and tuning', p: ['You can dual-boot Windows 11 with another Windows version or Linux by installing to separate partitions; the Windows Boot Manager shows a menu at startup. `msconfig` (System Configuration) has a Boot tab to choose the default OS and timeout.',
        'After setup: run Windows Update, check Device Manager for missing drivers, remove unwanted preinstalled apps and confirm activation.'],
      key: ['Dual boot = separate partitions + boot menu', '`msconfig` Boot tab sets the default OS and timeout'] }
  ],
  cards: [
    ['Windows 11 minimum RAM', '4 GB'],
    ['Windows 11 minimum storage', '64 GB'],
    ['Windows 11 CPU minimum', '1 GHz, 2 or more cores, 64-bit, on the supported list'],
    ['Graphics requirement', 'DirectX 12 compatible with a WDDM 2.0 driver'],
    ['Minimum USB size for install media', '8 GB'],
    ['How do you open an ISO in Windows 11?', 'Double-click it to mount it as a virtual drive.'],
    ['How long can you roll back after an upgrade?', '10 days (Settings > System > Recovery > Go back).'],
    ['What is a digital license?', 'Activation tied to the hardware on Microsoft\'s servers, so reinstalling the same edition activates without a key.'],
    ['OEM vs. retail license', 'OEM is tied to the original PC; retail can be moved to another PC.'],
    ['KMS vs. MAK', 'KMS: PCs activate against a local server periodically. MAK: each PC activates once with Microsoft.'],
    ['Tool to test whether a PC can run Windows 11', 'PC Health Check'],
    ['What does an in-place upgrade keep?', 'Personal files, apps and most settings.']
  ],
  run: [
    ['Open System Configuration to change the default OS in the boot menu.', 'msconfig|msconfig.exe', 'Short for "Microsoft configuration".', 'Starts with "ms", 8 letters.'],
    ['Open Disk Management to see partitions before a clean install.', 'diskmgmt.msc', 'It\'s a Microsoft Management Console snap-in, so it ends in .msc.', 'disk + a short form of "management".'],
    ['Show detailed license and activation information.', 'slmgr /dlv|slmgr.vbs /dlv|slmgr -dlv', 'The Software Licensing Management tool, with a switch meaning "display license verbose".', 'Five-letter tool name, then a slash and three letters.'],
    ['Create a recovery drive before you reinstall.', 'recoverydrive|recoverydrive.exe', 'The program name is literally the two words of the task.', 'Two words, no space.']
  ],
  quiz: [
    ['A PC has 8 GB RAM, a 256 GB SSD, and TPM 1.2. PC Health Check says it can\'t run Windows 11. What is the most likely reason?', ['Not enough RAM', 'Not enough storage', 'The TPM version is too old', 'It needs a touchscreen'], 2, 'Compare each spec against the minimums.', 2, ['8 GB is double the minimum.', '256 GB is well over the minimum.', '', 'Touch isn\'t required.'], 1],
    ['A user wants to move from Windows 10 to 11 and keep all apps and files. Which method?', ['Clean install from USB', 'In-place upgrade by running setup.exe', 'Reset this PC', 'Edition upgrade'], 1, 'One method starts from inside the running OS.', 3, ['A clean install wipes the partition.', '', 'Reset reinstalls the same version.', 'That changes editions, not versions.'], 1],
    ['A customer upgraded 3 weeks ago and wants to go back to Windows 10. What should you tell them?', ['Use Settings > Recovery > Go back', 'The rollback window has closed, so they need a clean install of Windows 10', 'Run System Restore', 'Uninstall the latest quality update'], 1, 'How many days does Windows keep the old version?', 3, ['That option disappears after the window ends.', '', 'Restore points can\'t cross OS versions.', 'That only removes a monthly patch.'], 1],
    ['After replacing a motherboard, Windows says it isn\'t activated. The license was linked to the user\'s Microsoft account. What\'s the next step?', ['Buy a new license immediately', 'Run the Activation troubleshooter and choose "I changed hardware on this device recently"', 'Reinstall Windows', 'Run slmgr /rearm'], 1, 'There is a built-in way to reclaim a linked digital license.', 4, ['Usually unnecessary when the license is linked.', '', 'Reinstalling won\'t fix the hardware change.', 'That only resets the grace period.'], 1],
    ['Which large organization activation method uses a server on the local network?', ['MAK', 'KMS', 'OEM', 'Retail'], 1, 'The name includes "Service".', 4, ['That one activates once with Microsoft.', '', 'That one is built in by the PC maker.', 'That is a boxed or online purchase.']],
    ['What should you do first before a clean install?', ['Update drivers', 'Back up personal data', 'Disable Secure Boot', 'Uninstall antivirus'], 1, 'What can\'t be undone?', 0, ['They get replaced anyway.', '', 'Windows 11 needs Secure Boot capability.', 'Not needed when the drive is being wiped.']],
    ['Home to Pro requires what?', ['A clean install', 'A Pro product key or Store purchase', 'A new TPM', 'A Microsoft 365 subscription'], 1, 'Nothing gets reinstalled.', 3, ['The edition can switch without reinstalling.', '', 'Edition doesn\'t change hardware needs.', 'That subscription isn\'t the upgrade path.']]
  ]
});

W.chapter({
  id: 'c3', num: '3', part: 1, title: 'Using Windows 11',
  short: 'Start, taskbar & windows', icon: 'grid',
  blurb: 'Drive the desktop like a pro: Start, taskbar, Quick Settings, notifications, Snap, virtual desktops and keyboard shortcuts.',
  learn: [
    { t: 'Start menu', q: 'Where do the apps you don\'t pin go?',
      p: ['Start has three zones: **Pinned** apps at the top (rearrange them by dragging, or drop one onto another to make a **folder**), **All apps** for the full alphabetical list, and **Recommended** for recent files and new apps (you can shrink or hide it in Settings > Personalization > Start).',
        'Just start typing after pressing the Windows key to **search** apps, settings, files and the web.',
        'Right-click Start (or press **Windows key+X**) for the **Quick Link menu**: Device Manager, Disk Management, Terminal, Task Manager and more. Technicians use it constantly.'],
      key: ['Pinned / All apps / Recommended', 'Drag one pinned app onto another to create a folder', 'Windows key+X opens the admin Quick Link menu'] },
    { t: 'Taskbar and Jump Lists', p: ['Pin apps to the taskbar, drag to reorder, and launch the Nth button with **Windows key+number** (Windows key+1 is the first).',
        'Right-click a taskbar button to see its **Jump List**: recent and pinned files for that app.',
        'Taskbar settings let you change alignment (center or left), hide Widgets/Search/Task View buttons, and auto-hide the taskbar.'],
      key: ['Windows key+1...9 opens taskbar app N', 'Right-click a taskbar icon for its Jump List', 'Taskbar alignment can be moved left'] },
    { t: 'Quick Settings and notifications', p: ['**Quick Settings** (Windows key+A) holds toggles for Wi-Fi, Bluetooth, airplane mode, volume and brightness; you can edit which tiles appear.',
        'The **notification center** (Windows key+N) collects alerts and the calendar. **Do not disturb** silences banners; **Focus** sessions add a timer and turn on Do not disturb.'],
      key: ['Windows key+A = Quick Settings', 'Windows key+N = notifications + calendar', 'Do not disturb mutes banners; Focus adds a timer'] },
    { t: 'Arranging windows', q: 'How many ways can you snap a window to the left half?',
      p: ['- **Windows key+Left/Right** snaps to a half; **Windows key+Up** maximizes; **Windows key+Down** restores/minimizes',
        '- **Windows key+Z** or hovering Maximize opens **Snap layouts**',
        '- **Windows key+M** minimizes all; **Windows key+D** toggles the desktop',
        '- **Windows key+Home** minimizes everything except the active window',
        '- Shake a title bar (if enabled) to minimize other windows'],
      key: ['Win+Arrow keys snap and maximize', 'Win+Z for Snap layouts', 'Win+D shows the desktop'] },
    { t: 'Task View and virtual desktops', p: ['**Alt+Tab** cycles open windows. **Windows key+Tab** opens **Task View**, which shows windows and your **virtual desktops**.',
        'Virtual desktops separate work: **Ctrl+Windows key+D** creates one, **Ctrl+Windows key+Left/Right** switches, **Ctrl+Windows key+F4** closes the current one (its windows move to the neighbor). Each desktop can have its own wallpaper and name.'],
      key: ['Win+Tab = Task View', 'Ctrl+Win+D new desktop; Ctrl+Win+Left/Right switch; Ctrl+Win+F4 close'] },
    { t: 'Keyboard, voice and pen', p: ['Classic shortcuts still matter: **Ctrl+C/X/V** copy/cut/paste, **Ctrl+Z/Y** undo/redo, **Ctrl+A** select all, **Ctrl+Shift+Esc** opens Task Manager, **Windows key+L** locks, **Windows key+E** opens File Explorer, **Windows key+R** opens Run, **Windows key+V** opens clipboard history.',
        '**Windows key+.** (period) opens the emoji panel. **Windows key+H** starts voice typing (dictation). The Touch Keyboard and pen settings live under Settings > Personalization and Bluetooth & devices.'],
      key: ['Ctrl+Shift+Esc Task Manager; Win+L lock; Win+E Explorer; Win+R Run', 'Win+V clipboard history; Win+. emoji; Win+H voice typing'] }
  ],
  cards: [
    ['Windows key+X', 'Quick Link (power user) menu'], ['Windows key+A', 'Quick Settings'], ['Windows key+N', 'Notification center and calendar'],
    ['Windows key+Tab', 'Task View'], ['Ctrl+Windows key+D', 'Create a new virtual desktop'], ['Ctrl+Windows key+F4', 'Close the current virtual desktop'],
    ['Windows key+Z', 'Snap layouts'], ['Windows key+D', 'Show/hide the desktop'], ['Windows key+V', 'Clipboard history'],
    ['Windows key+H', 'Voice typing (dictation)'], ['Windows key+.', 'Emoji panel'], ['Windows key+3', 'Open or switch to the third taskbar app'],
    ['Ctrl+Shift+Esc', 'Open Task Manager directly'], ['What is a Jump List?', 'The right-click list of recent/pinned files for a taskbar app.']
  ],
  run: [
    ['Open File Explorer\'s executable from Run (the shell itself).', 'explorer|explorer.exe', 'It is the program that also draws the taskbar and desktop.', 'Same word as the app name, without "File".'],
    ['Open Task Manager from the Run box.', 'taskmgr|taskmgr.exe', 'An abbreviation of "task manager".', 'Seven letters: the first word whole, the second squeezed to three consonants.']
  ],
  quiz: [
    ['A technician needs Device Manager fast without searching. What\'s the quickest route?', ['Windows key+X, then Device Manager', 'Windows key+A', 'Windows key+Tab', 'Ctrl+Alt+Del, then Device Manager'], 0, 'A menu built for power users holds admin tools.', 0, ['', 'That opens toggles like Wi-Fi.', 'That opens Task View.', 'That screen doesn\'t list Device Manager.'], 1],
    ['A user wants their school apps and gaming apps on separate screens without a second monitor. Suggest:', ['Snap groups', 'Virtual desktops', 'Focus sessions', 'A new user account'], 1, 'You can switch between them with Ctrl+Windows key+arrow.', 4, ['These arrange windows side by side on one desktop.', '', 'Focus only silences notifications.', 'Too heavy; they\'d sign out to switch.'], 1],
    ['Which shortcut shows past items you copied?', ['Ctrl+V', 'Windows key+V', 'Ctrl+Shift+V', 'Windows key+C'], 1, 'It\'s the Windows-key version of paste.', 5, ['That pastes only the last item.', '', 'In many apps this pastes without formatting.', 'Not the clipboard.']],
    ['You pressed Ctrl+Windows key+F4. What happens to the windows on that desktop?', ['They close without saving', 'They move to the adjacent desktop', 'They minimize to the taskbar', 'They\'re suspended'], 1, 'Windows doesn\'t destroy your work here.', 4, ['Windows doesn\'t close apps when a desktop closes.', '', 'They stay open and visible.', 'Apps keep running.']],
    ['What appears when you right-click an app\'s taskbar button?', ['Snap layouts', 'A Jump List', 'Task Manager', 'The app\'s Properties'], 1, 'It\'s a "list" of things you can jump to.', 1, ['Those come from hovering Maximize.', '', 'That\'s a separate app.', 'That comes from right-clicking a shortcut file.']],
    ['A user is distracted by banners while studying. Which feature adds a timer and silences alerts?', ['Do not disturb only', 'A Focus session', 'Airplane mode', 'Night light'], 1, 'One option is time-boxed.', 2, ['Mutes banners, but has no timer.', '', 'Cuts the network, not just alerts.', 'That changes screen color.'], 1]
  ]
});

W.chapter({
  id: 'c4', num: '4', part: 1, title: 'Personalizing Windows 11',
  short: 'Personalization', icon: 'brush',
  blurb: 'Backgrounds, color and dark mode, lock screen, themes, sounds, regional formats, fonts and readability.',
  learn: [
    { t: 'Look and feel', p: ['**Settings > Personalization** controls the background (picture, solid color, slideshow, Windows Spotlight), **colors** (Light/Dark mode for Windows and apps separately, an accent color, transparency effects) and the lock screen.',
        '**Windows Spotlight** downloads a new image daily for the desktop or lock screen.',
        'The lock screen can show a detailed status from one app. The sign-in screen can mirror the lock screen picture.'],
      key: ['Personalization = background, colors, lock screen, themes', 'Light/Dark can be set separately for Windows and apps', 'Spotlight rotates images daily'] },
    { t: 'Themes, sounds and pointers', p: ['A **theme** bundles background, accent color, sounds and mouse pointers into one package (.themepack or .deskthemepack). Save your current look as a theme to reuse it, or get themes from the Store.',
        'Sound schemes assign audio to system events (Settings > System > Sound > More sound settings > Sounds tab). Mouse pointer size and color are under Accessibility > Mouse pointer and touch.'],
      key: ['Theme = background + color + sounds + pointers', 'Save the current setup as a theme to reuse it'] },
    { t: 'Visual tweaks and desktop icons', p: ['Desktop icons (This PC, Recycle Bin, Network, Control Panel, user files) are toggled in **Desktop icon settings** under Personalization > Themes.',
        'Turn off animation and transparency effects (Accessibility > Visual effects) to make an older PC feel faster. The classic **Performance Options** dialog (`SystemPropertiesPerformance`) gives fine-grained control.'],
      key: ['Desktop icon settings lives under Themes', 'Disable animations/transparency for speed'] },
    { t: 'Regional settings', p: ['**Time & language** sets the time zone (automatic or manual), date/time format, region (which affects currency and Store content) and display language. You can install extra language packs and keyboard layouts and switch with **Windows key+Spacebar**.',
        'A wrong time zone or clock causes certificate errors and sign-in problems, so "check the clock" is a classic help desk first step.'],
      key: ['Time & language: time zone, formats, region, languages', 'Win+Spacebar switches input language/keyboard', 'Wrong clock = certificate/sign-in errors'] },
    { t: 'Fonts and readability', p: ['Fonts are installed by right-clicking a font file > Install (or Install for all users), or through Settings > Personalization > Fonts. They live in **C:\\Windows\\Fonts**.',
        '**Text size** (Accessibility > Text size) enlarges only text; **Scale** (System > Display) enlarges everything. **ClearType** font smoothing (`cttune`) tunes text rendering on LCDs. **Magnifier** opens with Windows key+Plus (+) and closes with Windows key+Esc.'],
      key: ['Fonts live in C:\\Windows\\Fonts', 'Text size vs. Scale: text only vs. everything', 'cttune = ClearType Text Tuner', 'Win+Plus Magnifier; Win+Esc closes it'] }
  ],
  cards: [
    ['What does a Windows theme bundle?', 'Background, accent color, sound scheme and mouse pointers.'], ['Where are fonts stored?', 'C:\\Windows\\Fonts'],
    ['Text size vs. Scale', 'Text size enlarges only text; Scale enlarges everything on the display.'], ['Windows key+Plus', 'Open Magnifier'],
    ['Windows key+Spacebar', 'Switch input language / keyboard layout'], ['What is Windows Spotlight?', 'A daily rotating image for the lock screen or desktop.'],
    ['Why check the clock when sign-in or HTTPS fails?', 'Wrong date/time breaks certificate validation and authentication.'], ['ClearType tuner command', 'cttune']
  ],
  run: [
    ['Open the ClearType Text Tuner.', 'cttune|cttune.exe', 'ClearType + tune, abbreviated.', 'Six letters starting with "ct".'],
    ['Open the classic Performance Options dialog (visual effects).', 'systempropertiesperformance|systempropertiesperformance.exe', 'It is the "System Properties" family, the Performance page.', 'Starts with "System", followed by the name of the dialog, then the name of the tab. No spaces.'],
    ['Open the Fonts folder from Run.', 'fonts|%windir%\\fonts|c:\\windows\\fonts', 'Shell folders can be opened by name.', 'One word, plural.']
  ],
  quiz: [
    ['A user with low vision wants bigger menu text but not bigger images. Which setting?', ['Display Scale', 'Text size', 'Screen resolution', 'Magnifier'], 1, 'One setting affects text only.', 4, ['That scales everything.', '', 'Lowering resolution blurs everything.', 'That zooms the whole screen.'], 1],
    ['A laptop shows certificate errors on every HTTPS site after a trip. First thing to check?', ['DNS server', 'Date, time and time zone', 'Browser extensions', 'Display language'], 1, 'Certificates have validity periods.', 3, ['Would cause name lookup failures, not cert errors on every site.', '', 'Unlikely to break every site the same way.', 'Language doesn\'t validate certificates.'], 1],
    ['You want to copy your exact look (wallpaper, color, sounds, pointers) to another PC. What should you save?', ['A restore point', 'A theme', 'A registry export', 'A user profile'], 1, 'One file type bundles all four.', 1, ['Restore points are for system recovery.', '', 'Possible, but not the built-in, safe way.', 'Far more than needed.']],
    ['Where do you turn the Recycle Bin desktop icon back on?', ['Personalization > Themes > Desktop icon settings', 'System > Display', 'Apps > Default apps', 'Accessibility > Visual effects'], 0, 'Desktop icons are part of a theme.', 2, ['', 'Display handles resolution and scale.', 'Default apps handles file associations.', 'That handles animations and transparency.']],
    ['Which shortcut closes Magnifier?', ['Windows key+Esc', 'Alt+F4 only', 'Windows key+Minus', 'Ctrl+Esc'], 0, 'Escape is involved, paired with the Windows key.', 4, ['', 'Not the dedicated shortcut.', 'That zooms out.', 'That opens Start.']]
  ]
});

W.chapter({
  id: 'c5', num: '5', part: 1, title: 'Installing and configuring apps',
  short: 'Apps & Task Manager', icon: 'box',
  blurb: 'The three app types, installing and removing them, Task Manager, startup apps, default apps, Windows features and AutoPlay.',
  learn: [
    { t: 'The app landscape', q: 'What separates an app from the Store and a classic .exe installer?',
      p: ['- **Legacy desktop apps (Win32):** traditional programs installed by .exe or .msi installers; full access to the system, can write anywhere their permissions allow',
        '- **Windows apps (UWP/MSIX):** packaged apps, usually from the Store, run in a **sandbox** with declared permissions and update automatically',
        '- **Progressive Web Apps (PWAs):** websites installed from Edge that get their own window, taskbar icon and offline support'],
      key: ['Win32 = classic installers, broad access', 'Store/packaged apps = sandboxed, auto-update', 'PWA = installed website'] },
    { t: 'Installing and removing apps', p: ['Store apps install and update from the **Microsoft Store**. Desktop apps install from their own installers. **Winget** (Windows Package Manager) installs apps from the command line: `winget search`, `winget install`, `winget upgrade --all`.',
        'Remove apps in **Settings > Apps > Installed apps**. In PowerShell, `Get-AppxPackage` lists packaged apps and `Remove-AppxPackage` removes them.',
        'PWAs are managed from edge://apps.'],
      key: ['winget install / upgrade --all', 'Settings > Apps > Installed apps to uninstall', 'Get-AppxPackage / Remove-AppxPackage for packaged apps'] },
    { t: 'Task Manager', q: 'What do you do when an app freezes and won\'t close?',
      p: ['Open with **Ctrl+Shift+Esc**. **Processes** shows apps and background processes with CPU, memory, disk and network use; select one and choose **End task** to kill a frozen app.',
        '**Details** shows every process by executable name, PID and user. Right-click > **Open file location** or **Search online** to identify a suspicious process. **Efficiency mode** lowers a process\'s priority.'],
      key: ['Ctrl+Shift+Esc opens it directly', 'End task kills a hung app', 'Details tab: PID, user, executable name'] },
    { t: 'Startup apps', p: ['Apps that launch at sign-in slow boot. Disable them in **Task Manager > Startup apps** (shows a "startup impact" rating) or **Settings > Apps > Startup**.',
        'Deeper tools: the **Startup folder** (`shell:startup`), registry Run keys, **Task Scheduler**, and Microsoft\'s Sysinternals **Autoruns**, which lists every auto-start location.'],
      key: ['Disable in Task Manager > Startup apps', 'shell:startup opens the Startup folder', 'Autoruns shows every auto-start location'] },
    { t: 'Defaults, features and AutoPlay', p: ['**Default apps** (Settings > Apps > Default apps) assigns which app opens each file type (.pdf, .jpg) or link type (http, mailto).',
        '**Windows features** (`optionalfeatures`) turns on optional components like Hyper-V, Windows Sandbox, Telnet Client, .NET 3.5 and WSL.',
        '**AutoPlay** (Bluetooth & devices > AutoPlay) decides what happens when you insert a USB drive or memory card. Turning it off is a common security hardening step.'],
      key: ['Default apps = file and link associations', 'optionalfeatures = Turn Windows features on or off', 'AutoPlay controls removable-media actions'] }
  ],
  cards: [
    ['Three Windows app types', 'Legacy desktop (Win32), Windows/Store packaged apps, Progressive Web Apps.'], ['What does `winget upgrade --all` do?', 'Updates every app winget can manage.'],
    ['PowerShell cmdlet to list packaged apps', 'Get-AppxPackage'], ['Where to disable startup apps', 'Task Manager > Startup apps, or Settings > Apps > Startup.'],
    ['What is a PWA?', 'A website installed as an app with its own window and icon.'], ['Command for Turn Windows features on or off', 'optionalfeatures'],
    ['Shell shortcut for your Startup folder', 'shell:startup'], ['What does Autoruns show?', 'Every location where programs can start automatically.'],
    ['Why are Store apps safer?', 'They run sandboxed with declared permissions.'], ['What is Efficiency mode?', 'A Task Manager option that lowers a process\'s priority to save resources.']
  ],
  run: [
    ['Open "Turn Windows features on or off".', 'optionalfeatures|optionalfeatures.exe', 'The dialog is about features that are optional.', 'Two words joined, no space; the first is the opposite of "required".'],
    ['Open your personal Startup folder.', 'shell:startup', 'Special folders open with the shell: prefix.', 'shell: + the folder name'],
    ['Open Programs and Features (classic uninstall list).', 'appwiz.cpl', 'It is a Control Panel applet, so it ends in .cpl.', 'Short for "application wizard".'],
    ['Install VLC with the Windows Package Manager (package name: vlc).', 'winget install vlc', 'The tool name, then the action, then the package.', 'Three words: the package manager, the action, then the package name you were given.']
  ],
  quiz: [
    ['A frozen app won\'t close with the X button. Fastest fix?', ['Restart the PC', 'Ctrl+Shift+Esc, select it, End task', 'Uninstall it', 'Run System Restore'], 1, 'Use a tool that can kill a process.', 2, ['Works but loses all other work.', '', 'Too drastic for a freeze.', 'Unrelated to a single frozen app.'], 1],
    ['A user\'s PC takes 4 minutes to reach a usable desktop after sign-in. Where do you look first?', ['Startup apps in Task Manager', 'Default apps', 'AutoPlay', 'Fonts'], 0, 'What runs automatically at sign-in?', 3, ['', 'Doesn\'t affect boot time.', 'Only matters when media is inserted.', 'Unrelated.'], 1],
    ['Which app type runs in a sandbox with declared permissions?', ['Legacy Win32 apps', 'Windows packaged (Store) apps', 'Batch files', 'MSI installers'], 1, 'It usually comes from the Store.', 0, ['These have broad access.', '', 'Scripts run with your full rights.', 'That installs classic apps.']],
    ['PDFs keep opening in the wrong app. Where do you fix it?', ['Settings > Apps > Default apps', 'Task Manager', 'Windows features', 'Device Manager'], 0, 'This is a file association.', 4, ['', 'That manages running processes.', 'That turns OS components on.', 'That manages hardware.'], 1],
    ['You need Windows Sandbox. Where do you turn it on?', ['Microsoft Store', 'Turn Windows features on or off', 'Edge settings', 'Services console'], 1, 'It\'s an optional OS component.', 4, ['It isn\'t a Store app.', '', 'Unrelated to the browser.', 'It isn\'t a service you can start.']],
    ['Security policy says USB drives must not launch anything automatically. Which setting?', ['Default apps', 'AutoPlay', 'Startup apps', 'Efficiency mode'], 1, 'Think about what happens on insert.', 4, ['That handles file types.', '', 'That handles sign-in launches.', 'That handles priority.']]
  ]
});

W.chapter({
  id: 'c6', num: '6', part: 1, title: 'Using and managing built-in Windows apps',
  short: 'Built-in apps', icon: 'apps',
  blurb: 'Which apps ship with Windows, how they\'re classified, and the everyday ones: Mail/Calendar, Teams, media, Photos, Clipchamp, Snipping Tool and Maps.',
  learn: [
    { t: 'How built-in apps are classified', q: 'Why can you uninstall Calculator but not Settings?',
      p: ['- **System apps** are part of the OS (Settings, Edge, File Explorer\'s shell pieces) and can\'t be uninstalled normally',
        '- **Provisioned apps** are staged in the image and installed for every new user profile at first sign-in (Calculator, Photos, Clipchamp...). `Get-AppxProvisionedPackage -Online` lists them; removing a provisioned package stops it installing for new users',
        '- **Installed apps** are those already registered for the current user (`Get-AppxPackage`)',
        'Built-in apps update through the Microsoft Store, not Windows Update.'],
      key: ['System apps can\'t be removed', 'Provisioned apps install for each new user', 'Get-AppxProvisionedPackage -Online lists them', 'Built-in apps update via the Store'] },
    { t: 'Mail, Calendar, People, To Do and Teams', p: ['At the time of the book, Mail and Calendar shared accounts (Outlook.com, Microsoft 365, Gmail via IMAP/Exchange ActiveSync) managed under Settings > Accounts > Email & accounts. Microsoft has since replaced them with the **new Outlook for Windows**.',
        '**People** stored contacts; **Microsoft To Do** syncs tasks and lists with your Microsoft account. **Microsoft Teams (free)** is built into the taskbar for personal chat and calls; the work version is separate.'],
      key: ['Accounts live in Settings > Accounts > Email & accounts', 'To Do syncs tasks via Microsoft account', 'Personal Teams differs from work Teams'] },
    { t: 'Music, photos and video', p: ['**Media Player** replaces Groove Music and plays music and video files. **Photos** views and edits images (crop, rotate, adjust, filters) and pulls from OneDrive and iCloud.',
        '**Clipchamp** is a browser-based video editor for trimming and combining clips with templates.'],
      key: ['Media Player replaced Groove', 'Photos edits and organizes images', 'Clipchamp edits video'] },
    { t: 'Snipping Tool and screenshots', q: 'How many screenshot shortcuts do you know?',
      p: ['- **Windows key+Shift+S** opens the Snipping Tool overlay (rectangle, freeform, window, full screen); the snip goes to the clipboard',
        '- **PrtScn** copies the screen to the clipboard (or opens Snipping Tool if that setting is on)',
        '- **Windows key+PrtScn** saves a full-screen PNG to Pictures\\Screenshots',
        '- **Alt+PrtScn** captures only the active window',
        'Snipping Tool also has a delay timer and can record the screen.'],
      key: ['Win+Shift+S = snip overlay to clipboard', 'Win+PrtScn = saved file in Pictures\\Screenshots', 'Alt+PrtScn = active window only'] },
    { t: 'Maps', p: ['Maps searches places, gives driving/transit/walking directions and can **download offline maps** for regions with no connection (Settings > Apps > Offline maps).'],
      key: ['Offline maps can be downloaded per region'] }
  ],
  cards: [
    ['Windows key+Shift+S', 'Snipping Tool overlay; snip goes to clipboard'], ['Windows key+PrtScn', 'Saves a full-screen PNG to Pictures\\Screenshots'],
    ['Alt+PrtScn', 'Captures only the active window'], ['What is a provisioned app?', 'An app staged in the image that installs for each new user profile.'],
    ['Cmdlet to list provisioned apps', 'Get-AppxProvisionedPackage -Online'], ['How do built-in apps get updated?', 'Through the Microsoft Store.'],
    ['What replaced Groove Music?', 'Media Player'], ['Video editor included with Windows 11', 'Clipchamp']
  ],
  run: [
    ['Open Snipping Tool from Run.', 'snippingtool|snippingtool.exe', 'The app name without the space.', 'Twelve letters, no space or extension needed.'],
    ['Open the Screenshots folder path (Pictures subfolder) from Run using the user profile variable.', '%userprofile%\\pictures\\screenshots', 'Start with the environment variable for your profile folder.', '%userprofile% then Pictures then Screenshots']
  ],
  quiz: [
    ['A user wants a screenshot saved as a file automatically. Which shortcut?', ['PrtScn', 'Windows key+PrtScn', 'Windows key+Shift+S', 'Alt+PrtScn'], 1, 'Only one saves to the Screenshots folder by itself.', 3, ['That copies to the clipboard.', '', 'That sends the snip to the clipboard.', 'That captures one window to the clipboard.'], 1],
    ['Calculator was removed with PowerShell but reappears for every new employee. Why?', ['It\'s a system app', 'It\'s still provisioned in the image', 'Windows Update reinstalls it', 'Group Policy forces it'], 1, 'Think about what gets installed for each new profile.', 0, ['System apps can\'t be removed at all.', '', 'Built-in apps update through the Store.', 'Not the default cause.'], 1],
    ['Where do built-in apps like Photos get updates?', ['Windows Update', 'Microsoft Store', 'Edge', 'Device Manager'], 1, 'They\'re packaged apps.', 0, ['That handles the OS and drivers.', '', 'Edge updates itself only.', 'That handles drivers.']],
    ['A field tech needs maps where there\'s no cell service. Suggest:', ['Use Edge InPrivate', 'Download offline maps ahead of time', 'Enable metered connection', 'Install Google Earth'], 1, 'Prepare before you lose connection.', 4, ['Has no effect on map data.', '', 'Limits data; doesn\'t provide maps.', 'Not the built-in approach.'], 1],
    ['Which shortcut captures only the active window?', ['Alt+PrtScn', 'Ctrl+PrtScn', 'Windows key+W', 'Shift+PrtScn'], 0, 'Alt is often used for the active window.', 3, ['', 'Not a standard capture.', 'That opens Widgets.', 'Not a standard capture.']]
  ]
});

W.chapter({
  id: 'c7', num: '7', part: 1, title: 'Using Microsoft Edge',
  short: 'Microsoft Edge', icon: 'globe',
  blurb: 'Release channels, profiles and sync, the password manager, extensions, tabs, search, Collections, tracking prevention, InPrivate, IE mode and PDFs.',
  learn: [
    { t: 'Channels and updates', p: ['Edge has four channels: **Stable** (default), **Beta**, **Dev** and **Canary** (daily, least stable). Edge updates itself separately from Windows; check at edge://settings/help.',
        'Edge is Chromium-based, so most Chrome extensions work and sites render the same way.'],
      key: ['Stable, Beta, Dev, Canary', 'edge://settings/help shows/updates the version'] },
    { t: 'Profiles, sync and passwords', q: 'Why use separate profiles for work and personal browsing?',
      p: ['Each **profile** keeps its own favorites, history, passwords, cookies and extensions. A work profile tied to a work account can be managed by IT; a personal profile stays separate.',
        'Sign in to sync favorites, passwords, addresses, history and open tabs across devices. The built-in **password manager** generates strong passwords and runs **Password Monitor**, which alerts you if a saved password shows up in a known breach.'],
      key: ['Profiles isolate cookies, history, passwords and extensions', 'Password Monitor warns about breached passwords'] },
    { t: 'Customizing and tabs', p: ['Extensions come from the Edge Add-ons store or the Chrome Web Store; remove anything you don\'t use, since extensions can read pages. **Sleeping tabs** and **Efficiency mode** save memory. **Reset settings** undoes all customizations.',
        '**Vertical tabs** (Ctrl+Shift+Comma) move tabs to the side. Pin tabs to keep them; Ctrl+T new tab, Ctrl+W close, Ctrl+Shift+T reopen closed tab, Ctrl+Tab switch. **Immersive Reader** (F9) strips clutter for reading.'],
      key: ['Fewer extensions = less risk', 'Sleeping tabs save memory', 'Ctrl+Shift+T reopens a closed tab', 'F9 Immersive Reader'] },
    { t: 'Finding and organizing', p: ['Change the default search engine in Settings > Privacy, search, and services > Address bar and search. **History** is Ctrl+H; **Favorites** Ctrl+Shift+O, add one with Ctrl+D. **Collections** gather pages, images and notes for research and can be shared or exported.'],
      key: ['Ctrl+H history; Ctrl+D add favorite; Ctrl+Shift+O favorites manager', 'Collections organize research'] },
    { t: 'Privacy and tracking', q: 'Does InPrivate make you anonymous?',
      p: ['**Tracking prevention** has three levels: **Basic**, **Balanced** (default) and **Strict** (blocks most trackers but can break sites).',
        '**InPrivate** (Ctrl+Shift+N) doesn\'t save history, cookies or form data after you close the window. It does **not** hide you from websites, your employer or your ISP.',
        '**Site permissions** control camera, microphone, location and notifications per site. Clear browsing data with Ctrl+Shift+Delete, and manage cookies, including blocking third-party cookies.'],
      key: ['Tracking prevention: Basic / Balanced (default) / Strict', 'InPrivate = no local history, not anonymity', 'Ctrl+Shift+Delete clears browsing data'],
      trap: 'Believing InPrivate hides traffic from the network. It only avoids saving data on the PC.' },
    { t: 'IE mode and PDFs', p: ['**IE mode** loads listed sites with the Internet Explorer 11 engine for legacy line-of-business apps; admins push a site list via Group Policy.',
        'Edge is the default **PDF reader**: it can highlight, draw, add text, fill forms and read aloud.'],
      key: ['IE mode for legacy sites, managed by site list', 'Edge reads, annotates and fills PDFs'] }
  ],
  cards: [
    ['Four Edge channels', 'Stable, Beta, Dev, Canary'], ['Default tracking prevention level', 'Balanced'], ['Ctrl+Shift+N in Edge', 'New InPrivate window'],
    ['Ctrl+Shift+T', 'Reopen the last closed tab'], ['What does InPrivate NOT do?', 'Hide your activity from websites, your employer or your ISP.'],
    ['What is Password Monitor?', 'Alerts you when a saved password appears in a known data breach.'], ['What do Edge profiles separate?', 'Favorites, history, passwords, cookies and extensions.'],
    ['Ctrl+Shift+Delete', 'Clear browsing data'], ['F9 in Edge', 'Immersive Reader'], ['What are Collections?', 'Groups of saved pages, images and notes for research.']
  ],
  run: [
    ['Type the internal address that shows Edge\'s version and checks for updates.', 'edge://settings/help', 'Edge\'s internal pages use the edge:// scheme.', 'edge:// then settings, then help'],
    ['Type the internal address that lists installed web apps (PWAs).', 'edge://apps', 'Same scheme as other internal pages.', 'edge:// + a four-letter word']
  ],
  quiz: [
    ['A user thinks InPrivate hides their browsing from the company network. What\'s accurate?', ['It encrypts all traffic', 'It only avoids saving history and cookies on that PC', 'It routes traffic through Microsoft', 'It blocks the employer\'s firewall'], 1, 'Think about where data is (not) saved.', 4, ['That\'s what HTTPS or a VPN does.', '', 'Edge doesn\'t proxy InPrivate traffic.', 'It has no network effect.'], 1],
    ['A site breaks after the user chose a stricter privacy setting. What probably changed?', ['Tracking prevention set to Strict', 'Sleeping tabs enabled', 'Vertical tabs enabled', 'Immersive Reader'], 0, 'Which setting blocks the most scripts?', 4, ['', 'Saves memory, doesn\'t block content.', 'Only moves tabs.', 'Only a reading view.'], 1],
    ['You need work and personal browsing completely separate on one PC. Best approach?', ['Use InPrivate for work', 'Create two Edge profiles', 'Use Collections', 'Use IE mode'], 1, 'One feature keeps cookies and passwords apart.', 1, ['Loses everything every time.', '', 'Just organizes pages.', 'For legacy sites only.']],
    ['A legacy HR site needs ActiveX. How does IT make it work on Windows 11?', ['Install IE 11', 'Add it to the IE mode site list', 'Use Edge Canary', 'Turn on Strict tracking'], 1, 'Admins push a list via policy.', 5, ['IE 11 is retired.', '', 'Canary is an unstable preview.', 'Unrelated.'], 1],
    ['Which channel gets new builds daily?', ['Stable', 'Beta', 'Dev', 'Canary'], 3, 'Think "canary in a coal mine."', 0, ['Roughly every four weeks.', 'About every four weeks.', 'Weekly.', '']]
  ]
});

W.chapter({
  id: 'c8', num: '8', part: 1, title: 'Managing local and cloud storage',
  short: 'Disks & OneDrive', icon: 'drive',
  blurb: 'Disk Management and DiskPart, partitions and file systems, Storage Spaces, OneDrive, Storage Sense, drive letters, and virtual hard disks.',
  learn: [
    { t: 'Disks and partitions', q: 'What has to happen before a brand-new disk shows up in File Explorer?',
      p: ['A new disk must be **initialized** with a partition style, then **partitioned**, then **formatted** with a file system.',
        '- **GPT** (GUID Partition Table): modern, needed for UEFI boot, supports disks over 2 TB and up to 128 partitions',
        '- **MBR** (Master Boot Record): legacy, 2 TB limit, 4 primary partitions',
        '`MBR2GPT` converts the system disk to GPT without data loss.',
        'Tools: **Disk Management** (`diskmgmt.msc`, also on the Windows key+X menu) and the command-line **DiskPart** (`list disk`, `select disk`, `clean`, `create partition primary`, `format fs=ntfs quick`, `assign`).'],
      key: ['Initialize > partition > format', 'GPT: UEFI, >2 TB, 128 partitions; MBR: 2 TB, 4 primary', 'diskmgmt.msc or diskpart'] },
    { t: 'File systems', p: ['- **NTFS:** the Windows standard; permissions, encryption (EFS), compression, large files, journaling',
        '- **FAT32:** universal compatibility but a **4 GB maximum file size**',
        '- **exFAT:** for flash drives and SD cards; no 4 GB limit, works on Mac and many devices',
        '- **ReFS:** resilient, used with Storage Spaces and servers',
        'Convert FAT32 to NTFS without losing data using `convert D: /fs:ntfs`.'],
      key: ['NTFS = permissions + encryption', 'FAT32 max file = 4 GB', 'exFAT = big files on flash media', 'convert X: /fs:ntfs keeps data'] },
    { t: 'Storage Spaces', p: ['**Storage Spaces** pools multiple physical disks into one virtual drive with resiliency: **simple** (striping, no protection), **two-way mirror** (survives 1 disk failure), **three-way mirror** (2 failures) or **parity** (efficient, survives 1 failure, slower writes).'],
      key: ['Pool disks into one drive', 'Simple / two-way mirror / three-way mirror / parity'] },
    { t: 'OneDrive', q: 'If a file shows a cloud icon, is it on your PC?',
      p: ['OneDrive syncs a folder to the cloud. **Files On-Demand** shows status: a **cloud** icon means online-only (takes no space; downloads when opened), a **green check outline** means available locally, a **solid green check** means always kept on this device.',
        '**Folder backup** (known folder move) syncs Desktop, Documents and Pictures. **Personal Vault** is an extra-protected folder needing a second verification step and auto-locks. OneDrive for Business works the same way but is tied to a work account and SharePoint.'],
      key: ['Cloud icon = online-only', 'Solid green check = always keep on this device', 'Folder backup protects Desktop/Documents/Pictures', 'Personal Vault needs 2-step verification'] },
    { t: 'Managing disk space', p: ['**Storage Sense** automatically cleans temp files, the Recycle Bin and Downloads on a schedule, and can dehydrate unused OneDrive files. **Cleanup recommendations** and **Disk Cleanup** (`cleanmgr`) remove temp files and old Windows Update files.',
        'Change where new apps, documents and media save under Settings > System > Storage > Advanced storage settings > Where new content is saved.'],
      key: ['Storage Sense automates cleanup', 'cleanmgr = Disk Cleanup', 'Change default save locations in Storage settings'] },
    { t: 'Volumes, letters and VHDs', p: ['In Disk Management you can change a **volume label** or **drive letter**, mount a volume into an empty **NTFS folder** instead of a letter, **shrink** or **extend** NTFS volumes (extend needs adjacent unallocated space), and delete volumes.',
        'Deleting or quick-formatting doesn\'t truly erase data. To wipe free space use `cipher /w:C:`, or DiskPart\'s `clean all` to zero a whole disk.',
        '**Virtual hard disks** (.vhd, .vhdx) are files that act like disks; double-click to mount, or create one in Disk Management. VHDX supports up to 64 TB.'],
      key: ['Extend requires adjacent unallocated space', 'Mount a volume in an empty NTFS folder', 'cipher /w wipes free space; diskpart clean all zeros a disk', 'VHDX: virtual disk file, up to 64 TB'] }
  ],
  cards: [
    ['GPT vs. MBR size limit', 'MBR tops out at 2 TB; GPT supports much larger disks.'], ['Max file size on FAT32', '4 GB'], ['Best file system for large files on a USB stick', 'exFAT'],
    ['Convert FAT32 to NTFS keeping data', 'convert D: /fs:ntfs'], ['Two-way mirror survives...', 'One disk failure'], ['OneDrive cloud icon means', 'Online-only; takes no local space'],
    ['Solid green check in OneDrive', 'Always kept on this device'], ['What is Storage Sense?', 'Automatic cleanup of temp files, Recycle Bin, Downloads and unused cloud files.'],
    ['Command to wipe free space', 'cipher /w:<drive>'], ['Steps to use a new disk', 'Initialize, partition, format.'], ['Tool to convert MBR to GPT without data loss', 'MBR2GPT'], ['VHDX maximum size', '64 TB']
  ],
  run: [
    ['Open Disk Management.', 'diskmgmt.msc', 'An MMC snap-in, so .msc.', 'disk + mgmt'],
    ['Start the command-line partitioning tool.', 'diskpart|diskpart.exe', 'It\'s a mash-up of the thing you\'re working on and what you\'re dividing it into.', 'Eight letters.'],
    ['Open Disk Cleanup.', 'cleanmgr|cleanmgr.exe', 'Clean + manager, shortened.', 'Starts with "clean", ends with "mgr".'],
    ['Convert drive E: from FAT32 to NTFS without losing data.', 'convert e: /fs:ntfs|convert e: /fs:ntfs /v', 'The command is the verb itself, then the drive, then a file system switch.', 'convert + drive + /fs:ntfs'],
    ['Wipe the deleted data from free space on C:.', 'cipher /w:c:|cipher /w:c:\\|cipher /w:c', 'The encryption tool has a wipe switch.', 'cipher + /w: + drive']
  ],
  quiz: [
    ['A user can\'t copy a 6 GB video to their USB stick, though it has 30 GB free. Likely cause?', ['The stick is formatted FAT32', 'The stick is GPT', 'OneDrive is syncing', 'The file is encrypted'], 0, 'One file system has a per-file limit.', 1, ['', 'Partition style doesn\'t limit file size.', 'Unrelated to the USB copy.', 'EFS doesn\'t block copying this way.'], 1],
    ['You need to extend C:, but Extend Volume is grayed out. Why?', ['C: is NTFS', 'There\'s no unallocated space right after C:', 'The disk is GPT', 'BitLocker is off'], 1, 'Extending needs space in a specific place.', 5, ['NTFS is exactly what can be extended.', '', 'GPT supports extending.', 'Encryption isn\'t the issue.'], 1],
    ['A user\'s laptop is full, and OneDrive shows green check outlines on 80 GB of photos. What helps?', ['Set those files to Free up space (online-only)', 'Delete them from OneDrive', 'Disable Files On-Demand', 'Convert to FAT32'], 0, 'Files can live in the cloud without local copies.', 3, ['', 'That deletes them everywhere.', 'That would download everything.', 'Unrelated and destructive.'], 1],
    ['Which Storage Spaces layout survives two disk failures?', ['Simple', 'Two-way mirror', 'Three-way mirror', 'Parity'], 2, 'More copies, more failures survived.', 2, ['No protection at all.', 'Only one failure.', '', 'Only one failure.']],
    ['Before donating a drive, which command zeros the whole disk?', ['format /q', 'diskpart clean all', 'chkdsk /f', 'defrag /x'], 1, 'The DiskPart cleaning command has a thorough variant.', 5, ['Quick format leaves data recoverable.', '', 'That fixes errors.', 'That defragments.'], 1],
    ['Which partition style is required to boot with UEFI?', ['MBR', 'GPT', 'FAT32', 'Dynamic'], 1, 'The newer style.', 0, ['That\'s the legacy BIOS style.', '', 'That\'s a file system.', 'That\'s a disk type, not a partition table.']]
  ]
});
