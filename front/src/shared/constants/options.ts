export const regionOptions = [
  // 특별시 / 광역시 / 특별자치시
  { label: "지역", value: "" },
  { label: "서울특별시", value: "seoul" },
  { label: "부산광역시", value: "busan" },
  { label: "대구광역시", value: "daegu" },
  { label: "인천광역시", value: "incheon" },
  { label: "광주광역시", value: "gwangju" },
  { label: "대전광역시", value: "daejeon" },
  { label: "울산광역시", value: "ulsan" },
  { label: "세종특별자치시", value: "sejong" },

  // 도
  { label: "경기도", value: "gyeonggi" },
  { label: "강원특별자치도", value: "gangwon" },
  { label: "충청북도", value: "chungbuk" },
  { label: "충청남도", value: "chungnam" },
  { label: "전북특별자치도", value: "jeonbuk" },
  { label: "전라남도", value: "jeonnam" },
  { label: "경상북도", value: "gyeongbuk" },
  { label: "경상남도", value: "gyeongnam" },
  { label: "제주특별자치도", value: "jeju" },
];

export const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "이름순", value: "name" },
  { label: "찜순", value: "favorite" },
];

// 카테고리 필터 TODO 나중에 api로 대체될 수 있음
export const categoryOptions = [
  { label: "카테고리", value: "" },
  { label: "개발", value: "develop" },
  { label: "운동", value: "exercise" },
  { label: "영어", value: "english" },
  { label: "제2외국어", value: "language" },
];
