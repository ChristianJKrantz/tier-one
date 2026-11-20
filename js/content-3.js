/* Tier One content, Part III: For IT professionals (chapters 16-19) and Part IV: Appendixes A-C. Original study material; see content-1.js for format. */
W.chapter({
  id: 'c16', num: '16', part: 3, title: 'Windows Terminal, PowerShell, and other advanced management tools',
  short: 'Terminal, PowerShell & registry', icon: 'term',
  blurb: 'Windows Terminal, PowerShell basics and scripting, Command Prompt tricks, the registry, Task Scheduler, batch files, Windows Script Host and MMC.',
  learn: [
    { t: 'Windows Terminal', p: ['**Windows Terminal** (`wt`) hosts PowerShell, Command Prompt, Azure Cloud Shell and WSL distros in **tabs and panes**. It\'s the default terminal in Windows 11 and opens from Windows key+X.',
        'Settings let you choose the default profile, color schemes, fonts and whether a profile **runs as Administrator**. Ctrl+Shift+T new tab; Alt+Shift+Plus/Minus split panes.'],
      key: ['wt = Windows Terminal', 'Tabs and panes for PowerShell, cmd, WSL', 'A profile can always run as admin'] },
    { t: 'PowerShell basics', q: 'What pattern do all PowerShell commands follow?',
      p: ['PowerShell commands (**cmdlets**) follow **Verb-Noun**: `Get-Process`, `Stop-Service`, `Get-ChildItem`. They output **objects**, not text, so you can **pipe** them: `Get-Process | Sort-Object CPU -Descending | Select-Object -First 5`.',
        'Discover with `Get-Command` (find commands), `Get-Help Get-Process -Examples` (after `Update-Help`), and `Get-Member` (see an object\'s properties). **Aliases** map familiar names: `dir`/`ls` = Get-ChildItem, `cd` = Set-Location, `cls` = Clear-Host. Tab completion finishes names and parameters.'],
      key: ['Verb-Noun cmdlets', 'Output is objects; pipe with |', 'Get-Command, Get-Help, Get-Member', 'Aliases: dir/ls, cd, cls'] },
    { t: 'Scripting with PowerShell', p: ['Scripts are **.ps1** files. The **execution policy** controls whether they run: **Restricted** (default on client Windows, no scripts), **RemoteSigned** (local scripts OK; downloaded ones must be signed), **AllSigned**, **Unrestricted**, **Bypass**. Check with `Get-ExecutionPolicy`, change with `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.',
        'Run a script in the current folder with `.\\script.ps1`. Your **profile** script (`$PROFILE`) runs at every launch. Variables start with `$`.'],
      key: ['.ps1 scripts', 'Default client policy: Restricted', 'RemoteSigned = local OK, downloaded must be signed', 'Run with .\\script.ps1', '$PROFILE runs at startup'],
      trap: 'Typing script.ps1 without .\\ : PowerShell doesn\'t run scripts from the current folder by name alone.' },
    { t: 'Command Prompt', p: ['`cmd` still matters. Run elevated from Windows Terminal (admin) or by pressing **Ctrl+Shift+Enter** in the Run box. Open a prompt in a folder by typing `cmd` in File Explorer\'s address bar. `cmd /k command` runs a command and stays open; `/c` runs and closes.',
        'Command symbols: `>` redirect output to a file (overwrite), `>>` append, `<` input from a file, `|` pipe to another command, `&&` run next only if previous succeeded, `||` only if it failed. Use F7 for command history and `doskey` for macros.'],
      key: ['Ctrl+Shift+Enter in Run = elevated', '> overwrite, >> append, | pipe', '&& on success, || on failure', 'cmd /k stays open; /c closes'] },
    { t: 'The registry', q: 'Which root key holds settings for the signed-in user?',
      p: ['The registry is a hierarchical database of settings. **Root keys**: **HKEY_LOCAL_MACHINE (HKLM)** machine-wide, **HKEY_CURRENT_USER (HKCU)** the current user, **HKEY_USERS (HKU)** all loaded profiles, **HKEY_CLASSES_ROOT (HKCR)** file associations/COM, **HKEY_CURRENT_CONFIG (HKCC)** current hardware profile.',
        'Keys contain **values** with data types: **REG_SZ** (string), **REG_EXPAND_SZ** (string with %variables%), **REG_MULTI_SZ** (list of strings), **REG_DWORD** (32-bit number), **REG_QWORD** (64-bit), **REG_BINARY**.',
        'Edit with `regedit`. **Always export a key (back it up) before editing.** **.reg** files automate changes when double-clicked (a minus before a key name deletes it). `reg query` / `reg add` work from the command line. **Registry virtualization** redirects writes from old non-admin apps to a per-user VirtualStore.'],
      key: ['HKLM machine, HKCU current user, HKCR file types', 'REG_SZ string, REG_DWORD 32-bit number', 'Export the key before editing', '.reg files automate changes', 'reg query / reg add'] },
    { t: 'Automating tasks and MMC', p: ['**Task Scheduler** (`taskschd.msc`) runs programs on **triggers** (time, logon, startup, idle, an event ID) with **actions** and **conditions** (only on AC power, only if idle). Windows itself uses hundreds of tasks.',
        '**Batch files** (.bat/.cmd) chain cmd commands. **Windows Script Host** runs VBScript/JScript (`wscript` GUI, `cscript` console), a legacy tool being phased out.',
        '**Microsoft Management Console (MMC)** hosts snap-ins (.msc): `compmgmt.msc` (Computer Management bundles Event Viewer, Shared Folders, Local Users and Groups, Device Manager, Disk Management, Services), `gpedit.msc`, `perfmon.msc`, `tpm.msc`, `certmgr.msc`. Run `mmc` to build a custom console.'],
      key: ['Task Scheduler = triggers + actions + conditions', '.bat/.cmd batch files', 'compmgmt.msc bundles many tools', 'mmc builds custom consoles'] }
  ],
  cards: [
    ['PowerShell naming pattern', 'Verb-Noun (Get-Process)'], ['Find commands in PowerShell', 'Get-Command'], ['See an object\'s properties', 'Get-Member'],
    ['Default execution policy on Windows 11', 'Restricted'], ['RemoteSigned means...', 'Local scripts run; downloaded scripts must be signed.'], ['Run a script in the current folder', '.\\script.ps1'],
    ['HKCU vs. HKLM', 'HKCU: current user settings; HKLM: machine-wide settings'], ['REG_DWORD', '32-bit number value'], ['REG_SZ', 'String value'], ['REG_EXPAND_SZ', 'String containing %environment variables%'],
    ['> vs. >> in cmd', '> overwrites a file; >> appends'], ['&& in cmd', 'Run the next command only if the previous succeeded'], ['Open Run as admin', 'Type command, press Ctrl+Shift+Enter'],
    ['Computer Management command', 'compmgmt.msc'], ['Task Scheduler command', 'taskschd.msc'], ['Alias "ls" in PowerShell', 'Get-ChildItem']
  ],
  run: [
    ['Open Windows Terminal.', 'wt|wt.exe', 'Just the initials.', 'Two letters.'],
    ['Open Registry Editor.', 'regedit|regedit.exe', 'Registry + edit.', 'Seven letters: the first three letters of the database\'s name, then a verb for changing it.'],
    ['Show the PowerShell execution policy.', 'get-executionpolicy', 'Verb-Noun: get the policy.', 'Get- followed by the two words for the script-running policy, joined.'],
    ['Show the five processes using the most CPU (PowerShell).', ['get-process | sort-object cpu -descending | select-object -first 5', 'get-process | sort cpu -descending | select -first 5', 'gps | sort cpu -desc | select -first 5', 'get-process | sort-object -property cpu -descending | select-object -first 5', 'get-process | sort-object cpu -desc | select-object -first 5', 'ps | sort cpu -desc | select -first 5'], 'Get the processes, sort by CPU from high to low, then select the first five.', 'Get-Process | Sort-Object CPU -Descending | Select-Object -First ...'],
    ['Open Task Scheduler.', 'taskschd.msc', 'Task + schedule, shortened, snap-in.', 'The first word whole, the second missing its vowels, then the snap-in extension.'],
    ['Open Computer Management.', 'compmgmt.msc', 'Computer + management, shortened.', 'Four letters of the first word, four consonants of the second, then .msc.'],
    ['Save the output of ipconfig /all to net.txt, overwriting it.', 'ipconfig /all > net.txt|ipconfig /all >net.txt', 'Use a redirection symbol.', 'command + > + filename']
  ],
  quiz: [
    ['A downloaded .ps1 won\'t run: "running scripts is disabled." Safest change for one user?', ['Set-ExecutionPolicy Unrestricted -Scope LocalMachine', 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser', 'Delete the script', 'Disable UAC'], 1, 'Least change, narrowest scope.', 2, ['Too broad and too permissive.', '', 'Doesn\'t solve anything.', 'Unrelated to scripts.'], 1],
    ['Which registry root holds settings that apply to every user on the PC?', ['HKCU', 'HKLM', 'HKCR', 'HKCC'], 1, 'Machine-wide.', 4, ['Only the current user.', '', 'File associations/COM.', 'Current hardware profile.']],
    ['Before changing a registry value, you should:', ['Restart', 'Export (back up) that key', 'Run sfc', 'Disable Defender'], 1, 'Make undo possible.', 4, ['Doesn\'t protect anything.', '', 'Unrelated.', 'Unsafe and unrelated.']],
    ['You want a cleanup script to run every Friday at 6 PM only on AC power. Which tool?', ['Task Scheduler', 'Services', 'Startup apps', 'Event Viewer'], 0, 'Triggers, actions, conditions.', 5, ['', 'Services run continuously.', 'Runs only at sign-in.', 'Only logs.'], 1],
    ['In cmd, which runs "backup.bat" only if "test.bat" succeeds?', ['test.bat | backup.bat', 'test.bat && backup.bat', 'test.bat || backup.bat', 'test.bat > backup.bat'], 1, 'Two of the same symbol means "and".', 3, ['Pipes output.', '', 'Runs only if the first fails.', 'Overwrites a file.']],
    ['What does PowerShell pass through the pipeline?', ['Plain text', 'Objects', 'Registry keys only', 'Batch files'], 1, 'That\'s what makes Sort-Object on CPU possible.', 1, ['That\'s cmd\'s model.', '', 'Not limited to this.', 'Not how it works.']],
    ['Which snap-in bundles Event Viewer, Device Manager, Disk Management and Services?', ['compmgmt.msc', 'gpedit.msc', 'perfmon.msc', 'certmgr.msc'], 0, 'Computer + management.', 5, ['', 'Policy only.', 'Performance only.', 'Certificates only.']]
  ]
});

