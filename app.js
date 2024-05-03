// const words = [
//   "a",
//   "again",
//   "all",
//   "also",
//   "and",
//   "another",
//   "any",
//   "around",
//   "as",
//   "ask",
//   "at",
//   "back",
//   "because",
//   "become",
//   "before",
//   "begin",
//   "both",
//   "but",
//   "by",
//   "call",
//   "can",
//   "change",
//   "child",
//   "come",
//   "could",
//   "course",
//   "day",
//   "develop",
//   "each",
//   "early",
//   "end",
//   "even",
//   "eye",
//   "face",
//   "fact",
//   "few",
//   "first",
//   "follow",
//   "from",
//   "general",
//   "get",
//   "give",
//   "good",
//   "govern",
//   "group",
//   "hand",
//   "have",
//   "he",
//   "head",
//   "help",
//   "here",
//   "high",
//   "hold",
//   "home",
//   "how",
//   "however",
//   "if",
//   "increase",
//   "interest",
//   "it",
//   "know",
//   "large",
//   "last",
//   "lead",
//   "leave",
//   "life",
//   "like",
//   "line",
//   "little",
//   "look",
//   "make",
//   "man",
//   "may",
//   "mean",
//   "might",
//   "more",
//   "must",
//   "need",
//   "never",
//   "new",
//   "no",
//   "now",
//   "number",
//   "of",
//   "off",
//   "old",
//   "on",
//   "one",
//   "open",
//   "or",
//   "order",
//   "out",
//   "over",
//   "own",
//   "part",
//   "people",
//   "person",
//   "place",
//   "plan",
//   "play",
//   "point",
//   "possible",
//   "present",
//   "problem",
//   "program",
//   "public",
//   "real",
//   "right",
//   "run",
//   "say",
//   "see",
//   "seem",
//   "show",
//   "small",
//   "some",
//   "stand",
//   "state",
//   "still",
//   "such",
//   "system",
//   "take",
//   "than",
//   "that",
//   "the",
//   "then",
//   "there",
//   "these",
//   "they",
//   "thing",
//   "think",
//   "this",
//   "those",
//   "time",
//   "to",
//   "under",
//   "up",
//   "use",
//   "very",
//   "way",
//   "what",
//   "when",
//   "where",
//   "while",
//   "will",
//   "with",
//   "without",
//   "work",
//   "world",
//   "would",
//   "write",
//   "you",
//   "she",
//   "set",
//   "we",
//   "long",
//   "in",
//   "many",
//   "do",
//   "after",
//   "which",
//   "so",
//   "same",
//   "other",
//   "house",
//   "during",
//   "much",
//   "just",
//   "consider",
//   "since",
//   "should",
//   "only",
//   "tell",
//   "about",
// ];

const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");

const INITIAL_TIME = 30;

const TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(" ").slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;
  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split("");

      return `<word>
      ${letters.map((letter) => `<letter>${letter}</letter>`).join("")}
    </word>
    `;
    })
    .join("");
  const firstWord = $paragraph.querySelector("word");
  firstWord.classList.add("active");
  firstWord.querySelector("letter").classList.add("active");

  const intervalId = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;
    if (currentTime === 0) {
      clearInterval(intervalId);
      gameOver();
      initGame();
    }
  }, 1000);
}

function initEvents() {
  document.addEventListener("keydown", () => {
    $input.focus();
  });
  $input.addEventListener("keydown", onKeyDown);
  $input.addEventListener("keyup", onKeyUp);
}

function onKeyDown() {}

function onKeyUp() {
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");

  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;
  console.log({ value: $input.value, currentWord });
  const $allLetters = $currentWord.querySelectorAll("letter");
  $allLetters.forEach(($letter) =>
    $letter.classList.remove("correct", "incorrect")
  );

  $input.value.split("").forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    $letter.classList.add(letterClass);
  });

  $currentLetter.classList.remove("active", "is-last");
  const inputLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputLength];

  if ($nextActiveLetter) {
    $nextActiveLetter[inputLength].classList.add("active");
  } else {
    $currentLetter.classList.add("active", "is-last");
  }
}

function gameOver() {
  alert("Game Over");
}
