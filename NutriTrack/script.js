// Obtiene referencias a las pantallas y controles que conectan la interfaz.
const btnComenzar = document.getElementById("btnComenzar");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const btnInstalarApp = document.getElementById("btnInstalarApp");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const btnSiguiente = document.getElementById("btnSiguiente");
const splash = document.getElementById("splash");
const onboarding = document.getElementById("onboarding");
const perfil = document.getElementById("perfil");
const dashboard = document.getElementById("dashboard");
const perfilForm = document.getElementById("perfilForm");
const bottomNav = document.getElementById("bottomNav");
const paginas = ["dashboard", "dieta", "rutinas", "progreso", "perfil"];
const progresoForm = document.getElementById("progresoForm");
const verProgreso = document.getElementById("verProgreso");
const fotoPerfilInput = document.getElementById("fotoPerfilInput");
const fotoPerfilPreview = document.getElementById("fotoPerfilPreview");
const fotoPerfilError = document.getElementById("fotoPerfilError");
const perfilesGuardadosElement = document.getElementById("perfilesGuardados");
const listaPerfiles = document.getElementById("listaPerfiles");
let fotoPerfilSeleccionada = "";
let paginaActual = null;
let objetivoCarruselesActual = null;
let perfilSeleccionadoId = null;
let eventoInstalacionPendiente = null;
const recomendaciones = {
    dashboard: [
        { icono: "💧", titulo: "Hidrátate durante el día", texto: "Ten agua a la mano y toma pequeños sorbos con regularidad." },
        { icono: "🥗", titulo: "Dale color a tu plato", texto: "Combina frutas y verduras de distintos colores a lo largo de la semana." },
        { icono: "🍽️", titulo: "Come con calma", texto: "Tomarte tu tiempo puede ayudarte a notar mejor cuándo estás satisfecho." },
        { icono: "🌙", titulo: "Cuida tu descanso", texto: "Mantener horarios de sueño regulares también favorece tus hábitos diarios." },
        { icono: "🎯", titulo: "Avanza paso a paso", texto: "Los cambios pequeños y constantes suelen ser más fáciles de mantener." }
    ],
    dieta: [
        { icono: "🌾", titulo: "Incluye fibra", texto: "Avena, frijoles, lentejas, frutas y verduras son buenas fuentes de fibra." },
        { icono: "🥚", titulo: "Varía tus proteínas", texto: "Puedes alternar entre huevo, legumbres, pescado, pollo, tofu y otras opciones." },
        { icono: "🥕", titulo: "Planea con flexibilidad", texto: "Tener ingredientes sencillos listos facilita preparar comidas equilibradas." },
        { icono: "🍊", titulo: "Elige alimentos variados", texto: "Combinar diferentes grupos de alimentos aporta variedad a tus comidas." },
        { icono: "🧂", titulo: "Prueba nuevos sabores", texto: "Hierbas, especias, limón y ajo ayudan a dar sabor a tus platillos." }
    ],
    rutinas: [
        { icono: "🚶", titulo: "Empieza a tu ritmo", texto: "Elige una intensidad que te permita moverte con comodidad y buena técnica." },
        { icono: "🧘", titulo: "Haz una pausa si hace falta", texto: "Descansar entre ejercicios es parte de una rutina segura y sostenible." },
        { icono: "📅", titulo: "La constancia cuenta", texto: "Una actividad breve que disfrutes puede ser un buen comienzo." },
        { icono: "👟", titulo: "Muévete como prefieras", texto: "Caminar, bailar o andar en bicicleta también cuentan como actividad." },
        { icono: "🛑", titulo: "Escucha a tu cuerpo", texto: "Detente si sientes dolor o malestar y busca orientación profesional si lo necesitas." }
    ],
    progreso: [
        { icono: "📆", titulo: "Observa las tendencias", texto: "Un registro aislado no cuenta toda la historia; los hábitos se construyen con tiempo." },
        { icono: "⚖️", titulo: "Registra en condiciones similares", texto: "Si decides pesarte, hacerlo en horarios parecidos facilita comparar los datos." },
        { icono: "🌱", titulo: "Reconoce otros avances", texto: "Más energía, mejor descanso y hábitos constantes también son progreso." },
        { icono: "💚", titulo: "Sé amable contigo", texto: "El peso puede variar naturalmente; enfócate también en cómo te sientes." },
        { icono: "📝", titulo: "Mantén un ritmo cómodo", texto: "Registra tus datos con la frecuencia que te resulte útil y tranquila." }
    ],
    perfil: [
        { icono: "🔄", titulo: "Actualiza tus datos", texto: "Revisa tu perfil cuando cambien tus medidas o tu nivel de actividad." },
        { icono: "🎯", titulo: "Elige metas realistas", texto: "Tus objetivos pueden ajustarse a tus necesidades y circunstancias." },
        { icono: "🩺", titulo: "Las métricas son estimaciones", texto: "Consulta a un profesional de salud para recibir orientación personalizada." },
        { icono: "🔒", titulo: "Tu perfil se guarda aquí", texto: "NutriTrack conserva los datos de este perfil en el almacenamiento de tu navegador." },
        { icono: "✨", titulo: "Personaliza tu experiencia", texto: "Mantener tu información al día ayuda a que las estimaciones sean más relevantes." }
    ]
};
const indicesRecomendacion = Object.fromEntries(paginas.map((pagina) => [pagina, -1]));
const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
const diaActual = diasSemana[(new Date().getDay() + 6) % diasSemana.length];
const contenidoCarruseles = {
    dieta: {
        selector: '[data-content-carousel="comidas"]',
        selectorDias: '[data-day-selector="dieta"]',
        diaSeleccionado: diaActual,
        indice: -1,
        dias: {
            lunes: [
                { icono: "🥣", titulo: "Desayuno", texto: "Avena con plátano, canela y yogur natural." },
                { icono: "🍲", titulo: "Comida", texto: "Pollo a la plancha con arroz, frijoles y ensalada." },
                { icono: "🥑", titulo: "Cena", texto: "Tostadas de frijol con aguacate, lechuga y queso." }
            ],
            martes: [
                { icono: "🍳", titulo: "Desayuno", texto: "Huevos con espinaca y tortilla de maíz." },
                { icono: "🐟", titulo: "Comida", texto: "Pescado al horno con papa y verduras." },
                { icono: "🥗", titulo: "Cena", texto: "Ensalada de garbanzos con pepino, jitomate y limón." }
            ],
            miercoles: [
                { icono: "🍓", titulo: "Desayuno", texto: "Yogur natural con fruta, avena y semillas." },
                { icono: "🌮", titulo: "Comida", texto: "Tacos de carne magra con nopales y salsa." },
                { icono: "🍵", titulo: "Cena", texto: "Sopa de verduras con queso panela y tostadas." }
            ],
            jueves: [
                { icono: "🥑", titulo: "Desayuno", texto: "Pan integral con aguacate y huevo." },
                { icono: "🫘", titulo: "Comida", texto: "Lentejas guisadas con verduras y arroz." },
                { icono: "🌯", titulo: "Cena", texto: "Quesadillas de champiñones con pico de gallo." }
            ],
            viernes: [
                { icono: "🥤", titulo: "Desayuno", texto: "Licuado de leche o bebida vegetal con plátano y avena." },
                { icono: "🍝", titulo: "Comida", texto: "Pasta con atún, jitomate y verduras." },
                { icono: "🥙", titulo: "Cena", texto: "Tacos de frijoles con col, aguacate y salsa." }
            ],
            sabado: [
                { icono: "🥞", titulo: "Desayuno", texto: "Hotcakes de avena con fruta fresca." },
                { icono: "🍗", titulo: "Comida", texto: "Pollo al horno con camote y verduras asadas." },
                { icono: "🥪", titulo: "Cena", texto: "Sándwich integral de queso, jitomate y hojas verdes." }
            ],
            domingo: [
                { icono: "🍉", titulo: "Desayuno", texto: "Fruta de temporada con yogur y granola." },
                { icono: "🌶️", titulo: "Comida", texto: "Enchiladas de pollo o frijol con ensalada." },
                { icono: "🍳", titulo: "Cena", texto: "Omelette de verduras con una rebanada de pan integral." }
            ]
        }
    },
    rutinas: {
        selector: '[data-content-carousel="rutinas"]',
        selectorDias: '[data-day-selector="rutinas"]',
        diaSeleccionado: diaActual,
        indice: -1,
        dias: {
            lunes: [
                { icono: "🏋️", titulo: "Fuerza · piernas", texto: "Haz sentadillas a una silla, puente de glúteos y elevaciones de pantorrilla, a tu ritmo." },
                { icono: "🦵", titulo: "Estabilidad", texto: "Practica desplantes asistidos y equilibrio con apoyo cerca." },
                { icono: "🚶", titulo: "Caminata", texto: "Termina con 15–25 minutos de caminata cómoda." }
            ],
            martes: [
                { icono: "💪", titulo: "Fuerza · parte superior", texto: "Prueba flexiones apoyadas en pared, remo con banda y elevaciones de brazos ligeras." },
                { icono: "🧘", titulo: "Movilidad", texto: "Realiza círculos de hombros y estiramientos suaves sin forzar el movimiento." },
                { icono: "🚴", titulo: "Cardio suave", texto: "Elige bicicleta o caminata durante 15–25 minutos a ritmo cómodo." }
            ],
            miercoles: [
                { icono: "🚶", titulo: "Actividad ligera", texto: "Camina, baila o pedalea durante 20–30 minutos a una intensidad moderada." },
                { icono: "🧘", titulo: "Movilidad y postura", texto: "Dedica unos minutos a estirar suavemente espalda, cadera y piernas." },
                { icono: "😌", titulo: "Recuperación activa", texto: "Si lo necesitas, elige un paseo corto y tranquilo o toma un descanso." }
            ],
            jueves: [
                { icono: "🏋️", titulo: "Fuerza · cuerpo completo", texto: "Combina sentadillas a silla, flexiones en pared y puente de glúteos." },
                { icono: "💪", titulo: "Circuito sencillo", texto: "Alterna ejercicios cómodos de piernas, brazos y abdomen, descansando entre ellos." },
                { icono: "🧘", titulo: "Estiramiento", texto: "Finaliza con estiramientos suaves y respiración tranquila." }
            ],
            viernes: [
                { icono: "🚴", titulo: "Cardio a tu elección", texto: "Prueba baile, bicicleta o una caminata de 20–30 minutos." },
                { icono: "🦵", titulo: "Piernas y equilibrio", texto: "Haz elevaciones de pantorrilla y ejercicios de equilibrio con apoyo." },
                { icono: "🌿", titulo: "Paseo al aire libre", texto: "Elige una ruta agradable y mantén un ritmo que puedas sostener." }
            ],
            sabado: [
                { icono: "🎵", titulo: "Movimiento divertido", texto: "Baila o elige una actividad que disfrutes durante 20 minutos." },
                { icono: "🏋️", titulo: "Fuerza ligera", texto: "Repite tus ejercicios favoritos de la semana con buena técnica y pausas." },
                { icono: "🧘", titulo: "Movilidad", texto: "Haz una sesión corta de estiramientos cómodos para todo el cuerpo." }
            ],
            domingo: [
                { icono: "😌", titulo: "Descanso", texto: "Tómate un día de recuperación; descansar también forma parte de la rutina." },
                { icono: "🚶", titulo: "Paseo opcional", texto: "Si te apetece, haz una caminata ligera sin exigirte un objetivo." },
                { icono: "🗓️", titulo: "Prepara tu semana", texto: "Elige los días y actividades que mejor se adapten a tu tiempo y energía." }
            ]
        }
    }
};
const planesPorObjetivo = {
    bajar: {
        dieta: {
            lunes: ["Avena con manzana, canela y yogur natural.", "Pollo con frijoles, arroz y una buena porción de verduras.", "Tostadas de atún con lechuga, jitomate y aguacate."],
            martes: ["Huevo con nopales y tortillas de maíz.", "Pescado al horno con papa y verduras de temporada.", "Ensalada de garbanzos con pepino, jitomate y limón."],
            miercoles: ["Yogur natural con fruta, avena y semillas.", "Tacos de pollo con nopales y salsa fresca.", "Sopa de verduras con queso panela y tostadas horneadas."],
            jueves: ["Pan integral con aguacate, huevo y jitomate.", "Lentejas guisadas con verduras y ensalada.", "Quesadillas de champiñones con pico de gallo."],
            viernes: ["Avena con plátano y un poco de crema de cacahuate.", "Pasta con atún, jitomate y verduras.", "Tacos de frijoles con col y salsa."],
            sabado: ["Hotcakes de avena con fruta fresca.", "Pollo al horno con camote y verduras asadas.", "Sándwich integral de queso panela y vegetales."],
            domingo: ["Fruta de temporada con yogur natural y avena.", "Enchiladas de pollo o frijol con ensalada.", "Omelette de verduras con pan integral."]
        },
        rutinas: {
            lunes: [
                { icono: "🏋️", titulo: "Fuerza de cuerpo completo", texto: "Haz sentadillas a una silla, flexiones en pared y puente de glúteos a un ritmo cómodo." },
                { icono: "🚶", titulo: "Caminata constante", texto: "Camina de 15 a 25 minutos a una intensidad que puedas sostener." },
                { icono: "🧘", titulo: "Movilidad suave", texto: "Termina con movimientos cómodos de cadera, hombros y espalda." }
            ],
            martes: [
                { icono: "🚴", titulo: "Cardio de bajo impacto", texto: "Elige bicicleta o caminata durante 20 a 30 minutos, ajustando el ritmo a tu condición." },
                { icono: "💪", titulo: "Circuito ligero", texto: "Alterna ejercicios sencillos de brazos y piernas, tomando pausas cuando lo necesites." },
                { icono: "🌿", titulo: "Paseo activo", texto: "Prueba una ruta agradable y mantén un paso que te permita conversar." }
            ],
            miercoles: [
                { icono: "🏋️", titulo: "Fuerza con apoyo", texto: "Practica remo con banda, levantarte de una silla y flexiones en pared." },
                { icono: "🚶", titulo: "Caminata corta", texto: "Haz una caminata cómoda de 15 a 20 minutos." },
                { icono: "😌", titulo: "Recuperación", texto: "Si sientes cansancio, elige movilidad suave o toma un día de descanso." }
            ],
            jueves: [
                { icono: "🎵", titulo: "Cardio divertido", texto: "Baila o elige una actividad que disfrutes durante 20 minutos." },
                { icono: "🦵", titulo: "Piernas y equilibrio", texto: "Haz elevaciones de pantorrilla y sentadillas asistidas, con apoyo cerca." },
                { icono: "🧘", titulo: "Estiramientos cómodos", texto: "Dedica unos minutos a estirar suavemente sin forzar ninguna postura." }
            ],
            viernes: [
                { icono: "💪", titulo: "Fuerza de cuerpo completo", texto: "Combina puente de glúteos, remo con banda y ejercicios de pie con apoyo." },
                { icono: "🚴", titulo: "Cardio moderado", texto: "Camina o pedalea de 15 a 25 minutos a un paso cómodo." },
                { icono: "🌬️", titulo: "Vuelta a la calma", texto: "Baja el ritmo poco a poco y respira con tranquilidad al finalizar." }
            ],
            sabado: [
                { icono: "🚶", titulo: "Actividad al aire libre", texto: "Da un paseo o elige una actividad recreativa que te guste." },
                { icono: "🎵", titulo: "Baile a tu ritmo", texto: "Pon música y muévete durante unos minutos, haciendo pausas si lo necesitas." },
                { icono: "🧘", titulo: "Movilidad ligera", texto: "Prueba estiramientos sencillos para recuperarte de la semana." }
            ],
            domingo: [
                { icono: "😌", titulo: "Descanso", texto: "Recuperarte también es parte de un plan de actividad sostenible." },
                { icono: "🌿", titulo: "Paseo opcional", texto: "Si te apetece, haz una caminata tranquila sin perseguir una meta de tiempo." },
                { icono: "🗓️", titulo: "Planea tu semana", texto: "Elige actividades que disfrutes y que se adapten a tu energía." }
            ]
        }
    },
    ganar: {
        dieta: {
            lunes: ["Avena con leche, plátano, yogur y nueces.", "Pollo con arroz, frijoles y verduras.", "Tostadas de frijoles con queso, aguacate y huevo."],
            martes: ["Huevos con espinaca, queso y tortillas.", "Pescado con papa, arroz y verduras.", "Ensalada de garbanzos con pan integral y aguacate."],
            miercoles: ["Yogur con fruta, avena y crema de cacahuate.", "Tacos de carne magra con frijoles y nopales.", "Sopa de verduras con queso panela y quesadillas."],
            jueves: ["Pan integral con aguacate, huevo y yogur.", "Lentejas con arroz, verduras y queso fresco.", "Quesadillas de champiñones con frijoles."],
            viernes: ["Licuado de leche, plátano y avena acompañado de huevo.", "Pasta con atún, jitomate y verduras.", "Tacos de frijoles con queso y aguacate."],
            sabado: ["Hotcakes de avena con yogur y fruta.", "Pollo con camote, arroz y verduras asadas.", "Sándwich integral de queso, huevo y vegetales."],
            domingo: ["Yogur con fruta, granola y semillas.", "Enchiladas de pollo o frijol con arroz y ensalada.", "Omelette de verduras con frijoles y pan integral."]
        },
        rutinas: {
            lunes: [
                { icono: "🏋️", titulo: "Fuerza · piernas", texto: "Practica sentadillas a una silla, puente de glúteos y desplantes asistidos, cuidando la técnica." },
                { icono: "🦵", titulo: "Fuerza · complemento", texto: "Agrega elevaciones de pantorrilla y descansa entre series según lo necesites." },
                { icono: "🧘", titulo: "Movilidad y recuperación", texto: "Termina con movilidad suave de cadera y piernas." }
            ],
            martes: [
                { icono: "💪", titulo: "Fuerza · parte superior", texto: "Haz flexiones apoyadas y remo con banda; elige una resistencia que controles." },
                { icono: "🏋️", titulo: "Brazos y hombros", texto: "Prueba ejercicios ligeros de brazos, manteniendo movimientos controlados." },
                { icono: "😌", titulo: "Recuperación", texto: "Deja que los músculos trabajados descansen; un paseo suave es opcional." }
            ],
            miercoles: [
                { icono: "🚶", titulo: "Actividad ligera", texto: "Camina de 15 a 25 minutos a un ritmo cómodo para mantenerte en movimiento." },
                { icono: "🧘", titulo: "Movilidad", texto: "Dedica unos minutos a estiramientos suaves y movilidad general." },
                { icono: "🌬️", titulo: "Descanso activo", texto: "Prioriza la recuperación y evita entrenar con dolor o fatiga intensa." }
            ],
            jueves: [
                { icono: "🏋️", titulo: "Fuerza · cuerpo completo", texto: "Combina sentadillas, remo con banda y flexiones apoyadas con descansos suficientes." },
                { icono: "💪", titulo: "Glúteos y abdomen", texto: "Prueba puente de glúteos y ejercicios de abdomen que puedas realizar con control." },
                { icono: "🧘", titulo: "Vuelta a la calma", texto: "Finaliza con respiración tranquila y estiramientos cómodos." }
            ],
            viernes: [
                { icono: "💪", titulo: "Fuerza · parte superior", texto: "Repite remo con banda y flexiones apoyadas si te sientes recuperado." },
                { icono: "🏋️", titulo: "Fuerza · piernas", texto: "Elige sentadillas asistidas o elevaciones de cadera con buena técnica." },
                { icono: "😌", titulo: "Descanso entre sesiones", texto: "Deja tiempo para recuperarte y ajusta la sesión a cómo te sientes." }
            ],
            sabado: [
                { icono: "🚴", titulo: "Cardio suave", texto: "Haz bicicleta o una caminata tranquila durante 15 a 20 minutos." },
                { icono: "🧘", titulo: "Movilidad general", texto: "Prueba movimientos suaves para hombros, cadera y tobillos." },
                { icono: "🎯", titulo: "Técnica", texto: "Repasa con calma los movimientos de fuerza que quieras mejorar, sin añadir carga si no la controlas." }
            ],
            domingo: [
                { icono: "😌", titulo: "Descanso", texto: "Un día de descanso ayuda a recuperarte entre sesiones de fuerza." },
                { icono: "🚶", titulo: "Paseo opcional", texto: "Si te apetece, haz una caminata ligera y relajada." },
                { icono: "🗓️", titulo: "Planea tus sesiones", texto: "Organiza tus días de fuerza dejando tiempo de recuperación entre sesiones exigentes." }
            ]
        }
    }
};

