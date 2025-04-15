const supabaseUrl = "https://oydrtdgfrlwuvjyihoox.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95ZHJ0ZGdmcmx3dXZqeWlob294Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDc0NTQ2NSwiZXhwIjoyMDYwMzIxNDY1fQ.VZNx0iVM7T1fnb84-PRkU2WUux3eLFgV-RqlO0WMEbk";

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
  const qtd = parseInt(document.getElementById('qtdAcompanhante').value) || 0;
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
      console.error("Erro Supabase:", res.status, res.statusText);
    }
  }).catch((err) => {
    console.error("Erro de conexão:", err);
  });
}
