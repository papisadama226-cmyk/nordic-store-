const ADMIN_PHONE = "0702797128";

window.addEventListener('load', () => {
    const form = document.getElementById('authForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const code = document.getElementById('accessCode').value.trim();

        // Enregistrement simple
        localStorage.setItem('nordic_user_name', name);
        localStorage.setItem('nordic_user_phone', phone);

        // Si le code secret est bon, on l'envoie direct au shop
        if (code.toLowerCase() === "nordic2026") {
            window.location.href = "shop.html";
            return;
        }

        // Sinon, redirection directe WhatsApp sans passer par Discord pour éviter les blocages réseau
        const messageWhatsApp = `Salut NORDIC ! Je souhaite rejoindre le site de vente privé.\n👤 Nom: ${name}\n📞 Numéro: ${phone}`;
        window.location.href = `https://wa.me/225${ADMIN_PHONE}?text=${encodeURIComponent(messageWhatsApp)}`;
    });
});
