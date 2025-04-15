const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('convidado');

if (nome && convidados[nome.toLowerCase()]) {
  const dado = convidados[nome.toLowerCase()];
  document.getElementById('mensagem').innerHTML = `
    Olá <strong>${nome}</strong>!<br>
    Sugerimos que traga: <strong>Fralda ${dado.fralda}</strong>
  `;
  document.getElementById('formulario').style.display = 'block';
} else {
  document.getElementById('mensagem').innerHTML = 'Convidado não identificado.';
}

function confirmarPresenca() {
  const acompanhante = document.getElementById('acompanhante').checked ? "Sim" : "Não";
  const data = {
    nome: nome,
    fralda: convidados[nome.toLowerCase()].fralda,
    acompanhante: acompanhante
  };

  fetch('URL_DO_SCRIPT_GOOGLE_APPS', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  document.getElementById('status').innerHTML = "🎉 Obrigado por confirmar!";
}
