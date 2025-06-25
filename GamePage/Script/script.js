    const questions = [
      { question: "What is the capital city of France?", options: ["Paris", "London", "Berlin", "Rome"], correct: "Paris" },
      { question: "Which planet is the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correct: "Mars" },
      { question: "Which language is used for web development?", options: ["Python", "HTML", "C++", "Java"], correct: "HTML" },
      { question: "What is the boiling point of water?", options: ["50°C", "100°C", "150°C", "200°C"], correct: "100°C" },
      { question: "Who painted the Mona Lisa?", options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"], correct: "Leonardo da Vinci" }
    ];

    let currentIndex = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressBar = document.getElementById('progress-bar');

    function renderQuestion() {
      const q = questions[currentIndex];
      questionText.textContent = q.question;
      questionCounter.textContent = `Question ${currentIndex + 1}/${questions.length}`;
      progressPercentage.textContent = `${Math.round((currentIndex) / questions.length * 100)}%`;
      progressBar.style.width = `${(currentIndex) / questions.length * 100}%`;
      optionsContainer.innerHTML = '';

      q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'block w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-lg font-semibold text-gray-800 text-center hover:bg-yellow-100 transition';
        btn.onclick = () => handleAnswer(option);
        optionsContainer.appendChild(btn);
      });
    }

    function handleAnswer(selected) {
      const correct = questions[currentIndex].correct;
      if (selected === correct) {
        score++;
        document.getElementById("correctModal").classList.remove("hidden");
      } else {
        document.getElementById("correctAnswerText").textContent = `'${correct}'`;
        document.getElementById("wrongModal").classList.remove("hidden");
      }
    }

    function nextQuestion() {
      document.getElementById("correctModal").classList.add("hidden");
      document.getElementById("wrongModal").classList.add("hidden");
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion();
      } else {
        showFinalScore();
      }
    }

    function showFinalScore() {
      questionText.textContent = `You scored ${score} out of ${questions.length}!`;
      optionsContainer.innerHTML = `<a href="#" onclick="location.reload()" class="block w-full text-center rounded-xl bg-[var(--primary-color)] text-black px-5 py-4 text-lg font-bold">Restart Quiz</a>`;
      questionCounter.textContent = "Quiz Completed";
      progressPercentage.textContent = `100%`;
      progressBar.style.width = `100%`;
    }

    renderQuestion();