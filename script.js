/* ================================================================
   포니 ❤️ 그뇨 D-day 위젯
   
   📌 새 기념일 추가하는 방법:
   아래 EVENTS 배열에 한 줄 추가하시면 됩니다!
   
   📌 메시지 추가/수정:
   LOVE_MESSAGES 배열에서 자유롭게 수정하세요.
   ================================================================ */


/* ================================================================
   ⚙️ 설정 영역 - 여기만 수정하세요!
   ================================================================ */

// 기념일 목록
// mode 옵션:
//   - 'count-up'  : 그날부터 며칠 지났는지 (D+0, D+1, D+2... 계속 증가)
//   - 'birthday'  : 매년 돌아오는 생일 (다음 생일까지 D-일 자동 계산)
//   - 'anniversary' : 매년 돌아오는 기념일 (1주년, 2주년... 자동 표시)
//   - 'one-time'  : 한 번만 있는 미래 이벤트 (D-day 지나면 D+로 전환)
const EVENTS = [
  // 메인 카드에 표시될 이벤트 (제일 첫 번째이면서 hero: true인 것)
  { 
    name: '우리가 함께한 시간', 
    date: '2026-04-27', 
    icon: '💗', 
    mode: 'count-up',
    hero: true  // ← 메인 카드로 표시할 이벤트는 hero: true 추가
  },
  
  // 다가오는 기념일 그리드에 표시될 이벤트들
  { 
    name: '포니 생일', 
    date: '1996-02-01', 
    icon: '🎀', 
    mode: 'birthday' 
  },
  { 
    name: '서방님 생일', 
    date: '1994-09-08', 
    icon: '🤴', 
    mode: 'birthday' 
  },
  
  // 👇 새 기념일은 아래에 추가하시면 됩니다 (예시)
  // { name: '결혼기념일', date: '2027-05-20', icon: '💍', mode: 'anniversary' },
  // { name: '첫째 생일', date: '2028-03-15', icon: '👶', mode: 'birthday' },
  // { name: '장인어른 생신', date: '1965-07-10', icon: '🎁', mode: 'birthday' },
];

// 클릭 시 나타나는 사랑 메시지 (랜덤으로 하나 선택됨)
const LOVE_MESSAGES = [
  '오늘도 사랑해 💕',
  '보고싶다 🥺',
  '우리 영원히 💗',
  '너밖에 없어 💘',
  '항상 고마워 🌷',
  '함께라서 행복해 ✨',
  '사랑하는 그뇨 💝',
  '내 마음속 1순위 💖',
  '꽉 안아주고싶다 🤗',
  '오늘 뭐했어? 💌',
];


/* ================================================================
   📅 D-day 계산 함수들
   ================================================================ */

/**
 * 두 날짜 사이의 일수 차이를 계산
 * @param {Date} from - 시작 날짜
 * @param {Date} to - 끝 날짜
 * @returns {number} 일수 차이 (to - from)
 */
function getDayDiff(from, to) {
  // 시간 정보를 무시하고 날짜만 비교 (00:00:00 기준)
  const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  const diffMs = toDate - fromDate;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * 다음 생일/기념일 날짜 계산 (매년 돌아오는 이벤트용)
 * @param {Date} originalDate - 원래 날짜 (생일이면 태어난 날)
 * @param {Date} today - 오늘 날짜
 * @returns {Date} 다음 기념일 날짜
 */
function getNextAnnualDate(originalDate, today) {
  const month = originalDate.getMonth();
  const day = originalDate.getDate();
  
  // 올해 기념일 날짜
  let nextDate = new Date(today.getFullYear(), month, day);
  
  // 올해 기념일이 이미 지났으면 내년 기념일로
  if (nextDate < today) {
    nextDate = new Date(today.getFullYear() + 1, month, day);
  }
  
  return nextDate;
}

/**
 * 이벤트의 D-day 정보 계산
 * @param {Object} event - EVENTS 배열의 이벤트 객체
 * @param {Date} today - 오늘 날짜
 * @returns {Object} { ddayText, dayCount, displayDate, isUrgent }
 */
function calculateDday(event, today) {
  const eventDate = new Date(event.date);
  let dayCount, displayDate, ddayText;
  
  if (event.mode === 'count-up') {
    // 그날부터 며칠 지났는지
    dayCount = getDayDiff(eventDate, today);
    ddayText = `D + ${dayCount.toLocaleString()}`;
    displayDate = formatKoreanDate(eventDate);
    
  } else if (event.mode === 'birthday' || event.mode === 'anniversary') {
    // 다음 기념일까지 며칠
    const nextDate = getNextAnnualDate(eventDate, today);
    dayCount = getDayDiff(today, nextDate);
    
    if (dayCount === 0) {
      ddayText = 'D - DAY 🎉';  // 당일!
    } else {
      ddayText = `D - ${dayCount}`;
    }
    
    // 몇 주년인지 계산 (anniversary 모드)
    if (event.mode === 'anniversary') {
      const yearsCount = nextDate.getFullYear() - eventDate.getFullYear();
      displayDate = `${formatKoreanDate(nextDate)} · ${yearsCount}주년`;
    } else {
      // 생일 - 몇 살이 되는지 계산
      const ageTurning = nextDate.getFullYear() - eventDate.getFullYear();
      displayDate = `${formatKoreanDate(nextDate)} · ${ageTurning}번째 생일`;
    }
    
  } else if (event.mode === 'one-time') {
    // 한 번만 있는 이벤트
    dayCount = getDayDiff(today, eventDate);
    if (dayCount > 0) {
      ddayText = `D - ${dayCount}`;
    } else if (dayCount === 0) {
      ddayText = 'D - DAY 🎉';
    } else {
      ddayText = `D + ${Math.abs(dayCount)}`;
    }
    displayDate = formatKoreanDate(eventDate);
  }
  
  // 30일 이내면 urgent 표시 (분홍 하이라이트)
  const isUrgent = (event.mode !== 'count-up') && dayCount <= 30 && dayCount >= 0;
  
  return { ddayText, dayCount, displayDate, isUrgent };
}

/**
 * 날짜를 한국어 형식으로 변환
 * @param {Date} date - 날짜
 * @returns {string} "2027.02.01 (월)" 형식
 */
function formatKoreanDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDays[date.getDay()];
  return `${year}.${month}.${day} (${weekDay})`;
}


