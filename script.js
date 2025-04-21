const texts = [
    "public class MyHeart {",
    "   public static void main(String[] args) {",
    "       String name = \"Машенька\";",
    "       boolean love = true;",
    "       System.out.println(\"С днем рождения \" + name + \" 🎉!\");",
    "",
    "Привет солнце, это моя открытка тебе на день рождения.",
    "Надеюсь тебе понравится и ты останешься довольна этим праздником!",
    "Я люблю тебя, поздравляю с днем рождения."
  ];
  

let currentTextIndex = 0;
let currentCharIndex = 0;
const speed = 80;  
const typingText = document.querySelector('.typing-text');
const nextPageButton = document.querySelector('.next-page-button');

nextPageButton.style.display = 'none';  

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
            setTimeout(typeWriter, 1000);  
        } else {
            nextPageButton.style.display = 'flex';  
        }
    }
}


typeWriter();
