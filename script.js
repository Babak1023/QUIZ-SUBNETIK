
function validateIP(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

let currentQuestion = 0;
let questions = [];
let correctAnswers = [];
let userIP = "";

function generateQuestions(ip) {
    questions = [
        `What is the first octet of ${ip}?`,
        `What is the class of ${ip}?`,
        `What is the default subnet mask of ${ip}?`,
        `Convert ${ip} to binary.`,
        `What is the network address for ${ip} with /24?`,
    ];
    correctAnswers = [
        ip.split(".")[0], // First octet
        ip.startsWith("10.") ? "A" : ip.startsWith("172.") ? "B" : "C", // Class A, B, or C (simplified)
        "255.255.255.0", // Default subnet mask for Class C
        ip.split(".").map(octet => parseInt(octet).toString(2).padStart(8, '0')).join("."), // Binary conversion
        ip.split(".").slice(0, 3).join(".") + ".0", // Network address with /24
    ];
}

function startQuiz() {
    const ipInput = document.getElementById("ipInput").value;
    if (validateIP(ipInput)) {
        userIP = ipInput;
        generateQuestions(userIP);
        currentQuestion = 0;
        document.getElementById("quizContainer").style.display = "block";
        document.getElementById("ipContainer").style.display = "none";
        showQuestion();
    } else {
        alert("Please enter a valid IP address.");
    }
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion];
        document.getElementById("answerInput").value = ""; // Clear input for next question
        document.getElementById("feedback").innerText = ""; // Clear feedback
    } else {
        document.getElementById("feedback").innerText = "Quiz complete! Restarting...";
        setTimeout(restartQuiz, 2000); // Wait 2 seconds before restarting
    }
}

function submitAnswer() {
    const answer = document.getElementById("answerInput").value.trim();
    if (answer === correctAnswers[currentQuestion]) {
        document.getElementById("feedback").innerText = "Correct! Moving to the next question.";
        currentQuestion++;
        showQuestion();
    } else {
        document.getElementById("feedback").innerText = "Incorrect! Please try again.";
    }
}

function restartQuiz() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("ipContainer").style.display = "block";
    document.getElementById("ipInput").value = "";
    document.getElementById("feedback").innerText = "";
}
