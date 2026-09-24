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

function initAutoScroll(root) {
  const track = root.querySelector(".auto-carousel-track");
  if (!track) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const direction = root.classList.contains("is-reverse") ? -1 : 1;
  const SPEED = 32; // px per second
  const RESUME_DELAY = 2000;

  let setWidth = 0;
  let hasPositioned = false;
  const measure = () => {
    setWidth = track.scrollWidth / 2;
    // start reverse-direction carousels mid-way so they have room to decrement
    if (!hasPositioned && direction === -1 && setWidth > 0) {
      root.scrollLeft = setWidth;
      hasPositioned = true;
    }
  };
  measure();
  window.addEventListener("resize", measure);
  track.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", measure, { once: true });
  });

  let paused = false;
  let resumeTimer;
  const pauseAutoplay = () => {
    paused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      paused = false;
      lastTime = null;
    }, RESUME_DELAY);
  };

  // keep the illusion of an infinite strip regardless of scroll source
  root.addEventListener("scroll", () => {
    if (setWidth <= 0) return;
    if (root.scrollLeft >= setWidth) {
      root.scrollLeft -= setWidth;
    } else if (root.scrollLeft <= 0) {
      root.scrollLeft += setWidth;
    }
  });

  root.addEventListener("wheel", pauseAutoplay, { passive: true });
  root.addEventListener("touchstart", pauseAutoplay, { passive: true });

  // desktop mouse drag-to-scroll (native browser handles touch already)
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  root.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    isDragging = true;
    root.classList.add("is-dragging");
    pauseAutoplay();
    dragStartX = e.clientX;
    dragStartScroll = root.scrollLeft;
    root.setPointerCapture(e.pointerId);
  });
  root.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    root.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
  });
  const endDrag = () => {
    isDragging = false;
    root.classList.remove("is-dragging");
    pauseAutoplay();
  };
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);

  if (reduceMotion) return;

  let lastTime = null;
  const step = (timestamp) => {
    if (!paused && setWidth > 0) {
      if (lastTime == null) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000;
      root.scrollLeft += direction * SPEED * dt;
    }
    lastTime = timestamp;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

document.querySelectorAll(".auto-carousel").forEach(initAutoScroll);

const VERSES = [
  {
    text: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
    devotion: "Whatever today holds — a hard workout, a busy schedule, a lot on your plate — you don't have to face it alone. God's strength fills in the gaps. Take a deep breath and let that be enough today.",
    prayer: "God, thank You for being my strength today. Help me feel Your presence in everything I do. Amen.",
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    ref: "Isaiah 40:31",
    devotion: "There's something good about resting in God's timing instead of rushing ahead. Like an eagle catching the wind, we can find new energy just by trusting Him. Let today be a little lighter.",
    prayer: "Lord, renew my strength and my spirit today. Thank You for carrying me when I'm tired. Amen.",
  },
  {
    text: "So whether you eat or drink or whatever you do, do it all for the glory of God.",
    ref: "1 Corinthians 10:31",
    devotion: "Every part of today — the ordinary and the exciting — can be a small thank-you to God. You don't need a big moment for that; a smile, a good workout, a shared coffee all count.",
    prayer: "God, thank You for today. Let every little moment reflect Your goodness. Amen.",
  },
  {
    text: "Let us consider how we may spur one another on toward love and good deeds.",
    ref: "Hebrews 10:24",
    devotion: "A kind word, a high five, checking in on a friend — small moments of encouragement add up more than we realize. Today's a great day to lift someone else up.",
    prayer: "Father, help me encourage someone today, even in a small way. Thank You for this community. Amen.",
  },
  {
    text: "Do you not know that your bodies are a temple of the Holy Spirit?",
    ref: "1 Corinthians 6:19",
    devotion: "Your body is a gift, made for good things — strength, movement, connection with others. Today, be thankful for what it can do, and be gentle with it.",
    prayer: "Thank You, God, for my body and all the ways it lets me show up for life. Help me care for it well. Amen.",
  },
  {
    text: "Whatever you do, work at it with all your heart, as working for the Lord.",
    ref: "Colossians 3:23",
    devotion: "Whether it's a big task or a small one, doing it with a glad heart makes a difference. Bring your best energy today — it matters more than you know.",
    prayer: "Lord, fill today's work — big or small — with joy and purpose. Amen.",
  },
  {
    text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    ref: "Galatians 6:9",
    devotion: "Good things take time, and that's okay. Keep showing up, keep being kind — the payoff is coming, even on the days you can't quite see it yet.",
    prayer: "God, give me patience and hope as I keep going. Thank You for the good that's ahead. Amen.",
  },
  {
    text: "The joy of the Lord is your strength.",
    ref: "Nehemiah 8:10",
    devotion: "Joy is its own kind of strength. Today, let something — even something small — bring you a little joy, and let that carry you through.",
    prayer: "Thank You, God, for the joy You give. Let it be my strength today. Amen.",
  },
  {
    text: "She sets about her work vigorously; her arms are strong for her tasks.",
    ref: "Proverbs 31:17",
    devotion: "Strength looks good on you — inside and out. Whatever you're building today, give it your energy, and be proud of the effort.",
    prayer: "God, thank You for strength — in my body, my mind, and my spirit. Use it for good today. Amen.",
  },
  {
    text: "Not that I have already attained this, or am already perfect; but I press on.",
    ref: "Philippians 3:12",
    devotion: "Nobody has it all figured out, and that's more than okay. Progress, not perfection, is something worth celebrating today.",
    prayer: "Thank You, God, for meeting me right where I am today. Help me keep moving forward with grace. Amen.",
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
