export function setFeedbackForInput(input, correct, expected) {
    let feedback = input.parentElement.querySelector(".feedback");

    if (!feedback) {
        feedback = document.createElement("span");
        feedback.className = "feedback";
        input.parentElement.appendChild(feedback);
    }

    if (correct) {
        feedback.innerHTML = " ✅";
        feedback.style.color = "green";
    } else {
        feedback.innerHTML = ` ❌ <span class="solution">(${expected})</span>`;
        feedback.style.color = "red";
    }
}