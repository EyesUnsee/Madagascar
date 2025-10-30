const consentBtn = document.getElementById('consentBtn');
const status = document.getElementById('status');
const stored = document.getElementById('stored');

function showStored() {
  const ip = localStorage.getItem('user-ip');
  stored.textContent = ip ?? '(aucune adresse enregistrée)';
}

showStored();

consentBtn.addEventListener('click', async () => {
  consentBtn.disabled = true;
  status.textContent = 'Récupération en cours...';

  try {
    const res = await fetch('/.netlify/functions/get-ip');
    const data = await res.json();
    if (data.ip) {
      localStorage.setItem('user-ip', data.ip);
      status.textContent = `Votre IP ${data.ip} a été enregistrée localement.`;
      showStored();
    } else {
      status.textContent = 'Impossible de récupérer votre IP.';
    }
  } catch (e) {
    status.textContent = 'Erreur lors de la récupération.';
    console.error(e);
  }

  consentBtn.disabled = false;
});
