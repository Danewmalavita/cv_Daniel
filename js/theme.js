
// Theme Toggler

// Función para reiniciar las skill bars al cambiar el tema
function reinitializeSkillBars() {
  if (window.skillBars && typeof window.skillBars.init === 'function') {
    setTimeout(() => {
      window.skillBars.init();
      console.log("Reinitialized skill bars after theme change");
    }, 300);
  }
}

// Funcion para tomar los datos del navegador
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  // Tema claro por defecto si no está editado
  if (!savedTheme) {
    document.body.classList.add('light-theme');
    return;
  }
  
  // Aplicar tema guardado
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}

// Función para toggletheme (cambio de tema)
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
  
  // Reinicio de skillbars
  reinitializeSkillBars();
}

// Botón de tema
document.addEventListener('DOMContentLoaded', function() {
  // Crear botón de cambio de tema
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌓';
  themeToggle.classList.add('theme-toggle');
  themeToggle.title = 'Cambiar tema';
  themeToggle.setAttribute('aria-label', 'Cambiar entre modo oscuro y claro');
  
  // Add click event
  themeToggle.addEventListener('click', toggleTheme);
  
  // Añadir botón a bodt
  document.body.appendChild(themeToggle);
  
  // Cargar la configuración del tema
  loadTheme();
  
  // Checkeo de que los componentes cargan con el tema actual
  setTimeout(() => {
    if (window.skillBars && typeof window.skillBars.init === 'function') {
      window.skillBars.init();
    }
  }, 600);
});

// Comprobar preferencias de sistema de modo oscuro
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Preferencias de sistema en modo oscuro
  if (!localStorage.getItem('theme')) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Realizar listener si el tema cambia
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (!localStorage.getItem('theme')) {
    if (event.matches) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
    reinitializeSkillBars();
  }
});
