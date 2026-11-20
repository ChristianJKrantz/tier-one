/* Tier One content, Part II: Managing Windows 11 (chapters 9-15). Original study material; see content-1.js for format. */
W.chapter({
  id: 'c9', num: '9', part: 2, title: 'Using File Explorer',
  short: 'File Explorer', icon: 'folder',
  blurb: 'Navigation, tabs, views and metadata, zip files, user profile folders and libraries, OneDrive integration, recovery, sorting and the search index.',
  learn: [
    { t: 'Mastering File Explorer', q: 'How many ways can you open File Explorer?',
      p: ['Open with **Windows key+E**. The **navigation pane** shows Home, Gallery, OneDrive, This PC and Network. File Explorer has **tabs** (Ctrl+T new tab, Ctrl+W close) and a command bar with View options.',
        'Pin folders to **Quick access** for fast navigation. **Layouts** range from extra large icons to Details; turn on the **Preview pane** (Alt+P) or **Details pane** (Alt+Shift+P). Show **file name extensions** and **hidden items** from View > Show; technicians nearly always turn extensions on.'],
      key: ['Win+E opens Explorer; Ctrl+T new tab', 'Pin folders to Quick access', 'Turn on file name extensions and hidden items', 'Alt+P preview pane'],
      trap: 'Leaving extensions hidden: "invoice.pdf.exe" then looks like a PDF.' },
    { t: 'Properties, metadata and zip', p: ['Files carry **metadata** (author, tags, rating, date taken) visible in the Details pane and Properties > Details, where **Remove Properties and Personal Information** strips it before sharing.',
        'Right-click > **Compress to ZIP file** creates a zip; double-click to browse it, and **Extract All** to unpack. Newer builds add 7z and TAR support.'],
      key: ['Metadata in Details pane and Properties', 'Remove personal info before sharing', 'Compress to ZIP / Extract All'] },
    { t: 'User profiles and libraries', q: 'Where does Windows keep your Documents folder on disk?',
      p: ['Each user has a profile at **C:\\Users\\username** with Desktop, Documents, Downloads, Music, Pictures, Videos and the hidden **AppData** (Local, LocalLow, Roaming) where apps store settings. Use `%userprofile%` and `%appdata%` to jump there.',
        'Relocate a personal folder via Properties > **Location** > Move (for example, Documents to D:).',
        '**Libraries** are virtual views that combine several folders into one (hidden by default; enable with View > Show > Libraries).'],
      key: ['Profile = C:\\Users\\name', 'AppData (hidden): Local, LocalLow, Roaming', '%appdata% = Roaming', 'Move folders with Properties > Location', 'Libraries combine folders'] },
    { t: 'OneDrive in Explorer and recovery', p: ['OneDrive appears in the navigation pane with status icons; right-click to **Share** (create a link with edit or view-only rights, optional expiration/password on some plans) or choose **Always keep on this device**.',
        'Deleted local files go to the **Recycle Bin** (not files on USB flash drives or network shares, and not Shift+Delete). Restore from there. **File History** and OneDrive **version history** / OneDrive **Recycle bin** recover older or deleted files. Recycle Bin size is set per drive in its Properties.'],
      key: ['Share links can be view or edit', 'USB, network and Shift+Delete skip the Recycle Bin', 'OneDrive has version history and its own recycle bin'] },
    { t: 'Sort, filter and group', p: ['In Details view click a column header to **sort**, click its arrow to **filter** (by type, date, size), and use **Group by** to cluster files. Right-click a header to add columns like Date taken or Dimensions.'],
      key: ['Header click sorts; header arrow filters', 'Group by clusters items', 'Right-click headers to add columns'] },
    { t: 'Search and the index', q: 'Why are some searches instant and others slow?',
      p: ['The **Windows Search** service maintains an **index** of file names, properties and contents for indexed locations (user folders by default). **Classic** indexing covers libraries and desktop; **Enhanced** indexes the whole PC. Searches outside the index crawl the disk and are slow.',
        'Manage it in Settings > Privacy & security > Searching Windows, or **Indexing Options** (control srchadmin.dll), where you can add locations, file types and **Rebuild** a broken index.',
        'Advanced Query Syntax: `kind:document`, `date:last week`, `size:>100MB`, `ext:.pdf`, `author:Chris`, combined with AND/OR/NOT and quotes; `*` and `?` wildcards. Save a search as a **.search-ms** file.'],
      key: ['Indexed = fast; outside index = slow crawl', 'Indexing Options > Rebuild fixes a broken index', 'kind:, date:, size:, ext: filters', 'Save searches as .search-ms'] },
    { t: "Class notes: the File Explorer window and file properties", q: "Name the six parts of a File Explorer window.",
      p: ["**The six basic parts of a File Explorer window:** **navigation pane**, **command bar**, **address bar**, **tabs** (each location in its own tab), **details/content pane**, **search box**", "**File properties** (right-click > Properties):", "- **General**: change the file’s default app", "- **Security**: who can read, write, modify", "- **Details**: review metadata; **Remove Properties and Personal Information**", "- **Advanced**: indexing, archiving, **compression** and **encryption**", "- **Previous Versions**: earlier copies if **File History** is enabled", "**Search options**: … > Options > **Search** tab to refine how and where File Explorer searches"],
      key: ["Six parts: navigation pane, command bar, address bar, tabs, content pane, search box", "Advanced tab: compression and encryption", "Previous Versions needs File History"] }
  ],
  cards: [
    ['Windows key+E', 'Open File Explorer'], ['Where are user profiles stored?', 'C:\\Users\\username'], ['%appdata% opens which folder?', 'AppData\\Roaming'],
    ['Three AppData subfolders', 'Local, LocalLow, Roaming'], ['Which deletions skip the Recycle Bin?', 'Shift+Delete, files on USB flash drives and network shares.'],
    ['How do you move Documents to another drive?', 'Documents Properties > Location > Move.'], ['What is a library?', 'A virtual view that combines multiple folders.'],
    ['Search for files over 100 MB', 'size:>100MB'], ['Fix a broken search index', 'Indexing Options > Advanced > Rebuild'], ['Classic vs. Enhanced indexing', 'Classic: user folders/libraries; Enhanced: the entire PC.'],
    ['Alt+P in File Explorer', 'Toggle the Preview pane'], ['Why show file extensions?', 'So disguised files like invoice.pdf.exe are visible.']
  ],
  run: [
    ['Jump to the Roaming application data folder.', '%appdata%', 'Use an environment variable in percent signs.', 'Starts with %app'],
    ['Open your user profile folder.', '%userprofile%', 'The environment variable for the profile.', '%user...%'],
    ['Open Indexing Options.', 'control srchadmin.dll|control.exe srchadmin.dll|srchadmin.dll', 'It is a Control Panel item launched with control and a DLL name.', 'control + "search admin" shortened .dll'],
    ['Search File Explorer for PDFs only (use the extension filter).', 'ext:.pdf|ext:pdf|*.pdf', 'Advanced Query Syntax has an extension property.', 'ext: then the extension']
  ],
  quiz: [
    ['A user\'s searches for documents take minutes. Search works but is slow. First thing to check?', ['Whether the folders are in the search index', 'The Recycle Bin size', 'OneDrive version history', 'File name extensions'], 0, 'Indexed locations are fast.', 5, ['', 'Unrelated to search speed.', 'Unrelated.', 'Visibility only.'], 1],
    ['A user deleted a file from a USB flash drive and it isn\'t in the Recycle Bin. Why?', ['The Recycle Bin is full', 'Deletions from flash drives bypass the Recycle Bin', 'The file was encrypted', 'Indexing is off'], 1, 'Not all locations use the Recycle Bin.', 3, ['A full bin deletes older items first.', '', 'Encryption doesn\'t change this.', 'Unrelated.'], 1],
    ['An email attachment shows as "invoice.pdf" but is actually a program. What setting would expose it?', ['Show hidden items', 'Show file name extensions', 'Compact view', 'Preview pane'], 1, 'Windows hides something after the last dot.', 0, ['Doesn\'t reveal extensions.', '', 'Only spacing.', 'Wouldn\'t reveal the real type.'], 1],
    ['Where do apps usually store per-user settings that follow a user in a domain?', ['Program Files', 'AppData\\Roaming', 'Windows\\System32', 'Public\\Documents'], 1, 'The name suggests moving with the user.', 2, ['That holds program binaries.', '', 'System files.', 'Shared by all users.']],
    ['Which search finds Word and PDF files changed last week?', ['kind:document date:last week', 'type:all modified:7', 'docs* week', 'author:last week'], 0, 'Combine a kind filter and a date filter.', 5, ['', 'Not valid syntax.', 'Wildcard on the name only.', 'Searches the author field.']],
    ['How do you move Documents to D: so Windows still treats it as Documents?', ['Copy it and delete the original', 'Properties > Location > Move', 'Make a shortcut', 'Use a library'], 1, 'There\'s a tab made for this.', 2, ['Windows would still point at C:.', '', 'Doesn\'t change the real location.', 'Only combines views.']]
  ]
});