W.chapter({
  id: 'c17', num: '17', part: 3, title: 'Running Windows 11 in a virtual machine or in the cloud',
  short: 'Virtual machines', icon: 'vm',
  blurb: 'Virtualization requirements, Windows Sandbox, Hyper-V Manager, VM generations, checkpoints, VM settings, import/export, and cloud PCs.',
  learn: [
    { t: 'Virtualization in Windows 11', q: 'What must be on in the firmware before Hyper-V can work?',
      p: ['A **hypervisor** runs **virtual machines (VMs)**: complete guest operating systems on virtual hardware. **Hyper-V** is a **Type 1** hypervisor built into **Pro, Enterprise and Education** (not Home).',
        'Requirements: a 64-bit CPU with **SLAT** (second-level address translation), **hardware virtualization** (Intel VT-x / AMD-V) **enabled in UEFI/BIOS**, and at least 4 GB RAM. Task Manager > Performance > CPU shows "Virtualization: Enabled."',
        'Turn it on in **Windows features** or `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`.'],
      key: ['Hyper-V: Pro/Enterprise/Education only', 'Needs VT-x/AMD-V on in firmware + SLAT', 'Task Manager shows Virtualization: Enabled'] },
    { t: 'Windows Sandbox', p: ['**Windows Sandbox** is a disposable, lightweight VM of your own Windows. Everything inside is **destroyed when you close it**. It\'s ideal for testing a suspicious download. Requires Pro or higher and virtualization; enable in Windows features. A `.wsb` config file can map folders or disable networking.'],
      key: ['Sandbox = throwaway VM, wiped on close', 'Great for testing unknown apps', '.wsb files configure it'] },
    { t: 'Creating VMs in Hyper-V Manager', q: 'Why choose Generation 2 for a Windows 11 VM?',
      p: ['Open **Hyper-V Manager** (`virtmgmt.msc`). **Quick Create** downloads ready-made images. The **New Virtual Machine Wizard** asks for:',
        '- **Generation:** **Gen 1** (legacy BIOS, IDE) or **Gen 2** (UEFI, Secure Boot, required for Windows 11). Can\'t be changed later',
        '- **Memory**, with optional **Dynamic Memory**',
        '- **Network** via a **virtual switch**: **External** (shares a physical NIC, reaches the LAN), **Internal** (host and VMs only), **Private** (VMs only); the **Default Switch** provides NAT internet',
        '- **Virtual hard disk** (.vhdx, dynamically expanding by default) and installation media (ISO)'],
      key: ['virtmgmt.msc', 'Gen 2 = UEFI + Secure Boot (needed for Win 11)', 'External / Internal / Private switches; Default Switch = NAT', 'Disks are .vhdx'] },
    { t: 'Running VMs and checkpoints', p: ['**Virtual Machine Connection** (`vmconnect`) shows the VM\'s screen. **Enhanced session mode** uses RDP for clipboard, drive and audio sharing and resizable windows. Ctrl+Alt+End sends Ctrl+Alt+Delete to the guest.',
        '**Checkpoints** capture a VM\'s state so you can **Apply** (revert) later. **Standard** checkpoints include memory state; **Production** checkpoints (default) use VSS inside the guest for an app-consistent backup without memory. Checkpoints are not a replacement for backups.'],
      key: ['Enhanced session = RDP features', 'Ctrl+Alt+End = Ctrl+Alt+Del in the VM', 'Checkpoints let you revert; Production is default', 'Checkpoints ≠ backups'] },
    { t: 'VM settings', p: ['Settings include **Firmware** (boot order), **Security** (Secure Boot, **virtual TPM**, which Windows 11 needs), **Memory** (startup, dynamic min/max), **Processor** (virtual CPU count), **SCSI controller** (attach disks/DVD), **Network adapter** (switch, VLAN), and **Automatic start/stop actions** (what happens when the host boots or shuts down: save, shut down, turn off).',
        'VMs can be **exported** (copy of config + disks) and **imported** on another host.'],
      key: ['Win 11 VM needs Secure Boot + virtual TPM', 'Automatic start/stop actions', 'Export/import moves VMs between hosts'] },
    { t: 'VMs in the cloud', p: ['**Azure Virtual Machines** run Windows in Microsoft\'s datacenters on pay-per-use pricing. **Azure Virtual Desktop** delivers multi-session desktops. **Windows 365 Cloud PC** streams a personal, persistent Windows PC for a fixed monthly per-user price, reachable from any device.'],
      key: ['Azure VMs: pay as you go', 'Windows 365: per-user monthly cloud PC'] },
    { t: 'Twelve benefits of virtual machines', q: 'Why would a business run ten VMs instead of buying ten PCs?',
      p: ['From the class slides:',
        '- **Security isolation**: each VM is cut off from the host and other VMs, so malware can\'t spread',
        '- **Testing isolation (sandboxing)**: keep apps and OSes in separate, easy-to-manage environments',
        '- **Flexibility**: adjustable virtual hardware; easy to move between environments',
        '- **Cost-effective**: one well-equipped machine runs many VMs',
        '- **Easy maintenance and disaster recovery**: clone, back up, restore and update easily',
        '- **Scalability**: scale VMs up or down as needed',
        '- **Legacy system support**: keep old OSes and apps running',
        '- **Snapshotting**: roll back to a previous state',
        '- **Multi-tenancy**: many users share hardware while staying isolated',
        '- **Easy deployment**: stand up new environments quickly',
        '- **Reduced downtime**: restart or restore fast',
        '- **Improved resource utilization**: less wasted hardware'],
      key: ['Isolation (security and testing), flexibility, cost', 'Recovery, scalability, legacy support, snapshots', 'Multi-tenancy, deployment, downtime, utilization'] }
  ],
  cards: [
    ['Which editions include Hyper-V?', 'Pro, Enterprise, Education'], ['Hyper-V hardware needs', '64-bit CPU with SLAT, VT-x/AMD-V enabled in firmware, 4 GB+ RAM'], ['Hyper-V Manager command', 'virtmgmt.msc'],
    ['Gen 1 vs. Gen 2 VM', 'Gen 1: BIOS/IDE legacy. Gen 2: UEFI, Secure Boot.'], ['External virtual switch', 'Connects VMs to the physical network'], ['Internal virtual switch', 'Host and VMs can talk; no outside network'],
    ['Private virtual switch', 'VMs talk only to each other'], ['What happens to Windows Sandbox on close?', 'Everything inside is discarded'], ['What is a checkpoint?', 'A saved VM state you can revert to'],
    ['Ctrl+Alt+End in a VM', 'Sends Ctrl+Alt+Delete to the guest'], ['What does a Windows 11 VM need in Security settings?', 'Secure Boot and a virtual TPM'], ['Windows 365', 'A per-user cloud PC streamed from Azure']
  ],
  run: [
    ['Open Hyper-V Manager.', 'virtmgmt.msc', 'Virtual + management, shortened.', 'Four letters of "virtual", four consonants of "management", then .msc.'],
    ['Open Windows Sandbox from Run.', 'windowssandbox|windowssandbox.exe', 'The app name with no space.', 'The product name, both words, with no space.'],
    ['Enable Hyper-V with PowerShell (feature name Microsoft-Hyper-V).', 'enable-windowsoptionalfeature -online -featurename microsoft-hyper-v -all|enable-windowsoptionalfeature -online -featurename microsoft-hyper-v', 'Verb-Noun: enable an optional Windows feature on the running (online) OS.', 'Enable-WindowsOptionalFeature -Online -FeatureName ...']
  ],
  quiz: [
    ['Hyper-V won\'t install; Task Manager shows Virtualization: Disabled. Fix?', ['Enable VT-x/AMD-V in UEFI firmware', 'Upgrade RAM', 'Install from the Store', 'Run sfc /scannow'], 0, 'It\'s a firmware switch.', 0, ['', 'Not what that status means.', 'Hyper-V is a Windows feature.', 'Unrelated.'], 1],
    ['A Windows 11 VM install says the PC doesn\'t meet requirements. Which VM settings are likely missing?', ['Dynamic Memory', 'Secure Boot and a virtual TPM on a Gen 2 VM', 'A second network adapter', 'Enhanced session mode'], 1, 'Same requirements as physical hardware.', 4, ['Not a requirement.', '', 'Not a requirement.', 'Only affects the connection window.'], 1],
    ['You need to open a suspicious attachment safely and throw everything away afterward. Best tool?', ['Hyper-V checkpoint', 'Windows Sandbox', 'InPrivate window', 'Standard user account'], 1, 'It\'s disposable by design.', 1, ['Works but heavier.', '', 'Doesn\'t isolate files.', 'Still runs on your real system.'], 1],
    ['Lab VMs must talk to each other but never reach the host or LAN. Which switch?', ['External', 'Internal', 'Private', 'Default Switch'], 2, 'The most isolated.', 2, ['Reaches the LAN.', 'Includes the host.', '', 'Provides NAT internet.']],
    ['Before installing a risky update in a VM, what lets you revert quickly?', ['Export the VM', 'Take a checkpoint', 'Increase memory', 'Change generation'], 1, 'A snapshot of state.', 3, ['Possible but slow.', '', 'Unrelated.', 'Impossible after creation.']],
    ['A company keeps an old accounting app that only runs on Windows 7. Which VM benefit helps most?', ['Multi-tenancy', 'Legacy system support', 'Scalability', 'Reduced downtime'], 1, 'Old software, new hardware.', 6, ['That\'s about sharing hardware between users.', '', 'That\'s about growing or shrinking capacity.', 'That\'s about recovering quickly.'], 1],
    ['Which edition can\'t run Hyper-V?', ['Pro', 'Home', 'Enterprise', 'Education'], 1, 'The consumer edition.', 0, ['Includes it.', '', 'Includes it.', 'Includes it.']]
  ]
});

