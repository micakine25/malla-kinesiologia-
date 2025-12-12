/* BASE DE DATOS DE LA MALLA
 Estructura: id (único), nombre, semestre, requisitos (array de ids)
*/
const mallaData = [
    // --- SEMESTRE 1 ---
    { id: 'bio_hist', name: 'Biología e Histología', sem: 1, req: [] },
    { id: 'fisica', name: 'Física', sem: 1, req: [] },
    { id: 'anatomia1', name: 'Anatomía 1', sem: 1, req: [] },
    { id: 'bioquimica', name: 'Bioquímica', sem: 1, req: [] },
    { id: 'intro_kine', name: 'Introducción a la Kinesiología', sem: 1, req: [] },
    { id: 'antropologia', name: 'Antropología Cristiana', sem: 1, req: [] },

    // --- SEMESTRE 2 ---
    { id: 'bio_celular', name: 'Biología Celular', sem: 2, req: ['bio_hist'] },
    { id: 'anatomia2', name: 'Anatomía 2', sem: 2, req: [] }, // No especificaste requisito, asumo libre o continuidad
    { id: 'autocuidado', name: 'Promoción del Autocuidado', sem: 2, req: [] },
    { id: 'biofisica', name: 'Biofísica', sem: 2, req: ['fisica'] },

    // --- SEMESTRE 3 ---
    { id: 'ingles1', name: 'Inglés 1', sem: 3, req: [] },
    { id: 'trauma_adultos', name: 'Traumatología', sem: 3, req: ['anatomia1'] }, // Mapeado a "Traumatologia Adultos"
    { id: 'fisio_sistemas', name: 'Fisiología de Sistemas', sem: 3, req: ['anatomia2'] },
    { id: 'biomecanica1', name: 'Biomecánica', sem: 3, req: ['anatomia1'] },
    { id: 'salud_publica', name: 'Salud Pública', sem: 3, req: ['autocuidado'] },
    { id: 'neurofisiologia', name: 'Neurofisiología', sem: 3, req: ['anatomia2'] },

    // --- SEMESTRE 4 ---
    { id: 'ingles2', name: 'Inglés 2', sem: 4, req: ['ingles1'] },
    { id: 'neuropsico', name: 'Neuropsicología', sem: 4, req: ['neurofisiologia'] },
    { id: 'biomecanica2', name: 'Biomecánica 2', sem: 4, req: ['biomecanica1'] },
    { id: 'fisiopatologia1', name: 'Fisiopatología', sem: 4, req: ['fisio_sistemas'] }, // Mapeado a "Fisiopatología 1"
    { id: 'trauma_infanto', name: 'Traumatología Infanto-Juvenil', sem: 4, req: ['trauma_adultos'] },
    { id: 'enfermeria', name: 'Enfermería y Primeros Auxilios', sem: 4, req: ['fisio_sistemas'] },

    // --- SEMESTRE 5 ---
    { id: 'bioestadistica', name: 'Bioestadística', sem: 5, req: [] },
    { id: 'ingles3', name: 'Inglés 3', sem: 5, req: ['ingles2'] },
    { id: 'met_eval1', name: 'Metodología Evaluativa', sem: 5, req: ['biomecanica2', 'trauma_infanto'] },
    { id: 'fisiopatologia2', name: 'Fisiopatología 2', sem: 5, req: ['fisiopatologia1'] },
    { id: 'farmacologia', name: 'Farmacología', sem: 5, req: [] },
    { id: 'neuro_clinica', name: 'Neurología Clínica', sem: 5, req: ['neuropsico'] },
    { id: 'fisio_ejercicio', name: 'Fisiología del Ejercicio', sem: 5, req: ['fisiopatologia1'] },

    // --- SEMESTRE 6 ---
    { id: 'ingles4', name: 'Inglés 4', sem: 6, req: ['ingles3'] },
    { id: 'met_eval2', name: 'Metodología Evaluativa 2', sem: 6, req: ['met_eval1'] },
    { id: 'fisioterapia', name: 'Fisioterapia', sem: 6, req: ['fisiopatologia2'] },
    { id: 'rehab_musc1', name: 'Rehabilitación Musculoesquelética 1', sem: 6, req: ['met_eval1'] },
    { id: 'neuro_rehab_inf', name: 'Neurorehabilitación Infanto Juvenil', sem: 6, req: ['neuro_clinica'] },
    { id: 'kine_resp1', name: 'Kinesiterapia Cardiorespiratoria 1', sem: 6, req: ['fisio_ejercicio'] },

    // --- SEMESTRE 7 ---
    { id: 'integ_clinica1', name: 'Integración Clínica 1', sem: 7, req: ['neuro_clinica', 'met_eval2', 'kine_resp1'] },
    { id: 'rehab_musc2', name: 'Rehabilitación Musculoesquelética 2', sem: 7, req: ['rehab_musc1'] },
    { id: 'neuro_rehab_adultos', name: 'Neurohabilitación Adultos', sem: 7, req: ['neuro_rehab_inf'] },
    { id: 'kine_resp2', name: 'Kinesiterapia Cardiorespiratoria 2', sem: 7, req: ['kine_resp1'] },
    { id: 'met_investigacion', name: 'Metodología Investigación', sem: 7, req: ['bioestadistica'] },

    // --- SEMESTRE 8 ---
    { id: 'integ_clinica2', name: 'Integración Clínica 2', sem: 8, req: ['integ_clinica1'] },
    { id: 'gestion_salud', name: 'Gestión de Salud', sem: 8, req: ['met_investigacion'] },
    { id: 'seminario', name: 'Seminario', sem: 8, req: ['met_investigacion'] },

    // --- SEMESTRE 9 ---
    { id: 'practica1', name: 'Práctica Profesional 1', sem: 9, req: ['integ_clinica2', 'seminario'] },

    // --- SEMESTRE 10 ---
    { id: 'practica2', name: 'Práctica Profesional 2', sem: 10, req: ['practica1'] },
];

