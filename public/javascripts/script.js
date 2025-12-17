// Front end JavaScript code goes here
// Load riddles from the API and display them
async function loadRiddles() {
  const response = await fetch('/api/riddles');
  const riddles = await response.json();

  const container = document.getElementById('riddles');
  container.innerHTML = '';

  riddles.forEach(riddle => {
    const card = document.createElement('div');
    card.className = 'riddle-card';

    card.innerHTML = `
      <p><strong>Riddle:</strong> ${riddle.question}</p>

      <input type="text" placeholder="Your answer" />
      <button>Submit</button>

      <div class="answers"></div>
    `;

    const input = card.querySelector('input');
    const button = card.querySelector('button');
    const answersDiv = card.querySelector('.answers');

    button.addEventListener('click', async () => {
      if (!input.value.trim()) return;

      await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riddleId: riddle._id,
          text: input.value
        })
      });

      input.value = '';
      loadAnswers(riddle._id, answersDiv);
    });

    loadAnswers(riddle._id, answersDiv);
    container.appendChild(card);
  });
}

// Load answers for a specific riddle
async function loadAnswers(riddleId, container) {
  const response = await fetch(`/api/answers/${riddleId}`);
  const answers = await response.json();

  container.innerHTML = '<p><em>Community answers:</em></p>';
  answers.forEach(answer => {
    const p = document.createElement('p');
    p.textContent = `– ${answer.text}`;
    container.appendChild(p);
  });
}

// Start everything
loadRiddles();
