const inputDate = document.querySelector(".input-bday");
const checkButton = document.querySelector(".btn-check");
const output = document.querySelector(".result")

function reverseString(str) {
    var charList = str.split("");
    var reversedList = charList.reverse();
    var reversedString = reversedList.join("");
    return reversedString;
}

function IsPalindrome(str) {
    var reversedString = reverseString(str);
    return reversedString === str;
}

function getDateAsString(date) {
    var dateInStr = {
        day: "",
        month: "",
        year: ""
    }

    if (date.day < 10) {
        date.day = "0" + date.day;
    } else {
        date.day = date.day.toString();
    }

    if (date.month < 10) {
        date.month = "0" + date.month;
    } else {
        date.month = date.month.toString();
    }

    date.year = date.year.toString();
    return dateInStr;
}

function getDateInAllFormats(date) {
    var dateInStr = getDateAsString(date);
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var yyyyddmm = date.year + date.day + date.month;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, yyyyddmm, ddmmyy, mmddyy, yyddmm, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getDateInAllFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (IsPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function checkLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (date.month === 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
    console.log({
        day: day,
        month: month,
        year: year,
      })
}


var date = {
    day: 31,
    month: 12,
    year: 2001
}
getNextPalindromeDate(date)