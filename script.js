document.documentElement.classList.add("js");

const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== 1. Tema claro / escuro ===== */
const botaoTema = document.getElementById("tema");
const textoTema = document.getElementById("tema-texto");

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  textoTema.textContent = tema === "dark" ? "Tema claro" : "Tema escuro";
}

let temaSalvo = null;
try { temaSalvo = localStorage.getItem("tema"); } catch (e) {}
const prefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
aplicarTema(temaSalvo || (prefereClaro ? "light" : "dark"));

botaoTema.addEventListener("click", () => {
  const novo = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  aplicarTema(novo);
  try { localStorage.setItem("tema", novo); } catch (e) {}
  botaoTema.classList.add("girando");
  setTimeout(() => botaoTema.classList.remove("girando"), 500);
});

/* ===== 2. Código aparecendo linha por linha no topo da página ===== */
const linhas = [
  '<span class="k">const</span> josue = {',
  '  nome: <span class="s">"Josué Antônio França"</span>,',
  '  foco: <span class="s">"front-end"</span>,',
  '  stack: [<span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JavaScript"</span>, <span class="s">"Python"</span>],',
  '  projeto: <span class="s">"Study.ly"</span>,',
  '  buscando: [<span class="s">"freelas"</span>, <span class="s">"vaga ou estágio"</span>],',
  '};'
];

const codigo = document.getElementById("codigo");

function mostrarLinha(i) {
  const span = document.createElement("span");
  span.className = "linha";
  span.innerHTML = linhas[i];
  codigo.appendChild(span);
  if (i === linhas.length - 1) span.classList.add("c"); // cursor na última linha
  else if (codigo.children[i - 1]) codigo.children[i - 1].classList.remove("c");
}

if (reduzMovimento) {
  linhas.forEach((_, i) => mostrarLinha(i));
} else {
  linhas.forEach((_, i) => setTimeout(() => mostrarLinha(i), 500 + i * 450));
}

/* ===== 3. Brilho que segue o mouse ===== */
if (!reduzMovimento) {
  window.addEventListener("pointermove", (e) => {
    document.documentElement.style.setProperty("--x", e.clientX + "px");
    document.documentElement.style.setProperty("--y", e.clientY + "px");
  });
}

/* ===== 4. Seções aparecem ao rolar a página ===== */
const alvos = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  alvos.forEach((el) => observador.observe(el));
} else {
  alvos.forEach((el) => el.classList.add("visivel"));
}

/* ===== 5. Ano do rodapé ===== */
document.getElementById("ano").textContent = new Date().getFullYear();