// Status messages. / Mensajes de estado.
const msgDB = {
    es: {
        rest: 'Vuelves a tener conexión',
        lost: 'No tienes conexión'
    },
    en: {
        rest: 'You\'re back online',
        lost: 'You\'re offline'
    }
}

let msg = msgDB.en;

Object.keys(msgDB).forEach(lang => {
    if (lang === navigator.language) msg = msgDB[lang];
});

/**
 * Overrides visibility change events to allow playback to continue even when
 * the window focus is changed.
 * 
 * Anula los eventos de cambio de visibilidad para que se permita continuar la reproducción aún cuando
 * se cambie el foco de la ventana.
 */
const visibilityChangeOverriding = () => {

    document.addEventListener('webkitvisibilitychange', event => {
        event.stopImmediatePropagation();
    }, true);

    document.addEventListener('visibilitychange', event => {
        event.stopImmediatePropagation();
    }, true);

}

/**
 * Observes title tag changes to restore the original title (YouTube TV).
 * 
 * Observa los cambios de la etiqueta título para recuperar el título original (YouTube TV).
 */
const observeTitleChanges = () => {

    document.title = 'YouTube TV'

    const obs = new MutationObserver(() => {

        if (document.title === 'YouTube TV') return;
        document.title = 'YouTube TV';

    });
    
    obs.observe(document.querySelector('title'), { attributes: true, subtree: true, childList: true });

}

const loadConnectionWarnings = () => {

    // Connection restored. / Conexión restablecida.
    const rest = document.createElement('div');

    // Connection lost. / Conexión perdida.
    const lost = document.createElement('div');

    // Messages / Mensajes
    rest.innerHTML = `<p>${ msg.rest }</p>`;
    lost.innerHTML = `<p>${ msg.lost }</p>`;

    // Style element declaration. / Declaración de del elemento de estilo.
    const styles = document.createElement('style');
    
    // Class declaration. / Declaración de clases.
    styles.innerHTML = `
    .warning {
        position: absolute;
        left: 50%;
        bottom: 0px;
        width: 100%;
        transform: translate(-50%, 100%);
        transition: ease-out 0.2s transform;
        will-change: transform;
        text-align: center;
        z-index: 9999;
    }

    .warning > p {
        margin: 10px 0px;
        font-weight: 500;
    }

    .rest { background: #009D32 }
    .lost { background: red }

    .visible { transform: translate(-50%, 0%) }
    `;

    // Class assignment. / Asignación de clases.
    rest.classList.add('warning', 'rest');
    lost.classList.add('warning', 'lost');

    // Assign an identifier. / Asigna un identificador.
    rest.id = 'rest';
    lost.id = 'lost';

    // Add the connection established warning. / Añade el aviso de conexión establecida.
    document.body.appendChild(rest);
    
    // Add the connection lost warning. / Añade el aviso de conexión perdida.
    document.body.appendChild(lost)
    
    // Add the styles. / Añade los estilos.
    document.body.appendChild(styles)

}

/**
 * Listens for YouTube TV server connection state change events (for later versions).
 * Triggers when connection to the server is lost and when it's recovered.
 * 
 * Escucha eventos de cambio de estado de conexión al servidor de YouTube TV (para versiones posteriores).
 * Se dispara cuando pierde conexión al servidor y cuando se recupera.
 */
const loadConnectionEvents = () => {

    // Load electron IPC. / Carga el IPC de electron.
    window.ipc = window.require('electron').ipcRenderer;

    // Declare the connection restoration warning. / Declara el aviso de restauración de conexión.
    const rest = document.getElementById('rest');

    // Declare the connection loss warning. / Declara el aviso de pérdida de conexión.
    const lost = document.getElementById('lost');

    // Load the connection event. / Carga el evento de conexión.
    window.addEventListener('online', () => {

        // Remove the lost connection warning. / Elimina el aviso de conexión perdida.
        lost.classList.remove('visible');

        // Añade la clase visible.
        rest.classList.add('visible');

        // Emite al renderizador (?)
        window.ipc.send('network', ('online'));

        // Elimina la clase visible pasados los 5 segundos.
        setTimeout(() => { rest.classList.remove('visible') }, 5000);

    })

    // Load the connection loss event. / Carga el evento de pérdida de conexión.
    window.addEventListener('offline', () => {

        // Remove the visible class. / Elimina la clase visible.
        rest.classList.remove('visible');

        // Añade la clase visible.
        lost.classList.add('visible');

        // Emite al renderizador (?)
        window.ipc.send('network', ('offline'));
        
        // Elimina la clase visible pasados los 5 segundos.
        setTimeout(() => { lost.classList.remove('visible') }, 5000);
    })

}

const listenLocalStorageQueries = () => {

    window.ipc.on('localStorageQuery', (event, { type, data }) => {

        const inf = window.localStorage.getItem(data);
        event.sender.send('localStorageQueryResponse', inf);

    })

}

// Load visibility change event override. / Carga la anulación de eventos de cambios de visibilidad.
visibilityChangeOverriding();

// Observe title changes. / Observa el cambio de título.
observeTitleChanges();

// Buggy: Load connection status warnings. / Carga los avisos de estado de conexión.
// loadConnectionWarnings();

// Load YouTube TV server connection change events. / Carga los eventos de cambio de conexión con el servidor de YouTube TV.
loadConnectionEvents();

// Listen for localStorage query requests. / Escucha las peticiones de consultas al localStorage.
listenLocalStorageQueries();

console.log('JavaScript enhancements loaded at', new Date(Date.now()).toISOString());
