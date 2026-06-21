const texts = [
    "public class Birthday {",
    "   public static void main(String[] args) {",
    "       String name = \"Ксюшенька\";",
    "       int age = getAge() + 1;",
    "       celebrate(name, age);",
    "   }",
    "}",
    "",
    "Привет! Эта открытка собиралась специально для тебя.",
    "Внутри пара сюрпризов, так что лучше дойти до конца 😉",
    "С днём рождения!"
  ];


let currentTextIndex = 0;
let currentCharIndex = 0;
const speed = 35;
const typingText = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
const nextPageButton = document.querySelector('.next-page-button');

function typeWriter() {
    if (currentCharIndex < texts[currentTextIndex].length) {
        typingText.textContent += texts[currentTextIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeWriter, speed);
    } else {
        currentTextIndex++;
        currentCharIndex = 0;
        if (currentTextIndex < texts.length) {
            typingText.textContent += '\n';
            setTimeout(typeWriter, 400);
        } else {
            typingCursor.style.display = 'none';
            nextPageButton.style.visibility = 'visible';
        }
    }
}

typeWriter();
