// Shared login helpers. Requires vendor/nostr-tools/nostr.bundle.js (global `NostrTools`).
const NSEC_STORAGE_KEY = "sattleup.nsec";

function getSavedNsec() {
  try {
    return localStorage.getItem(NSEC_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

// Returns the npub for a valid nsec, otherwise throws.
function nsecToNpub(nsec) {
  const decoded = NostrTools.nip19.decode(nsec.trim());
  if (decoded.type !== "nsec") throw new Error("Not an nsec");
  const pubkeyHex = NostrTools.getPublicKey(decoded.data);
  return NostrTools.nip19.npubEncode(pubkeyHex);
}

function shortenNpub(npub) {
  return npub.slice(0, 8) + "..." + npub.slice(-8);
}

// Fills the header label (#npub-label) with the npub of the saved nsec.
function renderNpubLabel() {
  const label = document.getElementById("npub-label");
  if (!label) return;
  const nsec = getSavedNsec();
  let text = "No npub logged in";
  if (nsec) {
    try {
      const npub = nsecToNpub(nsec);
      text = shortenNpub(npub);
      label.title = npub;
    } catch (e) {
      // Stored value is invalid: treat as logged out.
    }
  }
  label.textContent = text;
  label.classList.toggle("logged-in", text !== "No npub logged in");
}

document.addEventListener("DOMContentLoaded", renderNpubLabel);