W.chapter({
  id: 'c10', num: '10', part: 2, title: 'Managing user accounts, passwords, and credentials',
  short: 'Accounts & sign-in', icon: 'person',
  blurb: 'Account types, admin vs. standard, MFA and Windows Hello, PINs and security keys, locking, family and assigned access, and access control basics.',
  learn: [
    { t: 'Account types', q: 'What are the four ways to sign in to Windows 11?',
      p: ['- **Microsoft account** (Outlook.com etc.): cloud sync, Store, recovery key backup',
        '- **Local account:** exists only on this PC',
        '- **Work or school account:** Azure AD/Entra ID, managed by an organization',
        '- **Domain account:** Active Directory, for on-premises business networks',
        'Manage accounts in **Settings > Accounts**, or the classic `netplwiz` and `lusrmgr.msc` (Local Users and Groups, Pro and up).'],
      key: ['Microsoft, local, work/school (Entra ID), domain (AD)', 'netplwiz and lusrmgr.msc are the classic tools'] },
    { t: 'Administrator or standard user?', q: 'Why shouldn\'t everyone be an admin?',
      p: ['**Administrators** can install software, change system settings and manage other accounts. **Standard users** can run apps and change their own settings; system changes trigger a **UAC** prompt asking for admin credentials.',
        'Best practice is **least privilege**: daily work in a standard account, admin only when needed. Windows also has a built-in Administrator account that is disabled by default.',
        'Deleting an account removes its profile and files, so back up first.'],
      key: ['Least privilege: daily use as a standard user', 'Built-in Administrator is disabled by default', 'Deleting an account deletes its files'] },
    { t: 'Securing sign-in', p: ['**Multifactor authentication** combines something you know (password/PIN), have (phone, security key, the TPM in this PC) and are (face/fingerprint).',
        '**Windows Hello** offers facial recognition (IR camera), fingerprint and **PIN**. A Hello PIN is **tied to the device\'s TPM**, so a stolen PIN is useless on any other machine, which is why it\'s safer than a password that works anywhere.',
        '**Picture password** uses gestures on an image. **FIDO2 security keys** (USB/NFC) sign in to Microsoft accounts without a password. You can require Windows Hello sign-in only for Microsoft accounts.'],
      key: ['MFA = know + have + are', 'Hello PIN is bound to this device\'s TPM', 'Hello: face (IR camera), fingerprint, PIN', 'FIDO2 security keys for passwordless sign-in'],
      trap: 'Thinking a 4-digit PIN is weaker than a long password. The PIN only works on that one device.' },
    { t: 'Locking, switching and Dynamic Lock', p: ['**Windows key+L** locks immediately. **Ctrl+Alt+Delete** opens the security screen (lock, switch user, sign out, change password, Task Manager). **Dynamic Lock** locks the PC automatically when your paired Bluetooth phone walks out of range.',
        'Set screen saver/sign-in requirements so an unattended PC locks itself.'],
      key: ['Win+L locks now', 'Ctrl+Alt+Del security screen', 'Dynamic Lock uses a paired Bluetooth phone'] },
    { t: 'Sharing a PC', p: ['Add users in Settings > Accounts > Other users. **Microsoft Family Safety** sets screen time, content filters and activity reports for child accounts.',
        '**Assigned access** (kiosk mode) locks an account to a single app, for example a lobby check-in screen.'],
      key: ['Family Safety for child accounts', 'Assigned access = single-app kiosk'] },
    { t: 'Access control', q: 'How does Windows decide whether you may open a file?',
      p: ['Every account and group has a unique **security identifier (SID)**. When you sign in you receive an **access token** listing your SIDs and privileges.',
        'Every securable object (file, folder, registry key, printer) has an **access control list (ACL)** made of **access control entries (ACEs)** that allow or deny permissions to SIDs. Windows compares the token against the ACL. **Deny** entries take precedence over Allow.',
        '`whoami /all` shows your SIDs, groups and privileges.'],
      key: ['SID identifies each account/group', 'Access token is issued at sign-in', 'ACL = list of ACEs (allow/deny)', 'Deny beats Allow', 'whoami /all shows your token'] },
    { t: "Class notes: managing local accounts and family",
      p: ["- A **user account** represents a person or entity that can use the computer: think username and password", "- **Local account management** (Control Panel > User Accounts and Settings > Accounts): change account **name** and **type**, **manage credentials**, create a **password reset disk**, manage **EFS file encryption certificates**, **advanced profile properties** (a **roaming profile** centralizes your account across domain PCs), and **environment variables** (user-defined values that affect running processes)", "- **Family accounts**: create a Microsoft account for each member and manage them at **account.microsoft.com/family**: monitor usage and searches, **block websites**, limit apps and games by rating, control **Store purchases**, **restrict usage times**. Add at **Settings > Accounts > Family & other people > Add a family member**", "- **Sign out, switch accounts or lock** (Windows key+L): click the profile icon on Start"],
      key: ["Password reset disk and EFS certificates live in User Accounts", "Family safety at account.microsoft.com/family", "Roaming profile = same account on every domain PC"] }
  ],
  cards: [
    ['Why is a Windows Hello PIN safer than a password?', 'It is tied to that device\'s TPM; it can\'t be used elsewhere.'], ['Windows key+L', 'Lock the PC'],
    ['What is Dynamic Lock?', 'Auto-locks when your paired Bluetooth phone leaves range.'], ['Principle of least privilege', 'Use a standard account daily; elevate only when needed.'],
    ['What is a SID?', 'Security identifier: unique ID for an account or group.'], ['What is an ACL?', 'Access control list: the set of allow/deny entries (ACEs) on an object.'],
    ['Deny vs. Allow conflict', 'Deny wins.'], ['Command to show your SIDs and privileges', 'whoami /all'],
    ['What is assigned access?', 'Kiosk mode that limits an account to a single app.'], ['Three MFA factor types', 'Something you know, have, and are.'],
    ['Local Users and Groups snap-in', 'lusrmgr.msc'], ['Built-in Administrator default state', 'Disabled']
  ],
  run: [
    ['Open the classic User Accounts dialog.', 'netplwiz|netplwiz.exe', 'A short, odd name from the "network places wizard".', 'Eight letters; it starts with the word "net" and ends with a short form of "wizard".'],
    ['Open Local Users and Groups.', 'lusrmgr.msc', 'Local + user + manager, as an MMC snap-in.', 'Starts with "l" for local, then abbreviations of the two remaining words, then the snap-in extension.'],
    ['Show your username, SIDs, group memberships and privileges.', 'whoami /all', 'Ask the system who you are.', 'whoami + a switch for everything'],
    ['List local user accounts with the classic net command.', 'net user|net users', 'The net command has a subcommand for accounts.', 'Two words; the second is the singular of what you\'re listing.']
  ],
  quiz: [
    ['A small office wants staff to install nothing without IT. Which account setup?', ['Everyone is an administrator', 'Staff use standard accounts; IT keeps admin credentials', 'Enable the built-in Administrator for all', 'Use Guest accounts'], 1, 'Least privilege.', 1, ['Anyone could install anything.', '', 'Shared admin is a security risk.', 'Windows 11 has no usable Guest account.'], 1],
    ['A user is worried a coworker saw their 6-digit Hello PIN. How serious is it?', ['Very serious, it unlocks their Microsoft account anywhere', 'Limited, the PIN only works on that physical device', 'It exposes their email password', 'It reveals the BitLocker key'], 1, 'Where does the PIN live?', 2, ['The PIN isn\'t a cloud password.', '', 'A PIN is separate from the password.', 'BitLocker keys are separate.'], 1],
    ['A user is denied access to a folder even though their group is allowed. Most likely?', ['A Deny entry applies to them or another group they\'re in', 'Their PIN expired', 'UAC is off', 'The folder is indexed'], 0, 'Which wins: allow or deny?', 5, ['', 'PINs don\'t affect file ACLs.', 'UAC doesn\'t cause denial like this.', 'Indexing doesn\'t affect permissions.'], 1],
    ['Which feature locks a PC when the user walks away with their phone?', ['Dynamic Lock', 'Assigned access', 'Picture password', 'Family Safety'], 0, 'It uses Bluetooth.', 3, ['', 'That\'s kiosk mode.', 'That\'s a sign-in method.', 'That\'s for child accounts.']],
    ['A clinic lobby PC must only run the check-in app. Which feature?', ['Family Safety', 'Assigned access', 'Standard account', 'Windows Sandbox'], 1, 'Also called kiosk mode.', 4, ['For child accounts.', '', 'Can still open other apps.', 'For testing apps.'], 1],
    ['What does Windows issue when you sign in that lists your SIDs and privileges?', ['An ACL', 'An access token', 'A certificate', 'A product key'], 1, 'You carry it with you, like a token.', 5, ['ACLs belong to objects, not users.', '', 'Not the sign-in mechanism.', 'Licensing, unrelated.']]
  ]
});

