// ===============================
// SKILL BARS - Versión 2
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    // Log de inicio
    function initSkillBars() {
        console.log("Inicializando barras de habilidades");
        
        // Esquema de colores
        const skillColors = {
            // Primer bloque (Habilidades)
            "Microsoft 365": "#0000FF",
            "Windows Server": "#FF0000", 
            "Linux Server": "#008000",
            "SAP HANA": "c49ec5",
            
            // Segundo bloque (Scripting)
            "HTML5 CSS3 JS": "#00FFFF",
            "C/C++/C#": "#FFA500",
            "Python": "#FFFF00",
            "PowerShell": "#800080"
        };
        
        // Solución de colores previos de cara a solucionar
        const previousStyles = document.querySelectorAll('style.skill-bars-dynamic');
        previousStyles.forEach(style => style.remove());
        
        // Asignar colores específicos para resolver problemas con CSS
        let styleElement = document.createElement('style');
        styleElement.className = 'skill-bars-dynamic';
        document.head.appendChild(styleElement);
        
        // Procesar cada bloque por separado para evitar conflictos
        document.querySelectorAll('.bloques-slider .bloque').forEach((bloque, bloqueIndex) => {
            // Procesar las skills dentro de cada bloque
            bloque.querySelectorAll('.skill').forEach((skill, skillIndex) => {
                const bar = skill.querySelector('.bar');
                const percentage = skill.getAttribute('data-percentage');
                let skillText = skill.textContent.trim();
                
                // Barras de porcentaje
                skillText = skillText.replace(/\d+%|\(\d+%\)/g, '').trim();
                
                if (bar && percentage) {
                    // Extraer porcentaje sin %
                    const percentValue = parseInt(percentage.replace('%', ''));
                    
                    // Aplicar el ancho basado en el porcentaje de forma directa
                    bar.style.setProperty('--skill-percentage', percentValue + '%');
                    
                    // Determinar color basado en texto o posición
                    let color = null;
                    
                    // Localiza el nombre para asemejar con el colore
                    for (const [key, value] of Object.entries(skillColors)) {
                        if (skillText.includes(key)) {
                            color = value;
                            break;
                        }
                    }
                    
                    // Fallback si no encuentra los nombres
                    if (!color) {
                        // Primer bloque
                        if (bloqueIndex === 0) {
                            const colors = ["#0000FF", "#FF0000", "#008000", "c49ec5"];
                            color = colors[skillIndex] || "#0097c2";
                        } 
                        // Segundo bloque
                        else if (bloqueIndex === 1) {
                            const colors = ["#00FFFF", "#FFA500", "#FFFF00", "#800080"];
                            color = colors[skillIndex] || "#3cba92";
                        }
                    }
                    
                    if (color) {
                        // Añadir reglas de estilo especificas
                        styleElement.sheet.insertRule(
                            `.bloques-slider .bloque:nth-of-type(${bloqueIndex + 1}) .skill:nth-of-type(${skillIndex + 1}) .bar::before {
                                background: linear-gradient(90deg, ${color}, ${color}cc) !important;
                                background-color: ${color} !important;
                                width: ${percentValue}% !important;
                            }`,
                            styleElement.sheet.cssRules.length
                        );
                        
                        // Añadir estilos inline directos al "pseudo-element wrapper"
                        const inlineStyle = document.createElement('style');
                        inlineStyle.textContent = `
                            .bloques-slider .bloque:nth-of-type(${bloqueIndex + 1}) .skill:nth-of-type(${skillIndex + 1}) .bar::before {
                                background: linear-gradient(90deg, ${color}, ${color}cc) !important;
                                background-color: ${color} !important;
                                width: ${percentValue}% !important;
                            }
                        `;
                        document.head.appendChild(inlineStyle);
                        
                        // Estilos directos para compatibilidad
                        if (bar.classList) {
                            bar.classList.add('initialized');
                        
                            bar.dataset.color = color;
                            bar.dataset.percentage = percentValue;
                            
                            bar.classList.add(`skill-bar-${bloqueIndex}-${skillIndex}`);
                        }
                    }
                    
                    setTimeout(() => {
                        skill.classList.add('skill-animate-active');
                    }, 50);
                }
            });
        });
        
        console.log("Barras de habilidades inicializadas");
    }
    
    setTimeout(initSkillBars, 300);
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initSkillBars, 250);
    });
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.attributeName === "class" &&
                (mutation.target.classList.contains("light-theme") || 
                mutation.target.classList.contains("dark-theme"))
            ) {
                console.log("Theme changed, reinitializing skill bars");
                setTimeout(initSkillBars, 100);
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    document.addEventListener('click', function(e) {
        if (e.target && (
            e.target.classList.contains('theme-toggle') || 
            e.target.closest('.theme-toggle')
        )) {
            setTimeout(initSkillBars, 100);
        }
    });
    
    window.skillBars = {
        init: initSkillBars
    };
});