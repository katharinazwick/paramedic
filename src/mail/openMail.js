function openEmail() {
    const email = "Katharina.Zwick@student.hpi.uni-potsdam.de";
    const subject = encodeURIComponent("Anmerkung zur Sanitätssimulation");
    const body = encodeURIComponent(
        "Hallo,\n\nich möchte folgende Anmerkungen machen:\n\n"
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.getElementById("emailBtn").addEventListener("click", openEmail);