W.chapter({
  id: 'c11', num: '11', part: 2, title: 'Configuring Windows networks',
  short: 'Networking', icon: 'net',
  blurb: 'Network status and tools, TCP/IP settings, metered connections, network profiles, Wi-Fi security, Remote Desktop, sharing, mapped drives and troubleshooting.',
  learn: [
    { t: 'Networking essentials', q: 'Where would you check whether a PC has an IP address?',
      p: ['**Settings > Network & internet** shows connection status, data usage and **Advanced network settings** (adapters, network reset). The classic **Network Connections** folder is `ncpa.cpl`.',
        'Command-line tools: `ipconfig` (`/all`, `/release`, `/renew`, `/flushdns`), `ping`, `tracert`, `nslookup`, `pathping`, `netstat`, `netsh`, and PowerShell cmdlets like `Get-NetIPConfiguration` and `Test-NetConnection`.'],
      key: ['ncpa.cpl = Network Connections', 'ipconfig /all, /release, /renew, /flushdns'] },
    { t: 'TCP/IP configuration', q: 'What does an address starting with 169.254 tell you?',
      p: ['Most PCs get settings from **DHCP**: IP address, subnet mask, default gateway and DNS servers. You can set a **static** address in the adapter\'s IP settings.',
        'If DHCP fails, Windows assigns an **APIPA** address in **169.254.x.x**, which means "no DHCP server reached."',
        'IPv6 is on by default; addresses starting **fe80::** are link-local. You can also set **DNS over HTTPS** for encrypted name lookups.'],
      key: ['DHCP gives IP, mask, gateway, DNS', '169.254.x.x = APIPA = DHCP failed', 'fe80:: = IPv6 link-local'] },
    { t: 'Metered connections and profiles', q: 'Why does the network profile matter for security?',
      p: ['Mark a connection **metered** (hotspots, capped plans) and Windows limits background downloads and updates.',
        'Each network gets a **profile**: **Public** (default, discovery off, strictest firewall: use for coffee shops) or **Private** (home/work, allows **network discovery** and file sharing). Domain networks get a **Domain** profile automatically.',
        'Change it in the network\'s properties or with `Set-NetConnectionProfile -NetworkCategory Private`.'],
      key: ['Metered = fewer background downloads', 'Public: discovery off, strictest; Private: discovery on', 'Domain profile applies on domain networks'] },
    { t: 'Wireless', p: ['Connect from Quick Settings. A **hidden network** doesn\'t broadcast its SSID, so you enter the name manually (hiding it is not real security).',
        'Security, strongest first: **WPA3**, **WPA2-Personal/Enterprise** (AES), WPA (TKIP), WEP (broken), Open. **Enterprise** modes use 802.1X with a RADIUS server instead of a shared key.',
        '`netsh wlan show profiles` lists saved networks; `netsh wlan show profile name="X" key=clear` reveals a saved key (admin).'],
      key: ['WPA3 > WPA2 (AES) > WPA > WEP > Open', 'Enterprise = 802.1X/RADIUS', 'Hidden SSID is not security', 'netsh wlan show profiles'] },
    { t: 'Remote Desktop', p: ['**Remote Desktop** lets you control another PC over the network. Hosting inbound connections requires **Pro, Enterprise or Education**; Home can only connect *out*.',
        'Enable it in Settings > System > Remote Desktop (uses TCP port **3389**, and **Network Level Authentication** requires sign-in before a session is created). Connect with `mstsc` (Remote Desktop Connection) or the Microsoft Remote Desktop app.'],
      key: ['Hosting RDP needs Pro or higher', 'Port 3389; NLA authenticates first', 'mstsc = Remote Desktop Connection'] },
    { t: 'Sharing files and printers', q: 'What happens when share and NTFS permissions disagree?',
      p: ['Share a folder from Properties > Sharing (**Advanced Sharing** for share names and permissions). Access over the network is limited by **both** the **share permissions** and the **NTFS permissions**; the **most restrictive** wins.',
        'Reach shares by **UNC path** `\\\\server\\share`. **Map a network drive** to give a share a drive letter: File Explorer > This PC > Map network drive, or `net use Z: \\\\server\\share /persistent:yes`.',
        'Share a printer from its Printer properties > Sharing; connect with Add device or `\\\\pc\\printer`. `printmanagement.msc` manages many printers.'],
      key: ['Share + NTFS permissions: most restrictive wins', 'UNC = \\\\server\\share', 'net use Z: \\\\server\\share maps a drive'] },
    { t: 'Troubleshooting networks', q: 'If ping by IP works but ping by name fails, what\'s broken?',
      p: ['Work up from the bottom: link (cable/Wi-Fi), IP config (`ipconfig /all`), gateway (`ping` the gateway), outside IP (`ping 8.8.8.8`), then name resolution (`nslookup`, `ping` a name).',
        '- Ping by IP works but name fails: **DNS** problem; try `ipconfig /flushdns` or different DNS servers',
        '- 169.254 address: **DHCP** problem',
        '- `tracert` shows where along the path packets stop',
        '**Network reset** (Advanced network settings) reinstalls adapters and resets components as a last resort. The **Network and Internet troubleshooter** automates common checks.'],
      key: ['Bottom-up: link > IP > gateway > internet > DNS', 'IP works, name fails = DNS', 'tracert finds where packets stop', 'Network reset is the last resort'] },
    { t: "Class notes: connecting and sharing", q: "What do you need for a network connection?",
      p: ["- **Requirements**: a network adapter with current drivers; an **RJ-45** Ethernet jack and cable or a Wi-Fi access point; a switch, router or ISP combo device; an **ISP** service agreement", "- Windows detects and configures network hardware automatically. **Wired** connects right away; **Wi-Fi** needs a choice and passphrase", "- The **network status icon** in the system tray shows status, lets you pick Wi-Fi, diagnose problems, and reach settings (Wi-Fi, airplane mode, Ethernet, VPN, hotspot, advanced adapter options). Wired shows first; strongest Wi-Fi is listed first", "- **TCP/IP** is the default protocol; it routes data by IP address", "- **Hidden (non-broadcasting) networks**: Manage known networks > **Add network** > name, security type, key", "- **Public folder sharing**: files in **C:\\Users\\Public** are shared with everyone who signs in to the PC; the creator has **Full Control**, other local users **Modify**", "- Remote Desktop tip: if you save credentials you can pin the connection to the taskbar"],
      key: ["Wired connects automatically; Wi-Fi needs a passphrase", "C:\\Users\\Public is shared with every local user"] }
  ],
  cards: [
    ['169.254.x.x address means', 'APIPA: the PC couldn\'t reach a DHCP server.'], ['ipconfig /flushdns', 'Clears the DNS resolver cache.'], ['Default Remote Desktop port', 'TCP 3389'],
    ['Which editions can host Remote Desktop?', 'Pro, Enterprise, Education (not Home)'], ['Share vs. NTFS permissions', 'Both apply; the most restrictive wins.'], ['UNC path format', '\\\\server\\share'],
    ['Public vs. Private profile', 'Public: discovery off, strict firewall. Private: discovery and sharing allowed.'], ['What does a metered connection do?', 'Limits background downloads and updates.'],
    ['Strongest Wi-Fi security', 'WPA3'], ['IP ping works, name ping fails', 'DNS problem'], ['ncpa.cpl', 'Network Connections folder'], ['fe80:: address', 'IPv6 link-local']
  ],
  run: [
    ['Show full IP configuration for all adapters.', 'ipconfig /all|ipconfig -all', 'IP configuration tool with a switch for everything.', 'The switch is a three-letter word meaning "everything".'],
    ['Get a new address from DHCP.', 'ipconfig /renew|ipconfig -renew', 'Same tool; the switch means to refresh the lease.', 'ipconfig + a word meaning "make new again"'],
    ['Clear the DNS cache.', 'ipconfig /flushdns|ipconfig -flushdns', 'You "flush" a cache.', 'The switch is two words joined: a verb for emptying and the name of the cache.'],
    ['Open Network Connections (adapters).', 'ncpa.cpl', 'A Control Panel applet (.cpl).', 'Four letters + .cpl, starting with "nc"'],
    ['Open Remote Desktop Connection.', 'mstsc|mstsc.exe', 'Microsoft Terminal Services Client.', 'Five letters starting with "ms"'],
    ['Map drive Z: to \\\\fs01\\shared.', 'net use z: \\\\fs01\\shared|net use z: \\\\fs01\\shared /persistent:yes', 'The net command\'s subcommand for using a share.', 'net use + drive + UNC path'],
    ['Trace the route to example.com.', 'tracert example.com|tracert.exe example.com', 'Trace + route, shortened.', 'tracert + host']
  ],
  quiz: [
    ['A user\'s ipconfig shows 169.254.33.10. What\'s the likely issue?', ['DNS server down', 'The PC couldn\'t reach a DHCP server', 'The firewall is blocking ping', 'The IP is static'], 1, 'That range has a special name.', 1, ['DNS doesn\'t assign addresses.', '', 'Unrelated to addressing.', 'A static IP wouldn\'t be in this range.'], 1],
    ['You can ping 8.8.8.8 but not google.com. Which command is the logical next step?', ['ipconfig /release', 'nslookup google.com', 'netstat -a', 'chkdsk'], 1, 'Names vs. numbers.', 6, ['IP connectivity already works.', '', 'Shows connections, not name resolution.', 'Disk tool.'], 1],
    ['A Windows 11 Home user can\'t be reached by Remote Desktop. Why?', ['Port 443 is closed', 'Home can\'t host incoming Remote Desktop sessions', 'NLA is required', 'The user has a Microsoft account'], 1, 'It\'s an edition question.', 4, ['RDP doesn\'t use 443 by default.', '', 'NLA is supported, not the blocker.', 'Account type doesn\'t matter.'], 1],
    ['A share grants Everyone Full Control, but NTFS grants the user Read. What can they do over the network?', ['Full Control', 'Read', 'Nothing', 'Change'], 1, 'The most restrictive wins.', 5, ['NTFS still limits them.', '', 'They do have some access.', 'Neither grants Change to this user.'], 1],
    ['A laptop on airport Wi-Fi should use which profile?', ['Private', 'Public', 'Domain', 'Metered only'], 1, 'Untrusted networks get the stricter one.', 2, ['Exposes discovery and sharing.', '', 'Only applies on a domain network.', 'Metered is a cost setting, not a profile.']],
    ['Which Wi-Fi option is weakest?', ['WPA3', 'WPA2 AES', 'WEP', 'WPA2-Enterprise'], 2, 'The oldest one has been broken for years.', 3, ['The newest and strongest.', 'Strong and common.', '', 'Strong, uses 802.1X.']],
    ['Packets to a remote site stop somewhere along the way. Which tool shows where?', ['ping', 'tracert', 'ipconfig', 'nslookup'], 1, 'You want each hop.', 6, ['Only says reachable or not.', '', 'Shows local config.', 'Resolves names.']]
  ]
});

