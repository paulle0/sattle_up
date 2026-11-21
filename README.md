# sattle_up

Static web front end for **Sattle Up**.

Open `index.html` directly in a browser, or serve the folder with any static web server.
All paths are relative, so both work.

## Run locally

From the repository folder, start a local web server:

```
python3 -m http.server
```

Then open http://localhost:8000 in your browser. Stop the server with `Ctrl+C`.

## Structure

```
index.html            Start page
login.html            Log in with a nostr nsec (stored in localStorage)
styles/main.css       Shared styles (accent color: --accent)
scripts/auth.js       Shared login helpers + header npub label
scripts/login.js      Login page logic
resources/images/     Logo and other images
vendor/nostr-tools/   nostr-tools 2.25.5 browser bundle (public domain), vendored so it works offline
```

To update nostr-tools: `npm pack nostr-tools@<version>` and copy `package/lib/nostr.bundle.js`
into `vendor/nostr-tools/`.
