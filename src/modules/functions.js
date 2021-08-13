const getReveresedString = (str) => {
  return str.split("").reverse().join("");
};

const isPalindrome = (str) => {
  const reversedString = getReveresedString(str);
  return reversedString === str;
};

const convertDateElementsIntoString = ({ day, month, year }) => {
  const dateElementsAsString = {};
  dateElementsAsString.day = day.toString().padStart(2, "0");
  dateElementsAsString.month = month.toString().padStart(2, "0");
  dateElementsAsString.year = year.toString().padStart(4, "0");

  return dateElementsAsString;
};

const getAllDateFormats = (date) => {
  const { day, month, year } = convertDateElementsIntoString(date);
  const ddmmyyyy = day + month + year;
  const mmddyyyy = month + day + year;
  const yyyymmdd = year + month + day;
  const ddmmyy = day + month + year.slice(-2);
  const mmddyy = month + day + year.slice(-2);
  const yymmdd = year.slice(-2) + month + year;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  const listOfDateFormats = getAllDateFormats(date);
  return listOfDateFormats.some((date) => {
    return isPalindrome(date);
  });
};

const getNextDate = ({ day, month, year }) => {
  const numberOfDaysAccToMonth = {
    1: 31,
    2: (year) => {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return 29;
        } else {
          return 28;
        }
      } else if (year % 4 === 0) {
        return 29;
      } else {
        return 28;
      }
    },
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };
  day += 1;

  // for days
  if (month === 2) {
    if (day > numberOfDaysAccToMonth[month](year)) {
      day = 1;
      month += 1;
    }
  } else {
    if (day > numberOfDaysAccToMonth[month]) {
      day = 1;
      month += 1;
    }
  }

  // for months
  if (month > 12) {
    month = 1;
    year += 1;
  }

  return { day, month, year };
};

const getPreviousDate = ({ day, month, year }) => {
  const numberOfDaysAccToMonth = {
    1: 31,
    2: (year) => {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return 29;
        } else {
          return 28;
        }
      } else if (year % 4 === 0) {
        return 29;
      } else {
        return 28;
      }
    },
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };
  day -= 1;

  if (day === 0) {
    if (month === 3) {
      month -= 1;
      day = numberOfDaysAccToMonth[month](year);
    } else if (month === 1) {
      month = 12;
      day = numberOfDaysAccToMonth[month];
      year -= 1;
    } else {
      month -= 1;
      day = numberOfDaysAccToMonth[month];
    }
  }

  return { day, month, year };
};

const getNextPalindromeDateData = (date) => {
  let gapCounter = 0;
  let nextDate = getNextDate(date);
  while (1) {
    gapCounter += 1;
    if (checkPalindromeForAllDateFormats(nextDate)) {
      break;
    } else {
      nextDate = getNextDate(nextDate);
    }
  }

  return [gapCounter, nextDate];
};

const getPreviousPalindromeDateData = (date) => {
  let gapCounter = 0;
  let previousDate = getPreviousDate(date);
  while (1) {
    gapCounter += 1;
    if (checkPalindromeForAllDateFormats(previousDate)) {
      break;
    } else {
      previousDate = getPreviousDate(previousDate);
    }
  }

  return [gapCounter, previousDate];
};

const getNearestPalindromeDateData = (date) => {
  const nextPalindromeDateData = getNextPalindromeDateData(date);
  const previousPalindromeDateData = getPreviousPalindromeDateData(date);

  if (nextPalindromeDateData[0] < previousPalindromeDateData[0]) {
    return nextPalindromeDateData;
  } else {
    return previousPalindromeDateData;
  }
};

const getMessage = (date) => {
  if (checkPalindromeForAllDateFormats(date)) {
    return `YAY your birth date is a palindrome`;
  } else {
    const [
      numberOfDaysInBetween,
      nearestDateElements
    ] = getNearestPalindromeDateData(date);

    const { day, month, year } = convertDateElementsIntoString(
      nearestDateElements
    );

    return `Sorry but your birthdate is not a palindrome \nThe nearest palindrome date is ${day}-${month}-${year} and you missed it by ${numberOfDaysInBetween} ${
      numberOfDaysInBetween > 1 ? "days" : "day"
    }`;
  }
};

export { getMessage };
