export const DEBOUNCE_DELAY = 700;
export const BOT = "bot";
export const USER = "user";
export const PINNED = "PINNED";
export const ALL = "ALL";
export const KoreanLanguage = "KO";

export const PLAIN_QUESTION = 1;
export const ADDITIONAL_QUESTION = 2;
export const NEW_ANSWER = 3;

export const OBJECT = "object";
export const STRING = "string";
export const ANY = "any";

export const queryUrl = "query";
export const additionalQuestionUrl = "additional-question";

export const DISLIKED = "DISLIKED";
export const LIKED = "LIKED";

export const carouselSliderProps = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export const checkType = (input: any) => {
  try {
    // Try to parse if it's a JSON string
    const parsedInput = JSON.parse(input);
    if (typeof parsedInput === OBJECT && parsedInput !== null) {
      return OBJECT;
    }
  } catch (e) {
    // If it's not JSON, treat it as a string
    if (typeof input === STRING) {
      return STRING;
    }
  }
  // If input is neither a valid JSON object nor a string, return null or handle as needed
  return ANY;
};

export const testRegex = (str: string) => {
  return /^[\s]*$/.test(str);
};

export const convertTime = (isoTime: any) => {
  const date: any = new Date(isoTime);
  const now: any = new Date();
  const diffMs: number = Math.abs(now - date);

  // Convert milliseconds to minutes, hours, days, months, and years
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  // Handle "yesterday"
  if (diffDays === 1) {
    return "yesterday";
  }

  // Conditional string formatting based on the largest unit
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
  } else {
    return `${diffYears} year${diffYears !== 1 ? "s" : ""}`;
  }
};

export const extractMonthAndDay = (timestamp: any) => {
  const date = new Date(timestamp);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth returns 0-based month
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${month}-${day}`;
};