W.chapter({
  id: 'c18', num: '18', part: 3, title: 'Using Android and Linux on Windows 11',
  short: 'Android & Linux', icon: 'penguin',
  blurb: 'Phone Link, Android apps on Windows (and their retirement), and the Windows Subsystem for Linux.',
  learn: [
    { t: 'Phone Link', p: ['**Phone Link** connects an Android phone (via the Link to Windows app) to show texts, notifications, photos and calls on the PC; some Samsung/Honor phones can mirror apps. iPhone support is more limited (messages, calls, notifications via Bluetooth).'],
      key: ['Phone Link + Link to Windows app', 'Texts, calls, photos, notifications on the PC'] },
    { t: 'Android apps on Windows', p: ['When the book was written, the **Windows Subsystem for Android (WSA)** ran Android apps from the **Amazon Appstore** in a Hyper-V-based VM. Microsoft **ended support for WSA in March 2025**, so treat this as history: the design idea (a lightweight VM per subsystem) still shows up in WSL.'],
      key: ['WSA used the Amazon Appstore', 'WSA support ended March 2025'] },
    { t: 'Windows Subsystem for Linux', q: 'Why would a Windows admin want Linux on the same PC?',
      p: ['**WSL** runs real Linux distributions (Ubuntu by default) alongside Windows. Install with one command: `wsl --install` (admin), which enables the features and installs Ubuntu. `wsl --list --online` shows available distros; `wsl --install -d Debian` picks one.',
        '**WSL 2** (default) uses a real Linux kernel in a lightweight VM: fast and fully compatible. WSL 1 translated system calls. Check versions with `wsl -l -v`; switch with `wsl --set-version`.',
        'Windows drives appear in Linux under **/mnt/c**; Linux files appear in File Explorer at **\\\\wsl$** (or Linux in the navigation pane). WSLg runs Linux GUI apps. Great for security tools, scripting with bash and practicing Linux commands.'],
      key: ['wsl --install sets it all up', 'WSL 2 = real Linux kernel in a lightweight VM', 'wsl -l -v lists distros and versions', 'C: is /mnt/c in Linux; Linux files at \\\\wsl$'] }
  ],
  cards: [
    ['Install WSL with one command', 'wsl --install'], ['List installed distros with WSL versions', 'wsl -l -v'], ['WSL 2 vs. WSL 1', 'WSL 2 runs a real Linux kernel in a lightweight VM; WSL 1 translated calls.'],
    ['Where is C: inside WSL?', '/mnt/c'], ['Path to Linux files from Windows', '\\\\wsl$'], ['Default WSL distro', 'Ubuntu'],
    ['Store used by Windows Subsystem for Android', 'Amazon Appstore (WSA support ended March 2025)'], ['Phone Link phone-side app', 'Link to Windows']
  ],
  run: [
    ['Install WSL and the default distro.', 'wsl --install|wsl.exe --install', 'The tool name, then a double-dash switch.', 'The switch is the plain English verb for setting software up.'],
    ['List installed distros and their WSL versions.', 'wsl -l -v|wsl --list --verbose|wsl -l --verbose|wsl --list -v', 'List + verbose.', 'Two single-letter switches, one for each of those words.'],
    ['Show which distros are available to install.', 'wsl --list --online|wsl -l -o|wsl -l --online|wsl --list -o', 'List the ones online.', 'Two double-dash switches: the action, then where the distros live.']
  ],
  quiz: [
    ['A student wants to practice bash and Linux security tools without dual-booting. Suggest:', ['Windows Sandbox', 'WSL with a distro like Ubuntu', 'IE mode', 'Phone Link'], 1, 'A subsystem for Linux.', 2, ['That\'s a copy of Windows.', '', 'Legacy web pages.', 'Phone integration.'], 1],
    ['In WSL, where do you find files from the Windows C: drive?', ['/home/c', '/mnt/c', '\\\\wsl$\\c', '/c/windows'], 1, 'Drives are mounted under one directory.', 2, ['That\'s a Linux home folder.', '', 'That\'s the path the other direction.', 'Not where they mount.']],
    ['What makes WSL 2 more compatible than WSL 1?', ['It\'s a Store app', 'It runs a real Linux kernel in a lightweight VM', 'It uses the Amazon Appstore', 'It needs Hyper-V Manager'], 1, 'Think kernel.', 2, ['Distribution method doesn\'t explain it.', '', 'That was Android.', 'You don\'t manage it there.']],
    ['A user asks about running Android apps via Windows Subsystem for Android today. Accurate answer?', ['It\'s built into every edition', 'Microsoft ended WSA support in March 2025', 'It needs WSL 1', 'It uses Google Play'], 1, 'Check the status update.', 1, ['Not anymore.', '', 'Unrelated.', 'It used Amazon\'s store.']]
  ]
});