document.addEventListener("click", (event) => {
    const botonDia = event.target.closest("[data-day-selector] .day-button");
    if (botonDia) {
        const selectorDias = botonDia.closest("[data-day-selector]");
        const carrusel = contenidoCarruseles[selectorDias.dataset.daySelector];
        carrusel.diaSeleccionado = botonDia.dataset.day;
        carrusel.indice = -1;
        selectorDias.querySelectorAll(".day-button").forEach((boton) => {
            const seleccionado = boton === botonDia;
            boton.classList.toggle("active", seleccionado);
            boton.setAttribute("aria-pressed", String(seleccionado));
        });
        avanzarContenidoCarrusel(selectorDias.dataset.daySelector, 1);
        return;
    }

    const control = event.target.closest("[data-recommendation-direction]");
    if (control && paginaActual) {
        event.preventDefault();
        avanzarRecomendacion(paginaActual, Number(control.dataset.recommendationDirection));
    }

    const controlContenido = event.target.closest("[data-content-direction]");
    if (controlContenido && paginaActual) {
        event.preventDefault();
        avanzarContenidoCarrusel(paginaActual, Number(controlContenido.dataset.contentDirection));
    }
});

setInterval(() => {
    if (paginaActual) {
        avanzarRecomendacion(paginaActual, 1);
        avanzarContenidoCarrusel(paginaActual, 1);
    }
}, 7000);

