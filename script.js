// ----------- DATOS DE SELECCIONES -----------
const grupos = {
  "A": [
    { nombre: "México", iso: "mx" },
    { nombre: "Sudáfrica", iso: "za" },
    { nombre: "Corea del Sur", iso: "kr" },
    { nombre: "República Checa", iso: "cz" }
  ],
  "B": [
    { nombre: "Canadá", iso: "ca" },
    { nombre: "Bosnia y Herzegovina", iso: "ba" },
    { nombre: "Qatar", iso: "qa" },
    { nombre: "Suiza", iso: "ch" }
  ],
  "C": [
    { nombre: "Brasil", iso: "br" },
    { nombre: "Marruecos", iso: "ma" },
    { nombre: "Haití", iso: "ht" },
    { nombre: "Escocia", iso: "gb-sct" }
  ],
  "D": [
    { nombre: "Estados Unidos", iso: "us" },
    { nombre: "Paraguay", iso: "py" },
    { nombre: "Australia", iso: "au" },
    { nombre: "Turquía", iso: "tr" }
  ],
  "E": [
    { nombre: "Alemania", iso: "de" },
    { nombre: "Curaçao", iso: "cw" },
    { nombre: "Costa de Marfil", iso: "ci" },
    { nombre: "Ecuador", iso: "ec" }
  ],
  "F": [
    { nombre: "Holanda", iso: "nl" },
    { nombre: "Japón", iso: "jp" },
    { nombre: "Suecia", iso: "se" },
    { nombre: "Túnez", iso: "tn" }
  ],
  "G": [
    { nombre: "Bélgica", iso: "be" },
    { nombre: "Egipto", iso: "eg" },
    { nombre: "Irán", iso: "ir" },
    { nombre: "Nueva Zelanda", iso: "nz" }
  ],
  "H": [
    { nombre: "España", iso: "es" },
    { nombre: "Cabo Verde", iso: "cv" },
    { nombre: "Arabia Saudí", iso: "sa" },
    { nombre: "Uruguay", iso: "uy" }
  ],
  "I": [
    { nombre: "Francia", iso: "fr" },
    { nombre: "Senegal", iso: "sn" },
    { nombre: "Irak", iso: "iq" },
    { nombre: "Noruega", iso: "no" }
  ],
  "J": [
    { nombre: "Argentina", iso: "ar" },
    { nombre: "Argelia", iso: "dz" },
    { nombre: "Austria", iso: "at" },
    { nombre: "Jordania", iso: "jo" }
  ],
  "K": [
    { nombre: "Portugal", iso: "pt" },
    { nombre: "República Democrática del Congo", iso: "cd" },
    { nombre: "Uzbekistán", iso: "uz" },
    { nombre: "Colombia", iso: "co" }
  ],
  "L": [
    { nombre: "Inglaterra", iso: "gb-eng" },
    { nombre: "Croacia", iso: "hr" },
    { nombre: "Ghana", iso: "gh" },
    { nombre: "Panamá", iso: "pa" }
  ]
};

// Lista plana de todas las selecciones, ordenada alfabéticamente
const todasLasSelecciones = Object.values(grupos)
  .flat()
  .map(e => e.nombre)
  .sort((a, b) => a.localeCompare(b, 'es'));

// Emparejamientos por jornada (round robin para 4 equipos: índices 0-3)
// Jornada 1: 0vs1, 2vs3 | Jornada 2: 0vs2, 1vs3 | Jornada 3: 0vs3, 1vs2
const emparejamientos = [
  [[0, 1], [2, 3]],
  [[0, 2], [1, 3]],
  [[0, 3], [1, 2]]
];

function bandera(iso) {
  return `https://flagcdn.com/48x36/${iso}.png`;
}

// ----------- GENERAR SELECT DE SELECCIONES -----------
function generarOpcionesSelecciones() {
  return todasLasSelecciones
    .map(nombre => `<option value="${nombre}">${nombre}</option>`)
    .join('');
}

function rellenarSelectsSelecciones() {
  const opciones = `<option value="">-- Selecciona --</option>` + generarOpcionesSelecciones();
  document.querySelectorAll('select.selector-seleccion').forEach(sel => {
    sel.innerHTML = opciones;
  });
}

// ----------- GENERAR PARTIDOS DE FASE DE GRUPOS -----------
function generarPartidos() {
  const contenedor = document.getElementById('contenedor-partidos');
  let html = '';

  for (let jornada = 1; jornada <= 3; jornada++) {
    html += `<h3>Jornada ${jornada}</h3>`;

    for (const letraGrupo of Object.keys(grupos)) {
      const equipos = grupos[letraGrupo];
      const pares = emparejamientos[jornada - 1];

      html += `<h4>Grupo ${letraGrupo}</h4>`;

      pares.forEach(([i, j], idx) => {
        const equipo1 = equipos[i];
        const equipo2 = equipos[j];
        const idBase = `g${letraGrupo}_j${jornada}_p${idx + 1}`;

        html += `
        <div class="partido">
          <div class="equipo">
            <img src="${bandera(equipo1.iso)}" alt="${equipo1.nombre}">
            <span>${equipo1.nombre}</span>
          </div>

          <div class="partido-controles">
            <div class="resultado-opciones">
              <label><input type="radio" name="${idBase}_resultado" value="gana1" required> Gana 1</label>
              <label><input type="radio" name="${idBase}_resultado" value="empate"> Empate</label>
              <label><input type="radio" name="${idBase}_resultado" value="gana2"> Gana 2</label>
            </div>
            <div class="goles">
              <input type="text" inputmode="numeric" pattern="[0-9]*" name="${idBase}_goles1" placeholder="0" required>
              <span class="vs">-</span>
              <input type="text" inputmode="numeric" pattern="[0-9]*" name="${idBase}_goles2" placeholder="0" required>
            </div>
          </div>

          <div class="equipo">
            <img src="${bandera(equipo2.iso)}" alt="${equipo2.nombre}">
            <span>${equipo2.nombre}</span>
          </div>
        </div>`;
      });
    }
  }

  contenedor.innerHTML = html;
}

// ----------- INICIALIZACIÓN -----------
document.addEventListener('DOMContentLoaded', () => {
  rellenarSelectsSelecciones();
  generarPartidos();
});
