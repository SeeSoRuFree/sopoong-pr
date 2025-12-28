import { Article, Category } from '@/types/article';

export const categories: Category[] = [
  { id: '1', slug: 'view', name: '소풍VIEW', description: '벤처업계 인사이트' },
  { id: '2', slug: 'pick', name: '소풍PICK', description: '소풍이 선택한 콘텐츠' },
  { id: '3', slug: 'notice', name: '공지사항', description: '소풍벤처스 소식' },
];

export const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'climate-tech-2024-outlook',
    title: '기후테크 2.0 시대가 도래했습니다. 소풍벤처스가 바라보는 2024년 전망',
    summary: '세계 정세의 변화 등 여러 리스크 속에서도 기후테크 분야는 투자의 주류이자 대세가 되어가고 있다. 한 대표는 그 예로 올해 미국 녹색채권 시장의 폭발적 성장을 언급했다.',
    content: `
<h2>기후테크, 가파른 성장세</h2>
<p>이날 기조연설을 진행한 한상엽 소풍벤처스 대표는 "세계 정세의 변화 등 여러 리스크 속에서도 기후테크 분야는 투자의 '주류'이자 '대세'가 되어가고 있다"고 설명했다. 한 대표는 그 예로 "올해 미국 녹색채권 시장의 폭발적 성장을 언급하며, 이는 기후테크 투자에 대한 시장의 신뢰를 보여주는 것"이라고 강조했다.</p>

<p>소풍벤처스는 국내에서 가장 먼저 기후테크의 잠재력을 알아보고 투자해 온 투자사다. 국내 투자사 중 가장 많은 기후테크 분야 포트폴리오사 숫자를 보유하고 있다. 지난해 이런 성과를 인정 받아 중소기업벤처부장관상을 수상하기도 했다.</p>

<figure>
<img src="https://picsum.photos/seed/climate/800/450" alt="기후테크 컨퍼런스 현장" />
<figcaption>소풍벤처스 기후테크 컨퍼런스 현장</figcaption>
</figure>

<h2>국내 정책적 환경도 긍정적</h2>
<p>이 같은 투자를 이끌어온 한 대표는 국내 정책적 환경도 긍정적이라 평가했다. 그는 "기후에너지부가 출범해 컨트롤타워도 만들어진 데다 올해 말 중소기업 탄소중립 지원에 관한 법률 신설될 예정이며, 주가 고공행진을 이어가는 미래 기후테크 관련 기업들의 약 1/4가 국내 신규 상장기업"이라고 설명했다.</p>

<blockquote>
<p>"기후테크의 수익성은 주류 자본시장에서도 증명되고 있다. 실제 최근 약 5년간 국내 신규 상장기업의 약 1/4가 기후테크 관련 기업이며, 에너지, 배터리 등도 기후테크가 이끄는 그린 트랜스포메이션(GX)이다."</p>
</blockquote>

<h2>투자 포인트</h2>
<p>한 대표에 따르면 이미 기후테크의 수익성은 주류 자본시장에서도 증명되고 있다. 실제 최근 약 5년간 국내 신규 상장기업의 약 1/4가 기후테크 관련 기업이며, 주가 고공행진을 이어가는 미래 기후테크 관련 기업들이 늘어나고 있다.</p>

<p>특히 탄소중립 정책이 강화되면서 기후테크 스타트업에 대한 관심이 높아지고 있다. 소풍벤처스는 이러한 트렌드를 선도하며 지속 가능한 미래를 위한 투자를 계속해 나갈 계획이다.</p>
`,
    thumbnail: 'https://picsum.photos/seed/climate/800/600',
    category: '소풍VIEW',
    author: '소풍벤처스',
    publishedAt: '2024.12.17',
    status: 'published',
    isFeatured: true,
    createdAt: '2024-12-17T09:00:00Z',
    updatedAt: '2024-12-17T09:00:00Z',
  },
  {
    id: '2',
    slug: 'startup-growth-strategy',
    title: '스타트업 성장 전략: 초기 단계에서 시리즈 A까지',
    summary: '스타트업이 초기 단계에서 시리즈 A 투자를 유치하기까지, 어떤 전략과 준비가 필요한지 소풍벤처스의 경험을 바탕으로 정리했습니다.',
    content: `
<h2>시작하기 전에</h2>
<p>스타트업의 성장은 단순히 아이디어만으로 이루어지지 않습니다. 체계적인 전략과 실행력, 그리고 적절한 시기의 투자 유치가 필요합니다.</p>

<h2>초기 단계에서 중요한 것들</h2>
<p>제품-시장 적합성(PMF)을 찾는 것이 가장 중요합니다. 고객의 진정한 문제를 해결하고 있는지, 그리고 그 해결책에 대한 수요가 있는지를 검증해야 합니다.</p>

<blockquote>
<p>"PMF를 찾기 전까지는 모든 것이 가설입니다. 빠르게 실험하고, 빠르게 학습하세요."</p>
</blockquote>

<h2>시리즈 A 준비하기</h2>
<p>시리즈 A 투자를 준비할 때는 명확한 성장 지표와 확장 가능한 비즈니스 모델이 필요합니다. 투자자들은 단순한 아이디어가 아닌 검증된 실행력을 보고 싶어합니다.</p>
`,
    thumbnail: 'https://picsum.photos/seed/startup/800/600',
    category: '소풍VIEW',
    author: '소풍벤처스',
    publishedAt: '2024.12.15',
    status: 'published',
    isFeatured: false,
    createdAt: '2024-12-15T09:00:00Z',
    updatedAt: '2024-12-15T09:00:00Z',
  },
  {
    id: '3',
    slug: 'portfolio-company-crycheese',
    title: '크라이치즈버거: "비효율이 우리의 무기다" 토종 햄버거의 13년 성장 법칙',
    summary: '롱블랙 프렌즈 K 엄숙한 분위기의 타운홀 미팅. 무거운 공기를 뚫고 양손에 햄버거 봉투를 든 사람이 나타나요. 머리에 우는 얼굴의 인형탈을 쓰고서요.',
    content: `
<h2>비효율의 미학</h2>
<p>크라이치즈버거는 효율성을 추구하는 패스트푸드 업계에서 정반대의 길을 걷고 있습니다. 모든 패티는 주문 후 직접 굽고, 모든 소스는 매장에서 직접 만듭니다.</p>

<p>이러한 비효율은 오히려 그들의 강점이 되었습니다. 고객들은 기다림의 가치를 알고, 그 기다림 끝에 만나는 버거의 맛에 열광합니다.</p>

<h2>13년의 성장</h2>
<p>2011년 작은 매장에서 시작한 크라이치즈버거는 이제 전국에 매장을 보유한 브랜드로 성장했습니다. 그 비결은 바로 '타협하지 않는 품질'입니다.</p>
`,
    thumbnail: 'https://picsum.photos/seed/burger/800/600',
    category: '소풍PICK',
    author: '소풍벤처스',
    publishedAt: '2024.12.14',
    status: 'published',
    isFeatured: false,
    createdAt: '2024-12-14T09:00:00Z',
    updatedAt: '2024-12-14T09:00:00Z',
  },
  {
    id: '4',
    slug: 'esg-investment-trends',
    title: 'ESG 투자 트렌드: 2024년 주목할 키워드',
    summary: 'ESG 투자가 더 이상 선택이 아닌 필수가 된 시대. 2024년 ESG 투자에서 주목해야 할 핵심 키워드를 정리했습니다.',
    content: `
<h2>ESG의 진화</h2>
<p>ESG(환경, 사회, 지배구조) 투자는 이제 단순한 트렌드를 넘어 투자의 기본 원칙이 되었습니다. 특히 기후 위기에 대한 인식이 높아지면서 환경 분야의 중요성이 더욱 부각되고 있습니다.</p>

<h2>2024년 핵심 키워드</h2>
<p>탄소중립, 순환경제, 공정한 전환(Just Transition)이 올해의 핵심 키워드입니다. 특히 공정한 전환은 기후 대응 과정에서 소외되는 계층 없이 모두가 함께 나아가는 것을 의미합니다.</p>
`,
    thumbnail: 'https://picsum.photos/seed/esg/800/600',
    category: '소풍VIEW',
    author: '소풍벤처스',
    publishedAt: '2024.12.12',
    status: 'published',
    isFeatured: false,
    createdAt: '2024-12-12T09:00:00Z',
    updatedAt: '2024-12-12T09:00:00Z',
  },
  {
    id: '5',
    slug: 'venture-ecosystem-korea',
    title: '한국 벤처 생태계의 현재와 미래',
    summary: '글로벌 경기 침체 속에서도 한국 벤처 생태계는 새로운 도약을 준비하고 있습니다. 현황과 전망을 살펴봅니다.',
    content: `
<h2>현재 상황</h2>
<p>글로벌 금리 인상과 경기 침체 우려 속에서 한국 벤처 생태계도 조정기를 맞고 있습니다. 그러나 이는 건전한 조정이며, 실력 있는 스타트업에게는 오히려 기회가 될 수 있습니다.</p>

<h2>미래 전망</h2>
<p>AI, 기후테크, 헬스케어 분야에서 한국 스타트업의 경쟁력이 높아지고 있습니다. 정부의 적극적인 지원 정책과 함께 벤처 생태계의 새로운 도약이 기대됩니다.</p>
`,
    thumbnail: 'https://picsum.photos/seed/venture/800/600',
    category: '소풍VIEW',
    author: '소풍벤처스',
    publishedAt: '2024.12.10',
    status: 'published',
    isFeatured: false,
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-10T09:00:00Z',
  },
  {
    id: '6',
    slug: 'sopoong-news-2024',
    title: '소풍벤처스 2024년 연말 행사 안내',
    summary: '소풍벤처스 포트폴리오사와 함께하는 2024년 연말 네트워킹 행사에 여러분을 초대합니다.',
    content: `
<h2>행사 안내</h2>
<p>소풍벤처스는 2024년 연말을 맞아 포트폴리오사와 함께하는 네트워킹 행사를 개최합니다. 한 해 동안의 성과를 나누고, 내년을 함께 준비하는 시간이 될 것입니다.</p>

<h2>참가 안내</h2>
<p>일시: 2024년 12월 20일 (금) 오후 6시<br/>
장소: 서울 강남구 테헤란로 (상세 주소 추후 안내)<br/>
대상: 소풍벤처스 포트폴리오사 임직원</p>
`,
    thumbnail: 'https://picsum.photos/seed/event/800/600',
    category: '공지사항',
    author: '소풍벤처스',
    publishedAt: '2024.12.08',
    status: 'published',
    isFeatured: false,
    createdAt: '2024-12-08T09:00:00Z',
    updatedAt: '2024-12-08T09:00:00Z',
  },
];

// 헬퍼 함수들
export function getArticleBySlug(slug: string): Article | undefined {
  return sampleArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const categoryName = categories.find((c) => c.slug === categorySlug)?.name;
  if (!categoryName) return [];
  return sampleArticles.filter((article) => article.category === categoryName);
}

export function getFeaturedArticle(): Article | undefined {
  return sampleArticles.find((article) => article.isFeatured);
}

export function getLatestArticles(count: number = 6): Article[] {
  return sampleArticles.slice(0, count);
}