// El acceso directo del inicio abre la sección completa de progreso.
verProgreso.addEventListener("click", () => mostrarPagina("progreso"));

// Carga los perfiles locales; la sesión se elige explícitamente desde bienvenida.
let perfilesGuardados = cargarPerfiles();
let usuarioActual = null;
let perfilActualId = null;

if ("serviceWorker" in navigator && ["https:", "http:"].includes(location.protocol)) {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
        console.error("No se pudo registrar el modo sin conexión de NutriTrack.", error);
    });
}

const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const estaInstalada = window.matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true;

if (esIOS && !estaInstalada) {
    btnInstalarApp.classList.remove("hidden");
}

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    eventoInstalacionPendiente = event;
    btnInstalarApp.classList.remove("hidden");
});

btnInstalarApp.addEventListener("click", async () => {
    if (eventoInstalacionPendiente) {
        eventoInstalacionPendiente.prompt();
        await eventoInstalacionPendiente.userChoice;
        eventoInstalacionPendiente = null;
        btnInstalarApp.classList.add("hidden");
        return;
    }

    if (esIOS) {
        alert("Para instalar NutriTrack: toca Compartir en Safari y selecciona «Agregar a pantalla de inicio».");
    }
});

window.addEventListener("appinstalled", () => {
    eventoInstalacionPendiente = null;
    btnInstalarApp.classList.add("hidden");
});

