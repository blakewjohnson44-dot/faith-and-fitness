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

function initCarousel(root) {
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(track ? track.children : []);
  const prevBtn = root.querySelector(".carousel-prev");
  const nextBtn = root.querySelector(".carousel-next");
  const dotsWrap = root.querySelector(".carousel-dots");
  if (!track || slides.length === 0) return;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => {
      track.scrollTo({ left: slides[i].offsetLeft, behavior: "smooth" });
    });
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  const setActive = (index) => {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  };

  const currentIndex = () => {
    let closest = 0;
    let minDist = Infinity;
    slides.forEach((s, i) => {
      const dist = Math.abs(s.offsetLeft - track.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  };

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => setActive(currentIndex()), 80);
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const idx = Math.max(0, currentIndex() - 1);
      track.scrollTo({ left: slides[idx].offsetLeft, behavior: "smooth" });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const idx = Math.min(slides.length - 1, currentIndex() + 1);
      track.scrollTo({ left: slides[idx].offsetLeft, behavior: "smooth" });
    });
  }

  setActive(0);
}

document.querySelectorAll(".carousel").forEach(initCarousel);

const VERSES = [
  {
    text: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
    devotion: "It's easy to slap this verse on a PR photo and miss what Paul is actually saying — he wrote it from a jail cell, content in scarcity and abundance alike. The strength isn't for showing off; it's for staying faithful when nobody's watching and the workout (or the week) is hard. Ask yourself honestly: are you leaning on Christ, or just on your own grit? Real strength starts with admitting you can't do this alone.",
    prayer: "Jesus, I don't want borrowed strength for the highlight reel — I want to actually depend on You today. Where I've been running on my own grit, meet me there. Amen.",
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    ref: "Isaiah 40:31",
    devotion: "Waiting doesn't feel like strength — it feels like standing still. But Isaiah promises the opposite: the ones who actually wait on the Lord, instead of forcing their own way forward, are the ones who end up soaring. Before your next rep or your next hard decision, take one honest minute to wait on God instead of white-knuckling it yourself.",
    prayer: "Lord, teach me to wait on You before I try to muscle through on my own. Renew my strength today — not just in my body, but in my faith. Amen.",
  },
  {
    text: "So whether you eat or drink or whatever you do, do it all for the glory of God.",
    ref: "1 Corinthians 10:31",
    devotion: "Even eating and drinking — the most ordinary parts of your day — get named here as an act of worship. That means the workout you almost skipped, the way you talked to the person next to you, the coffee you grabbed after class: all of it either points to God or it doesn't. Discipleship isn't reserved for Sunday. Look at your whole day and ask who it's actually for.",
    prayer: "God, I want my ordinary moments — not just my spiritual ones — to glorify You. Take today, all of it, and make it Yours. Amen.",
  },
  {
    text: "Let us consider how we may spur one another on toward love and good deeds.",
    ref: "Hebrews 10:24",
    devotion: "“Consider” is an active word — this isn't community that just happens to you. It's a call to actually think about the people around you and look for a way to spur them toward love and good deeds, on purpose. That might mean checking in on someone who skipped class, or being the one who shows up first. Community you're not investing in isn't community — it's just proximity.",
    prayer: "Father, show me one person today I can encourage on purpose, not by accident. Give me courage to actually show up for someone. Amen.",
  },
  {
    text: "Do you not know that your bodies are a temple of the Holy Spirit?",
    ref: "1 Corinthians 6:19",
    devotion: "Your body isn't a project to perfect for yourself — it's a temple, already occupied by the Holy Spirit. That reframes why you train: not vanity, not comparison, but stewardship of something that isn't fully yours. How you treat your body, what you feed it, how you talk about it — all of that is worship, or it's neglect. There's no neutral option.",
    prayer: "Holy Spirit, thank You for making my body Your home. Help me care for it as a steward, not a critic — for Your glory, not mine. Amen.",
  },
  {
    text: "Whatever you do, work at it with all your heart, as working for the Lord.",
    ref: "Colossians 3:23",
    devotion: "Whatever you do — the mundane rep, the unglamorous set, the job nobody's grading — do it as if Jesus is the one watching, because He is. That kills the temptation to coast when no one important seems to notice. Half-effort isn't hidden from God, and neither is quiet faithfulness. Work like an audience of One is watching.",
    prayer: "Lord, I don't want to save my best effort for when people are watching. Let today's work — however small — be for You. Amen.",
  },
  {
    text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    ref: "Galatians 6:9",
    devotion: "Doing good gets tiring, especially when it feels like nobody notices or nothing's changing. Paul doesn't promise it'll feel rewarding right away — he promises a harvest, eventually, if you don't quit. That's as true for showing up to a free class every month as it is for any quiet act of faithfulness. The tired middle is exactly where most people give up. Don't.",
    prayer: "God, when I'm tired of doing good and don't see the fruit yet, give me the endurance to keep going. I trust Your timing over mine. Amen.",
  },
  {
    text: "The joy of the Lord is your strength.",
    ref: "Nehemiah 8:10",
    devotion: "Nehemiah said this to a crowd that was weeping over how far they'd fallen short. His answer wasn't guilt — it was joy: the joy of the Lord is your strength. Not your own willpower, not gritting your teeth, but actual joy in who God is. If you're running on empty today, the fix might not be trying harder. It might be remembering what you have to celebrate.",
    prayer: "Father, when I'm running on empty, remind me that Your joy — not my effort — is my strength. Fill me up today. Amen.",
  },
  {
    text: "She sets about her work vigorously; her arms are strong for her tasks.",
    ref: "Proverbs 31:17",
    devotion: "This woman isn't praised for looking effortless — she's praised for being strong on purpose, arms ready for the work in front of her. Strength here isn't vanity; it's preparation for service. What are you actually building strength for? If the answer is just yourself, that's worth sitting with. Train like your strength is for something bigger than you.",
    prayer: "God, build my strength for a purpose bigger than myself. Let it serve others, not just my own goals. Amen.",
  },
  {
    text: "Not that I have already attained this, or am already perfect; but I press on.",
    ref: "Philippians 3:12",
    devotion: "Paul — the guy who planted churches and wrote half the New Testament — says flatly: I haven't arrived. That's freeing. Faith isn't a finish line you cross once; it's a direction you keep pressing toward, imperfectly, one rep and one day at a time. Wherever you are today, you're not behind. You're just in the middle of the race, same as everyone else who's honest about it.",
    prayer: "Jesus, I haven't arrived and I don't have to pretend I have. Help me press on today, one honest step at a time. Amen.",
  },
];