/* ================================================================
   🎯 마일스톤 자동 계산 (100일, 200일, 1주년 등)
   ================================================================ */

/**
 * 사귄날 기준 다가오는 마일스톤 자동 계산
 * @param {Date} startDate - 사귄날
 * @param {Date} today - 오늘 날짜
 * @returns {Array} 다가오는 마일스톤 3개
 */
function getUpcomingMilestones(startDate, today) {
  const daysSince = getDayDiff(startDate, today);
  
  // 마일스톤 후보 목록
  const milestoneCandidates = [];
  
  // 일 단위 마일스톤 (100일, 200일, 300일, 500일, 700일, 1000일, 2000일...)
  const dayMilestones = [100, 200, 300, 500, 700, 1000, 1500, 2000, 3000, 5000, 7000, 10000];
  dayMilestones.forEach(days => {
    if (days > daysSince) {
      milestoneCandidates.push({
        name: `${days.toLocaleString()}일`,
        targetDays: days,
        daysAway: days - daysSince,
        type: 'day'
      });
    }
  });
  
  // 연 단위 마일스톤 (1주년, 2주년, 3주년... 50주년까지)
  for (let year = 1; year <= 50; year++) {
    const targetDate = new Date(startDate.getFullYear() + year, startDate.getMonth(), startDate.getDate());
    const daysAway = getDayDiff(today, targetDate);
    if (daysAway > 0) {
      milestoneCandidates.push({
        name: `${year}주년`,
        targetDays: getDayDiff(startDate, targetDate),
        daysAway: daysAway,
        type: 'year',
        targetDate: targetDate
      });
    }
  }
  
  // 가까운 순으로 정렬
  milestoneCandidates.sort((a, b) => a.daysAway - b.daysAway);
  
  // 가장 가까운 3개 반환
  return milestoneCandidates.slice(0, 3);
}


/* ================================================================
   🌸 시즌별 배경 장식
   ================================================================ */

/**
 * 현재 계절에 맞는 떠다니는 이모지 추가
 */
function setupSeasonalDecoration() {
  const month = new Date().getMonth() + 1;  // 1-12
  let emojis = [];
  
  // 계절 판단 (한국 기준)
  if (month >= 3 && month <= 5) {
    // 봄: 벚꽃, 꽃
    emojis = ['🌸', '🌸', '🌷', '🌼'];
  } else if (month >= 6 && month <= 8) {
    // 여름: 해, 바다, 수박
    emojis = ['☀️', '🌊', '🍉', '🌻'];
  } else if (month >= 9 && month <= 11) {
    // 가을: 단풍, 낙엽
    emojis = ['🍁', '🍂', '🌾', '🍄'];
  } else {
    // 겨울: 눈, 눈사람
    emojis = ['❄️', '⛄', '☃️', '🤍'];
  }
  
  const decoration = document.getElementById('seasonDecoration');
  
  // 떠다니는 이모지 6개 생성
  for (let i = 0; i < 6; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojis[i % emojis.length];
    
    // 랜덤 위치와 애니메이션 시작 시점
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDelay = `${Math.random() * 15}s`;
    emoji.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    decoration.appendChild(emoji);
  }
}


