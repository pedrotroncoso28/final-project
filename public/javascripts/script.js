// Front end JavaScript code goes here

// Shuffle function (keeps riddles mixed on every load)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load riddles from the API and display them
async function loadRiddles(difficulty = null) {
  let url = '/api/riddles';

  if (difficulty) {
    url += `?difficulty=${difficulty}`;
  }

  const response = await fetch(url);
  const riddles = await response.json();

  const shuffledRiddles = shuffle(riddles);

  const container = document.getElementById('riddles');
  container.innerHTML = '';

  shuffledRiddles.forEach(riddle => {
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

// Filter buttons (easy / medium / hard)
document.querySelectorAll('#dropdown li').forEach(item => {
  button.addEventListener('click', () => {
    const difficulty = button.dataset.difficulty;
    loadRiddles(difficulty || null);
  });
});

// Start everything
loadRiddles();