W.chapter({
  id: 'c12', num: '12', part: 2, title: 'Windows security and privacy',
  short: 'Security & privacy', icon: 'shield',
  blurb: 'Threats, Windows Security, Windows Update, privacy controls, UAC, Defender Antivirus, ransomware protection, SmartScreen, BitLocker/EFS and the firewall.',
  learn: [
    { t: 'Threats and monitoring', p: ['Threats include **malware** (viruses, worms, trojans), **ransomware**, **phishing** and social engineering, **exploits** of unpatched flaws, and **PUAs** (potentially unwanted apps).',
        'The **Windows Security** app is the dashboard: Virus & threat protection, Account protection, Firewall & network protection, App & browser control, Device security (TPM, Secure Boot, core isolation), Device performance & health, and Family options.'],
      key: ['Windows Security app = central dashboard', 'Device security shows TPM, Secure Boot, core isolation'] },
    { t: 'Windows Update', q: 'What\'s the difference between pausing and deferring updates?',
      p: ['Windows Update delivers quality updates, feature updates, driver updates and Microsoft Defender definitions. **Active hours** prevent restarts while you work. You can **pause** updates (1 to 5 weeks on Home and Pro).',
        'Business editions can **defer** via Group Policy / Windows Update for Business. **Update history** lists installed updates by **KB number**; uninstall a bad one from there.',
        'If updates fail: run the **Windows Update troubleshooter**, then repair the system with `DISM /Online /Cleanup-Image /RestoreHealth` followed by `sfc /scannow`.'],
      key: ['Active hours block restarts', 'Pause up to 5 weeks', 'Updates are identified by KB number', 'DISM RestoreHealth, then sfc /scannow'] },
    { t: 'Privacy options', p: ['**Settings > Privacy & security** controls **diagnostic data** (Required vs. Optional), tailored experiences, the advertising ID, activity history and **app permissions** (location, camera, microphone, contacts) per app. Diagnostic Data Viewer shows what\'s sent.'],
      key: ['Diagnostic data: Required vs. Optional', 'App permissions per app for camera, mic, location'] },
    { t: 'User Account Control', q: 'Why does the screen dim when UAC appears?',
      p: ['UAC runs everything with a standard token, even for admins, and asks before elevating. A **consent prompt** (Yes/No) appears for admins; a **credentials prompt** (admin password) appears for standard users.',
        'The prompt shows on the **secure desktop** (screen dims) so malware can\'t click Yes. Four slider levels: **Always notify**, **Notify only when apps try to make changes** (default), the same **without dimming**, and **Never notify** (not recommended).',
        'Apps with a **shield icon** on their button will trigger elevation.'],
      key: ['Admins get consent prompts; standard users get credential prompts', 'Secure desktop dims the screen to block fake clicks', '4 levels; default = notify when apps make changes'] },
    { t: 'Blocking malware', p: ['**Microsoft Defender Antivirus** offers real-time, cloud-delivered protection. Scans: **Quick**, **Full**, **Custom** and **Microsoft Defender Offline** (reboots and scans before Windows loads, for rootkits). Detected threats go to **quarantine**; review in **Protection history**.',
        '**Controlled folder access** blocks untrusted apps from changing protected folders (anti-ransomware). **Exploit protection** applies mitigations such as DEP and ASLR. **Microsoft Defender SmartScreen** warns about unrecognized apps and malicious sites/downloads. **Smart App Control** (clean installs) blocks untrusted apps outright.',
        'Command line: `MpCmdRun.exe -Scan -ScanType 1`.'],
      key: ['Quick / Full / Custom / Offline scans', 'Offline scan catches rootkits', 'Controlled folder access = ransomware protection', 'SmartScreen warns on unknown apps and sites'] },
    { t: 'Encryption', q: 'Which protects a stolen laptop: BitLocker or EFS?',
      p: ['**BitLocker** encrypts entire volumes using the TPM (Pro and up; Home gets simpler **device encryption**). Save the **48-digit recovery key** to your Microsoft account, a file, print, or AD/Entra ID. **BitLocker To Go** encrypts removable drives with a password.',
        '**EFS (Encrypting File System)** encrypts individual files/folders tied to your user account certificate (NTFS only, Pro and up). Back up the EFS certificate or the files are lost if the profile is lost.',
        '`manage-bde -status` shows BitLocker state.'],
      key: ['BitLocker = whole volume, uses TPM', 'Recovery key = 48 digits; store it safely', 'BitLocker To Go = removable drives', 'EFS = per-file, tied to the user certificate', 'manage-bde -status'] },
    { t: 'Windows Defender Firewall', p: ['The firewall filters traffic per network profile (**Domain, Private, Public**), blocking unsolicited **inbound** traffic by default and allowing outbound. Allow an app via "Allow an app through firewall."',
        '**Windows Defender Firewall with Advanced Security** (`wf.msc`) creates inbound/outbound rules by program, port and protocol, and logs. **Restore defaults** undoes rule chaos.'],
      key: ['Blocks unsolicited inbound by default', 'Separate settings per profile', 'wf.msc = advanced rules', 'Restore defaults resets rules'] },
    { t: "Class notes: layered security, Defender and the firewall", q: "How many layers of protection can you name?",
      p: ["**Multilayered security strategy** (class slides): use a **hardware router**; a **software firewall**; **biometric sign-in**; a **standard account with UAC**; keep Windows **updated**; use an **antimalware** program and **email protection**; **parental controls**; **self-discipline**; stay informed about new threats", "- **Windows Defender** scans every file you touch (downloads, attachments) using two services for virus, spyware and **heuristic** (live behavior) analysis. **Settings > Privacy & security > Windows Security > Virus & threat protection**; scans: **Quick, Full, Custom, Offline** (often need a restart)", "- **Windows Firewall**: **stateful packet filtering and inspection**; on by default; **denies all inbound** traffic unless a rule allows it and **allows outbound** unless a rule blocks it; separate **domain, private and public** profiles. **Control Panel > Windows Defender Firewall**; change only with extreme caution and **make a restore point first**", "- **Privacy**: Settings > Privacy & security > **Diagnostics & feedback** sets how much diagnostic data goes to Microsoft"],
      key: ["Firewall: inbound denied, outbound allowed by default", "Defender scans: Quick, Full, Custom, Offline", "Restore point before firewall changes"] }
  ],
  cards: [
    ['Default UAC level', 'Notify me only when apps try to make changes (with dimming)'], ['Why does UAC dim the screen?', 'The secure desktop blocks other programs from interacting with the prompt.'],
    ['Consent vs. credentials prompt', 'Admin gets Yes/No consent; standard user must enter admin credentials.'], ['Scan that runs before Windows loads', 'Microsoft Defender Offline scan'],
    ['Ransomware protection feature', 'Controlled folder access'], ['BitLocker recovery key length', '48 digits'], ['BitLocker vs. EFS', 'BitLocker: whole volume. EFS: individual files tied to a user.'],
    ['Repair the component store', 'DISM /Online /Cleanup-Image /RestoreHealth'], ['Check and repair system files', 'sfc /scannow'], ['Advanced firewall console', 'wf.msc'],
    ['What does SmartScreen do?', 'Warns about unrecognized apps and malicious sites/downloads.'], ['Max pause for updates on Home/Pro', '5 weeks'], ['BitLocker status command', 'manage-bde -status']
  ],
  run: [
    ['Scan and repair protected system files.', 'sfc /scannow', 'System File Checker with a switch for "scan now".', 'Three-letter tool, then a one-word switch that tells it to start checking right away.'],
    ['Repair the Windows component store.', 'dism /online /cleanup-image /restorehealth', 'Deployment Image Servicing and Management, against the online image.', 'dism /online /cleanup-image /...health'],
    ['Open Windows Defender Firewall with Advanced Security.', 'wf.msc', 'Very short snap-in name.', 'Two letters + .msc'],
    ['Show BitLocker status for all drives.', 'manage-bde -status|manage-bde /status', 'BitLocker Drive Encryption management tool.', 'manage-bde + status switch'],
    ['Open Local Security Policy.', 'secpol.msc', 'Security policy, abbreviated.', 'Two short words ("security" and "policy") cut to three letters each, plus the snap-in extension.']
  ],
  quiz: [
    ['A standard user tries to install software. What does UAC show?', ['A Yes/No consent prompt', 'A prompt for an administrator\'s credentials', 'Nothing, install proceeds', 'A SmartScreen block'], 1, 'Standard users can\'t approve their own elevation.', 3, ['That\'s what administrators see.', '', 'UAC always asks for this.', 'SmartScreen is a separate check.'], 1],
    ['Defender keeps finding malware that returns after each reboot. Next step?', ['Run a Quick scan again', 'Run a Microsoft Defender Offline scan', 'Disable real-time protection', 'Turn off SmartScreen'], 1, 'Rootkits hide while Windows is running.', 4, ['Already failing.', '', 'Makes things worse.', 'Makes things worse.'], 1],
    ['A sales laptop with client data could be stolen. Best protection for everything on the drive?', ['EFS on the Documents folder', 'BitLocker on the OS drive', 'A strong Windows password', 'Controlled folder access'], 1, 'Whole drive, with the TPM.', 5, ['Only covers chosen files.', '', 'The drive can be read in another PC.', 'That stops ransomware, not theft.'], 1],
    ['Windows Update fails repeatedly with corruption errors. Correct repair order?', ['sfc first, then DISM', 'DISM RestoreHealth first, then sfc /scannow', 'chkdsk, then defrag', 'Reset the PC first'], 1, 'SFC repairs from the component store, so fix the store first.', 1, ['SFC can\'t repair from a corrupt store.', '', 'Disk tools, not update fixes.', 'Too drastic as a first step.'], 1],
    ['Which feature blocks unknown apps from encrypting files in Documents?', ['Exploit protection', 'Controlled folder access', 'Core isolation', 'Dynamic Lock'], 1, 'It guards folders.', 4, ['Mitigates memory exploits.', '', 'Protects the kernel.', 'Locks the screen.']],
    ['A web server app on a PC can\'t receive connections. Where do you create an inbound port rule?', ['wf.msc', 'secpol.msc', 'services.msc', 'ncpa.cpl'], 0, 'Advanced firewall console.', 6, ['', 'Security policy, not firewall rules.', 'Manages services.', 'Adapter settings.'], 1],
    ['What does the UAC "secure desktop" protect against?', ['Malware clicking Yes on the prompt', 'Shoulder surfing', 'Phishing emails', 'Keyloggers in the BIOS'], 0, 'Why does the screen dim?', 3, ['', 'Not its purpose.', 'Unrelated.', 'Unrelated.']]
  ]
});

