const texts = [
    "public class MyHeart {",
    "   public static void main(String[] args) {",
    "       String name = \"Ксюшенька\";",
    "       boolean love = true;",
    "       System.out.println(\"С днем рождения \" + name + \" 🎉!\");",
    "",
    "Привет! Это моя открытка тебе на день рождения.",
    "Надеюсь тебе понравится и ты отлично проведешь этот праздник!",
    "Поздравляю с днем рождения!"
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
