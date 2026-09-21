document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const VERSES = [
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", ref: "Isaiah 40:31" },
  { text: "So whether you eat or drink or whatever you do, do it all for the glory of God.", ref: "1 Corinthians 10:31" },
  { text: "Let us consider how we may spur one another on toward love and good deeds.", ref: "Hebrews 10:24" },
  { text: "Do you not know that your bodies are a temple of the Holy Spirit?", ref: "1 Corinthians 6:19" },
  { text: "Whatever you do, work at it with all your heart, as working for the Lord.", ref: "Colossians 3:23" },
  { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", ref: "Galatians 6:9" },
  { text: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" },
  { text: "She sets about her work vigorously; her arms are strong for her tasks.", ref: "Proverbs 31:17" },
  { text: "Not that I have already attained this, or am already perfect; but I press on.", ref: "Philippians 3:12" },
];

const votd = document.getElementById("votd");
if (votd) {
  const votdText = document.getElementById("votdText");
  const votdRef = document.getElementById("votdRef");
  const votdNext = document.getElementById("votdNext");

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  let index = dayOfYear % VERSES.length;

  const render = () => {
    const verse = VERSES[index];
    votdText.classList.add("is-fading");
    votdRef.classList.add("is-fading");
    setTimeout(() => {
      votdText.textContent = `“${verse.text}”`;
      votdRef.textContent = verse.ref;
      votdText.classList.remove("is-fading");
      votdRef.classList.remove("is-fading");
    }, 150);
  };

  render();

  votdNext.addEventListener("click", () => {
    index = (index + 1) % VERSES.length;
    render();
  });
}