W.chapter({
  id: 'c19', num: '19', part: 3, title: 'Managing Windows PCs in the enterprise',
  short: 'Enterprise management', icon: 'org',
  blurb: 'Domains and Entra ID (Azure AD), hybrid join, Group Policy, deployment tools, update management, Intune, Defender for Endpoint, Windows 365, and kiosk/shared PCs.',
  learn: [
    { t: 'Domains, Azure AD and hybrid', q: 'What\'s the difference between joining a domain and joining Azure AD?',
      p: ['A **domain** (Active Directory Domain Services) uses on-premises **domain controllers** to authenticate users and apply policy. PCs **domain join** (Settings > Accounts > Access work or school, or System Properties); requires Pro or higher.',
        '**Azure AD** (renamed **Microsoft Entra ID**) is cloud identity: PCs are **Azure AD joined** and managed over the internet, ideal for remote workers. **Hybrid Azure AD join** connects to both, syncing identities with Azure AD Connect.',
        '`dsregcmd /status` shows a PC\'s join state.'],
      key: ['Domain = on-premises AD + domain controllers', 'Azure AD = Microsoft Entra ID, cloud join', 'Hybrid = both', 'dsregcmd /status shows join state'] },
    { t: 'Group Policy', p: ['**Group Policy** applies settings centrally. In a domain, **Group Policy Objects (GPOs)** link to sites, domains and **OUs**. Each PC also has **Local Group Policy** (`gpedit.msc`, Pro and up).',
        'Policies have **Computer Configuration** and **User Configuration** halves; each setting is **Not configured**, **Enabled** or **Disabled**.',
        'Processing order is **LSDOU**: Local, Site, Domain, OU, with the **last applied winning** (OU overrides domain). `gpupdate /force` applies changes now; `gpresult /r` (or `/h report.html`) shows which policies applied.'],
      key: ['gpedit.msc = Local Group Policy (Pro+)', 'Computer vs. User Configuration', 'LSDOU order; OU wins', 'gpupdate /force; gpresult /r'] },
    { t: 'Deploying Windows', p: ['- **Microsoft Endpoint Configuration Manager (MECM/SCCM):** on-prem management of OS deployment, apps and updates',
        '- **Microsoft Deployment Toolkit (MDT):** free, builds and deploys custom images',
        '- **Windows System Image Manager (SIM):** creates **answer files** (unattend.xml) for unattended setup',
        '- **Windows Autopilot:** the user unboxes a new PC, signs in with a work account, and it configures itself from the cloud (no imaging)'],
      key: ['MECM/SCCM on-prem management', 'MDT free imaging', 'SIM builds unattend.xml answer files', 'Autopilot = zero-touch cloud provisioning'] },
    { t: 'Managing updates', p: ['**WSUS** (Windows Server Update Services) lets admins approve updates on-premises and saves bandwidth. **Windows Update for Business** uses policy to set **deferrals** and **deadlines** and rings (pilot, broad) while still downloading from Microsoft.'],
      key: ['WSUS: on-prem approval', 'WUfB: deferrals, deadlines, rings'] },
    { t: 'Cloud management', p: ['**Microsoft 365 E3/E5** bundles Windows Enterprise, Office and security/management. **Microsoft Intune** is cloud **MDM/MAM**: enrolls devices, pushes configuration profiles, compliance policies and apps (Win32, Store, Microsoft 365 Apps), and can remote-wipe. **Microsoft Defender for Endpoint** adds EDR (endpoint detection and response) for the SOC. **Windows 365** gives cloud PCs.'],
      key: ['Intune = cloud MDM: config, compliance, apps, wipe', 'Defender for Endpoint = EDR', 'M365 E3/E5 bundles Windows Enterprise'] },
    { t: 'Special-purpose PCs', p: ['**Shared PC mode** optimizes a PC for many short-term users (accounts deleted after sign-out, storage cleanup) for labs and libraries. A **kiosk** (assigned access) runs one app or a restricted set, such as a self-service terminal.'],
      key: ['Shared PC mode for labs', 'Kiosk = assigned access to one or few apps'] }
  ],
  cards: [
    ['New name for Azure AD', 'Microsoft Entra ID'], ['Group Policy processing order', 'LSDOU: Local, Site, Domain, OU (last wins)'], ['Apply Group Policy now', 'gpupdate /force'],
    ['See applied policies', 'gpresult /r'], ['Local Group Policy Editor', 'gpedit.msc'], ['What is Windows Autopilot?', 'Cloud-based provisioning: a new PC configures itself when a user signs in.'],
    ['What is WSUS?', 'On-premises server to approve and distribute updates'], ['What does Intune do?', 'Cloud MDM: enroll, configure, check compliance, deploy apps, wipe'], ['Answer file tool', 'Windows System Image Manager (unattend.xml)'],
    ['Check a PC\'s Azure AD/domain join state', 'dsregcmd /status'], ['EDR product for Windows', 'Microsoft Defender for Endpoint'], ['Shared PC mode', 'Optimizes a PC for many temporary users']
  ],
  run: [
    ['Force Group Policy to refresh now.', 'gpupdate /force|gpupdate -force', 'Group policy update, with a force switch.', 'Two letters for "group policy", a verb for refreshing, then a switch that won\'t take no for an answer.'],
    ['Show a summary of applied Group Policy.', 'gpresult /r|gpresult -r', 'Group policy result, with a summary switch.', 'Two letters for "group policy", a word for the outcome, then a one-letter switch.'],
    ['Open Local Group Policy Editor.', 'gpedit.msc', 'Group policy edit.', 'Two letters for "group policy", a verb for changing things, then the snap-in extension.'],
    ['Check whether this PC is Azure AD (Entra) joined.', 'dsregcmd /status|dsregcmd -status', 'Device registration command.', 'An abbreviation of "directory services registration" plus "cmd", then a switch asking for the current state.']
  ],
  quiz: [
    ['A domain GPO sets the wallpaper to blue; an OU GPO sets it to red. Which applies?', ['Blue', 'Red', 'Whichever was created first', 'Neither'], 1, 'Remember LSDOU: last applied wins.', 1, ['Domain applies before OU.', '', 'Creation date doesn\'t decide.', 'One will apply.'], 1],
    ['You changed a GPO and need it on a test PC immediately. Command?', ['gpresult /r', 'gpupdate /force', 'sfc /scannow', 'ipconfig /renew'], 1, 'Update, forcefully.', 1, ['That only reports.', '', 'System files.', 'Networking.'], 1],
    ['A remote company with no servers wants new laptops shipped directly to employees and configured automatically. Use:', ['MDT imaging', 'Windows Autopilot with Intune', 'WSUS', 'Local Group Policy'], 1, 'Zero-touch from the cloud.', 2, ['Needs on-prem imaging.', '', 'Only updates.', 'Per-PC, manual.'], 1],
    ['Which tool creates unattend.xml answer files?', ['Windows System Image Manager', 'Intune', 'Hyper-V Manager', 'gpedit'], 0, 'It manages images.', 2, ['', 'Cloud management.', 'VMs.', 'Policy.']],
    ['A SOC analyst needs endpoint detection and response data from Windows PCs. Product?', ['Microsoft Defender for Endpoint', 'Windows Sandbox', 'WSUS', 'MDT'], 0, 'It\'s an endpoint detection and response (EDR) product.', 4, ['', 'Testing tool.', 'Updates.', 'Deployment.'], 1],
    ['A user\'s "Access work or school" shows nothing, but IT says the PC is Entra-joined. How do you verify?', ['dsregcmd /status', 'whoami /all', 'ipconfig /all', 'msinfo32'], 0, 'Device registration.', 0, ['', 'Shows the token, not the join.', 'Network only.', 'Hardware inventory.'], 1]
  ]
});

