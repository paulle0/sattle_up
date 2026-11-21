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
  let npub = null;
  if (nsec) {
    try {
      npub = nsecToNpub(nsec);
    } catch (e) {
      // Stored value is invalid: treat as logged out.
    }
  }
  label.textContent = "Logged in: " + (npub ? shortenNpub(npub) : "No npub logged in");
  label.title = npub || "";
  label.classList.toggle("logged-in", Boolean(npub));
}

document.addEventListener("DOMContentLoaded", renderNpubLabel);
