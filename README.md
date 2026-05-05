# 💗 포니 ❤️ 그뇨 D-day 위젯

노션 페이지에 임베드해서 사용하는 D-day 자동 계산 위젯입니다.

## 🎯 주요 기능

- ✅ **자동 D-day 계산**: 매일 자정 자동 갱신
- 🎂 **생일/기념일 자동 계산**: 매년 돌아오는 이벤트 자동 처리
- 🎯 **마일스톤 자동 표시**: 100일, 1주년 등 자동 계산
- 🌸 **계절별 배경 변화**: 봄/여름/가을/겨울 자동 변경
- 🌙 **다크모드 자동 대응**: 시스템 설정에 따라 자동 전환
- 📱 **모바일 반응형**: 폰에서도 이쁘게
- 💕 **클릭 이스터에그**: 카드 클릭하면 사랑 메시지 팝업

## 📝 새 기념일 추가하는 방법

`script.js` 파일을 열어서 `EVENTS` 배열에 한 줄 추가하면 끝!

### 모드 종류

| 모드 | 설명 | 예시 |
|------|------|------|
| `count-up` | 그날부터 며칠 지났는지 | 사귄날 (D+9, D+10...) |
| `birthday` | 매년 돌아오는 생일 | 포니 생일, 서방님 생일 |
| `anniversary` | 매년 돌아오는 기념일 | 결혼기념일 |
| `one-time` | 한 번만 있는 미래 이벤트 | 이사하는 날 |

### 추가 예시

```javascript
const EVENTS = [
  { name: '우리가 함께한 시간', date: '2026-04-27', icon: '💗', mode: 'count-up', hero: true },
  { name: '포니 생일', date: '1996-02-01', icon: '🎀', mode: 'birthday' },
  { name: '서방님 생일', date: '1994-09-08', icon: '🤴', mode: 'birthday' },
  
  // ↓ 이렇게 줄 추가하면 끝!
  { name: '결혼기념일', date: '2027-05-20', icon: '💍', mode: 'anniversary' },
  { name: '첫째 생일', date: '2028-03-15', icon: '👶', mode: 'birthday' },
  { name: '장인어른 생신', date: '1965-07-10', icon: '🎁', mode: 'birthday' },
];
```

## 💌 사랑 메시지 수정하는 방법

`script.js`의 `LOVE_MESSAGES` 배열에서 자유롭게 수정하세요.

```javascript
const LOVE_MESSAGES = [
  '오늘도 사랑해 💕',
  '보고싶다 🥺',
  // 자유롭게 추가/수정
];
```

## 🎨 색상 변경하는 방법

`style.css` 파일 상단의 `:root` 섹션에서 색상 변수를 수정하면 됩니다.

```css
:root {
  --color-primary: #d4476b;  /* 메인 분홍색 */
  --color-secondary: #6b9bd1;  /* 서브 파랑 */
  /* ... */
}
```

## 🚀 GitHub Pages 배포

1. 이 폴더의 파일들을 GitHub 레포에 업로드
2. Settings → Pages → Source: `main` 브랜치 선택
3. 배포된 URL을 노션 페이지에 임베드 (`/embed` 명령어)