// Prepara una vista previa local; la foto se persiste al guardar el formulario.
fotoPerfilInput.addEventListener("change", async () => {
    fotoPerfilError.textContent = "";
    const archivo = fotoPerfilInput.files[0];
    if (!archivo) {
        return;
    }

    try {
        fotoPerfilSeleccionada = await prepararFotoPerfil(archivo);
        actualizarVistaFoto(fotoPerfilSeleccionada);
    } catch (error) {
        console.error("No se pudo procesar la foto de perfil.", error);
        fotoPerfilError.textContent = error.message;
        fotoPerfilInput.value = "";
    }
});

prepararPantallaBienvenida();

btnComenzar.addEventListener("click", () => {
    usuarioActual = null;
    perfilActualId = null;
    perfilForm.reset();
    fotoPerfilSeleccionada = "";
    fotoPerfilError.textContent = "";
    btnCerrarSesion.classList.add("hidden");
    document.getElementById("perfilTitulo").textContent = "Crear Perfil";
    actualizarVistaFoto("");
    splash.classList.add("hidden");
    onboarding.classList.remove("hidden");
});

btnIniciarSesion.addEventListener("click", () => {
    const perfilElegido = perfilesGuardados.find((perfilGuardado) =>
        perfilGuardado.id === perfilSeleccionadoId
    );
    if (perfilElegido) {
        perfilActualId = perfilElegido.id;
        usuarioActual = perfilElegido;
        mostrarDashboard(usuarioActual);
    }
});