const votd = document.getElementById("votd");
if (votd) {
  const votdText = document.getElementById("votdText");
  const votdRef = document.getElementById("votdRef");
  const votdDevoBtn = document.getElementById("votdDevoBtn");

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const index = dayOfYear % VERSES.length;
  const todaysVerse = VERSES[index];

  votdText.textContent = `“${todaysVerse.text}”`;
  votdRef.textContent = todaysVerse.ref;

  const devoModal = document.getElementById("devoModal");
  if (devoModal && votdDevoBtn) {
    const devoVerseText = document.getElementById("devoVerseText");
    const devoVerseRef = document.getElementById("devoVerseRef");
    const devoBody = document.getElementById("devoBody");
    const devoPrayer = document.getElementById("devoPrayer");

    const openDevo = () => {
      devoVerseText.textContent = `“${todaysVerse.text}”`;
      devoVerseRef.textContent = todaysVerse.ref;
      devoBody.textContent = todaysVerse.devotion;
      devoPrayer.textContent = todaysVerse.prayer;
      devoModal.hidden = false;
      document.body.classList.add("no-scroll");
    };

    const closeDevo = () => {
      devoModal.hidden = true;
      document.body.classList.remove("no-scroll");
    };

    votdDevoBtn.addEventListener("click", openDevo);
    devoModal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeDevo);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !devoModal.hidden) closeDevo();
    });
  }
}

const rsvpModal = document.getElementById("rsvpModal");
if (rsvpModal) {
  const DISMISS_KEY = "ff_rsvp_dismissed";
  let alreadyDismissed = false;
  try {
    alreadyDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch (e) {}

  const closeModal = () => {
    rsvpModal.hidden = true;
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch (e) {}
  };

  if (!alreadyDismissed) {
    setTimeout(() => {
      rsvpModal.hidden = false;
    }, 8000);
  }

  rsvpModal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.getElementById("rsvpModalClose").addEventListener("click", closeModal);
  document.getElementById("rsvpModalDismiss").addEventListener("click", closeModal);
  document.getElementById("rsvpModalReserve").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !rsvpModal.hidden) closeModal();
  });
}