W.chapter({
  id: 'c13', num: '13', part: 2, title: 'Managing hardware and devices',
  short: 'Hardware & drivers', icon: 'chip',
  blurb: 'Plug and Play, drivers and Device Manager, Bluetooth and USB, driver updates and rollback, printers, displays and audio.',
  learn: [
    { t: 'Plug and Play and drivers', q: 'What does a driver actually do?',
      p: ['**Plug and Play** detects a new device and installs a matching **driver** automatically, from the PC\'s **driver store** or Windows Update.',
        'A driver translates between Windows and the hardware. Drivers should be **digitally signed**; 64-bit Windows refuses unsigned kernel-mode drivers. Drivers come as INF packages (.inf, .sys, .cat).',
        '**Hardware IDs** (in Device Manager > Properties > Details) like `PCI\\VEN_8086&DEV_15F3` identify vendor and device, so you can find the right driver.'],
      key: ['PnP auto-detects and installs drivers', 'Drivers must be signed on 64-bit Windows', 'Hardware ID = VEN (vendor) + DEV (device)'] },
    { t: 'Device Manager', q: 'What does a yellow triangle in Device Manager mean?',
      p: ['Open with `devmgmt.msc` or Windows key+X. Status symbols: **yellow triangle/exclamation** = problem (driver missing or error code), **down arrow** = device disabled, **Unknown device** = no driver.',
        'Properties > General shows the **error code** (Code 10 = can\'t start, Code 28 = drivers not installed, Code 43 = device reported a problem, Code 22 = disabled). View > **Show hidden devices** reveals disconnected (ghost) devices.',
        'Advanced tabs let you change power management (allow this device to wake the PC) and resources.'],
      key: ['Yellow ! = problem; down arrow = disabled', 'Code 10 can\'t start, 28 no driver, 43 reported problem', 'Show hidden devices for ghosts'] },
    { t: 'Bluetooth and USB', p: ['Pair Bluetooth devices in **Settings > Bluetooth & devices > Add device**. **Swift Pair** pops up a prompt for nearby devices in pairing mode.',
        'USB devices are hot-pluggable; use **Safely remove** for drives with write caching enabled. USB power management (**selective suspend**) can cause devices to disconnect.'],
      key: ['Add device in Bluetooth & devices', 'Swift Pair = quick pop-up pairing', 'USB selective suspend can drop devices'] },
    { t: 'Updating and rolling back drivers', q: 'A driver update just broke the display. What\'s fastest?',
      p: ['Windows Update installs many drivers automatically (optional driver updates appear under Advanced options > **Optional updates**). Device-specific drivers also come from the manufacturer\'s site or utilities.',
        'In Device Manager: **Update driver** (search automatically or browse to a folder), **Roll Back Driver** (returns to the previous version if one is saved), **Disable**, and **Uninstall device** (check "attempt to remove the driver" to delete it from the driver store).',
        '`pnputil /enum-drivers` lists third-party drivers in the store.'],
      key: ['Optional driver updates in Windows Update', 'Roll Back Driver undoes a bad update', 'Uninstall + remove driver deletes it from the store', 'pnputil manages the driver store'] },
    { t: 'Printers', p: ['Add printers in Settings > Bluetooth & devices > **Printers & scanners**. Many use **Mopria / IPP** class drivers with no download. The **print spooler** service queues jobs; a stuck queue is fixed by stopping the Print Spooler, clearing `C:\\Windows\\System32\\spool\\PRINTERS`, and restarting it.',
        'Set a default printer, or let Windows manage the default (uses the last one you printed to).'],
      key: ['Printers & scanners in Bluetooth & devices', 'Stuck queue: stop Spooler, clear spool\\PRINTERS, restart', 'Let Windows manage default = last used'] },
    { t: 'Displays and audio', p: ['**System > Display** sets resolution (use the **recommended/native** one), refresh rate, orientation, HDR and **scale** for high-DPI screens. **Windows key+P** switches projection modes: PC screen only, **Duplicate**, **Extend**, Second screen only. Drag monitor boxes to match physical layout; Identify shows the numbers.',
        '**Night light** reduces blue light on a schedule. **System > Sound** picks default output/input devices, and the volume mixer sets per-app volume.'],
      key: ['Use native resolution', 'Win+P: duplicate / extend', 'Scale for high-DPI', 'Night light = less blue light'] },
    { t: "Class notes: drivers and printers",
      p: ["- **Device drivers** are control programs that handle communication between a device and the OS. **General class drivers** (audio, network, webcams, display, printers, monitors, keyboards, scanners, mice, phones, removable storage) already ship with Windows", "- **Third-party drivers** not signed by Microsoft need admin credentials; **Windows Update** offers newer drivers and installs some with cumulative updates; many devices include installers", "- **Printers**: use plug-and-play printers when possible; otherwise **Settings > Bluetooth & devices > Printers & scanners > Add device/printer**. Manage drivers in Device Manager > Printers; manage printers and queues in **Print Management**", "- A **USB printer** with factory drivers is easiest; a **network printer by IP address** is painless if the IP is static (otherwise use its domain name)"],
      key: ["General class drivers ship with Windows", "Unsigned third-party drivers need admin rights", "Network printers: use a static IP"] }
  ],
  cards: [
    ['Device Manager command', 'devmgmt.msc'], ['Yellow exclamation in Device Manager', 'Device has a problem: driver missing or error'], ['Down arrow on a device', 'Device is disabled'],
    ['Code 43', 'Windows stopped the device because it reported problems'], ['Code 28', 'Drivers for the device are not installed'], ['Code 10', 'Device cannot start'],
    ['VEN and DEV in a hardware ID', 'Vendor ID and device ID'], ['Undo a bad driver update', 'Device Manager > Properties > Driver > Roll Back Driver'], ['Windows key+P', 'Project: PC only / Duplicate / Extend / Second only'],
    ['Fix a stuck print queue', 'Stop Print Spooler, clear spool\\PRINTERS, start Spooler'], ['Where are optional driver updates?', 'Windows Update > Advanced options > Optional updates'], ['Command to list third-party drivers', 'pnputil /enum-drivers']
  ],
  run: [
    ['Open Device Manager.', 'devmgmt.msc', 'Device + manager, as a snap-in.', 'Seven letters before the snap-in extension: three for the first word, four consonants for the second.'],
    ['List the third-party drivers in the driver store.', 'pnputil /enum-drivers|pnputil -enum-drivers', 'The Plug and Play utility can enumerate drivers.', 'The switch is a short verb meaning "list one by one", a dash, and the plural of what you want.'],
    ['Stop the print spooler service from the command line.', 'net stop spooler|net stop "print spooler"|stop-service spooler', 'The net command can stop services by name.', 'net stop + service name'],
    ['Open Print Management.', 'printmanagement.msc', 'The snap-in name is the full words.', 'The two words of the console name written in full, joined, plus the snap-in extension.']
  ],
  quiz: [
    ['After a graphics driver update, the screen flickers. Fastest fix?', ['Roll Back Driver in Device Manager', 'Reset this PC', 'Reinstall Windows', 'Disable the monitor'], 0, 'Undo the change that caused it.', 3, ['', 'Much too drastic.', 'Much too drastic.', 'You\'d lose the display.'], 1],
    ['A device shows Code 28. What does it need?', ['A driver installed', 'A BIOS update', 'More power', 'To be enabled'], 0, 'That code is about installation.', 1, ['', 'Not this code\'s meaning.', 'Not this code\'s meaning.', 'Disabled is a different code.'], 1],
    ['Print jobs are stuck and won\'t delete. Correct sequence?', ['Restart the printer only', 'Stop Print Spooler, clear the spool folder, start Print Spooler', 'Reinstall Windows', 'Update the BIOS'], 1, 'Jobs sit in a folder controlled by a service.', 4, ['Jobs remain queued on the PC.', '', 'Overkill.', 'Unrelated.'], 1],
    ['A presenter wants the same image on the laptop and projector. Which Windows key+P mode?', ['Extend', 'Duplicate', 'Second screen only', 'PC screen only'], 1, 'Same picture, two places.', 5, ['Gives two different desktops.', '', 'Laptop screen goes dark.', 'Projector goes dark.'], 1],
    ['A device appears as "Unknown device." How do you find the right driver?', ['Check its Hardware IDs (VEN/DEV)', 'Disable it', 'Change its drive letter', 'Run chkdsk'], 0, 'It has an ID card.', 0, ['', 'Doesn\'t identify it.', 'Unrelated.', 'Unrelated.'], 1],
    ['A USB mouse keeps disconnecting on a laptop. A power setting to check?', ['USB selective suspend', 'Night light', 'Hibernate', 'Fast Startup'], 0, 'Windows saves power by suspending ports.', 2, ['', 'Display color.', 'Unrelated to an active session.', 'Affects boot, not runtime.'], 1]
  ]
});