listaPerfiles.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-profile-id]");
    if (!boton) {
        return;
    }

    perfilSeleccionadoId = boton.dataset.profileId;
    listaPerfiles.querySelectorAll("[data-profile-id]").forEach((perfilBoton) => {
        const seleccionado = perfilBoton === boton;
        perfilBoton.classList.toggle("selected", seleccionado);
        perfilBoton.setAttribute("aria-pressed", String(seleccionado));
    });
});

btnCerrarSesion.addEventListener("click", cerrarSesion);

btnSiguiente.addEventListener("click", () => {
    onboarding.classList.add("hidden");
    perfil.classList.remove("hidden");
});

// Detecta qué botón de la barra inferior se pulsó y abre esa sección.
bottomNav.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-tab]");
    if (boton) {
        mostrarPagina(boton.dataset.tab);
    }
});

// Valida y guarda el perfil; luego actualiza el inicio con sus metas estimadas.
perfilForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const datos = new FormData(perfilForm);
    const perfilActualizado = {
        id: perfilActualId || crearIdPerfil(),
        nombre: datos.get("nombre").trim(),
        edad: Number(datos.get("edad")),
        peso: Number(datos.get("peso")),
        altura: Number(datos.get("altura")),
        sexo: datos.get("sexo"),
        actividad: Number(datos.get("actividad")),
        objetivo: datos.get("objetivo")
    };
    perfilActualizado.foto = fotoPerfilSeleccionada || (usuarioActual && usuarioActual.foto) || "";
    const indicePerfil = perfilesGuardados.findIndex((perfilGuardado) =>
        perfilGuardado.id === perfilActualizado.id
    );
    if (indicePerfil === -1) {
        perfilesGuardados.push(perfilActualizado);
    } else {
        perfilesGuardados[indicePerfil] = perfilActualizado;
    }
    if (!guardarPerfiles()) {
        fotoPerfilError.textContent =
            "No se pudo guardar el perfil en este navegador. Revisa el espacio disponible e inténtalo de nuevo.";
        return;
    }

    usuarioActual = perfilActualizado;
    perfilActualId = perfilActualizado.id;
    fotoPerfilSeleccionada = "";
    mostrarDashboard(usuarioActual);
});

