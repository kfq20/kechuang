const fallbackQuizBank = [
  {
    category: "垃圾分类",
    level: "入门",
    question: "喝完的矿泉水瓶应该投进哪个垃圾桶？",
    options: ["可回收物", "厨余垃圾", "其他垃圾", "有害垃圾"],
    answer: 0,
    tip: "塑料瓶清空后属于可回收物，回收后还能再加工利用。"
  },
  {
    category: "节能",
    level: "入门",
    question: "离开教室前，下面哪种做法更环保？",
    options: ["只关风扇", "只关灯", "关掉灯和电器", "打开窗户不管设备"],
    answer: 2,
    tip: "关闭不需要的灯和电器，是最直接的节能方法。"
  },
  {
    category: "节水",
    level: "入门",
    question: "刷牙时怎样做更节约用水？",
    options: ["一直开着水龙头", "接一杯水刷牙", "边刷边玩水", "不停换新杯子"],
    answer: 1,
    tip: "接一杯水或及时关龙头，都能减少浪费。"
  },
  {
    category: "绿色出行",
    level: "入门",
    question: "去离家不远的地方，哪种方式更环保？",
    options: ["步行或骑车", "让家长开车绕一圈", "坐电梯去楼下", "一直打车"],
    answer: 0,
    tip: "短距离步行或骑车，更绿色也更健康。"
  },
  {
    category: "环保意识",
    level: "入门",
    question: "自带水杯上学有什么好处？",
    options: ["减少一次性杯子使用", "更容易忘记喝水", "会增加垃圾", "没有任何变化"],
    answer: 0,
    tip: "重复使用自己的水杯，可以减少一次性用品。"
  }
];

const weeklyTrend = [
  { day: "周一", value: 3, note: "完成了垃圾分类、随手关灯和水杯重复使用。" },
  { day: "周二", value: 4, note: "多做了一次步行出行，还检查了待机电器。" },
  { day: "周三", value: 5, note: "环保习惯最稳定的一天，任务完成得很连贯。" },
  { day: "周四", value: 4, note: "继续保持节水动作，还提醒家人分类投放。" },
  { day: "周五", value: 6, note: "一周里最亮眼的一天，完成了 6 个绿色动作。" },
  { day: "周六", value: 5, note: "外出时选择了步行和公交，低碳表现很不错。" },
  { day: "周日", value: 7, note: "家庭环保日，分类、节能、节水全都做到了。" }
];

const STORAGE_KEY = "carbon-hero-weekly-actions-v1";

const taskPool = [
  {
    type: "日常任务",
    title: "随手关灯小挑战",
    text: "今天坚持随手关灯 3 次，并把完成情况记在小本子上。",
    emoji: "💡",
    reward: "+8 绿色能量",
    rarity: "common"
  },
  {
    type: "分类任务",
    title: "垃圾侦探出动",
    text: "晚饭后检查一次家里垃圾桶，看看有没有投放错误的地方。",
    emoji: "🗂",
    reward: "+10 绿色能量",
    rarity: "common"
  },
  {
    type: "节水任务",
    title: "水滴守护计划",
    text: "今天刷牙和洗手都记得及时关水龙头，并提醒家人一起做到。",
    emoji: "💧",
    reward: "+12 绿色能量",
    rarity: "rare"
  },
  {
    type: "出行任务",
    title: "绿色路线体验",
    text: "选择一次步行或骑车出门，把路线和感受记录下来。",
    emoji: "🚲",
    reward: "+12 绿色能量",
    rarity: "rare"
  },
  {
    type: "观察任务",
    title: "待机小侦察",
    text: "找出家里 2 个待机电器，提醒大人不用时拔掉电源。",
    emoji: "🔌",
    reward: "+15 绿色能量",
    rarity: "epic"
  },
  {
    type: "创造任务",
    title: "旧物新点子",
    text: "把一个废旧纸盒改造成收纳盒或小摆件，并给它起个名字。",
    emoji: "📦",
    reward: "+15 绿色能量",
    rarity: "epic"
  }
];