W.chapter({
  id: 'c14', num: '14', part: 2, title: 'Performance and power management',
  short: 'Performance & power', icon: 'gauge',
  blurb: 'What slows a PC down, System Information tools, Task Manager\'s Performance tab, Resource Monitor, services, battery and power plans.',
  learn: [
    { t: 'What causes slowdowns', q: 'Name three causes before you read.',
      p: ['Common causes: not enough RAM (heavy **paging** to disk), a slow hard disk instead of an SSD, too many startup apps, malware, outdated or buggy drivers, overheating (thermal throttling), a full disk, and runaway background processes or indexing.',
        'Measure before you change anything: find the resource that is maxed out (CPU, memory, disk or network).'],
      key: ['Find the bottleneck first: CPU, memory, disk or network', 'Low RAM causes paging; HDDs are slow'] },
    { t: 'System details', p: ['- **Settings > System > About**: CPU, RAM, edition, version, device name',
        '- **System Information** (`msinfo32`): full hardware/software inventory, BIOS mode (UEFI/Legacy), Secure Boot state, drivers',
        '- **systeminfo**: command-line summary including install date, last boot time and hotfixes',
        '- **WMI** tools: `wmic` (deprecated) or PowerShell `Get-CimInstance Win32_BIOS` for serial numbers and more'],
      key: ['msinfo32 = full inventory, BIOS mode, Secure Boot', 'systeminfo = CLI summary with boot time and hotfixes', 'Get-CimInstance queries WMI'] },
    { t: 'Task Manager Performance tab', p: ['Graphs for **CPU** (utilization, speed, cores, logical processors, uptime), **Memory** (in use, committed, cached, slots used, speed), **Disk** (active time %, read/write speed, type SSD/HDD), **Network** (throughput) and **GPU**.',
        'Disk **active time** near 100% means the disk is the bottleneck. **Committed** memory near its limit means the paging file is under pressure. Sort the Processes tab by a column to find the culprit.'],
      key: ['Disk active time ~100% = disk bottleneck', 'Memory: in use, committed, slots used', 'Sort Processes by the maxed resource'] },
    { t: 'Resource Monitor', p: ['**Resource Monitor** (`resmon`) drills deeper: per-process disk files being read/written, network connections and listening ports, memory **hard faults/sec**, and **Associated Handles** search to find which process has a file locked.'],
      key: ['resmon shows per-process files, ports, hard faults', 'Associated Handles finds who has a file locked'] },
    { t: 'Managing services', q: 'What startup type would you use for a service that\'s needed but not right away?',
      p: ['Services run in the background without a user. Manage them in **Services** (`services.msc`), Task Manager\'s Services tab, `sc` or PowerShell (`Get-Service`, `Start-Service`, `Stop-Service`).',
        'Startup types: **Automatic**, **Automatic (Delayed Start)**, **Manual** (starts when needed/triggered) and **Disabled**. The **Recovery** tab sets what happens on failure (restart service, run a program, restart computer). Many services share **svchost.exe** host processes.',
        'Don\'t disable services you don\'t understand; dependencies can break other features.'],
      key: ['services.msc; Get-Service / Start-Service', 'Automatic / Delayed / Manual / Disabled', 'Recovery tab = action on failure', 'svchost.exe hosts many services'] },
    { t: 'Battery and power', p: ['**Settings > System > Power & battery** sets the power mode (Best power efficiency, Balanced, Best performance), screen/sleep timeouts and **Battery saver** (turns on automatically at a chosen percentage, e.g. 20%).',
        '`powercfg /batteryreport` creates an HTML report comparing **design capacity** to **full charge capacity** (wear). `powercfg /energy` diagnoses power problems, `powercfg /list` shows plans, `powercfg /a` shows available sleep states.',
        '**Sleep** keeps RAM powered; **hibernate** writes RAM to hiberfil.sys and powers off. **Fast Startup** is a hybrid shutdown that hibernates the kernel; disabling it is a classic fix for driver/boot oddities.'],
      key: ['Battery saver kicks in at a set %', 'powercfg /batteryreport compares design vs. full charge capacity', 'Sleep = RAM powered; hibernate = RAM to disk', 'Fast Startup = partial hibernation at shutdown'] },
    { t: "Class notes: Resource Monitor, Services and power",
      p: ["- **Resource Monitor**: search for it or use the … link on Task Manager’s Performance page. More specific real-time monitoring with checkboxes you can save; shows exactly which process or file is the culprit", "- **Services** are background programs with **no GUI**. Open from Task Manager > Services > **Open Services**, or search **services**; **Extended** view adds descriptions", "- **Power management** can be set for the device and the battery: **Settings > System > Power & battery**"],
      key: ["Resource Monitor pinpoints the culprit", "Services run in the background with no GUI"] }
  ],
  cards: [
    ['System Information command', 'msinfo32'], ['Resource Monitor command', 'resmon'], ['Services console', 'services.msc'],
    ['Battery wear report', 'powercfg /batteryreport'], ['Sleep vs. hibernate', 'Sleep keeps RAM powered; hibernate saves RAM to disk and powers off.'], ['What is Fast Startup?', 'Shutdown that hibernates the kernel session for quicker boot.'],
    ['Disk active time at 100%', 'The disk is the bottleneck.'], ['Service startup types', 'Automatic, Automatic (Delayed Start), Manual, Disabled'], ['What does svchost.exe do?', 'Hosts many Windows services in shared processes.'],
    ['Find which process has a file locked', 'Resource Monitor > CPU > Associated Handles search'], ['CLI system summary with last boot time', 'systeminfo'], ['powercfg /energy', 'Diagnoses power efficiency problems']
  ],
  run: [
    ['Open System Information.', 'msinfo32|msinfo32.exe', 'Microsoft info, 32-bit legacy name.', 'Six letters ending in "info", followed by a number from the 32-bit era.'],
    ['Open Resource Monitor.', 'resmon|resmon.exe', 'Resource + monitor, shortened.', 'Six letters: the first three of each word.'],
    ['Open the Services console.', 'services.msc', 'The plain word + snap-in extension.', 'The plural of "service", with the snap-in extension.'],
    ['Generate a battery health report.', 'powercfg /batteryreport|powercfg -batteryreport', 'The power configuration tool has a report switch.', 'The switch is two words joined: the part being tested and the kind of document you get.'],
    ['Show a system summary including boot time and hotfixes.', 'systeminfo|systeminfo.exe', 'Two words joined.', 'The first word in full, the second cut to four letters, no space.'],
    ['List services with PowerShell.', 'get-service', 'PowerShell verb-noun: get the noun.', 'Verb-Noun: the most common verb in PowerShell, then the singular of what you want.']
  ],
  quiz: [
    ['A laptop is slow; Task Manager shows Disk at 100% active time while CPU is at 15%. Likely bottleneck?', ['CPU', 'The disk', 'Network', 'GPU'], 1, 'Which graph is maxed?', 2, ['CPU has plenty of headroom.', '', 'No evidence of network load.', 'No evidence of GPU load.'], 1],
    ['A user\'s 3-year-old laptop battery lasts half as long as it used to. How do you measure wear?', ['powercfg /batteryreport', 'chkdsk /r', 'msconfig', 'sfc /scannow'], 0, 'Compare design capacity to full charge capacity.', 5, ['', 'Disk tool.', 'Boot settings.', 'System files.'], 1],
    ['A file can\'t be deleted because "it\'s open in another program." How do you find which one?', ['Resource Monitor Associated Handles search', 'Device Manager', 'Event Viewer', 'Disk Cleanup'], 0, 'Search handles.', 3, ['', 'Hardware only.', 'Logs, not live handles.', 'Removes temp files.'], 1],
    ['A service should start automatically but not slow down boot. Which startup type?', ['Manual', 'Automatic (Delayed Start)', 'Disabled', 'Automatic'], 1, 'Automatic, but a bit later.', 4, ['Wouldn\'t start on its own reliably.', '', 'Never starts.', 'Starts during boot.']],
    ['Which tool shows whether the PC boots in UEFI or Legacy mode?', ['msinfo32', 'resmon', 'taskmgr', 'cleanmgr'], 0, 'The full system inventory.', 1, ['', 'Live resource use.', 'Processes and performance.', 'Disk cleanup.']],
    ['Odd hardware issues disappear after Restart but return after Shut down. A setting to try?', ['Disable Fast Startup', 'Enable Battery saver', 'Change power mode', 'Turn on hibernate'], 0, 'Shut down and restart aren\'t the same anymore.', 5, ['', 'Unrelated.', 'Unrelated.', 'Doesn\'t address the shutdown difference.'], 1]
  ]
});