// Estado global de aprobados (Se guarda en LocalStorage)
let aprobados = JSON.parse(localStorage.getItem('malla_progreso')) || [];

// Función principal de inicialización
function initMalla() {
    renderizarMalla();
    actualizarEstados();
}

// Renderiza el HTML de la malla (Columnas y tarjetas)
function renderizarMalla() {
    const grid = document.getElementById('malla-grid');
    grid.innerHTML = '';

    // Crear 10 columnas
    for (let i = 1; i <= 10; i++) {
        const col = document.createElement('div');
        col.className = 'semestre-col';
        
        // Título del semestre
        const title = document.createElement('div');
        title.className = 'semestre-title';
        title.innerText = `Semestre ${i}`;
        col.appendChild(title);

        // Filtrar ramos de este semestre
        const ramosSemestre = mallaData.filter(r => r.sem === i);

        ramosSemestre.forEach(ramo => {
            const card = document.createElement('div');
            card.className = 'ramo-card';
            card.id = ramo.id; // Asignamos el ID al elemento DOM
            card.innerText = ramo.name;
            
            // Evento click
            card.onclick = () => toggleRamo(ramo);

            col.appendChild(card);
        });

        grid.appendChild(col);
    }
}

// Maneja el clic en un ramo
function toggleRamo(ramo) {
    const estado = verificarEstado(ramo);

    // Si está bloqueado, mostrar alerta
    if (estado === 'bloqueado') {
        const nombresFaltantes = ramo.req
            .filter(reqId => !aprobados.includes(reqId))
            .map(reqId => mallaData.find(r => r.id === reqId).name);
        
        alert(`🚫 Ramo bloqueado.\nDebes aprobar primero: \n- ${nombresFaltantes.join('\n- ')}`);
        return;
    }

    // Si está disponible o aprobado, alternar estado
    if (aprobados.includes(ramo.id)) {
        // Desaprobar (quitar de la lista)
        aprobados = aprobados.filter(id => id !== ramo.id);
    } else {
        // Aprobar (agregar a la lista)
        aprobados.push(ramo.id);
    }

    // Guardar y refrescar visuales
    localStorage.setItem('malla_progreso', JSON.stringify(aprobados));
    actualizarEstados();
}

// Verifica el estado lógico de un ramo
function verificarEstado(ramo) {
    // Verificar si todos los requisitos están cumplidos
    const requisitosCumplidos = ramo.req.every(reqId => aprobados.includes(reqId));
    
    if (!requisitosCumplidos) return 'bloqueado';
    if (aprobados.includes(ramo.id)) return 'aprobado';
    return 'disponible';
}

// Actualiza las clases CSS de todas las tarjetas según el estado actual
function actualizarEstados() {
    mallaData.forEach(ramo => {
        const card = document.getElementById(ramo.id);
        const estado = verificarEstado(ramo);

        // Limpiar clases previas
        card.classList.remove('aprobado', 'bloqueado', 'disponible');
        
        // Agregar clase nueva
        card.classList.add(estado);
    });
}

// Función para reiniciar todo el progreso
function resetearProgreso() {
    if(confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
        aprobados = [];
        localStorage.removeItem('malla_progreso');
        actualizarEstados();
    }
}

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', initMalla);