W.chapter({
  id: 'ca', num: 'A', part: 4, title: 'Windows 11 editions and licensing options',
  short: 'Editions & licensing', icon: 'tag',
  blurb: 'Home, Pro, Pro for Workstations, Enterprise (E3/E5, LTSC), Education editions and SE: who gets what.',
  learn: [
    { t: 'Retail and OEM editions', q: 'Which features do you lose on Home?',
      p: ['- **Home:** consumers; device encryption, Windows Hello, Defender; requires a Microsoft account and internet at setup. **No** BitLocker management, Hyper-V, Sandbox, Group Policy editor, domain/Azure AD join, or Remote Desktop host',
        '- **Pro:** adds **BitLocker**, **Hyper-V**, **Windows Sandbox**, **Remote Desktop host**, **Group Policy**, **domain and Azure AD join**, Windows Update for Business, assigned access',
        '- **Pro for Workstations:** high-end hardware: up to 4 CPUs, 6 TB RAM, **ReFS** and SMB Direct, persistent memory'],
      key: ['Home lacks BitLocker mgmt, Hyper-V, Sandbox, RDP host, gpedit, domain join', 'Pro adds all of those', 'Pro for Workstations: 4 CPUs, 6 TB RAM, ReFS'] },
    { t: 'Editions for organizations', p: ['- **Enterprise E3:** everything in Pro plus enterprise security and management (Credential Guard, AppLocker, Windows Defender Application Control, Direct Access/Always On VPN features); licensed per user by subscription',
        '- **Enterprise E5:** E3 plus **Microsoft Defender for Endpoint** Plan 2',
        '- **Microsoft 365 E3/E5/F3:** bundles Windows Enterprise, Office apps, Intune and more (F3 for frontline workers)',
        '- **Enterprise LTSC (Long-Term Servicing Channel):** no feature updates for years (10-year support for some releases), no Store or inbox apps; for fixed-function devices like medical equipment or ATMs'],
      key: ['E3 = Enterprise features; E5 = + Defender for Endpoint', 'Microsoft 365 bundles bundle Windows, Office, Intune', 'LTSC = stable, no feature updates, for special devices'] },
    { t: 'Editions for education', p: ['**Education** and **Pro Education** are Enterprise/Pro equivalents licensed to schools with education-friendly defaults. **Windows 11 SE** is a locked-down cloud-first edition for low-cost student laptops, managed only by Intune for Education with a restricted app list.'],
      key: ['Education ≈ Enterprise for schools', 'Windows 11 SE: locked-down, Intune for Education'] },
    { t: 'Hardware limits by edition', q: 'How much RAM can Windows 11 Home use?',
      p: ['From the class slides (all editions need a 1 GHz+ CPU and support up to 64 cores per CPU):',
        '- **Home**: **1 CPU**, up to **128 GB RAM**',
        '- **Pro, Enterprise, Education**: **1 or 2 CPUs**, up to **2 TB RAM**',
        '- **Pro for Workstations**: up to **4 CPUs**, up to **6 TB RAM**',
        'Pro for Workstations also supports **NVDIMM-N** persistent memory (keeps data in RAM through power loss), **SMB Direct** file transfers over RDMA, and **ReFS**, which can pair with Storage Spaces to recover damaged files.'],
      key: ['Home: 1 CPU, 128 GB', 'Pro/Enterprise/Education: 2 CPUs, 2 TB', 'Pro for Workstations: 4 CPUs, 6 TB'] },
    { t: 'What each step up adds', p: ['- **Home** (the usual OEM install): Start and taskbar, Settings, NTFS, TCP/IP networking, power management, Search index, TPM, Secure Boot, built-in apps, Defender, **Windows Hello**',
        '- **Pro** adds: **Hyper-V**, **Windows Sandbox**, **BitLocker** and **BitLocker To Go**, **EFS**, language packs, **Windows Update for Business**, **mobile device management**, **domain join and Group Policy**, **Azure AD**, **Autopilot**, Windows Information Protection, **IE mode**, **Remote Desktop host**',
        '- **Enterprise** adds: **Azure Virtual Desktop**, **Credential Guard**, **Exploit Guard**, **DirectAccess** (secure connection without a VPN), **Universal Print**, and **Defender for Endpoint** with E5 licenses',
        '- **IoT Enterprise**: Enterprise features with different licensing and distribution',
        '- **N / KN** and Single Language versions also exist'],
      key: ['Pro: Hyper-V, Sandbox, BitLocker, EFS, domain join, RDP host', 'Enterprise: Credential Guard, Exploit Guard, DirectAccess, Universal Print'] }
  ],
  cards: [
    ['Name 4 things Pro has that Home doesn\'t', 'BitLocker, Hyper-V, Windows Sandbox, Remote Desktop host (also Group Policy, domain join).'], ['What does Enterprise E5 add over E3?', 'Microsoft Defender for Endpoint (Plan 2)'],
    ['What is LTSC for?', 'Fixed-function devices needing years without feature updates'], ['Pro for Workstations limits', 'Up to 4 CPUs and 6 TB RAM, ReFS support'],
    ['Windows 11 SE', 'Locked-down edition for low-cost education laptops, managed by Intune for Education'], ['How are Enterprise editions licensed?', 'Per-user subscription through volume licensing / Microsoft 365']
  ],
  run: [],
  quiz: [
    ['A home user wants to run Windows Sandbox. They have Home. What do you advise?', ['Install it from the Store', 'Upgrade to Pro', 'Use WSL', 'Enable it in msconfig'], 1, 'Edition feature.', 0, ['It\'s not a Store app.', '', 'That\'s Linux, not Sandbox.', 'Not possible.'], 1],
    ['A hospital needs Windows on an MRI controller with no feature changes for years. Edition?', ['Pro', 'Enterprise LTSC', 'Home', 'Pro Education'], 1, 'Long-term servicing.', 1, ['Gets yearly feature updates.', '', 'Consumer edition.', 'School licensing.'], 1],
    ['A video editor needs 512 GB of RAM in one PC. What is the lowest edition that supports it?', ['Home', 'Pro', 'Pro for Workstations', 'SE'], 1, 'Compare 128 GB, 2 TB and 6 TB.', 3, ['Home tops out at 128 GB.', '', 'Works, but more than needed.', 'SE is for school laptops.'], 1],
    ['Which edition includes Microsoft Defender for Endpoint?', ['Enterprise E3', 'Enterprise E5', 'Pro', 'Home'], 1, 'The higher tier.', 1, ['Doesn\'t include it.', '', 'Doesn\'t include it.', 'Doesn\'t include it.']],
    ['A small office PC on Home must join the company domain. What\'s required?', ['A domain admin password only', 'Upgrading to Pro or higher', 'Windows Update', 'A new TPM'], 1, 'Home can\'t join.', 0, ['Credentials aren\'t enough on Home.', '', 'Updates don\'t add the feature.', 'Hardware isn\'t the issue.'], 1]
  ]
});

