// Front end JavaScript code goes here
console.log('SCRIPT LOADED');

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
      const title = document.getElementById('difficulty-title');

  if (title) {
    title.textContent = difficulty
      ? `${difficulty.toUpperCase()} RIDDLES`
      : 'ALL RIDDLES';
  }

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
      <div class="riddle-header">
        <span class="riddle-difficulty ${riddle.difficulty}">
          ${riddle.difficulty.toUpperCase()}
        </span>
      </div>

      <p class="riddle-question">
        <strong>Riddle:</strong> ${riddle.question}
      </p>

      <input type="text" placeholder="I think it could be..." />
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

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burger-btn');
  const dropdown = document.getElementById('dropdown'); 

  if (!burgerBtn || !dropdown) {
    console.error('Missing #burger-btn or #dropdown in index.hbs');
    return;
  }

  // Burger open/close
  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('hidden'); 
  });

  // Filter clicks
  dropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const difficulty = item.dataset.difficulty;
      loadRiddles(difficulty || null);
      dropdown.classList.add('hidden');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.classList.contains('hidden') && !dropdown.contains(e.target) && e.target !== burgerBtn) {
      dropdown.classList.add('hidden');
    }
  });

  // Initial riddles load
  loadRiddles();

  // FALLING LEAVES EFFECT
  const leavesContainer = document.getElementById('leaves-container');
  if (!leavesContainer) return;

  function createLeaf() {
    const leaf = document.createElement('img');
    leaf.src = '/images/leaf.png';
    leaf.className = 'leaf';

    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = 20 + Math.random() * 15 + 's';
    leaf.style.width = 20 + Math.random() * 30 + 'px';

    leavesContainer.appendChild(leaf);

    setTimeout(() => {
      leaf.remove();
      createLeaf();
    }, 40000);
  }

  for (let i = 0; i < 7; i++) {
    setTimeout(createLeaf, i * 1500);
  }


    // BACKGROUND AUDIO (auto start after first interaction)
  const audio = document.getElementById('bg-music');

  if (audio) {
    const startAudio = () => {
      audio.muted = false;
      audio.volume = 0.2;
      audio.play().catch(() => {});
      document.removeEventListener('click', startAudio);
    };

    document.addEventListener('click', startAudio);
  }

});


