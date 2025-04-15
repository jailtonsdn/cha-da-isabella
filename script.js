const supabaseUrl = "https://oydrtdgfrlwuvjyihoox.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95ZHJ0ZGdmcmx3dXZqeWlob294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDU0NjUsImV4cCI6MjA2MDMyMTQ2NX0.XYxH-vBEw9U_g-rZTct27os5E_wv4UExB5fod2FJD3g";

const headers = {
  "apikey": supabaseKey,
  "Authorization": `Bearer ${supabaseKey}`,
  "Content-Type": "application/json"
};

const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('convidado');

if (nome && convidados[nome.toLowerCase()]) {
  const dado = convidados[nome.toLowerCase()];
  document.getElementById('mensagem').innerHTML = `
    Olá <strong>${nome}</strong>!<br>
    Fralda sugerida: <strong>${dado.fralda}</strong>
  `;
  document.getElementById('formulario').style.display = 'block';
} else {
  document.getElementById('mensagem').innerHTML = 'Convidado não identificado.';
}

function confirmarPresenca() {
  const fralda = convidados[nome.toLowerCase()].fralda;
  const qtd = parseInt(document.getElementById('qtdAcompanhante').value);
  const crianca = document.getElementById('crianca').value;

  fetch(`${supabaseUrl}/rest/v1/confirmados`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      nome,
      fralda,
      qtd_acompanhantes: qtd,
      crianca
    })
  }).then((res) => {
    if (res.ok) {
      document.getElementById("status").innerText = "🎉 Presença confirmada com sucesso!";
    } else {
      document.getElementById("status").innerText = "❌ Erro ao confirmar. Tente novamente.";
    }
  });
}