// Guarda cada peso en el historial y actualiza el peso actual del perfil.
progresoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const peso = Number(new FormData(progresoForm).get("peso"));
    const registros = cargarProgreso();
    registros.push({
        peso,
        fecha: new Date().toLocaleDateString("es-MX")
    });

    try {
        localStorage.setItem(claveProgresoPerfil(), JSON.stringify(registros));
    } catch (error) {
        console.error("No se pudo guardar el registro de peso.", error);
        alert("No se pudo guardar el registro en este navegador.");
        return;
    }

    usuarioActual.peso = peso;
    const indicePerfil = perfilesGuardados.findIndex((perfilGuardado) =>
        perfilGuardado.id === perfilActualId
    );
    if (indicePerfil !== -1) {
        perfilesGuardados[indicePerfil] = usuarioActual;
        if (!guardarPerfiles()) {
            alert("Se guardó el registro, pero no se pudo actualizar el peso del perfil.");
        }
    }

    mostrarDashboard(usuarioActual);
    progresoForm.reset();
    mostrarPagina("progreso");
});

// Migra el perfil anterior y su historial al formato de varios perfiles.
function cargarPerfiles() {
    let perfilesGuardados;
    let perfilAnterior;

    try {
        perfilesGuardados = localStorage.getItem("nutriTrackPerfiles");
        perfilAnterior = localStorage.getItem("nutriTrackPerfil");
    } catch (error) {
        console.error("No se pudieron leer los perfiles guardados.", error);
        alert("No se pudo acceder a los perfiles guardados en este navegador.");
        return [];
    }

    if (perfilesGuardados) {
        try {
            const perfiles = JSON.parse(perfilesGuardados);
            if (!Array.isArray(perfiles)) {
                throw new Error("La lista guardada no es válida.");
            }
            return perfiles.filter((perfilGuardado) =>
                perfilGuardado && typeof perfilGuardado === "object" &&
                typeof perfilGuardado.nombre === "string" &&
                typeof perfilGuardado.id === "string"
            );
        } catch (error) {
            console.error("La lista de perfiles guardada no tiene un formato válido.", error);
            alert("No se pudo leer la lista de perfiles guardada. Puedes crear un perfil nuevo.");
            return [];
        }
    }

    if (!perfilAnterior) {
        return [];
    }

    try {
        const perfil = JSON.parse(perfilAnterior);
        if (!perfil || typeof perfil !== "object" || typeof perfil.nombre !== "string") {
            throw new Error("El perfil guardado no es válido.");
        }

        perfil.id = perfil.id || crearIdPerfil();
        const perfiles = [perfil];
        localStorage.setItem("nutriTrackPerfiles", JSON.stringify(perfiles));

        const progresoAnterior = localStorage.getItem("nutriTrackProgreso");
        const claveProgreso = `nutriTrackProgreso_${perfil.id}`;
        if (progresoAnterior && !localStorage.getItem(claveProgreso)) {
            localStorage.setItem(claveProgreso, progresoAnterior);
        }
        return perfiles;
    } catch (error) {
        console.error("No se pudo migrar el perfil guardado.", error);
        alert("No se pudo preparar el perfil anterior. Los datos originales se conservaron.");
        return [];
    }
}

function guardarPerfiles() {
    try {
        localStorage.setItem("nutriTrackPerfiles", JSON.stringify(perfilesGuardados));
        return true;
    } catch (error) {
        console.error("No se pudieron guardar los perfiles.", error);
        alert("No se pudieron guardar los perfiles en este navegador.");
        return false;
    }
}

