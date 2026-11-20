"""Browser test for Tier One: walks every view in headless Chromium, checks the no-answer-giveaway rules,
and (with --shots) saves the README screenshots to docs/.
Run: python3 tests/test_ui.py [--shots]"""
import os, sys, threading, functools, http.server, re
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8799
SHOTS = '--shots' in sys.argv


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), handler).serve_forever()


threading.Thread(target=serve, daemon=True).start()
URL = f'http://127.0.0.1:{PORT}/'
errors, fails = [], []


def check(ok, msg):
    print(('ok   ' if ok else 'FAIL ') + msg)
    if not ok:
        fails.append(msg)


def shot(page, name):
    if SHOTS:
        page.screenshot(path=os.path.join(ROOT, 'docs', name))


def launch(p):
    exe = None
    for base in ('/opt/pw-browsers',):
        if os.path.isdir(base):
            for d in sorted(os.listdir(base)):
                cand = os.path.join(base, d, 'chrome-linux', 'chrome')
                if d.startswith('chromium') and os.path.exists(cand):
                    exe = cand
    return p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()


with sync_playwright() as p:
    browser = launch(p)
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900}, color_scheme='light')
    page = ctx.new_page()
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.on('pageerror', lambda e: errors.append(str(e)))

    # Home
    page.goto(URL)
    page.wait_for_selector('.tile')
    check(page.locator('.tile').count() == 23, 'home shows 23 chapter tiles')
    check('Trainee' in page.inner_text('.tray'), 'tray shows starting rank (Trainee)')
    shot(page, 'desktop.png')

    # Start menu search
    page.keyboard.press('Control+k')
    page.wait_for_selector('#stq')
    check(page.locator('.st-app').count() == 23, 'Start menu lists all chapters')
    page.fill('#stq', 'bitlocker')
    page.wait_for_selector('.st-res a')
    check(page.locator('.st-res a').count() >= 1, 'Start search finds BitLocker')
    shot(page, 'start.png')
    page.keyboard.press('Escape')
    check(page.locator('#start').is_hidden(), 'Esc closes Start')

    # Learn
    page.goto(URL + '#/c/c11/learn')
    page.wait_for_selector('.sec')
    xp0 = page.evaluate("JSON.parse(localStorage.getItem('tierone.v1') || '{\"xp\":0}').xp || 0")
    page.click('[data-act="learned"][data-i="0"]')
    xp1 = page.evaluate("JSON.parse(localStorage.getItem('tierone.v1')).xp")
    check(xp1 == xp0 + 5, 'marking a section learned gives 5 XP')
    check(page.locator('.secs a.done').count() == 1, 'section gets a check mark in the nav')
    page.check('#recall', force=True)
    check(page.locator('.lockline.covered').count() > 3, 'Recall mode covers lock-it-in lines')
    page.locator('.lockline.covered').first.click()
    check(page.locator('.lockline.covered').count() >= 3, 'tapping reveals a single line')
    page.goto(URL + '#/c/c11/learn/1')
    page.wait_for_timeout(400)
    shot(page, 'lesson.png')

    # Flashcards
    page.goto(URL + '#/c/c12/cards')
    page.wait_for_selector('#flash')
    check(page.locator('.face.back').is_hidden(), 'card back hidden before flipping')
    page.keyboard.press('Space')
    check(page.locator('.face.back').is_visible(), 'Space flips the card')
    shot(page, 'flashcard.png')
    page.keyboard.press('3')
    st = page.evaluate("JSON.parse(localStorage.getItem('tierone.v1')).cards")
    check(len(st) == 1 and list(st.values())[0]['box'] == 1, '"Knew it" moves the card to box 1')

    # Run drills: wrong, hints, then right
    page.goto(URL + '#/c/c11/run')
    page.wait_for_selector('#runin')
    task = page.inner_text('.run-top p')
    answers = page.evaluate("""t => { const c = W.byId('c11'); const r = c.run.find(r => t.includes(r[0].slice(0, 20))); return Array.isArray(r[1]) ? r[1] : r[1].split('|'); }""", task)
    page.fill('#runin', 'notacommand')
    page.keyboard.press('Enter')
    check("can't find" in page.inner_text('#runfb'), 'wrong command gets "can\'t find" feedback')
    page.click('[data-act="hint"]'); page.click('[data-act="hint"]')
    fb = page.inner_text('#runfb').lower()
    check(page.locator('[data-act="hint"]').is_disabled(), 'hint button stops after two hints')
    check(not any(a.lower().replace(' ', '') in fb.replace(' ', '') for a in answers if len(a) > 3), 'hints never show the command')
    shot(page, 'run.png')
    page.fill('#runin', answers[0].upper())
    page.keyboard.press('Enter')
    check('That opens it' in page.inner_text('#runfb'), 'correct command (any case) is accepted')

    # Practice: wrong option never reveals the right one
    page.goto(URL + '#/c/c12/practice')
    page.wait_for_selector('.opt')
    q = page.inner_text('.tk-q')
    right = page.evaluate("""t => { const c = W.byId('c12'); const q = c.quiz.find(q => t.startsWith(q[0].slice(0, 30).replace(/\\*\\*/g, ''))); return q ? q[2] : -1; }""", q)
    opts = page.locator('.opt')
    wrong_btn = None
    for i in range(opts.count()):
        if int(opts.nth(i).get_attribute('data-o')) != right:
            wrong_btn = opts.nth(i); break
    wrong_btn.click()
    check(page.locator('.opt.wrong').count() == 1, 'wrong pick is marked wrong')
    check(page.locator('.opt.right').count() == 0, 'wrong pick does not reveal the right option')
    check('Reread' in page.inner_text('#tkfb'), 'wrong pick links back to the lesson')
    page.click('[data-act="thint"]')
    shot(page, 'ticket.png')
    page.locator(f'.opt[data-o="{right}"]').click()
    check(page.locator('.opt.right').count() == 1, 'finding the right option marks it solved')

    # Certification exam: answer everything correctly
    page.goto(URL + '#/c/c1/exam')
    page.click('#beltgo')
    for _ in range(40):
        if page.locator('.result').count():
            break
        if page.locator('.opt').count():
            qt = page.inner_text('.tk-q')
            r = page.evaluate("""t => { const c = W.byId('c1'); const q = c.quiz.find(q => t.startsWith(q[0].slice(0, 25))); return q[2]; }""", qt)
            page.locator(f'.opt[data-o="{r}"]').click()
        else:
            tt = page.inner_text('.run-top p')
            a = page.evaluate("""t => { const c = W.byId('c1'); const r = c.run.find(r => t.includes(r[0].slice(0, 20))); return (Array.isArray(r[1]) ? r[1] : r[1].split('|'))[0]; }""", tt)
            page.fill('#runin', a); page.keyboard.press('Enter')
        page.wait_for_timeout(50)
    check('100%' in page.inner_text('.result') and 'certified' in page.inner_text('.result'), 'perfect exam scores 100% and certifies')
    check(page.evaluate("JSON.parse(localStorage.getItem('tierone.v1')).belts.c1") == 100, 'exam score saved')
    page.wait_for_timeout(700)
    shot(page, 'exam.png')

    # Exam fail: missed list shows hints, not answers
    page.goto(URL + '#/c/c2/exam')
    page.click('#beltgo')
    for _ in range(40):
        if page.locator('.result').count():
            break
        if page.locator('.opt').count():
            qt = page.inner_text('.tk-q')
            r = page.evaluate("""t => { const c = W.byId('c2'); const q = c.quiz.find(q => t.startsWith(q[0].slice(0, 25))); return q[2]; }""", qt)
            page.locator(f'.opt:not([data-o="{r}"])').first.click()
        else:
            page.fill('#runin', 'nope'); page.keyboard.press('Enter')
        page.wait_for_timeout(30)
    txt = page.inner_text('.missed')
    rights = page.evaluate("W.byId('c2').quiz.map(q => q[1][q[2]])")
    check('Not yet' in page.inner_text('.result'), 'failing score says "Not yet"')
    check(not any(r in txt for r in rights if len(r) > 12), 'missed list never shows the right options')

    # Review, Rush, Progress
    page.goto(URL + '#/review/reopened')
    page.wait_for_selector('.opt')
    check(page.locator('.chip').count() >= 1, 'Reopened tickets show missed questions with chapter chips')
    page.goto(URL + '#/review/cards')
    page.wait_for_selector('#flash')
    check(True, 'Review cards render')
    page.goto(URL + '#/rush')
    page.click('#rushgo')
    page.wait_for_selector('#runin')
    check(page.inner_text('#timer') in ('60', '59'), 'Run Rush timer starts at 60')
    shot(page, 'rush.png')
    page.goto(URL + '#/progress')
    page.wait_for_selector('.prog')
    check(page.locator('.prog tbody tr').count() == 23, 'progress table lists 23 chapters')
    shot(page, 'progress.png')
    page.goto(URL)
    page.wait_for_selector('.tile')
    check(page.locator('.stamp').count() == 1, 'home tile shows the certified stamp')
    check(page.locator('.rankcard .idbadge').count() == 1 and 'Trainee' in page.inner_text('.rankcard'), 'home shows the technician ID badge')
    check('belt' not in page.inner_text('body').lower(), 'no leftover belt wording on the home page')

    # NST 115 exam prep tab: chapters only; Linux is its own tab
    page.goto(URL + '#/course')
    page.wait_for_selector('.chtiles .tile')
    check(page.locator('.chtiles .tile').count() == 14, 'exam prep lists chapters 1-14 only')
    check('Linux Day' not in page.inner_text('#app'), 'no Linux decks mixed into the chapter list')
    shot(page, 'course.png')
    page.goto(URL + '#/course/ch8/sheet')
    page.wait_for_selector('.item')
    n_items = page.evaluate("COURSE.decks.find(d => d.id === 'ch8').terms.length")
    check(page.locator('.item').count() == n_items, 'Chapter 8 lists every quiz and unit exam item')
    check(page.locator('.item .onchip.unit').count() >= 1 and page.locator('.item .onchip:not(.unit)').count() >= 1, 'items show Quiz and Unit Exam badges')
    check(page.locator('.item .ans').first.is_visible(), 'answers visible by default')
    page.check('#recall', force=True)
    check(not page.locator('.item .ans').first.is_visible(), 'Recall mode hides answers')
    page.locator('.item .reveal').first.click()
    check(page.locator('.item .ans').first.is_visible(), 'Show answer reveals one item')
    page.locator('.item [data-v="2"]').first.click()
    check(page.locator('.item .on-good').count() == 1, 'Got it marks the item')
    shot(page, 'course-sheet.png')
    page.goto(URL + '#/course/ch11/exam')
    page.click('#cgo')
    page.wait_for_selector('.opt')
    qid = page.evaluate("""() => { const q = document.querySelector('.tk-q').textContent; const t = Object.values(COURSE.terms).find(t => t.t === q || t.d === q); return t.id; }""")
    wrong = page.locator(f'.opt:not([data-o="{qid}"])').first
    wrong.click()
    check(page.locator('.opt.right').count() == 0, 'practice exam wrong pick does not reveal the answer')
    check('Not this one' in page.inner_text('#tkfb'), 'practice exam explains the wrong pick')
    shot(page, 'course-exam.png')
    page.locator(f'.opt[data-o="{qid}"]').click()
    check(page.locator('.opt.right').count() == 1, 'right pick accepted')
    page.goto(URL + '#/linux')
    page.wait_for_selector('.tile.deck')
    check(page.locator('.tile.deck').count() == 6 and 'Chapter' not in page.inner_text('#app'), 'Linux tab has its own 4 lessons and 2 drills')
    check(page.locator('[data-nav="linux"].on').count() == 1, 'Linux taskbar button is active')
    shot(page, 'linux.png')
    page.goto(URL + '#/linux/terminal')
    page.wait_for_selector('#tin')
    task = page.inner_text('.term-task')
    ans = page.evaluate("t => COURSE.terminal.find(r => r[0] === t)[1][0]", task)
    page.fill('#tin', ans.upper() if ans.upper() != ans else ans + 'x')
    page.keyboard.press('Enter')
    check(page.inner_text('#tout') != '' and 'Correct' not in page.inner_text('#tout'), 'terminal rejects wrong capitals/typos')
    page.fill('#tin', ans); page.keyboard.press('Enter')
    check('Correct' in page.inner_text('#tout'), 'terminal accepts the exact command')
    shot(page, 'terminal.png')
    page.goto(URL + '#/linux/perms')
    page.wait_for_selector('#pin')
    check(page.locator('.term-task code').count() >= 1, 'permissions trainer shows a question')

    # Dark mode
    page.click('#themebtn')
    check(page.evaluate("document.documentElement.dataset.theme") == 'dark', 'theme button switches to dark')
    page.goto(URL + '#/c/c16/learn')
    page.wait_for_selector('.sec')
    shot(page, 'dark.png')

    # Phone
    phone = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    pp = phone.new_page()
    pp.on('pageerror', lambda e: errors.append(str(e)))
    pp.goto(URL)
    pp.wait_for_selector('.tile')
    sw = pp.evaluate('document.documentElement.scrollWidth')
    check(sw <= 390, f'no horizontal overflow on a phone (scrollWidth {sw})')
    shot(pp, 'phone-home.png')
    pp.goto(URL + '#/c/c9/practice')
    pp.wait_for_selector('.opt')
    sw = pp.evaluate('document.documentElement.scrollWidth')
    check(sw <= 390, 'chapter view fits on a phone')
    shot(pp, 'phone-ticket.png')

    # Open Graph image
    if SHOTS:
        og = browser.new_context(viewport={'width': 1200, 'height': 630})
        op = og.new_page()
        op.goto(URL + '#/c/c11/learn/4')
        op.wait_for_selector('.sec')
        op.wait_for_timeout(500)
        op.screenshot(path=os.path.join(ROOT, 'docs', 'og.png'))

    csp = [e for e in errors if 'Content Security Policy' in e or 'Refused' in e]
    check(not csp, f'no CSP violations {csp[:2]}')
    other = [e for e in errors if e not in csp and 'favicon' not in e]
    check(not other, f'no console errors {other[:3]}')
    browser.close()

print(f'\n{len(fails)} failure(s)' if fails else '\nall UI checks passed')
sys.exit(1 if fails else 0)