W.chapter({
  id: 'c15', num: '15', part: 2, title: 'Troubleshooting, backup, and recovery',
  short: 'Troubleshoot & recover', icon: 'wrench',
  blurb: 'Troubleshooters, error reporting, Reliability Monitor, Event Viewer, Stop errors, Safe Mode, disk checks, Quick Assist, recovery drives, File History, Reset and System Restore.',
  learn: [
    { t: 'The troubleshooting toolkit', q: 'Which tool would you open first to see what changed before a problem began?',
      p: ['- **Troubleshooters** (Settings > System > Troubleshoot > Other troubleshooters) automate fixes for audio, network, printers, Windows Update',
        '- **Windows Error Reporting** collects crash data and sends it to Microsoft',
        '- **Reliability Monitor** (`perfmon /rel`) shows a day-by-day **stability index (1-10)** with app crashes, failed updates and installs: perfect for "it started last week"',
        '- **Feedback Hub** submits problems to Microsoft'],
      key: ['Reliability Monitor = timeline + stability index', 'perfmon /rel opens it', 'Troubleshooters automate common fixes'] },
    { t: 'Event Viewer', p: ['**Event Viewer** (`eventvwr.msc`) records events in logs: **Windows Logs** (**Application**, **Security**, **Setup**, **System**, Forwarded Events) and **Applications and Services Logs**.',
        'Levels: **Critical**, **Error**, **Warning**, **Information**, and in the Security log **Audit Success/Failure**. Each event has a **source** and **Event ID** you can search.',
        'Use **Filter Current Log** (by level, ID, time) and **Custom Views** to cut noise. Not every error matters; look for patterns that match the time of the problem.'],
      key: ['eventvwr.msc', 'Logs: Application, Security, Setup, System', 'Levels: Critical, Error, Warning, Information', 'Filter by Event ID and time'] },
    { t: 'Stop errors (blue screens)', q: 'What should you write down from a blue screen?',
      p: ['A **Stop error** halts Windows to prevent damage. Note the **stop code** (e.g. `IRQL_NOT_LESS_OR_EQUAL`, `CRITICAL_PROCESS_DIED`, `PAGE_FAULT_IN_NONPAGED_AREA`) and any driver file named (.sys).',
        'Startup and Recovery settings (`SystemPropertiesAdvanced` > Startup and Recovery) control automatic restart and the **memory dump** type (Automatic, Small/minidump in C:\\Windows\\Minidump, Kernel, Complete).',
        'Isolate the cause: what changed recently (driver, update, hardware), check Reliability Monitor, test RAM with **Windows Memory Diagnostic** (`mdsched`), update or roll back the named driver.'],
      key: ['Record the stop code and named driver', 'Minidumps in C:\\Windows\\Minidump', 'mdsched tests RAM', 'Ask: what changed?'] },
    { t: 'Safe Mode and disk checks', p: ['**Safe Mode** starts with minimal drivers and services, so if a problem disappears there, a driver or startup program is to blame. Reach it from **Settings > Recovery > Advanced startup > Restart now** (or Shift+Restart) > Troubleshoot > Advanced options > Startup Settings, then press 4 (Safe Mode), 5 (with Networking) or 6 (with Command Prompt). `msconfig` > Boot > Safe boot also works.',
        '**Check Disk** scans for file system errors: drive Properties > Tools > Check, or `chkdsk C: /f` (fix errors) and `/r` (find bad sectors, implies /f). On the system drive it schedules for the next restart.'],
      key: ['Safe Mode: minimal drivers', 'Shift+Restart > Troubleshoot > Startup Settings', '4 Safe, 5 Networking, 6 Command Prompt', 'chkdsk /f fixes; /r finds bad sectors'] },
    { t: 'Quick Assist', p: ['**Quick Assist** (Windows key+Ctrl+Q, or `quickassist`) lets a helper view or control another PC over the internet. The helper signs in with a Microsoft account and gives the user a **security code**; the user enters it and grants **full control** or **view only**.',
        'Scammers abuse it, so only accept help from someone you contacted.'],
      key: ['Helper signs in and shares a code', 'Full control or view only', 'Never use it with an unsolicited "tech support" caller'] },
    { t: 'Backup and recovery options', q: 'Which tool protects files vs. which protects system settings?',
      p: ['- **Recovery drive** (`recoverydrive`): bootable USB to reach recovery tools, optionally with system files to reinstall',
        '- **File History**: backs up versions of files in your user folders to another drive on a schedule (hourly by default); restore older versions',
        '- **Reset this PC**: reinstalls Windows, **Keep my files** or **Remove everything**, using **Cloud download** or **Local reinstall**',
        '- **Backup and Restore (Windows 7)** (`sdclt`): still creates **system images**',
        '- **System Restore**: **restore points** snapshot system files, drivers, registry and installed programs, **not your personal files**. Created before updates and driver installs; roll back via `rstrui`',
        'The **Windows Recovery Environment (WinRE)** hosts Startup Repair, System Restore, Uninstall Updates, Command Prompt and UEFI firmware settings.'],
      key: ['File History = file versions', 'System Restore = system state, not personal files', 'Reset: keep files or remove everything; cloud or local', 'sdclt for system images', 'WinRE hosts Startup Repair and more'],
      trap: 'Telling a user System Restore will bring back a deleted document. It won\'t.' }
  ],
  cards: [
    ['Reliability Monitor command', 'perfmon /rel'], ['Event Viewer command', 'eventvwr.msc'], ['Four main Windows Logs', 'Application, Security, Setup, System'],
    ['Event levels', 'Critical, Error, Warning, Information (plus Audit Success/Failure)'], ['Where do minidumps go?', 'C:\\Windows\\Minidump'], ['Test RAM', 'Windows Memory Diagnostic (mdsched)'],
    ['Startup Settings key for Safe Mode with Networking', '5'], ['chkdsk /f vs. /r', '/f fixes file system errors; /r also locates bad sectors'], ['Does System Restore recover personal files?', 'No, only system files, drivers, registry and programs.'],
    ['File History protects...', 'Versions of files in your user folders'], ['Reset this PC options', 'Keep my files or Remove everything; Cloud download or Local reinstall'], ['Open System Restore wizard', 'rstrui'],
    ['Quick Assist shortcut', 'Windows key+Ctrl+Q'], ['Tool still used for system images', 'Backup and Restore (Windows 7), sdclt']
  ],
  run: [
    ['Open Reliability Monitor.', 'perfmon /rel|perfmon.exe /rel', 'It\'s part of Performance Monitor, with a switch.', 'The Performance Monitor program, then a slash and the first three letters of "reliability".'],
    ['Open Event Viewer.', 'eventvwr.msc|eventvwr', 'Event + viewer, vowels dropped.', 'Eight letters: "event" plus "viewer" with its vowels removed.'],
    ['Check C: for file system errors and fix them.', 'chkdsk c: /f|chkdsk /f c:|chkdsk c: /f /r|chkdsk c: /r', 'Check disk, with the fix switch.', 'chkdsk + drive + /f'],
    ['Open the System Restore wizard.', 'rstrui|rstrui.exe', 'Restore + UI, shortened oddly.', 'Six letters: an r, a short form of "restore", then the two letters for a user interface.'],
    ['Schedule a memory test.', 'mdsched|mdsched.exe', 'Memory diagnostic scheduler.', 'Seven letters: the initials of "memory diagnostic" plus a short form of "schedule".'],
    ['Open Quick Assist from Run.', 'quickassist|quickassist.exe', 'The app\'s name, no space.', 'The two words of the app name joined together.']
  ],
  quiz: [
    ['A user says their PC "started acting up sometime last week." Best first tool?', ['Reliability Monitor', 'Disk Cleanup', 'Device Manager', 'Task Scheduler'], 0, 'You want a timeline.', 0, ['', 'Doesn\'t show history.', 'Shows hardware now, not history.', 'Runs tasks.'], 1],
    ['A user deleted a report yesterday and asks you to run System Restore. What\'s correct?', ['System Restore will bring it back', 'System Restore won\'t restore personal files; check File History, OneDrive or the Recycle Bin', 'Reset this PC instead', 'Run chkdsk /r'], 1, 'What do restore points include?', 5, ['Restore points don\'t include documents.', '', 'That could remove more.', 'Disk repair, not file recovery.'], 1],
    ['A PC blue-screens after a new network driver. It won\'t stay up long enough to fix it. What do you do?', ['Boot into Safe Mode and roll back the driver', 'Run Disk Cleanup', 'Replace the RAM', 'Reinstall Office'], 0, 'Minimal drivers load in one mode.', 3, ['', 'Unrelated.', 'No sign RAM is at fault.', 'Unrelated.'], 1],
    ['Which Startup Settings number gives Safe Mode with Networking?', ['4', '5', '6', '7'], 1, 'Plain, then networking, then command prompt.', 3, ['Plain Safe Mode.', '', 'Safe Mode with Command Prompt.', 'Disables driver signature enforcement.']],
    ['Someone calls claiming to be Microsoft and asks the user to open Quick Assist. Advice?', ['Follow their steps', 'Hang up; only use Quick Assist with someone you contacted', 'Give view-only access', 'Share the code by email'], 1, 'Microsoft doesn\'t cold-call.', 4, ['That\'s a scam pattern.', '', 'Still risky.', 'Still risky.'], 1],
    ['A PC is badly broken and the user wants Windows reinstalled but documents kept. Option?', ['Reset this PC > Keep my files', 'Reset this PC > Remove everything', 'System image restore from 2 years ago', 'Format C:'], 0, 'Reset has two modes.', 5, ['', 'Deletes the documents.', 'Loses two years of changes.', 'Destroys everything.'], 1],
    ['Which Event Viewer log shows driver and service failures?', ['Application', 'System', 'Security', 'Setup'], 1, 'Windows components log here.', 1, ['App errors.', '', 'Sign-ins and audits.', 'Installation events.']]
  ]
});
