// Theme Toggler Implementation

// Function to load theme preference from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme + '-theme');
    if (savedTheme === 'dark') {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}

// Function to toggle theme
function toggleTheme() {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Create and append theme toggle button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌓';
  themeToggle.classList.add('theme-toggle');
  themeToggle.title = 'Cambiar tema';
  themeToggle.setAttribute('aria-label', 'Cambiar entre modo oscuro y claro');
  
  // Add styles to the button
  themeToggle.style.position = 'fixed';
  themeToggle.style.top = '15px';
  themeToggle.style.right = '15px';
  themeToggle.style.zIndex = '9999';
  themeToggle.style.background = 'rgba(93, 220, 255, 0.7)';
  themeToggle.style.border = 'none';
  themeToggle.style.borderRadius = '50%';
  themeToggle.style.width = '40px';
  themeToggle.style.height = '40px';
  themeToggle.style.cursor = 'pointer';
  themeToggle.style.fontSize = '20px';
  themeToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  themeToggle.style.transition = 'all 0.3s ease';
  
  // Add hover effect
  themeToggle.onmouseover = function() {
    this.style.transform = 'scale(1.1)';
  };
  themeToggle.onmouseout = function() {
    this.style.transform = 'scale(1)';
  };
  
  // Add click event
  themeToggle.addEventListener('click', toggleTheme);
  
  // Append button to body
  document.body.appendChild(themeToggle);
  
  // Load saved theme preference
  loadTheme();
});

// Check system preference for dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // System preference is dark mode
  if (!localStorage.getItem('theme')) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}