function crearIdPerfil() {
    return `perfil-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function claveProgresoPerfil() {
    return `nutriTrackProgreso_${perfilActualId}`;
}

// Ofrece elegir un perfil guardado o crear uno nuevo.
function prepararPantallaBienvenida() {
    const mensaje = splash.querySelector("p");
    const hayPerfiles = perfilesGuardados.length > 0;
    perfilSeleccionadoId = hayPerfiles ? perfilesGuardados[0].id : null;

    perfilesGuardadosElement.classList.toggle("hidden", !hayPerfiles);
    btnIniciarSesion.classList.toggle("hidden", !hayPerfiles);
    mensaje.textContent = hayPerfiles
        ? "Selecciona un perfil para continuar o crea uno nuevo."
        : "Controla tu nutrición y alcanza tus metas";

    listaPerfiles.replaceChildren();
    perfilesGuardados.forEach((perfilGuardado, indice) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = `saved-profile${indice === 0 ? " selected" : ""}`;
        boton.dataset.profileId = perfilGuardado.id;
        boton.setAttribute("aria-pressed", String(indice === 0));
        boton.textContent = `👤 ${perfilGuardado.nombre}`;
        listaPerfiles.appendChild(boton);
    });
}

// Cierra la sesión actual sin borrar perfiles ni historiales.
function cerrarSesion() {
    usuarioActual = null;
    perfilActualId = null;
    paginas.forEach((pagina) => {
        document.getElementById(pagina).classList.add("hidden");
    });

    bottomNav.classList.add("hidden");
    onboarding.classList.add("hidden");
    splash.classList.remove("hidden");
    prepararPantallaBienvenida();
}

// Recupera el historial de pesos guardado en el navegador.
function cargarProgreso() {
    try {
        if (!perfilActualId) {
            return [];
        }
        const registros = JSON.parse(localStorage.getItem(claveProgresoPerfil()) || "[]");
        return Array.isArray(registros) ? registros : [];
    } catch (error) {
        console.error("No se pudo leer el historial de progreso.", error);
        alert("No se pudo leer el historial guardado.");
        return [];
    }
}

// Calcula estimaciones de IMC, calorías, macronutrientes y agua desde el perfil.
function calcularEstimaciones(usuario) {
    const alturaMetros = usuario.altura / 100;
    const imc = usuario.peso / (alturaMetros * alturaMetros);
    const ajusteSexo = usuario.sexo === "hombre" ? 5 : -161;
    const metabolismoBasal =
        10 * usuario.peso + 6.25 * usuario.altura - 5 * usuario.edad + ajusteSexo;
    const caloriasMantenimiento = metabolismoBasal * usuario.actividad;
    const ajusteObjetivo = {
        bajar: -300,
        mantener: 0,
        ganar: 200
    }[usuario.objetivo];
    const calorias = Math.max(1200, Math.round(caloriasMantenimiento + ajusteObjetivo));

    return {
        imc: imc.toFixed(1),
        calorias,
        proteina: Math.round((calorias * 0.25) / 4),
        carbohidratos: Math.round((calorias * 0.45) / 4),
        grasas: Math.round((calorias * 0.3) / 9),
        agua: (usuario.peso * 0.035).toFixed(1)
    };
}

// Rellena los valores del inicio y hace visible la navegación de la app.
function mostrarDashboard(usuario) {
    const estimaciones = calcularEstimaciones(usuario);
    actualizarObjetivoPlanes(usuario);
    document.getElementById("saludo").textContent = `Hola, ${usuario.nombre} 👋`;
    document.getElementById("resumenPerfil").textContent =
        `${usuario.peso} kg · ${usuario.altura} cm · IMC estimado: ${estimaciones.imc} · Objetivo: ${etiquetaObjetivo(usuario.objetivo)}`;
    document.getElementById("calorias").textContent = estimaciones.calorias;
    document.getElementById("proteina").textContent = `${estimaciones.proteina} g/día`;
    document.getElementById("carbohidratos").textContent = `${estimaciones.carbohidratos} g/día`;
    document.getElementById("grasas").textContent = `${estimaciones.grasas} g/día`;
    document.getElementById("agua").textContent = `${estimaciones.agua} L/día`;
    document.getElementById("dietaCalorias").textContent = estimaciones.calorias;
    document.getElementById("dietaMacros").textContent =
        `${estimaciones.proteina} g proteína · ${estimaciones.carbohidratos} g carbohidratos · ${estimaciones.grasas} g grasas`;
    mostrarResumenProgreso();
    actualizarVistaFoto(usuario.foto || "");

    splash.classList.add("hidden");
    onboarding.classList.add("hidden");
    bottomNav.classList.remove("hidden");
    mostrarPagina("dashboard");
}

// Actualiza la etiqueta de los planes y reinicia sus carruseles si cambia la meta.
function actualizarObjetivoPlanes(usuario) {
    const objetivos = {
        bajar: "bajar de peso",
        mantener: "mantener tu peso",
        ganar: "ganar músculo"
    };
    const objetivo = objetivos[usuario.objetivo] ? usuario.objetivo : "mantener";

    document.querySelectorAll("[data-plan-goal]").forEach((etiqueta) => {
        etiqueta.textContent = `Plan enfocado en ${objetivos[objetivo]}. Son ideas generales; ajusta la actividad y las comidas a tus necesidades.`;
    });

    if (objetivoCarruselesActual !== objetivo) {
        objetivoCarruselesActual = objetivo;
        Object.values(contenidoCarruseles).forEach((carrusel) => {
            carrusel.indice = -1;
        });
    }
}

// Muestra la pestaña solicitada y marca su botón como seleccionado.
function mostrarPagina(id) {
    if (!paginas.includes(id)) {
        return;
    }

    if (paginaActual !== id) {
        paginaActual = id;
        avanzarRecomendacion(id, 1);
        avanzarContenidoCarrusel(id, 1);
    }

    paginas.forEach((pagina) => {
        document.getElementById(pagina).classList.toggle("hidden", pagina !== id);
    });

    if (id === "perfil" && usuarioActual) {
        rellenarFormularioPerfil(usuarioActual);
    }
    if (id === "progreso") {
        mostrarRegistrosProgreso();
    }

    bottomNav.querySelectorAll(".nav-item").forEach((boton) => {
        const seleccionado = boton.dataset.tab === id;
        boton.classList.toggle("active", seleccionado);
        if (seleccionado) {
            boton.setAttribute("aria-current", "page");
        } else {
            boton.removeAttribute("aria-current");
        }
    });
}

// Actualiza el consejo visible y el indicador del carrusel de cada pestaña.
function avanzarRecomendacion(pagina, direccion) {
    const consejos = recomendaciones[pagina];
    indicesRecomendacion[pagina] =
        (indicesRecomendacion[pagina] + direccion + consejos.length) % consejos.length;
    const recomendacion = consejos[indicesRecomendacion[pagina]];

    document.querySelectorAll(".recommendation-carousel").forEach((carrusel) => {
        if (carrusel.closest(`#${pagina}`)?.id !== pagina) {
            return;
        }

        carrusel.querySelector("[data-recommendation-icon]").textContent = recomendacion.icono;
        carrusel.querySelector("[data-recommendation-title]").textContent = recomendacion.titulo;
        carrusel.querySelector("[data-recommendation-text]").textContent = recomendacion.texto;
        carrusel.querySelector("[data-recommendation-counter]").textContent =
            `${indicesRecomendacion[pagina] + 1} / ${consejos.length}`;
    });
}