W.chapter({
  id: 'cb', num: 'B', part: 4, title: 'The Windows Insider Program',
  short: 'Windows Insider', icon: 'flask',
  blurb: 'Preview channels, enrolling a device, tracking builds, and sending feedback.',
  learn: [
    { t: 'How the program works', p: ['The **Windows Insider Program** delivers preview builds to volunteers. Channels, from most experimental to most stable: **Canary**, **Dev**, **Beta**, **Release Preview**. Release Preview gets the next update shortly before everyone.',
        'Preview builds can be unstable; don\'t use Canary or Dev on a PC you depend on. Moving to a less experimental channel may require a clean install.'],
      key: ['Canary > Dev > Beta > Release Preview (most to least experimental)', 'Don\'t run early channels on a production PC'] },
    { t: 'Enrolling, tracking and feedback', p: ['Enroll in **Settings > Windows Update > Windows Insider Program** (requires optional diagnostic data and a registered Microsoft account). Track builds on the **Windows Insider blog** and flight hub.',
        'Report bugs and suggestions in the **Feedback Hub** (Windows key+F), add screenshots or a recording, and upvote others\' feedback.'],
      key: ['Settings > Windows Update > Windows Insider Program', 'Feedback Hub = Windows key+F', 'Requires optional diagnostic data'] }
  ],
  cards: [
    ['Insider channels from most to least experimental', 'Canary, Dev, Beta, Release Preview'], ['Feedback Hub shortcut', 'Windows key+F'], ['Where to enroll', 'Settings > Windows Update > Windows Insider Program'],
    ['Which channel is closest to public release?', 'Release Preview'], ['Diagnostic data level required', 'Optional diagnostic data']
  ],
  run: [],
  quiz: [
    ['A technician wants a peek at next month\'s update on a work laptop with minimal risk. Channel?', ['Canary', 'Dev', 'Beta', 'Release Preview'], 3, 'Closest to public release.', 0, ['Most experimental.', 'Very experimental.', 'Less risky, still preview features.', ''], 1],
    ['Where do Insiders report a bug with a screen recording?', ['Event Viewer', 'Feedback Hub', 'Quick Assist', 'Get Help app'], 1, 'Windows key+F.', 1, ['Only reads logs.', '', 'Remote help.', 'Support, not preview feedback.']],
    ['What must be turned on before joining the Insider Program?', ['Optional diagnostic data', 'Hyper-V', 'BitLocker', 'Developer Mode'], 0, 'Microsoft needs telemetry from previews.', 1, ['', 'Not needed.', 'Not needed.', 'Not needed.']]
  ]
});

