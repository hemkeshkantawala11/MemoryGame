const cards = document.querySelectorAll('.memory-card');
const teachersBox = document.querySelector('.teachers-box');
const centralTextBox = document.querySelector('.central-text-box');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


let pragy = "https://www.linkedin.com/in/agarwalpragy/?originalSubdomain=in";
let anshuman = "https://www.linkedin.com/in/anshumansingh26/?originalSubdomain=in";
let abhimanyu = "https://www.linkedin.com/in/abhimanyusaxena/?originalSubdomain=in";
let bhavik = "https://www.linkedin.com/in/bhavikrathod/?originalSubdomain=in";
let kshitij = "https://linkedin.com/in/kshitij-mishra-a5779334/?originalSubdomain=in";
let aman = "https://www.linkedin.com/in/mohd-aman/?originalSubdomain=in"
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log("First card flipped:", firstCard);
    return;
  }

  secondCard = this;
  console.log("Second card flipped:", secondCard);

  checkForMatch();
}

function checkForMatch() {
  if (firstCard && secondCard) {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      displayTeacherInfo(firstCard.getAttribute('data-framework'));
      markCorrectCard();
      disableCards();
      
      
    } else {
        unflipCards();
    }
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function displayTeacherInfo(teacherName) {
  let upperCaseTeacherName = teacherName.charAt(0).toUpperCase() + teacherName.slice(1);
  const centralTextBoxContent = document.createElement('div');
  centralTextBoxContent.classList.add('central-text-content');

  const teacherPhoto = document.createElement('img');
  teacherPhoto.src = `${teacherName.toLowerCase()}sir.jpg`;
  teacherPhoto.alt = teacherName;

  const teacherNameElement = document.createElement('h2');
  teacherNameElement.textContent = upperCaseTeacherName;

  const nameAndPhoto = document.createElement('div');
  nameAndPhoto.appendChild(teacherNameElement);
  nameAndPhoto.appendChild(teacherPhoto);
  centralTextBoxContent.appendChild(nameAndPhoto);

  centralTextBox.innerHTML = '';
  centralTextBox.appendChild(centralTextBoxContent);

  // Show modal
  modal.innerHTML = '';
  modal.appendChild(createModalContent(teacherName));
  modal.style.display = 'block';

  setTimeout(() => {
    centralTextBox.classList.remove('animate-central-text');
    modal.style.display = 'none'; // Hide the modal after a short span of time
  }, 1000); // Adjust the time (in milliseconds) as needed

  // Add teacher name to the teachers box
  const teacherNameListElement = document.createElement('p');
  const teacherLink = document.createElement('a');
  nameAndPhoto.appendChild(teacherNameListElement);

  // Add the correct LinkedIn link based on the teacher's name
  switch (teacherName.toLowerCase()) {
    case 'pragy':
      teacherLink.href = 'https://www.linkedin.com/in/agarwalpragy/?originalSubdomain=in';
      break;
    case 'anshuman':
      teacherLink.href = 'https://www.linkedin.com/in/anshumansingh26/?originalSubdomain=in';
      break;
    case 'abhimanyu':
      teacherLink.href = 'https://www.linkedin.com/in/abhimanyusaxena/?originalSubdomain=in';
      break;
    case 'bhavik':
      teacherLink.href = 'https://www.linkedin.com/in/bhavikrathod/?originalSubdomain=in';
      break;
    case 'kshitij':
      teacherLink.href = 'https://linkedin.com/in/kshitij-mishra-a5779334/?originalSubdomain=in';
      break;
    case 'aman':
      teacherLink.href = 'https://www.linkedin.com/in/mohd-aman/?originalSubdomain=in';
      break;
    default:
      teacherLink.href = '#'; // Default link
  }
  teacherLink.target = '_blank';

  teacherLink.textContent = upperCaseTeacherName;
  teacherNameListElement.appendChild(teacherLink);
  teachersBox.appendChild(centralTextBoxContent);


}

function markCorrectCard() {
  firstCard.classList.add('correct');
  secondCard.classList.add('correct');
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();



const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none';

// Create content for the modal
function createModalContent(teacherName) {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const teacherPhoto = document.createElement('img');
  teacherPhoto.src = `${teacherName.toLowerCase()}sir.jpg`;
  teacherPhoto.alt = teacherName;

  const teacherNameElement = document.createElement('h2');
  teacherNameElement.textContent = teacherName;

  const modalText = document.createElement('p');
  modalText.textContent = `${teacherName} found!`;

  modalContent.appendChild(teacherPhoto);
  modalContent.appendChild(teacherNameElement);
  modalContent.appendChild(modalText);

  return modalContent;
}

// Append the modal to the body
document.body.appendChild(modal);


cards.forEach(card => card.addEventListener('click', flipCard));