/* ================================================================
   🎨 렌더링 함수들 (화면에 그려주는 부분)
   ================================================================ */

/**
 * 메인 히어로 카드 렌더링 (사귄날 등 hero: true인 이벤트)
 */
function renderHero(today) {
  const heroEvent = EVENTS.find(e => e.hero) || EVENTS[0];
  const result = calculateDday(heroEvent, today);
  
  document.getElementById('heroIcon').textContent = heroEvent.icon;
  document.getElementById('heroLabel').textContent = heroEvent.name;
  document.getElementById('heroDday').textContent = result.ddayText;
  document.getElementById('heroDate').textContent = `${result.displayDate} 부터`;
  
  // count-up 모드면 추억의 메시지 표시
  if (heroEvent.mode === 'count-up') {
    document.getElementById('heroMessage').textContent = '∞ 영원히 함께 ∞';
  }
}

/**
 * 다가오는 기념일 카드 그리드 렌더링
 */
function renderUpcoming(today) {
  const grid = document.getElementById('upcomingGrid');
  grid.innerHTML = '';
  
  // hero: true가 아닌 이벤트들 가져오기
  const upcomingEvents = EVENTS.filter(e => !e.hero);
  
  // 가까운 순으로 정렬
  const eventsWithDday = upcomingEvents.map(event => {
    const result = calculateDday(event, today);
    return { event, result };
  });
  eventsWithDday.sort((a, b) => a.result.dayCount - b.result.dayCount);
  
  // 카드 생성
  eventsWithDday.forEach(({ event, result }) => {
    const card = document.createElement('div');
    card.className = 'upcoming-card' + (result.isUrgent ? ' urgent' : '');
    
    card.innerHTML = `
      <div class="upcoming-icon">${event.icon}</div>
      <div class="upcoming-name">${event.name}</div>
      <div class="upcoming-dday">${result.ddayText}</div>
      <div class="upcoming-date">${result.displayDate}</div>
    `;
    
    // 클릭 시 사랑 메시지 표시
    card.addEventListener('click', showLovePopup);
    
    grid.appendChild(card);
  });
}

/**
 * 마일스톤 카드 렌더링
 */
function renderMilestones(today) {
  const heroEvent = EVENTS.find(e => e.hero) || EVENTS[0];
  
  // count-up 모드 이벤트가 있을 때만 마일스톤 계산
  if (heroEvent.mode !== 'count-up') {
    document.getElementById('milestoneCard').style.display = 'none';
    return;
  }
  
  const startDate = new Date(heroEvent.date);
  const milestones = getUpcomingMilestones(startDate, today);
  
  const list = document.getElementById('milestoneList');
  list.innerHTML = '';
  
  milestones.forEach(milestone => {
    const item = document.createElement('div');
    item.className = 'milestone-item';
    item.innerHTML = `
      <span class="milestone-name">💎 ${milestone.name}</span>
      <span class="milestone-dday">D - ${milestone.daysAway}</span>
    `;
    list.appendChild(item);
  });
}

/**
 * 푸터의 현재 시간/날짜 렌더링
 */
function renderFooter() {
  const now = new Date();
  
  // 날짜
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDays[now.getDay()];
  document.getElementById('currentDate').textContent = `${year}.${month}.${day} (${weekDay})`;
  
  // 시간 (매분 갱신)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
}


/* ================================================================
   💕 사랑 메시지 팝업 (이스터에그)
   ================================================================ */

let popupTimer = null;

/**
 * 카드 클릭 시 랜덤 사랑 메시지 표시
 */
function showLovePopup() {
  const popup = document.getElementById('lovePopup');
  const randomMessage = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
  
  popup.textContent = randomMessage;
  popup.classList.remove('hide');
  popup.classList.add('show');
  
  // 이전 타이머 클리어
  if (popupTimer) clearTimeout(popupTimer);
  
  // 1.5초 후 사라지기
  popupTimer = setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hide');
  }, 1500);
}


/* ================================================================
   🚀 초기 실행
   ================================================================ */

/**
 * 위젯 전체 갱신
 */
function updateWidget() {
  const today = new Date();
  
  renderHero(today);
  renderUpcoming(today);
  renderMilestones(today);
  renderFooter();
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  setupSeasonalDecoration();
  updateWidget();
  
  // 메인 카드 클릭 이벤트
  document.getElementById('heroCard').addEventListener('click', showLovePopup);
  
  // 1분마다 시간 갱신 + 자정 넘으면 D-day도 자동 갱신
  setInterval(() => {
    updateWidget();
  }, 60 * 1000);
});
