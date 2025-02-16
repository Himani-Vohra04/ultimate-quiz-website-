document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("teacherPanel").classList.add("hidden");
    document.getElementById("studentPanel").classList.add("hidden");
});

// Teacher Login
function showTeacherPanel() {
    let password = prompt("🔒 Enter Teacher Password:");
    if (password === "admin123") {  // You can change this password
        document.getElementById("teacherPanel").classList.remove("hidden");
        document.querySelector(".landing").classList.add("hidden");
    } else {
        alert("❌ Incorrect Password! Access Denied.");
    }
}

// Save Quiz Question
function saveQuiz() {
    let question = document.getElementById("question").value.trim();
    let optionA = document.getElementById("optionA").value.trim();
    let optionB = document.getElementById("optionB").value.trim();
    let optionC = document.getElementById("optionC").value.trim();
    let optionD = document.getElementById("optionD").value.trim();
    let correctAnswer = document.getElementById("correctAnswer").value.trim().toUpperCase();

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
        alert("⚠️ Fill all fields!");
        return;
    }

    let quizData = JSON.parse(localStorage.getItem("quizData")) || [];
    quizData.push({ question, options: { A: optionA, B: optionB, C: optionC, D: optionD }, correctAnswer });
    localStorage.setItem("quizData", JSON.stringify(quizData));

    alert("✅ Question added!");
    document.getElementById("quizForm").reset();
}

// Display Quiz for Students
function displayQuiz() {
    let quizData = JSON.parse(localStorage.getItem("quizData")) || [];
    let quizDisplay = document.getElementById("quizDisplay");

    quizDisplay.innerHTML = ""; 

    if (quizData.length === 0) {
        quizDisplay.innerHTML = "<p>No questions available yet! 📝</p>";
        return;
    }

    quizData.forEach((q, index) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <label><input type="radio" name="q${index}" value="A"> ${q.options.A}</label><br>
            <label><input type="radio" name="q${index}" value="B"> ${q.options.B}</label><br>
            <label><input type="radio" name="q${index}" value="C"> ${q.options.C}</label><br>
            <label><input type="radio" name="q${index}" value="D"> ${q.options.D}</label><br>
        `;
        quizDisplay.appendChild(div);
    });
}

// Student Login
function showStudentPanel() {
    document.getElementById("studentPanel").classList.remove("hidden");
    document.querySelector(".landing").classList.add("hidden");
    displayQuiz();
}

// Submit Quiz
function submitQuiz() {
    let quizData = JSON.parse(localStorage.getItem("quizData")) || [];
    let score = 0;

    quizData.forEach((q, index) => {
        let selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.correctAnswer) {
            score++;
        }
    });

    let studentName = prompt("Enter your name:");
    if (!studentName) {
        alert("❌ Name required!");
        return;
    }

    alert(`🎉 ${studentName}, your score: ${score}/${quizData.length}`);

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: studentName, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    displayLeaderboard();
}

// Display Leaderboard
function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardDisplay = document.getElementById("leaderboard");
    leaderboardDisplay.classList.remove("hidden");
    leaderboardDisplay.innerHTML = "<h3>🏆 Leaderboard</h3>";

    if (leaderboard.length === 0) {
        leaderboardDisplay.innerHTML += "<p>No scores yet! 🏅</p>";
        return;
    }

    leaderboard.forEach((entry, index) => {
        leaderboardDisplay.innerHTML += `<p><strong>${index + 1}. ${entry.name} - ${entry.score} points</strong></p>`;
    });
}

// Logout
function logout() {
    location.reload();
}

// Reset Quiz
function resetQuiz() {
    localStorage.clear();
    alert("✅ Quiz Data Cleared!");
    displayQuiz();
    displayLeaderboard();
}
