export interface PlantData {
  id: 'basil' | 'tomato' | 'tulip'
  emoji: string
  name: string
  tagline: string
  personality: string
  profileSrc: string

  // 카드에 표시 (3줄 소개, 3인칭 존댓말)
  cardIntro: string

  // 모달 자기소개 (1인칭, 식물 성격에 맞는 말투)
  selfIntro: string

  // 집/사무실 적합도
  suitability: {
    home: { score: number; description: string }       // 1~5
    office: { score: number; description: string }
    difficulty: 'easy' | 'medium' | 'hard'
    difficultyLabel: string
    period: string  // 수확/개화까지 기간
  }

  // 관리 요령
  care: {
    sunlight: string
    water: string
    temperature: string
    pot: string
  }

  // 성장 단계
  growthSteps: {
    step: number
    title: string
    description: string
  }[]
}

export const PLANTS: PlantData[] = [
  {
    id: 'basil',
    emoji: '',
    name: '바질',
    tagline: '작은 희망을 품은 허브',
    personality: '#쿨하고 시니컬한 친구',
    profileSrc: '/images/characters/bajil_profile.png',

    cardIntro: '열대 아시아에서 온 향긋한 허브예요. 민트 향과 은은한 정향 향이 어우러져 다양한 요리에 활용할 수 있어요. 발아가 쉬워 처음 식물을 키우는 분도 쉽게 시작할 수 있어요!',

    selfIntro: '안녕 난 바질이야. 나를 소개할게.\n\n나는 햇빛을 엄청 좋아해. 하루 6시간은 필요하거든. 에어컨 바람은 진짜 싫으니까 꼭 창가 쪽에 둬줘..\n\n물은 흙이 말랐을 때만 줘. 과습하면 나 진짜 힘들어ㅡㅅㅡ\n\n그리고 한 가지 더. 꽃대 올라오면 바로 잘라줘야해. 꽃 피면 잎 맛 없어지니까!\n\n수고스럽겠지만 그게 나한테도, 너한테도 나은 선택이야.\n\n잘 키우면 6~8주 후에 수확할 수 있어. 요리에 넣으면 꽤 좋을 테니 기대해도 좋아.',

    suitability: {
      home: {
        score: 5,
        description: '남향 창가라면 최적이에요.\n햇빛만 충분하면 집에서도 잘 자라요.',
      },
      office: {
        score: 3,
        description: '햇빛이 충분한 창가 자리라면 가능해요.\n형광등만으론 부족할 수 있어요.',
      },
      difficulty: 'easy',
      difficultyLabel: '쉬움 — 초보자도 OK',
      period: '파종 후 약 6~8주',
    },

    care: {
      sunlight: '하루 6시간 이상, 남향 창가 최적',
      water: '흙 1cm 깊이가 건조할 때만. 과습 주의',
      temperature: '15°C 이하면 성장 멈춤. 에어컨 바람 피하기',
      pot: '지름 15cm 이상, 배수구 필수',
    },

    growthSteps: [
      { step: 1, title: '씨앗 심기', description: '씨앗 3~5알을 0.5cm 이하 깊이로 얕게 심어요. 파종 시기는 4~6월이 적당해요.' },
      { step: 2, title: '발아', description: '랩으로 덮어 습도를 유지하고 20~25°C에서 5~10일이면 싹이 올라와요.' },
      { step: 3, title: '성장 관리', description: '하루 6시간 이상 햇빛 확보. 본잎이 2~3장 나오면 튼튼한 것만 남기고 솎아요.' },
      { step: 4, title: '순 따기', description: '키가 15~20cm 되면 줄기 끝 2~3마디를 잘라요. 꽃대가 올라오면 즉시 제거해요.' },
      { step: 5, title: '수확', description: '파종 후 6~8주부터 수확 가능. 줄기째 마디 위에서 잘라야 새 순이 나와요.' },
    ],
  },

  {
    id: 'tomato',
    emoji: '',
    name: '방울토마토',
    tagline: '노력의 결실을 맺는 열매',
    personality: '#귀엽고 통통튀는 친구',
    profileSrc: '/images/characters/tom_profile.png',

    cardIntro: '빨갛게 익기까지는 시간이 걸리지만,\n기다린 만큼 달콤한 열매를 선물해 주는 식물이에요.\n키우는 재미와 성취감을 함께 느낄 수 있어요.',

    selfIntro: '안녕!! 나 방울토마토야! (◍\'ᗜ\'◍)\n\n솔직히 말할게. 나 좀 까다로운 편이야. 하루 8시간 이상 햇빛이 꼭 필요하거든.\n\n빛이 부족하면 웃자라거나 열매가 잘 안 맺혀. 그래서 창가 자리가 진짜 중요해!\n\n물은 흙 표면 2~3cm가 마르면 듬뿍 줘. 불규칙하게 주면 배꼽썩음병 생길 수 있어서 조금 신경 써줘야 해.\n\n줄기 사이에 곁순이 나오면 빨리 제거해줘야 해. 안 그러면 열매가 작아지거든. 꽃 피면 살살 흔들어줘!\n\n실내엔 벌이 없으니까 네가 도와줘야 해 ꒰╹ε╹꒱\n\n90~120일 기다리면 달콤한 열매로 보답할게! 약속해! ε⌯(ง ˙ω˙)ว',

    suitability: {
      home: {
        score: 4,
        description: '햇빛이 충분한 창가나 베란다에서 잘 자라요.\n공간이 어느 정도 필요해요.',
      },
      office: {
        score: 2,
        description: '하루 8시간 직사광선이 필요해, 일반 사무실 환경은\n방울토마토가 잘 자라기 조금 어려울 수 있어요.',
      },
      difficulty: 'medium',
      difficultyLabel: '보통 — 조금 부지런해야 해요',
      period: '파종 후 약 90~120일',
    },

    care: {
      sunlight: '하루 8시간 이상 필수. 빛 부족 시 열매 불량',
      water: '흙 표면 2~3cm가 마르면 듬뿍. 불규칙하면 배꼽썩음병 발생',
      temperature: '낮 20~28°C, 밤 15°C 이상. 10°C 이하면 성장 멈춤',
      pot: '클수록 좋음 (최소 15L). 배수구 필수',
    },

    growthSteps: [
      { step: 1, title: '씨앗 심기', description: '씨앗을 하루 물에 불린 후 0.5~1cm 깊이로 심어요. 파종 시기는 3~4월이 좋아요.' },
      { step: 2, title: '발아', description: '20~25°C 유지하며 랩으로 덮어 습도 유지. 7~14일 안에 싹이 나와요.' },
      { step: 3, title: '모종 관리', description: '하루 8시간 이상 햇빛 확보. 본잎 2~3장 나오면 가장 튼튼한 1그루만 남겨요.' },
      { step: 4, title: '큰 화분으로 이동', description: '키 15~20cm, 본잎 5~6장이 되면 15L 이상 화분으로 옮겨요.' },
      { step: 5, title: '곁순 제거 & 지지대', description: '줄기 사이 곁순을 어릴 때 바로 제거하고 키가 크면 지지대를 세워요.' },
      { step: 6, title: '수분 돕기', description: '꽃이 피면 손가락으로 살살 흔들어 수분을 도와줘요.' },
      { step: 7, title: '수확', description: '열매가 전체적으로 붉게 익으면 꼭지 위 줄기째 잘라요.' },
    ],
  },

  {
    id: 'tulip',
    emoji: '',
    name: '튤립',
    tagline: '기다림 끝에 피어나는 꽃',
    personality: '#조용하고 따뜻한 친구',
    profileSrc: '/images/characters/tul_profile.png',

    cardIntro: '냉장 처리가 완료된 구근을 바로 심을 수 있어요.\n화분에 심기만 하면 봄에 예쁜 꽃을 볼 수 있답니다.\n별도 냉장 준비 없이 시작하는 가장 쉬운 튤립이에요.',

    selfIntro: '안녕하세요. 저는 튤립이에요. 🌷\n\n제가 꽃을 피우기까지는 조금 시간이 걸려요. 추운 시간을 견뎌야 봄에 꽃을 피울 수 있거든요.\n\n뾰족한 부분이 위를 향하도록 10~15cm 깊이로 심어주세요. 그게 전부예요.\n\n물은 흙이 마를 때만 주세요. 과습하면 구근이 썩을 수 있어요. 하루 6시간 정도 햇빛을 받으면 충분해요.\n\n꽃이 지고 나서도 잎이 완전히 마를 때까지 기다려 주세요. 구근에 영양이 저장되는 중이거든요. 그래야 내년에도 다시 꽃을 피울 수 있어요.\n\n기다려 주셔서 감사해요. 당신의 하루도 꽃처럼 피어나길 바라요. 🌷',

    suitability: {
      home: {
        score: 5,
        description: '창가에서 6시간 햇빛만 확보되면 집에서 충분히 키울 수 있어요.',
      },
      office: {
        score: 3,
        description: '햇빛 조건만 맞으면 사무실에서도 예쁜 꽃을 볼 수 있어요.\n개화 후 화사한 분위기를 만들어줘요.',
      },
      difficulty: 'easy',
      difficultyLabel: '쉬움 — 냉장 처리 완료 상태로 배송',
      period: '심은 후 약 8~12주',
    },

    care: {
      sunlight: '하루 6시간 이상',
      water: '흙이 마를 때만. 과습 절대 금지 (구근 썩음 원인)',
      temperature: '냉장 처리 완료 상태로 배송돼요. 받으시면 바로 심으세요',
      pot: '깊은 화분 필요. 최소 깊이 20cm 이상',
    },

    growthSteps: [
      { step: 1, title: '받으면 바로 심기', description: '냉장 처리가 완료된 구근이에요. 받으신 후 바로 심을 수 있어요. 오래 두지 마세요.' },
      { step: 2, title: '씨앗 심기', description: '뾰족한 부분이 위를 향하도록 10~15cm 깊이로 심어요.' },
      { step: 3, title: '발아 관리', description: '서늘하고 햇빛 있는 창가에 두세요. 물은 흙이 마를 때만 주세요.' },
      { step: 4, title: '성장', description: '싹이 올라오면 하루 6시간 이상 햇빛을 확보해줘요. 잎이 점점 자라요.' },
      { step: 5, title: '개화', description: '심은 후 8~12주면 꽃이 피어요. 봄에 예쁜 꽃을 만날 수 있어요.' },
      { step: 6, title: '꽃 진 후 관리', description: '잎이 완전히 노랗게 마를 때까지 기다린 후 구근을 캐내어 보관해요.' },
    ],
  },
]