// Avanza la idea de comida o rutina de la pestaña activa.
function avanzarContenidoCarrusel(pagina, direccion) {
    const carrusel = contenidoCarruseles[pagina];
    if (!carrusel) {
        return;
    }

    const objetivo = usuarioActual && planesPorObjetivo[usuarioActual.objetivo]
        ? usuarioActual.objetivo
        : "mantener";
    const plan = planesPorObjetivo[objetivo]?.[pagina] || carrusel.dias;
    const elementos = plan[carrusel.diaSeleccionado] || carrusel.dias[carrusel.diaSeleccionado];
    carrusel.indice = (carrusel.indice + direccion + elementos.length) % elementos.length;
    const elementoBase = elementos[carrusel.indice];
    const elemento = typeof elementoBase === "string"
        ? {
            icono: ["🥣", "🍲", "🍽️"][carrusel.indice],
            titulo: ["Desayuno", "Comida", "Cena"][carrusel.indice],
            texto: elementoBase
        }
        : elementoBase;
    const contenedor = document.querySelector(carrusel.selector);
    const selectorDias = document.querySelector(carrusel.selectorDias);
    selectorDias.querySelectorAll(".day-button").forEach((boton) => {
        const seleccionado = boton.dataset.day === carrusel.diaSeleccionado;
        boton.classList.toggle("active", seleccionado);
        boton.setAttribute("aria-pressed", String(seleccionado));
    });
    contenedor.querySelector("[data-content-icon]").textContent = elemento.icono;
    contenedor.querySelector("[data-content-title]").textContent = elemento.titulo;
    contenedor.querySelector("[data-content-text]").textContent = elemento.texto;
    contenedor.querySelector("[data-content-counter]").textContent =
        `${carrusel.indice + 1} / ${elementos.length}`;
}

// Copia los datos guardados al formulario cuando se abre la pestaña Perfil.
function rellenarFormularioPerfil(usuario) {
    document.getElementById("perfilTitulo").textContent = "Tu perfil";
    btnCerrarSesion.classList.remove("hidden");
    fotoPerfilSeleccionada = "";
    fotoPerfilError.textContent = "";
    fotoPerfilInput.value = "";
    actualizarVistaFoto(usuario.foto || "");

    Object.entries(usuario).forEach(([campo, valor]) => {
        const input = perfilForm.elements.namedItem(campo);
        if (input && campo !== "foto") {
            input.value = valor;
        }
    });
}

// Redimensiona la imagen y la convierte a JPEG para reducir el espacio guardado.
function prepararFotoPerfil(archivo) {
    if (!archivo.type.startsWith("image/")) {
        return Promise.reject(new Error("Selecciona un archivo de imagen."));
    }
    if (archivo.size > 5 * 1024 * 1024) {
        return Promise.reject(new Error("La imagen debe pesar menos de 5 MB."));
    }

    return new Promise((resolve, reject) => {
        const urlTemporal = URL.createObjectURL(archivo);
        const imagen = new Image();

        imagen.onload = () => {
            URL.revokeObjectURL(urlTemporal);
            const escala = Math.min(1, 256 / Math.max(imagen.width, imagen.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(imagen.width * escala);
            canvas.height = Math.round(imagen.height * escala);

            const contexto = canvas.getContext("2d");
            if (!contexto) {
                reject(new Error("El navegador no pudo preparar esta imagen."));
                return;
            }

            contexto.fillStyle = "#ffffff";
            contexto.fillRect(0, 0, canvas.width, canvas.height);
            contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg", 0.75));
        };

        imagen.onerror = () => {
            URL.revokeObjectURL(urlTemporal);
            reject(new Error("No se pudo abrir la imagen seleccionada."));
        };

        imagen.src = urlTemporal;
    });
}

// Mantiene sincronizadas las vistas previas de Perfil e Inicio.
function actualizarVistaFoto(foto) {
    const iconoPerfil = document.getElementById("fotoPerfilIcono");
    const fotoInicio = document.getElementById("fotoPerfilInicio");
    const iconoInicio = document.getElementById("fotoPerfilInicioIcono");

    fotoPerfilPreview.hidden = !foto;
    iconoPerfil.hidden = Boolean(foto);
    fotoInicio.hidden = !foto;
    iconoInicio.hidden = Boolean(foto);

    if (foto) {
        fotoPerfilPreview.src = foto;
        fotoInicio.src = foto;
    } else {
        fotoPerfilPreview.removeAttribute("src");
        fotoInicio.removeAttribute("src");
    }
}

// Presenta la lista completa de pesos en la pantalla Progreso.
function mostrarRegistrosProgreso() {
    const lista = document.getElementById("listaProgreso");
    lista.replaceChildren();

    cargarProgreso().slice().reverse().forEach((registro) => {
        const elemento = document.createElement("li");
        elemento.textContent = `${registro.fecha}: ${registro.peso} kg`;
        lista.appendChild(elemento);
    });

    if (lista.childElementCount === 0) {
        const elemento = document.createElement("li");
        elemento.textContent = "Todavía no hay registros.";
        lista.appendChild(elemento);
    }
}

// Presenta en Inicio hasta los tres registros de peso más recientes.
function mostrarResumenProgreso() {
    const lista = document.getElementById("resumenProgreso");
    lista.replaceChildren();

    const registros = cargarProgreso().slice(-3).reverse();
    if (registros.length === 0) {
        const elemento = document.createElement("li");
        elemento.className = "empty-progress";
        elemento.textContent = "Tus registros de peso aparecerán aquí.";
        lista.appendChild(elemento);
        return;
    }

    registros.forEach((registro) => {
        const elemento = document.createElement("li");
        const indicador = document.createElement("span");
        const detalle = document.createElement("span");
        indicador.className = "progress-indicator";
        indicador.setAttribute("aria-hidden", "true");
        detalle.textContent = `${registro.fecha} · ${registro.peso} kg`;
        elemento.append(indicador, detalle);
        lista.appendChild(elemento);
    });
}

// Convierte el valor interno del objetivo a una etiqueta legible.
function etiquetaObjetivo(objetivo) {
    return {
        bajar: "Bajar peso",
        mantener: "Mantener peso",
        ganar: "Ganar músculo"
    }[objetivo];
}