const sloganPool = [
  {
    title: "蓝天频道",
    text: "让每一次正确分类，都变成城市里的一颗绿色星星。",
    icon: "✨",
    theme: "sky"
  },
  {
    title: "森林频道",
    text: "今天少浪费一点，明天就能让地球多长出一片小树林。",
    icon: "🌳",
    theme: "forest"
  },
  {
    title: "阳光频道",
    text: "节约每一度电，都是在给未来城市储存阳光。",
    icon: "☀️",
    theme: "sun"
  },
  {
    title: "星夜频道",
    text: "绿色习惯像夜空里的灯，会一盏一盏把城市点亮。",
    icon: "🌙",
    theme: "night"
  }
];

const QUIZ_SIZE = 5;
let quizBank = [];
let currentQuestion = 0;
let score = 0;
let points = 0;
let streak = 0;
let answered = false;
let activeQuiz = [];
let selectedTrend = 0;
let weeklyRecords = [];

const questionCounter = document.getElementById("questionCounter");
const questionCategory = document.getElementById("questionCategory");
const questionLevel = document.getElementById("questionLevel");
const questionText = document.getElementById("questionText");
const quizProgressBar = document.getElementById("quizProgressBar");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const badgeTitle = document.getElementById("badgeTitle");
const badgeIcon = document.getElementById("badgeIcon");
const correctCount = document.getElementById("correctCount");
const pointCount = document.getElementById("pointCount");
const streakHint = document.getElementById("streakHint");
const nextQuestionButton = document.getElementById("nextQuestion");
const resetQuizButton = document.getElementById("resetQuiz");
const carbonScore = document.getElementById("carbonScore");
const orbScore = document.getElementById("orbScore");
const badgeCount = document.getElementById("badgeCount");
const actionCount = document.getElementById("actionCount");
const streakCount = document.getElementById("streakCount");
const masteryScore = document.getElementById("masteryScore");
const bars = document.getElementById("bars");
const trendTag = document.getElementById("trendTag");
const trendDay = document.getElementById("trendDay");
const trendValue = document.getElementById("trendValue");
const trendNote = document.getElementById("trendNote");
const todayScoreTag = document.getElementById("todayScoreTag");
const checkinGrid = document.getElementById("checkinGrid");
const resetWeekButton = document.getElementById("resetWeekButton");
const taskButton = document.getElementById("taskButton");
const taskCapsule = document.getElementById("taskCapsule");
const taskType = document.getElementById("taskType");
const taskReward = document.getElementById("taskReward");
const taskTitle = document.getElementById("taskTitle");
const taskText = document.getElementById("taskText");
const taskEmoji = document.getElementById("taskEmoji");
const sloganButton = document.getElementById("sloganButton");
const sloganCapsule = document.getElementById("sloganCapsule");
const sloganIcon = document.getElementById("sloganIcon");
const sloganTitle = document.getElementById("sloganTitle");
const sloganText = document.getElementById("sloganText");
const planForm = document.getElementById("planForm");
const planContent = document.getElementById("planContent");
const glowButton = document.getElementById("glowButton");
const heroOrb = document.getElementById("heroOrb");
const badgeOrbit = document.getElementById("badgeOrbit");
const appToast = document.getElementById("appToast");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const sections = navItems
  .map((item) => document.querySelector(item.getAttribute("href")))
  .filter(Boolean);

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function animateClass(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function getWeekdayIndex(date = new Date()) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function createDefaultRecords() {
  return weeklyTrend.map((item) => ({
    day: item.day,
    value: item.value,
    note: item.note,
    actions: []
  }));
}

function loadWeeklyRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      weeklyRecords = createDefaultRecords();
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 7) {
      weeklyRecords = createDefaultRecords();
      return;
    }
    weeklyRecords = parsed.map((item, index) => ({
      day: weeklyTrend[index].day,
      value: Number(item.value) || 0,
      note: item.note || weeklyTrend[index].note,
      actions: Array.isArray(item.actions) ? item.actions : []
    }));
  } catch (error) {
    weeklyRecords = createDefaultRecords();
  }
}

function saveWeeklyRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weeklyRecords));
}

function resetWeeklyRecords() {
  weeklyRecords = createDefaultRecords();
  selectedTrend = getWeekdayIndex();
  saveWeeklyRecords();
  renderTrend();
  updateTodayCheckins();
}

function updateTodayCheckins() {
  const todayIndex = getWeekdayIndex();
  const todayRecord = weeklyRecords[todayIndex];
  todayScoreTag.textContent = `今日已记录 ${todayRecord.actions.length} 次行动`;
  Array.from(checkinGrid.querySelectorAll(".checkin-chip")).forEach((button) => {
    button.classList.toggle("done", todayRecord.actions.includes(button.dataset.action));
  });
}

function recordWeeklyAction(action, note, amount = 1) {
  const todayIndex = getWeekdayIndex();
  const todayRecord = weeklyRecords[todayIndex];
  todayRecord.value += amount;
  if (!todayRecord.actions.includes(action)) {
    todayRecord.actions.push(action);
  }
  todayRecord.note = note;
  saveWeeklyRecords();
  selectedTrend = todayIndex;
  renderTrend();
  updateTodayCheckins();
}

function showToast(message) {
  appToast.textContent = message;
  appToast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    appToast.classList.remove("show");
  }, 2200);
}

function sparkOrb(extra = 1) {
  animateClass(heroOrb, "pulse");
  const value = Number(orbScore.textContent) + extra;
  orbScore.textContent = String(value);
  carbonScore.textContent = String(value);
}

function sparkBadge() {
  animateClass(badgeOrbit, "spark");
  sparkOrb(1);
}

async function loadQuizBank() {
  try {
    const response = await fetch("data/questions.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length < QUIZ_SIZE) {
      throw new Error("题库数量不足");
    }
    quizBank = data;
    showToast(`大题库加载完成，当前共有 ${data.length} 道题。`);
  } catch (error) {
    quizBank = fallbackQuizBank;
    showToast("外部题库暂时没有加载成功，已切换到内置题库。");
  }
}

function buildQuiz() {
  activeQuiz = shuffle(quizBank).slice(0, QUIZ_SIZE);
  currentQuestion = 0;
  score = 0;
  points = 0;
  streak = 0;
  answered = false;
  renderQuestion();
  updateDashboard();
}

function renderQuestion() {
  const item = activeQuiz[currentQuestion];
  questionCounter.textContent = `第 ${currentQuestion + 1} 题 / ${QUIZ_SIZE} 题`;
  questionCategory.textContent = item.category;
  questionLevel.textContent = item.level;
  questionText.textContent = item.question;
  quizProgressBar.style.width = `${((currentQuestion + 1) / QUIZ_SIZE) * 100}%`;
  feedback.textContent = "请选择一个答案，答完后会出现解析和积分变化。";
  answered = false;
  options.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(button, index));
    options.appendChild(button);
  });
}

