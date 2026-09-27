# The Reading Den 📖 — Read Write Inc. edition

A two-screen reading session for one grown-up and one child at home: a
**reader portal** with the controls, and a **child's screen** with just the
story or game on it. Built around **Read Write Inc. Phonics** (Ruth Miskin /
Oxford University Press): Speed Sounds Sets 1–3 in RWI's teaching order,
Red Words, Fred Talk, dots and dashes, and the RWI storybook colours from
Red Ditty to Grey.

This is a copy of [SunithM87/Phonics](https://github.com/SunithM87/Phonics),
which follows Little Wandle, reworked for a school that uses RWI. The code
is the same; the progression, the Red Word lists, the book bands and the
wording are RWI's. It runs as its own container on its own port, so both
editions can live on the same NAS.

No build step, no accounts, no internet needed once it's on the machine.

---

## What's in it

**Seven activities**, reachable from the sidebar, the same shape of session a
school reading volunteer runs:

| | |
|---|---|
| **Flashcards** | Speed Sound tiles and Red Words. Pick a sound — Set 2 and Set 3 tiles carry the card's phrase ("ay: may I play") — send a Green Word to his screen, optionally with RWI-style *dots and dashes* under it (a dot per one-letter sound, a dash under a Special Friend), mark ✓ / ✗. Tiles keep their colour and the date, so the record builds up over sessions, and a strip above the tiles tells you what to practise next. Red Words show their **tricky bit** in red with a one-line note ("the e says /uh/"). |
| **Stories** | Thirteen illustrated decodable books, spread across the eight RWI colours — see below. |
| **Word Sort** | Numbered words to sort into coloured bins by the sound they contain. He says "number four goes in the red box". |
| **3 in a Row** | Noughts and crosses on a 3×3 grid of words. Read the word to claim the square. You against him — click once for ✕, twice for ○. |
| **Mystery Word** | You pick a secret word, he guesses letters. Wrong guesses cost a star. Five stars and it's revealed. Solved or not, it ends with the whole word and its dots and dashes — the reading is the point, not the guessing. |
| **Word Wheel** | A rime in the middle, onsets round the outside — turn it and he Fred Talks a whole rhyming family: sat, pat, mat. Every word shows its dots and dashes. |
| **Whiteboard** | Type sounds or words, drag them around. Good for pulling a word apart and pushing it back together. |

Plus **Send a Sticker** — pops a big emoji on his screen. Worth saving for
something he found hard.

### The stories

Thirteen proper little books, not practice sentences: a title, a cover, a
cast, and a beginning/middle/end over five pages. Pip the pug turns up in
two of them, which for a four-year-old is most of the appeal.

Every book carries an exact **Activity Level** — the highest step any of
its words needs — and its card says so. That's checked, not eyeballed:
every word in every book is in a hand-reviewed grapheme bank
(`assets/data/words.js`), and `tools/check-content.js` fails if a book uses a
grapheme, a suffix or an adjacent-consonant pattern taught later than its
declared level.

The books started life in the Little Wandle edition and were re-levelled
for RWI, which moves a lot: *rain*, *boat* and *cow* are Phase 3 in Little
Wandle but Set 3 in RWI (ai, oa and "brown cow" ow), while *snow* moves the
other way. A few lines were reworded so every colour has at least one book
(the fox's hen now *sleeps* rather than naps, Roy's boat is a green toy
ship). They are this app's own books, **not** the RWI storybooks — don't
expect the titles in his book bag.

Red Words are marked in the data and shown in **red** on the page, as RWI
prints them, so you know at a glance which words to just tell him. The
marking is level-aware: *paint* is red in a Purple book (ai isn't a Speed
Sound yet) but a plain Green Word once Set 3's ai arrives, and the checker
enforces both directions. Words RWI keeps listing as red after their sounds
arrive (*her*, *saw*, *all*) stay red. Click any word on your screen and it
highlights on his.

Each book has three tick-boxes, matching RWI's three reads of every
storybook — **every word accurately**, **more words at a glance**, and
**storyteller voice** — because one "mark as read" flag doesn't record that.

Pictures are composed from an original SVG kit (`assets/data/art.js`) — one
shared cast and prop set, so characters stay recognisable page to page.

---

## Running it

Open `index.html` in a browser. That's genuinely it — everything works from
the local file, with the two screens syncing through the browser's own
storage if you keep them in tabs of the same browser.

For two *devices* (your laptop and his tablet), you need the sync server:

```
cd server && npm install        # once — pulls one dependency, ws
cd .. && PUBLIC_DIR="$PWD" STATE_FILE="$PWD/deploy/data/state.json" node server/server.js
# then open http://<your-machine>:8000 on both devices (PORT=8001 to match the NAS)
```

Or run it properly on a NAS — see below.

Look for the pill at the top right of the portal. It reports what's
actually true, not just whether *your* screen reached the server:

- **● His screen is connected** — both screens are live.
- **● Server on · his screen isn't open** — you're synced but nothing will
  appear anywhere until his screen is open.
- **● No server — this screen only** — still perfectly usable on one screen.
- **● Synced · server out of date** — the server is an older version than
  the page. Everything still syncs, but it can't say who's connected until
  you restart the container (see *Updating* below).

His screen has the same three states in miniature at the top.

If either device drops off Wi-Fi mid-session, anything you mark while
offline is kept and pushed when it reconnects — the server and the browser
both keep the newer of the two records rather than the server's copy
blindly winning.

---

## Hosting it on a NAS

It runs as one small Docker container: a tiny Node server that serves the
app *and* keeps every screen in sync over a WebSocket. The container keeps
itself up to date. **Every time it starts, it downloads the latest version
of the app from GitHub** and serves that, so updating means restarting it
(see *Updating*). If GitHub can't be reached, it serves the last version
it downloaded.

Nothing needs copying to the NAS. The only folder it uses is
**`/volume2/appdata/Reading Den RWI/data`**, which holds his progress
(`state.json`) plus the downloaded copy of the app.

It is deliberately separate from the Little Wandle edition: the container
is called **`reading-den-rwi`**, it listens on port **8001**, and it has its
own data folder, so the two never share progress or restart each other.

1. **App Center → Docker → Install** (current DXP / DH4300 Plus models
   support it; the entry-level DH2300 doesn't).
2. **Docker → Project → Create.** Paste in the whole of
   [`deploy/docker-compose.yaml`](deploy/docker-compose.yaml) and deploy it.
   It uses the standard `node:20-alpine` image, so there's nothing to build.
3. Open `http://<nas-ip>:8001` on any device in the house.

To keep the data somewhere else, change the one `source:` path in the
compose file. It has to be an absolute path, because the UGREEN app keeps
its own copy of the file. The port is the other thing you might change.

**Two things worth knowing:**

- **Don't port-forward this.** There's no login and no accounts, by design —
  it's one family's shared state. That's fine on your own LAN and a bad idea
  on the open internet. For access away from home use Tailscale (below),
  which keeps it private to your own devices.
- **His progress lives in
  `/volume2/appdata/Reading Den RWI/data/state.json`.** It's the record of
  which Speed Sounds and Red Words he's got, and which books he's read. Worth
  including in whatever you already back up.
- **The container runs whatever is on the GitHub branch.** That's what
  makes it update itself, and it means anyone who can push to the repo
  controls what your NAS serves. Right now that's only you. The container
  can only see its own data folder, not the rest of the NAS.
- **The repo has to be public for this to work.** The container downloads
  the app from GitHub without a token. If MayPhonics is private, the first
  start fails with `HTTP 404` in the container log; make the repo public, or
  run it from a local copy instead (see *Running it*).

---

## Updating

**Restart the container.** In the UGREEN Docker app: *Containers →
reading-den-rwi → Restart* (or stop and start the project). As it starts it
downloads the latest version from GitHub. Give it about ten seconds, then
refresh both screens. His progress is never touched.

To check which version is running, open `http://<nas-ip>:8001/api/health`.
The `version` field is the commit it's serving.

From a terminal, this does the same restart and waits until the new
version answers:

```
curl -fsSL https://raw.githubusercontent.com/SunithM87/MayPhonics/claude/reading-den-app-migration-3torha/deploy/update.sh | sudo sh
```

The branch it follows is set in two places in the compose file
(`BRANCH=` and the URL). Change both if you ever switch, for example to
`main`.

If a page still looks stale after a refresh, hard-refresh it
(Ctrl/Cmd+Shift+R). Occasionally a tablet browser holds on to old
JavaScript regardless of the no-cache header.

### Using it away from home (Tailscale)

The app needs nothing special for this. Every URL it uses is relative to
the page (the sync socket is built from `window.location`), and the server
doesn't check the hostname, so it works the same whether you reach it as
`192.168.1.170:8001`, a Tailscale `100.x.y.z:8001` address, or a MagicDNS
name. If it works at home and not away, the problem is the route to the
NAS, not the app. Check these in order:

1. **Use the Tailscale address, not the home one.** `192.168.1.170` only
   exists on your home Wi-Fi. Away from home, use the NAS's Tailscale IP
   (the `100.…` address in the Tailscale app or admin console, or
   `tailscale ip -4` on the NAS) or its MagicDNS name:
   `http://100.x.y.z:8001`. The one exception: if the NAS advertises your
   home subnet as a Tailscale route *and* you've approved it in the admin
   console, the home IP works too.
2. **Tailscale has to be on at both ends.** The phone or laptop needs the
   Tailscale VPN switched on (not just the app installed). The NAS needs to
   show as *Connected* in the admin console.
3. **The NAS firewall.** If UGOS's firewall is on, it may only allow your
   home subnet. Allow port 8001, or the Tailscale range `100.64.0.0/10`.
4. **Test from the NAS itself** over SSH:
   `curl -s http://$(tailscale ip -4):8001/api/health`. If that answers,
   the container and firewall are fine and the problem is on the device
   you're connecting from. If the `tailscale` command isn't found, Tailscale
   is running as a UGOS app or container rather than on the NAS itself. In
   that case skip this test and rely on 1–3.

If you front it with `tailscale serve` for an `https://` address, that
works too: the page switches the sync socket to `wss://` automatically.

### Moving it to a different folder

Only the data folder matters. Stop the container, move the `data/` folder
(or the whole `Reading Den RWI` folder) to its new home, change the `source:` path
in the project's compose file to match, and deploy it again. His progress
comes along inside `state.json`.

---

## Levels

Two separate level systems, which is how reading platforms actually do it,
because they move independently:

**Activity Level 1–18** drives flashcards and games. The sounds come in
Read Write Inc.'s published teaching order:

| Levels | What | RWI checkpoint it ends on |
|---|---|---|
| 1–6 | **Set 1**: m a s d t · i n p g o · c k u b f e · l h sh r j · v y w th z · ch qu x ng nk | Level 3 = the first 16 single-letter sounds; Level 6 = all of Set 1, and the Ditties (with the first Red Words) |
| 7 | **Word Time 1.7**: ck ff ll ss zz and the other double letters; 4- and 5-sound words (stop, jump) and -s endings (cats) | Red Ditty books |
| 8–11 | **Set 2**: ay ee igh · ow(blow the snow) oo(zoo) oo(book) · ar or air · ir ou oy | Level 9 = the first six Set 2 sounds (the Purple check); Level 11 = all of Set 2 (the Pink check) |
| 12–17 | **Set 3**: ea oi a-e · i-e o-e u-e · aw are ur er · ow(brown cow) ai oa ew · e(he) ire ear · ure tion tious cious | Level 13 = the first six Set 3 sounds (the Yellow check); Level 17 = all of Set 3 (the Blue check) |
| 18 | **Complex Speed Sounds**: the other spellings the books and games use — ie ue oe au ey wh ph e-e, y as in happy and fly, soft c and g, ea as in bread | Grey |

The *order* is RWI's. The *steps* are this app's: RWI teaches roughly a
sound a day and regroups children every half term, so there's no official
"Set 2 part 3". The steps are cut so that each RWI assessment checkpoint
lands on a level boundary. The terms in the picker (Reception Autumn 1 and
so on) are a typical pace, not a rule. Move it up whenever school does.

**Red Words** are RWI's own lists, taken from the progression of Red Words
through the storybooks, and brought in at the level where that colour of
book starts: the Red Ditty words (I, the, put, no, of, my, he) at Level 6,
then Green at 8, Purple at 9, Pink at 10, Orange at 12, Yellow at 13, Blue
at 14 and Grey at 18. Each word appears once, where it first turns up. A
handful are only red *for now* — *paint* needs Set 3's ai, *he*, *me*, *we*,
*be* and *she* need Set 3's "e: he" — and stop being marked red in stories
once those sounds arrive. The flashcard tiles keep them either way.

Everything the level gates is gated mechanically. Every word the app can
show is in the grapheme bank with its sounds spelled out
(`ship: ["sh","i","p"]`, `cake: ["c","a-e","k"]`), and a word is only
offered at a level if every one of its sounds has been taught, and — for two
consonants side by side (`st`, `mp`, `tr`) or an `-s` ending — Word Time 1.7
(Level 7) has been reached. So Level 1 is genuinely just `m a s d t` words.

**Story Level** is the RWI storybook colour — **Red Ditty, Green, Purple,
Pink, Orange, Yellow, Blue, Grey** — the same colour as his RWI group at
school. Each colour is pinned to a maximum Activity Level (7 / 8 / 9 / 11 /
12 / 13 / 17 / 18), following what RWI says children know at each colour:
all of Set 1 before Red Ditty, Set 2 starting alongside Green and Purple,
all of Set 2 by Orange, the first six Set 3 sounds by the end of Yellow, all
of Set 3 by the end of Blue. The chip picker lists every book in the colour
with its exact level, and a book card turns amber when its level is above
his current Activity Level.

> **An honest caveat on the colours.** RWI's colours are *not* the UK book
> bands most other schemes use — RWI Pink and book-band Pink are different
> things, and schools say so on their own parent sheets. RWI also doesn't
> publish a one-line "these exact sounds, no others" rule per colour: the
> Green, Purple and Pink books are read *while* Set 2 is being learnt, and
> Orange to Blue while Set 3 is. So the per-colour ceilings above are my
> reading of RWI's own descriptions, and the eight colours share only
> thirteen books between them, several with one book each. Go by his group
> at school.

---

## Why it looks the way it does

Two typefaces, deliberately:

- **Andika** for everything *he* reads — words, letters, story text, game
  tiles. It's SIL's typeface for early literacy: single-storey `a` and `g`,
  unambiguous `l`/`I`/`1`. Those are the letterforms he's being taught to
  write, which matters more at four than typographic elegance does. It's
  self-hosted in `assets/fonts` (SIL Open Font Licence, included), so it
  works offline and doesn't call out to Google.
- **The system UI font** for everything *you* read, so the portal looks like
  software rather than a nursery wall.

No Comic Sans anywhere.

---

## Project layout

```
index.html, coach.html, play.html   landing / reader portal / child's screen
assets/core.js                      state + WebSocket sync
assets/activities.js                all seven activities (coach + student modes)
assets/coach.js, play.js            the two page shells
assets/data/phonics.js              the 18 levels, Red Word lists and tricky parts, sound examples, sorts, wheels
assets/data/words.js                the grapheme bank: every word the app can show, with its sounds
assets/data/stories.js              the thirteen books
assets/data/art.js                  SVG scene kit for the illustrations
assets/style.css                    everything visual
assets/fonts/                       Andika (SIL OFL)
server/server.js                    static server + sync (http + ws, nothing else)
tools/check-content.js              validates every word, sort, wheel, story and Red Word mark against its level
tools/check-determinism.js          guards that both screens compute the same thing
tools/segment.js                    helper for adding words to the bank (draft segmentation, then review by hand)
deploy/docker-compose.yaml           NAS deployment (self-updating; paste into the UGREEN Docker app)
deploy/container-start.sh            runs in the container on every start: fetch latest, then serve
deploy/update.sh                     terminal shortcut: restart the container and wait
```

---

## Checks

```
node tools/check-content.js        every word, sort, wheel and story readable at its declared level; Red Word marks right
node tools/check-determinism.js    game boards identical on both screens
```

The first one replaced an earlier checker that segmented words by scanning
for letter strings — which happily passed *cake*, *train* and *egg* at the
very start because it could find `c`, `a`, `k`, `e` in them. Segmenting is now done
once, by hand, into `assets/data/words.js`, and the checker only asks
whether each recorded sound has been taught yet. Adding a word means adding
its sounds; `node tools/segment.js <word>` drafts that for you, but the
answer gets reviewed, not trusted.

The second one exists because of a real bug: the word boards were shuffled
with `Math.random()`, so the reader portal and the child's screen dealt
different words from the same state — and the board reshuffled mid-game on
any unrelated re-render. Anything both screens work out for themselves has
to be a pure function of the shared state, and that check enforces it.

---

## Honest caveats

- **No audio.** A text-to-speech voice saying phonemes gets them wrong often
  enough to actively teach the wrong thing. Your voice does the modelling —
  which is the point of doing this together.
- **Word Whirled and Storyboard** exist on the platform this borrows its
  *shape* from, but weren't in the screenshots I worked from. Word Wheel here
  is my own take on what a "word whirl" ought to be (onset-and-rime, which is
  the standard version of that activity); there's no Storyboard at all.
- **It's not a copy.** Not of Chapter One — I had screenshots of the layout,
  never the code, and all the stories, art, words and code here are original.
  Not affiliated with or endorsed by Read Write Inc., Ruth Miskin Literacy
  or Oxford University Press either; it follows RWI's published sound order
  and Red Word lists, and borrows RWI's words for things (Fred Talk, Special
  Friends, Green and Red Words) so they match what he hears at school. None
  of RWI's own books, pictures or Fred the Frog are in here.
- **Where the RWI facts come from.** No official RWI teacher handbook was
  used — they're sold to schools. The sound order and Set 2 / Set 3 phrases
  come from school parent guides that reproduce RWI's; the per-colour Red
  Word lists from a school's "Red Words matched to RWI books" sheet; the
  colour-by-colour expectations from Oxford University Press's RWI book
  pages and a school's RWI progression map. Where those were silent (which
  exact sounds a Purple book may use), the app makes a reasoned call and
  says so above.
- **The grapheme bank is hand-reviewed, not infallible.** 550-odd words,
  each with its sounds spelled out. If you spot one that's wrong, fixing the
  entry in `assets/data/words.js` fixes it everywhere and the checker will
  tell you if the change puts a story out of level.
- **School wins.** If anything here contradicts what's coming home in his
  book bag, the school is right and this is wrong.
