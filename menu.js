document.getElementById('menu-desplegable').addEventListener('change', function() {
    let value = this.value;
    let panelContenedor = document.getElementById('panel-contenedor');

    // Remove any existing dynamically added styles and scripts
    removeDynamicAssets();

    switch(value) {
        case "inicio":
            panelContenedor.innerHTML = "";
            break;

        case "constancias":
            fetchContent('modulo_constancias/crear_constancia.php', panelContenedor);
            fetchContent('modulo_constancias/guardar_datos.php', panelContenedor, true);
            loadStyles('modulo_constancias/crear_constancia.css');
            loadScripts('modulo_constancias/crear_constancia.js');
            break;

        case "ficha-alumno":
            fetchContent('modulo_ficha_alumno/capturar_alumno.php', panelContenedor);
            fetchContent('modulo_ficha_alumno/guardar_alumno.php', panelContenedor, true);
            loadStyles('modulo_ficha_alumno/capturar_alumno.css');
            break;

        case "planes-estudio":
            fetchContent('modulo_planes_de_estudio/capturar_planes.php', panelContenedor);
            fetchContent('modulo_planes_de_estudio/guardar_planes.php', panelContenedor, true);
            loadStyles('modulo_planes_de_estudio/capturar_planes.css');
            break;

        default:
            break;
    }
});

function removeDynamicAssets() {
    let oldStyle = document.getElementById('dynamic-style');
    let oldScript = document.getElementById('dynamic-script');

    if (oldStyle) oldStyle.remove();
    if (oldScript) oldScript.remove();
}

function loadStyles(href) {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.id = 'dynamic-style';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
}

function loadScripts(src) {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.id = 'dynamic-script';
    script.src = src;
    body.appendChild(script);
}

function fetchContent(url, container, append = false) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        if (append) {
            container.innerHTML += data;  // Appends the new content
        } else {
            container.innerHTML = data;  // Replaces with new content
        }
    })
    .catch(error => {
        console.error('Error fetching content:', error);
        container.innerHTML = "Error cargando el contenido.";
    });
}