function handleAnswer(button, index) {
  if (answered) {
    return;
  }

  answered = true;
  const item = activeQuiz[currentQuestion];
  const optionButtons = Array.from(options.querySelectorAll(".option"));
  const isCorrect = index === item.answer;

  optionButtons.forEach((optionButton, optionIndex) => {
    if (optionIndex === item.answer) {
      optionButton.classList.add("correct");
    } else {
      optionButton.classList.add("dimmed");
    }
    if (optionButton === button && !isCorrect) {
      optionButton.classList.remove("dimmed");
      optionButton.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score += 1;
    streak += 1;
    points += 12 + streak * 2;
    feedback.textContent = `回答正确！${item.tip} 你获得了 ${12 + streak * 2} 点绿色积分。`;
    sparkBadge();
    recordWeeklyAction(`答对${item.category}`, `今天在${item.category}知识上答对了一题，绿色能量继续上升。`);
  } else {
    streak = 0;
    points += 4;
    feedback.textContent = `这题答错了。${item.tip} 继续加油，也获得了 4 点探索积分。`;
    recordWeeklyAction(`练习${item.category}`, `今天继续练习了${item.category}知识，正在慢慢进步。`);
  }

  updateDashboard();
}

function updateDashboard() {
  const liveCarbonScore = 86 + score * 3 + Math.min(points, 24);
  const mastery = Math.min(98, 60 + score * 6 + currentQuestion * 2);
  carbonScore.textContent = String(liveCarbonScore);
  orbScore.textContent = String(liveCarbonScore);
  badgeCount.textContent = String(Math.max(3, 3 + Math.floor(score / 2)));
  actionCount.textContent = String(18 + score * 2 + Math.floor(points / 8));
  streakCount.textContent = `${Math.max(4, 4 + Math.floor(streak / 2))}天`;
  masteryScore.textContent = `${mastery}%`;
  correctCount.textContent = `答对 ${score} 题`;
  pointCount.textContent = `绿色积分 ${points}`;
  streakHint.textContent = `连对 ${streak} 题`;

  if (score <= 1) {
    badgeTitle.textContent = "地球巡护员";
    badgeIcon.textContent = "♻";
  } else if (score <= 3) {
    badgeTitle.textContent = "绿色达人";
    badgeIcon.textContent = "🌿";
  } else {
    badgeTitle.textContent = "碳小侠队长";
    badgeIcon.textContent = "🌍";
  }
}

function renderTrend() {
  const maxValue = Math.max(...weeklyRecords.map((item) => item.value), 1);
  bars.innerHTML = "";

  weeklyRecords.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bar-button";
    button.style.setProperty("--h", `${(item.value / maxValue) * 100}%`);
    if (index === selectedTrend) {
      button.classList.add("active");
    }
    button.innerHTML = `
      <span class="bar-value">${item.value}</span>
      <span class="bar-label">${item.day.replace("周", "")}</span>
    `;
    button.addEventListener("click", () => selectTrend(index));
    bars.appendChild(button);
  });

  updateTrendDetail();
}

function selectTrend(index) {
  selectedTrend = index;
  renderTrend();
}

function updateTrendDetail() {
  const current = weeklyRecords[selectedTrend];
  trendTag.textContent = `${current.day}：完成 ${current.value} 个环保动作`;
  trendDay.textContent = current.day;
  trendValue.textContent = `${current.value} 次行动`;
  trendNote.textContent = current.note;
}

function drawTask(shouldRecord = true) {
  const task = taskPool[Math.floor(Math.random() * taskPool.length)];
  taskCapsule.classList.remove("rarity-common", "rarity-rare", "rarity-epic");
  taskCapsule.classList.add(`rarity-${task.rarity}`);
  taskType.textContent = task.type;
  taskReward.textContent = task.reward;
  taskTitle.textContent = task.title;
  taskText.textContent = task.text;
  taskEmoji.textContent = task.emoji;
  animateClass(taskCapsule, "flip");
  if (shouldRecord) {
    recordWeeklyAction(task.title, `今天抽到了“${task.title}”，准备开始新的环保挑战。`);
  }
  showToast("新的环保任务已生成，试着今天就去完成它。");
}

function switchSlogan() {
  const slogan = sloganPool[Math.floor(Math.random() * sloganPool.length)];
  sloganCapsule.classList.remove("theme-sky", "theme-forest", "theme-sun", "theme-night");
  sloganCapsule.classList.add(`theme-${slogan.theme}`);
  sloganIcon.textContent = slogan.icon;
  sloganTitle.textContent = slogan.title;
  sloganText.textContent = slogan.text;
  animateClass(sloganCapsule, "flip");
}

function updateActiveNav() {
  let activeId = "home";
  const checkpoint = window.scrollY + 160;

  sections.forEach((section) => {
    if (section.offsetTop <= checkpoint) {
      activeId = section.id;
    }
  });

  navItems.forEach((item) => {
    const targetId = item.getAttribute("href").slice(1);
    item.classList.toggle("active", targetId === activeId);
  });
}

