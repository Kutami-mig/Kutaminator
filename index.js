function generateMsg() {

    // Retrieve user input values
    const clientName = document.getElementById("clientName").value;
    const orderNumber = document.getElementById("orderNumber").value;
    const missingItem = document.getElementById("missingItem").value;
    const quantityOfItems = document.getElementById("quantityOfItems").value;
    const commentBox = document.getElementById("commentBox").value;

    // Select the checked radio button
    const selectedOption = document.querySelector('input[name="option"]:checked');

    // Initialize an empty message string
    let finalMsg = "";

    // Use a switch statement for cleaner conditional logic
    switch (selectedOption.id) {
        case "option1":
            // Option 1: Pre-defined message for missing items
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser ist bereits beim Hersteller nachbestellt und sollte in den nächsten Tagen eintreffen.`;
            break;
        case "option2":
            // Option 2: Includes instructions for partial delivery or cancellation
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser wird in den nächsten Tagen beim Hersteller nachbestellt.<br><br>
                        Möchtest Du den lieferbaren Rest deines Auftrages zugeschickt bekommen (Teillieferung)?<br>
                        Alternativ kannst Du dir einen anderen Artikel aus unserem Sortiment aussuchen oder den fehlenden Artikel stornieren.<br><br>
                        Bitte schreibe uns dazu eine Email.`;
            break;
        case "option3":
            // Option 3: Message for discontinued products
            finalMsg += `Der Artikel ${missingItem} (${quantityOfItems} Stück) ist aktuell nicht auf Lager. Dieser wird beim Hersteller nicht mehr nachproduziert.<br>
                        Bitte suche dir einen anderen Artikel aus unserem Sortiment aus.`;
            break;
        case "option4":
            // Option 4: Address missing
            finalMsg += `Aktuell fehlt uns der Straßenname / die Hausnummer, um dein Paket versenden zu können.
                        Bitte schreibe uns eine Mail (Du kannst auf diese Mail antworten) mit der Adresse, an die dein Paket versendet.`;
            break;
        case "option5":
            // Option 5: Incorrect Packstation number
            finalMsg += "Ihre Packstation-Nummer ist nicht korrekt. Bitte überprüfe und Sende uns ggf. die korrigierte Packstation, falls Du dich verschrieben hast.";
            break;
        case "option6":
            // Option 6: Invalid Postnummer
            finalMsg += `Laut DHL ist deine Postnummer nicht registriert. Bitte überprüfe, ob die Postnummer wirklich zur Packstation gehört, und ob Du den letzten Schritt der Registrierung abgeschlossen hast. 
                        Sende uns ggf. die korrigierte Postnummer, falls Du dich verschrieben hast.`;
            break;
        case "option7":
            // Option 7: Scheduled shipping
            finalMsg += `Dein Paket wird wie gewünscht zum ___ versendet. Das Label ist schon gedruckt, daher hast Du bereits eine Sendungsverfolgungs-Nr. und die Versand-Email erhalten.
                        Wir legen dein Paket aber erst zum gewünschten Datum auf den Versandwagen.`;
            break;
        default:
            // Handle invalid or unselected options
            finalMsg += "Status: No valid option selected.";
            break;
    }

    // Display the final message in the designated box
    const msgReady = document.getElementById("msgReady");
    const messageBox = document.getElementById("messageBox");

    if (finalMsg) {
        msgReady.innerHTML = finalMsg; // Insert the generated message
        messageBox.style.display = "block"; // Show the message box
    } else {
        messageBox.style.display = "none"; // Hide the box if no message exists
    }
}

// Add a click event listener for the "Copy" button
document.querySelector(".copy").addEventListener("click", () => {
    const msgReady = document.getElementById("msgReady");
    const textToCopy = msgReady.textContent
        .replace(/\s+/g, " ") // Remove excess whitespace
        .trim(); // Remove leading/trailing whitespace

    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyButton = document.querySelector(".copy");
        const label = copyButton.querySelector(".copy-label");
        const originalText = label.textContent;

        copyButton.disabled = true; // Disable the button temporarily
        label.textContent = "Copied!"; // Indicate success

        setTimeout(() => {
            copyButton.disabled = false; // Re-enable the button
            label.textContent = originalText; // Reset the label text
        }, 1000); // Delay before resetting
    });
});
