// Login page: load the saved nsec into the input and save a new one.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const input = document.getElementById("nsec-input");
  const showToggle = document.getElementById("show-nsec");
  const message = document.getElementById("login-message");

  input.value = getSavedNsec() || "";

  showToggle.addEventListener("change", () => {
    input.type = showToggle.checked ? "text" : "password";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nsec = input.value.trim();
    try {
      nsecToNpub(nsec); // validate
      localStorage.setItem(NSEC_STORAGE_KEY, nsec);
      showMessage("Saved.", false);
      renderNpubLabel();
    } catch (e) {
      showMessage("Please enter a valid nsec (starts with \"nsec1\").", true);
    }
  });

  function showMessage(text, isError) {
    message.textContent = text;
    message.classList.toggle("error", isError);
  }
});