nextQuestionButton.addEventListener("click", () => {
  if (!answered) {
    showToast("先完成这道题，再进入下一题。");
    return;
  }

  if (currentQuestion < QUIZ_SIZE - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  feedback.textContent = `闯关完成！你答对了 ${score} 题，一共积累 ${points} 点绿色积分。`;
  showToast("本轮闯关完成，可以重新开局挑战新的题目。");
});

resetQuizButton.addEventListener("click", () => {
  buildQuiz();
  showToast("新的题组已经准备好，继续挑战吧。");
});

taskButton.addEventListener("click", drawTask);
sloganButton.addEventListener("click", switchSlogan);

glowButton.addEventListener("click", () => {
  sparkOrb(2);
  recordWeeklyAction("点亮能量球", "今天点亮了绿色能量球，给自己一个继续行动的提醒。", 2);
  showToast("绿色能量被点亮了，继续完成环保任务吧。");
});

planForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("studentName").value.trim() || "环保小勇士";
  const goal = document.getElementById("goalSelect").value;
  const time = document.getElementById("timeSelect").value;

  const plans = {
    "省电": [
      "离开房间主动关灯，检查风扇和空调是否关闭。",
      "写作业时尽量使用自然光，减少白天开灯。",
      "提醒家人电视不用时不要长时间待机。"
    ],
    "垃圾分类": [
      "每天晚饭后帮家里检查一次垃圾桶分类。",
      "把塑料瓶和纸盒冲洗整理好后再回收。",
      "记住电池、过期药品要单独处理。"
    ],
    "节约用水": [
      "刷牙时及时关水龙头，不让清水一直流。",
      "洗菜水可以用来浇花，尝试循环用水。",
      "洗手时控制时长，养成用完就关的习惯。"
    ],
    "绿色出行": [
      "距离近的时候尽量步行或骑车。",
      "和家人出门时优先选择公交地铁。",
      "记录一周绿色出行次数，做成小表格。"
    ]
  };

  const selectedPlan = plans[goal];
  planContent.innerHTML = `
    <strong>${name}的${goal}计划</strong>
    <span>建议每天坚持 ${time}，连续完成一周。</span>
    <span>1. ${selectedPlan[0]}</span>
    <span>2. ${selectedPlan[1]}</span>
    <span>3. ${selectedPlan[2]}</span>
    <span>目标口号：我用小行动，守护大地球！</span>
  `;
  recordWeeklyAction(`${goal}计划`, `今天生成了一份${goal}计划，准备把环保行动坚持一周。`, 2);
  showToast("低碳计划已生成，今天就可以开始实践。");
});

checkinGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".checkin-chip");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const todayIndex = getWeekdayIndex();
  const todayRecord = weeklyRecords[todayIndex];
  const exists = todayRecord.actions.includes(action);

  if (exists) {
    todayRecord.actions = todayRecord.actions.filter((item) => item !== action);
    todayRecord.value = Math.max(0, todayRecord.value - 1);
    todayRecord.note = `今天取消了一项“${action}”记录，当前继续保持其他环保行动。`;
    saveWeeklyRecords();
    renderTrend();
    updateTodayCheckins();
    showToast(`已取消“${action}”打卡。`);
    return;
  }

  recordWeeklyAction(action, `今天完成了“${action}”这项环保行动，已经成功记入本周趋势。`);
  showToast(`已记录“${action}”打卡。`);
});

resetWeekButton.addEventListener("click", () => {
  resetWeeklyRecords();
  showToast("本周记录已清空，已恢复为初始状态。");
});

window.addEventListener("scroll", updateActiveNav, { passive: true });

async function initApp() {
  loadWeeklyRecords();
  renderTrend();
  drawTask(false);
  switchSlogan();
  updateTodayCheckins();
  updateActiveNav();
  await loadQuizBank();
  buildQuiz();
}

initApp();