W.chapter({
  id: 'cc', num: 'C', part: 4, title: 'Help and support resources',
  short: 'Help & support', icon: 'help',
  blurb: 'Where to find answers: Get Help, Microsoft Support, Microsoft Learn (Docs), Q&A, and paid support.',
  learn: [
    { t: 'Online help and reference', p: ['The **Get Help** app and **Tips** app are built in. **Microsoft Support** (support.microsoft.com) has consumer how-to and fix articles. **Microsoft Learn** (learn.microsoft.com, formerly Microsoft Docs) has the authoritative technical documentation, PowerShell references and free training paths for certifications.',
        'For IT pros: the **Windows release health** dashboard lists known issues per update, and the **Windows IT Pro Blog** and Tech Community cover enterprise topics.'],
      key: ['Get Help app built in', 'Microsoft Learn = technical docs + training (formerly Docs)', 'Release health dashboard lists known issues'] },
    { t: 'Getting technical support', p: ['**Microsoft Q&A** is the community forum for technical questions. Free support covers some consumer issues via Get Help and chat; businesses use paid **Microsoft Unified/Premier** support or partners.',
        'Good support requests include: exact error text/stop code, Windows version and build (`winver`), what changed, steps to reproduce, and what you already tried.'],
      key: ['Microsoft Q&A community forum', 'Include error text, build, what changed, steps, what you tried'] }
  ],
  cards: [
    ['Formerly called Microsoft Docs', 'Microsoft Learn'], ['Where are known issues for each update listed?', 'Windows release health dashboard'],
    ['Five things for a good support ticket', 'Exact error, Windows build, what changed, steps to reproduce, what you tried'], ['Community forum for Microsoft technical questions', 'Microsoft Q&A']
  ],
  run: [
    ['Find the Windows build number to put in a support ticket.', 'winver|winver.exe', 'Same as chapter 1.', 'The same six-letter command from chapter 1.']
  ],
  quiz: [
    ['A cumulative update broke printing across the office. Where do you check whether Microsoft already knows?', ['Windows release health dashboard', 'Feedback Hub', 'Event Viewer', 'Tips app'], 0, 'Known issues are tracked per update.', 0, ['', 'Feedback, not confirmations.', 'Your logs, not Microsoft\'s list.', 'Basic tips only.'], 1],
    ['Which detail is LEAST useful in a support ticket?', ['The exact stop code', 'Windows build number', 'The user\'s desktop wallpaper', 'What changed before the problem'], 2, 'What helps reproduce or identify the problem?', 1, ['Very useful.', 'Very useful.', '', 'Very useful.'], 1],
    ['Where would you find the official parameter list for a PowerShell cmdlet?', ['Microsoft Learn', 'Microsoft Store', 'Tips app', 'Feedback Hub'], 0, 'Formerly Docs.', 0, ['', 'Apps, not docs.', 'Too basic.', 'Feedback only.']]
  ]
});
