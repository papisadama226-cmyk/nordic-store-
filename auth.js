const ADMIN_WEBHOOK_URL = "https://discord.com/api/webhooks/1513491854069469317/i3mOtYEw_MU2lorvLKmP-MTxZ479BmZ6oxe5rDV8BOUTyfWGmn90Rs3xZw83ORoRif94";
const ADMIN_PHONE = "0702797128";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('authForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const code = document.getElementById('accessCode').value.trim();

        // Stockage local des infos utilisateur pour la commande
        localStorage.setItem('nordic_user_name', name);
        localStorage.setItem('nordic_user_phone', phone);

        const messageWhatsApp = `Salut NORDIC ! Je souhaite rejoindre le site de vente privé.\n👤 Nom: ${name}\n📞 Numéro: ${phone}\nPeux-tu me donner le code d'accès ?`;
        const urlWhatsApp = `https://wa.me/225${ADMIN_PHONE}?text=${encodeURIComponent(messageWhatsApp)}`;

        // Si le code VIP secret est entré, on passe direct à la boutique
        if (code.toLowerCase() === "nordic2026") {
            window.location.href = "shop.html";
            return;
        }

        const discordPayload = {
            embeds: [{
                title: "🔐 Nouvelle demande d'intégration - NORDIC",
                color: 0,
                fields: [
                    { name: "👤 Client", value: name, inline: true },
                    { name: "📞 Téléphone", value: phone, inline: true }
                ]
            }]
        };

        // Envoi Discord avec filet de sécurité anti-crash
        try {
            await fetch(ADMIN_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            });
            window.location.href = urlWhatsApp;
        } catch (error) {
            // Si le réseau mobile coupe ou bloque Discord, on force la bascule sur WhatsApp
            window.location.href = urlWhatsApp;
        }
    });
});
