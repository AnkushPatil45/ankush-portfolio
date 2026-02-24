// Select the theme toggle button by its ID
const toggle = document.getElementById("themeToggle");

// Check if the user has a saved preference in their browser
const currentTheme = localStorage.getItem("theme");

// If a saved preference exists, apply it immediately
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggle.textContent = currentTheme === "dark" ? "☀" : "☾";
}

// Add a click event listener to the button
toggle.onclick = () => {
  // Check the current theme state
  let theme = document.documentElement.getAttribute("data-theme");
  
  // Switch logic: If it's dark, make it light. Otherwise, make it dark.
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); // Save preference
    toggle.textContent = "☾"; // Show moon icon
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Save preference
    toggle.textContent = "☀"; // Show sun icon
  }
};