function maxDayInMonth(year, month) {
    if (month < 1 || month > 12) {
        return 0;
    }

    switch (month) {
        case 1, 3, 5, 7, 8, 10, 12:
            return 31;
        case 4, 6, 9, 11:
            return 30;
        case 2:
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                return 29;
            } else {
                return 28;
            }

        default:
            break;
    }
}

function isValidDate(day, month, year) {
    let maxDay = maxDayInMonth(year, month);

    if (day < 1 || day > maxDay || maxDay === 0 || year < 0) {
        return false;
    }

    return true;

}

function checkDate() {
    let day = parseInt(document.getElementById('txtDay').value);
    let month = parseInt(document.getElementById('txtMonth').value);
    let year = parseInt(document.getElementById('txtYear').value);

    let date = `Date: ${day.toString().padStart(2, 0)}/${month.toString().padStart(2, 0)}/${year.toString().padStart(4, 0)}`;

    if (isValidDate(day, month, year)) {
        document.getElementById('lblResult').innerHTML = `${date} is valid.`;
    } else {
        document.getElementById('lblResult').innerHTML = `${date} is not valid.`;
    }
    // alert(`Day in month: ${maxDayInMonth(year, month)}`);
}

function clearInputs() {
    document.getElementById("txtDay").value = "";
    document.getElementById("txtMonth").value = "";
    document.getElementById("txtYear").value = "";
}
