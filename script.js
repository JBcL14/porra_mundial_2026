// ----------- DATOS DE SELECCIONES -----------
const grupos = {
  "A": [
    { nombre: "México", codigo: "MEX", iso: "mx" },
    { nombre: "Sudáfrica", codigo: "RSA", iso: "za" },
    { nombre: "Corea del Sur", codigo: "KOR", iso: "kr" },
    { nombre: "República Checa", codigo: "CZE", iso: "cz" }
  ],
  "B": [
    { nombre: "Canadá", codigo: "CAN", iso: "ca" },
    { nombre: "Bosnia y Herzegovina", codigo: "BIH", iso: "ba" },
    { nombre: "Qatar", codigo: "QAT", iso: "qa" },
    { nombre: "Suiza", codigo: "SUI", iso: "ch" }
  ],
  "C": [
    { nombre: "Brasil", codigo: "BRA", iso: "br" },
    { nombre: "Marruecos", codigo: "MAR", iso: "ma" },
    { nombre: "Haití", codigo: "HAI", iso: "ht" },
    { nombre: "Escocia", codigo: "SCO", iso: "gb-sct" }
  ],
  "D": [
    { nombre: "Estados Unidos", codigo: "USA", iso: "us" },
    { nombre: "Paraguay", codigo: "PAR", iso: "py" },
    { nombre: "Australia", codigo: "AUS", iso: "au" },
    { nombre: "Turquía", codigo: "TUR", iso: "tr" }
  ],
  "E": [
    { nombre: "Alemania", codigo: "GER", iso: "de" },
    { nombre: "Curaçao", codigo: "CUW", iso: "cw" },
    { nombre: "Costa de Marfil", codigo: "CIV", iso: "ci" },
    { nombre: "Ecuador", codigo: "ECU", iso: "ec" }
  ],
  "F": [
    { nombre: "Holanda", codigo: "NED", iso: "nl" },
    { nombre: "Japón", codigo: "JAP", iso: "jp" },
    { nombre: "Suecia", codigo: "SWE", iso: "se" },
    { nombre: "Túnez", codigo: "TUN", iso: "tn" }
  ],
  "G": [
    { nombre: "Bélgica", codigo: "BEL", iso: "be" },
    { nombre: "Egipto", codigo: "EGY", iso: "eg" },
    { nombre: "Irán", codigo: "IRN", iso: "ir" },
    { nombre: "Nueva Zelanda", codigo: "NZL", iso: "nz" }
  ],
  "H": [
    { nombre: "España", codigo: "ESP", iso: "es" },
    { nombre: "Cabo Verde", codigo: "CPV", iso: "cv" },
    { nombre: "Arabia Saudí", codigo: "KSA", iso: "sa" },
    { nombre: "Uruguay", codigo: "URU", iso: "uy" }
  ],
  "I": [
    { nombre: "Francia", codigo: "FRA", iso: "fr" },
    { nombre: "Senegal", codigo: "SEN", iso: "sn" },
    { nombre: "Irak", codigo: "IRQ", iso: "iq" },
    { nombre: "Noruega", codigo: "NOR", iso: "no" }
  ],
  "J": [
    { nombre: "Argentina", codigo: "ARG", iso: "ar" },
    { nombre: "Argelia", codigo: "ALG", iso: "dz" },
    { nombre: "Austria", codigo: "AUT", iso: "at" },
    { nombre: "Jordania", codigo: "JOR", iso: "jo" }
  ],
  "K": [
    { nombre: "Portugal", codigo: "POR", iso: "pt" },
    { nombre: "Rep. Dem. del Congo", codigo: "COD", iso: "cd" },
    { nombre: "Uzbekistán", codigo: "UZB", iso: "uz" },
    { nombre: "Colombia", codigo: "COL", iso: "co" }
  ],
  "L": [
    { nombre: "Inglaterra", codigo: "ENG", iso: "gb-eng" },
    { nombre: "Croacia", codigo: "CRO", iso: "hr" },
    { nombre: "Ghana", codigo: "GHA", iso: "gh" },
    { nombre: "Panamá", codigo: "PAN", iso: "pa" }
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
            <img src="${bandera(equipo1.iso)}" alt="${equipo1.nombre}" title="${equipo1.nombre}">
            <span>${equipo1.codigo}</span>
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

          <div class="equipo equipo-derecha">
            <img src="${bandera(equipo2.iso)}" alt="${equipo2.nombre}" title="${equipo2.nombre}">
            <span>${equipo2.codigo}</span>
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
