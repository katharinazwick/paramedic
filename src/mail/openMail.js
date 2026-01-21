function openEmail() {
    const email = "katharinazwick.71@gmail.com";
    const subject = encodeURIComponent("Anmerkung zum Spiel");
    const body = encodeURIComponent(
        "Hallo,\n\nich möchte folgende Anmerkungen machen:\n\n"
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.getElementById("emailBtn").addEventListener("click", openEmail);