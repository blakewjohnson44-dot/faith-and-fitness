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
  {
    text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
    ref: "Psalm 28:7",
    devotion: "It's okay to lean on something bigger than yourself today. God is glad to help — that's not a last resort, it's an invitation.",
    prayer: "Lord, thank You for being my strength and my help today. Amen.",
  },
  {
    text: "This is the day the Lord has made; let us rejoice and be glad in it.",
    ref: "Psalm 118:24",
    devotion: "Today doesn't have to be perfect to be worth celebrating. It's a gift, just as it is.",
    prayer: "God, thank You for today. Help me notice the good in it. Amen.",
  },
  {
    text: "God is our refuge and strength, an ever-present help in trouble.",
    ref: "Psalm 46:1",
    devotion: "Whatever today brings, you're not carrying it by yourself. God is close, and He's ready to help.",
    prayer: "Thank You, God, for being close to me today, in the easy moments and the hard ones. Amen.",
  },
  {
    text: "A cheerful heart is good medicine, but a crushed spirit dries up the bones.",
    ref: "Proverbs 17:22",
    devotion: "A little joy really does go a long way. Let yourself laugh today — it's good for you, inside and out.",
    prayer: "God, fill my heart with cheer today. Thank You for the gift of joy. Amen.",
  },
  {
    text: "Be joyful in hope, patient in affliction, faithful in prayer.",
    ref: "Romans 12:12",
    devotion: "Hope, patience, and a little prayer go a long way on any kind of day. Keep your eyes up today.",
    prayer: "Lord, keep me hopeful and patient today. Thank You for hearing my prayers. Amen.",
  },
  {
    text: "May the God of hope fill you with all joy and peace as you trust in him.",
    ref: "Romans 15:13",
    devotion: "Trusting God has a way of making room for real joy and real peace. Let today be a little more peaceful.",
    prayer: "God of hope, fill me with joy and peace today. Amen.",
  },
  {
    text: "God loves a cheerful giver.",
    ref: "2 Corinthians 9:7",
    devotion: "Generosity doesn't have to be big to matter. A cheerful, open hand brightens someone's day — maybe even your own.",
    prayer: "God, make me generous and cheerful today, with my time and with what I have. Amen.",
  },
  {
    text: "Be kind and compassionate to one another, forgiving each other.",
    ref: "Ephesians 4:32",
    devotion: "Kindness is simple, but it's not small. A little grace toward someone today can change their whole day — and yours.",
    prayer: "God, help me be kind and quick to forgive today. Amen.",
  },
  {
    text: "Encourage one another and build each other up.",
    ref: "1 Thessalonians 5:11",
    devotion: "You never really know how much someone needs to hear something good about themselves. Be that voice for someone today.",
    prayer: "Lord, use me to encourage someone today. Thank You for the people who encourage me. Amen.",
  },
  {
    text: "Rejoice always, pray continually, give thanks in all circumstances.",
    ref: "1 Thessalonians 5:16-18",
    devotion: "Joy, prayer, and gratitude are simple habits with a big payoff. Try weaving all three into today, even in small ways.",
    prayer: "God, thank You for today. Help me stay joyful and grateful, no matter what comes. Amen.",
  },
  {
    text: "Every good and perfect gift is from above.",
    ref: "James 1:17",
    devotion: "Take a second today to notice the good things — even the small, easy-to-miss ones. They're gifts, not accidents.",
    prayer: "Thank You, God, for every good gift in my life today, big and small. Amen.",
  },
  {
    text: "Cast all your anxiety on him because he cares for you.",
    ref: "1 Peter 5:7",
    devotion: "Whatever's been sitting heavy on your mind, you don't have to carry it alone. God genuinely cares — hand it over today.",
    prayer: "God, I hand my worries over to You today. Thank You for caring about what I'm carrying. Amen.",
  },
  {
    text: "You will fill me with joy in your presence.",
    ref: "Psalm 16:11",
    devotion: "Joy isn't something you have to chase down — sometimes it's as close as slowing down and noticing God's presence.",
    prayer: "God, thank You for the joy of simply being near You today. Amen.",
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    ref: "Psalm 23:1",
    devotion: "Even on the days that feel like a lot, you're being looked after. That's worth resting in today.",
    prayer: "Thank You, God, for looking after me. Help me trust that I have what I need today. Amen.",
  },
  {
    text: "Taste and see that the Lord is good.",
    ref: "Psalm 34:8",
    devotion: "Goodness is often closer than we think — a good meal, a good friend, a good moment. Notice it today.",
    prayer: "God, thank You for Your goodness — help me see it all around me today. Amen.",
  },
  {
    text: "The Lord is good and his love endures forever.",
    ref: "Psalm 100:5",
    devotion: "Some things you can count on no matter what — God's goodness is one of them. Let that settle you today.",
    prayer: "Thank You, God, for Your steady, never-ending love. Amen.",
  },
  {
    text: "Trust in the Lord with all your heart... he will make your paths straight.",
    ref: "Proverbs 3:5-6",
    devotion: "You don't have to have today all figured out. Take the next step and trust the rest will come together.",
    prayer: "Lord, I trust You with today, even the parts I can't see clearly yet. Amen.",
  },
  {
    text: "Do not worry about tomorrow, for tomorrow will worry about itself.",
    ref: "Matthew 6:34",
    devotion: "Today has enough good in it on its own. Let tomorrow wait its turn.",
    prayer: "God, help me stay present today instead of worrying about what's next. Amen.",
  },
  {
    text: "Come to me, all you who are weary, and I will give you rest.",
    ref: "Matthew 11:28",
    devotion: "If you're tired today, that's okay — rest is allowed, and it's offered freely.",
    prayer: "Jesus, thank You for offering me rest today. Help me actually take it. Amen.",
  },
  {
    text: "Love each other as I have loved you.",
    ref: "John 15:12",
    devotion: "You're loved generously — and that same kind of love is worth passing along today, however you can.",
    prayer: "God, thank You for loving me so well. Help me love others the same way today. Amen.",
  },
  {
    text: "In all things God works for the good of those who love him.",
    ref: "Romans 8:28",
    devotion: "Even the messy, unplanned parts of today aren't wasted. Good can come from all of it.",
    prayer: "God, thank You for working good into my life, even the parts I don't understand yet. Amen.",
  },
  {
    text: "Nothing can separate us from the love of God.",
    ref: "Romans 8:38-39",
    devotion: "Whatever kind of day you're having, you're not further from God's love than usual. It's steady, always.",
    prayer: "Thank You, God, that nothing today can separate me from Your love. Amen.",
  },
  {
    text: "If anyone is in Christ, the new creation has come.",
    ref: "2 Corinthians 5:17",
    devotion: "Every day is a fresh chance to start again. Today counts as one of those new beginnings.",
    prayer: "God, thank You for fresh starts. Help me walk into today as something new. Amen.",
  },
  {
    text: "My grace is sufficient for you, for my power is made perfect in weakness.",
    ref: "2 Corinthians 12:9",
    devotion: "You don't have to feel strong today for grace to be enough. It covers the tired days too.",
    prayer: "God, thank You for grace that's enough even when I'm not at my best today. Amen.",
  },
  {
    text: "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, and faithfulness.",
    ref: "Galatians 5:22-23",
    devotion: "Pick just one of these — love, joy, peace, patience, kindness — and let it shape one moment of your day today.",
    prayer: "God, grow Your Spirit's fruit in me a little more today. Amen.",
  },
  {
    text: "Immeasurably more than all we ask or imagine.",
    ref: "Ephesians 3:20",
    devotion: "God's plans for today are bigger and kinder than you might expect. Stay open to good surprises.",
    prayer: "God, thank You for doing more in my life than I could ask or imagine. Amen.",
  },
  {
    text: "Be strong in the Lord and in his mighty power.",
    ref: "Ephesians 6:10",
    devotion: "Strength today doesn't have to come from you alone — it's okay to borrow some from God.",
    prayer: "Lord, be my strength today, in every part of it. Amen.",
  },
  {
    text: "Do not be anxious about anything, but pray about everything.",
    ref: "Philippians 4:6",
    devotion: "Whatever's on your mind today, big or small, it's welcome in a quick prayer. Try handing it over as it comes.",
    prayer: "God, I bring today to You — all of it. Thank You for listening. Amen.",
  },
  {
    text: "Whatever is true, whatever is noble... think about such things.",
    ref: "Philippians 4:8",
    devotion: "What you focus on shapes your day. Today, try aiming your attention at the good stuff.",
    prayer: "God, help my mind land on what's good and true today. Amen.",
  },
  {
    text: "Whatever you do, whether in word or deed, do it in the name of the Lord.",
    ref: "Colossians 3:17",
    devotion: "Even the small, everyday things — a text, a task, a conversation — can be done with heart today.",
    prayer: "Lord, let everything I say and do today reflect a little of You. Amen.",
  },
  {
    text: "Let the peace of Christ rule in your hearts... and be thankful.",
    ref: "Colossians 3:15",
    devotion: "Peace and gratitude tend to show up together. Invite both into today, even in small ways.",
    prayer: "God, let Your peace settle my heart today, and make me thankful. Amen.",
  },
  {
    text: "Let us run with perseverance the race marked out for us.",
    ref: "Hebrews 12:1",
    devotion: "You don't have to sprint — just keep moving forward today, one step at a time.",
    prayer: "God, give me the endurance to keep going today, at whatever pace I need. Amen.",
  },
  {
    text: "Do not forget to do good and to share with others.",
    ref: "Hebrews 13:16",
    devotion: "A small act of generosity today — sharing, helping, giving — goes further than you think.",
    prayer: "God, show me a simple way to do good for someone today. Amen.",
  },
  {
    text: "Consider it pure joy... the testing of your faith produces perseverance.",
    ref: "James 1:2-3",
    devotion: "Even the hard parts of today are building something good in you, little by little.",
    prayer: "God, help me find a little joy even in today's challenges. Amen.",
  },
  {
    text: "We love because he first loved us.",
    ref: "1 John 4:19",
    devotion: "Every bit of love you give away today started with love you already received. There's plenty to share.",
    prayer: "Thank You, God, for loving me first. Help me love others well today. Amen.",
  },
  {
    text: "The Lord is my light and my salvation—whom shall I fear?",
    ref: "Psalm 27:1",
    devotion: "Whatever feels uncertain today, you're not walking into it without light or without help.",
    prayer: "God, be my light today, especially in the uncertain moments. Amen.",
  },
  {
    text: "Take delight in the Lord, and he will give you the desires of your heart.",
    ref: "Psalm 37:4",
    devotion: "Joy in God has a way of shaping your heart toward good things. Let today start there.",
    prayer: "God, help me delight in You today, above everything else. Amen.",
  },
  {
    text: "Satisfy us in the morning with your unfailing love.",
    ref: "Psalm 90:14",
    devotion: "However today started, it's not too late for it to be filled with something good.",
    prayer: "God, fill today with Your love, starting right now. Amen.",
  },
  {
    text: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord.",
    ref: "Psalm 121:1-2",
    devotion: "When today feels like a lot, it helps to look up. Help is closer than it seems.",
    prayer: "Lord, thank You for being my help today, whenever I need it. Amen.",
  },
  {
    text: "I am fearfully and wonderfully made.",
    ref: "Psalm 139:14",
    devotion: "However you're feeling about yourself today, you were made with care, on purpose, and it shows.",
    prayer: "Thank You, God, for making me the way You did. Help me see myself the way You do today. Amen.",
  },
  {
    text: "Commit to the Lord whatever you do, and he will establish your plans.",
    ref: "Proverbs 16:3",
    devotion: "Whatever's on today's list, it's okay to hand the outcome over and just do your best.",
    prayer: "God, I commit today's plans to You. Thank You for taking care of the rest. Amen.",
  },
  {
    text: "There is a friend who sticks closer than a brother.",
    ref: "Proverbs 18:24",
    devotion: "Good friendship is a gift worth noticing today — both the friends you have and the friend you can be.",
    prayer: "Thank You, God, for good friends. Help me be a good one today too. Amen.",
  },
  {
    text: "Two are better than one... if either falls, one can help the other up.",
    ref: "Ecclesiastes 4:9-10",
    devotion: "You weren't meant to do life solo. Lean on someone today, or be someone to lean on.",
    prayer: "God, thank You for the people who show up for me. Help me show up for someone today. Amen.",
  },
  {
    text: "Do not fear, for I am with you.",
    ref: "Isaiah 41:10",
    devotion: "Whatever today brings, you're not facing it alone. That's a promise worth holding onto.",
    prayer: "Thank You, God, for being with me today, wherever it takes me. Amen.",
  },
  {
    text: "Plans to prosper you and not to harm you, plans to give you hope.",
    ref: "Jeremiah 29:11",
    devotion: "Today is one small part of a bigger, good plan. Trust that it's headed somewhere worthwhile.",
    prayer: "God, thank You for having good plans for me. Help me trust You with today. Amen.",
  },
  {
    text: "His mercies are new every morning.",
    ref: "Lamentations 3:22-23",
    devotion: "However yesterday went, today is a clean page. That's grace, and it's yours this morning too.",
    prayer: "Thank You, God, for a fresh start today. Amen.",
  },
  {
    text: "Act justly, love mercy, and walk humbly with your God.",
    ref: "Micah 6:8",
    devotion: "Today doesn't ask for perfection — just kindness, fairness, and a humble heart. That's plenty.",
    prayer: "God, help me be kind, fair, and humble today. Amen.",
  },
  {
    text: "He will rejoice over you with singing.",
    ref: "Zephaniah 3:17",
    devotion: "You're not just tolerated today — you're delighted in. Let that sink in for a second.",
    prayer: "Thank You, God, for delighting in me today, just as I am. Amen.",
  },
  {
    text: "You are the light of the world.",
    ref: "Matthew 5:14",
    devotion: "Your good mood, your kindness, your smile — it brightens more than you realize today.",
    prayer: "God, let a little light shine through me today. Amen.",
  },
  {
    text: "Let your light shine before others.",
    ref: "Matthew 5:16",
    devotion: "You don't have to dim yourself to fit in today. Let your good stand out a little.",
    prayer: "God, help me shine a little brighter today, without overthinking it. Amen.",
  },
  {
    text: "Love your neighbor as yourself.",
    ref: "Mark 12:31",
    devotion: "A little kindness toward the people around you today is also a little kindness toward yourself.",
    prayer: "God, help me love the people around me well today. Amen.",
  },
  {
    text: "Do to others as you would have them do to you.",
    ref: "Luke 6:31",
    devotion: "A simple rule, but a good one for today: treat people the way you'd want to be treated.",
    prayer: "God, help me treat others with the kindness I hope for myself today. Amen.",
  },
  {
    text: "Love one another, as I have loved you.",
    ref: "John 13:34",
    devotion: "You've been loved generously — today's a good day to pass a little of that along.",
    prayer: "Thank You, God, for loving me so well. Help me love others today the same way. Amen.",
  },
  {
    text: "Peace I leave with you... do not let your hearts be troubled.",
    ref: "John 14:27",
    devotion: "Whatever's unsettled today, a little peace is available — you just have to receive it.",
    prayer: "God, calm my heart today and fill it with Your peace. Amen.",
  },
  {
    text: "In this world you will have trouble. But take heart! I have overcome the world.",
    ref: "John 16:33",
    devotion: "Today doesn't have to be easy to be okay. You've got backup, even on the hard days.",
    prayer: "Thank You, God, for giving me courage today, whatever it brings. Amen.",
  },
  {
    text: "It is more blessed to give than to receive.",
    ref: "Acts 20:35",
    devotion: "Giving something today — your time, your attention, a small favor — tends to fill you up more than it costs you.",
    prayer: "God, show me a way to give something good today. Amen.",
  },
  {
    text: "God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    ref: "Romans 5:8",
    devotion: "You're loved not because you've earned it, but just because. That's a good thing to remember today.",
    prayer: "Thank You, God, for loving me before I did anything to deserve it. Amen.",
  },
  {
    text: "Be transformed by the renewing of your mind.",
    ref: "Romans 12:2",
    devotion: "A shift in perspective can change the whole shape of today. Start with a hopeful thought.",
    prayer: "God, renew my mind today — help me see things with a little more hope. Amen.",
  },
  {
    text: "Be devoted to one another in love. Honor one another above yourselves.",
    ref: "Romans 12:10",
    devotion: "Putting someone else first today, even in a small way, is a quiet kind of love.",
    prayer: "God, help me put others first today, even in small ways. Amen.",
  },
  {
    text: "Love is patient, love is kind.",
    ref: "1 Corinthians 13:4",
    devotion: "Patience and kindness are simple, everyday ways to love people well today.",
    prayer: "God, help me be patient and kind today, especially when it's not easy. Amen.",
  },
  {
    text: "Your labor in the Lord is not in vain.",
    ref: "1 Corinthians 15:58",
    devotion: "Whatever effort you put in today, it matters — even when the results aren't obvious yet.",
    prayer: "God, thank You that today's effort isn't wasted, even when I can't see the outcome. Amen.",
  },
  {
    text: "Though outwardly we are wasting away, yet inwardly we are being renewed day by day.",
    ref: "2 Corinthians 4:16",
    devotion: "Even on tired days, something good is still growing in you. Today counts too.",
    prayer: "God, renew me on the inside today, even when I feel worn out. Amen.",
  },
  {
    text: "Carry each other's burdens.",
    ref: "Galatians 6:2",
    devotion: "You don't have to fix everything for someone today — just show up and help carry the load.",
    prayer: "God, show me someone I can help carry a little weight for today. Amen.",
  },
  {
    text: "We are God's handiwork, created to do good works.",
    ref: "Ephesians 2:10",
    devotion: "You were made on purpose, for good things. Today's a chance to live a little of that out.",
    prayer: "Thank You, God, for making me with purpose. Use me for good today. Amen.",
  },
  {
    text: "Be completely humble and gentle; be patient, bearing with one another in love.",
    ref: "Ephesians 4:2",
    devotion: "Gentleness and patience go a long way today, especially with the people closest to you.",
    prayer: "God, make me gentle and patient today, especially with the people I love. Amen.",
  },
  {
    text: "He who began a good work in you will carry it on to completion.",
    ref: "Philippians 1:6",
    devotion: "You don't have to have it all together today. God's not finished with you yet, and that's good news.",
    prayer: "Thank You, God, for the good work You're still doing in me. Amen.",
  },
  {
    text: "In humility value others above yourselves.",
    ref: "Philippians 2:3-4",
    devotion: "Today's a good day to ask about someone else's day before your own. Small shift, big impact.",
    prayer: "God, help me notice and value the people around me today. Amen.",
  },
  {
    text: "Rejoice in the Lord always. I will say it again: Rejoice!",
    ref: "Philippians 4:4",
    devotion: "Joy is worth choosing today, even in the ordinary moments. Consider this your reminder.",
    prayer: "God, thank You for reasons to rejoice today, big and small. Amen.",
  },
  {
    text: "Clothe yourselves with compassion, kindness, humility, gentleness and patience.",
    ref: "Colossians 3:12",
    devotion: "Think of kindness and patience like something you put on today, on purpose, before you head out the door.",
    prayer: "God, help me choose compassion and kindness today. Amen.",
  },
  {
    text: "Encourage the disheartened, help the weak, be patient with everyone.",
    ref: "1 Thessalonians 5:14",
    devotion: "Someone today might need a kind word more than they'll ever say. Be generous with encouragement.",
    prayer: "God, help me notice who needs encouragement today, and give me the words. Amen.",
  },
  {
    text: "God has not given us a spirit of fear, but of power, love, and a sound mind.",
    ref: "2 Timothy 1:7",
    devotion: "If today feels a little uncertain, remember you've been given courage, not fear, to work with.",
    prayer: "God, thank You for giving me courage instead of fear today. Amen.",
  },
  {
    text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful.",
    ref: "Hebrews 10:23",
    devotion: "Hope is worth holding onto today, even loosely. God keeps His promises.",
    prayer: "God, thank You for being faithful. Help me hold onto hope today. Amen.",
  },
  {
    text: "I will never leave you nor forsake you.",
    ref: "Hebrews 13:5",
    devotion: "However today goes, you're not walking through it alone. That promise doesn't change.",
    prayer: "Thank You, God, for never leaving my side today. Amen.",
  },
  {
    text: "Everyone should be quick to listen, slow to speak.",
    ref: "James 1:19",
    devotion: "A little extra listening today can go a long way — for a friendship, a conversation, a day in general.",
    prayer: "God, help me listen well today, and speak with care. Amen.",
  },
  {
    text: "Each of you should use whatever gift you have received to serve others.",
    ref: "1 Peter 4:10",
    devotion: "Whatever you're good at, today's a good day to use it for someone else's benefit, even in a small way.",
    prayer: "God, show me how to use what I've been given to help someone today. Amen.",
  },
  {
    text: "There is no fear in love. Perfect love drives out fear.",
    ref: "1 John 4:18",
    devotion: "Love has a way of making room feel safer today, both the love you receive and the love you give.",
    prayer: "God, let Your love settle any fear I'm carrying today. Amen.",
  },
  {
    text: "Let us love one another, for love comes from God.",
    ref: "1 John 4:7",
    devotion: "Every bit of love you show today has a source bigger than you. There's always more where it came from.",
    prayer: "Thank You, God, for being the source of love. Help me share it today. Amen.",
  },
  {
    text: "Weeping may stay for the night, but rejoicing comes in the morning.",
    ref: "Psalm 30:5",
    devotion: "Hard seasons don't last forever. Whatever today looks like, better mornings are on their way.",
    prayer: "God, thank You that joy always finds its way back. I trust You with today. Amen.",
  },
  {
    text: "How good and pleasant it is when God's people live together in unity.",
    ref: "Psalm 133:1",
    devotion: "Good community is worth celebrating today — the people who show up, laugh with you, and cheer you on.",
    prayer: "Thank You, God, for community. Help me add a little unity to today. Amen.",
  },
  {
    text: "Be strong and courageous... the Lord your God will be with you wherever you go.",
    ref: "Joshua 1:9",
    devotion: "Wherever today takes you, you've got company. That makes even the hard parts a little easier.",
    prayer: "God, thank You for going with me today, wherever it leads. Amen.",
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
