function maxDayInMonth(year, month) {
    if (month < 1 || month > 12) {
        return 0;
    }

    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
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

    let dayIsFloat = parseFloat(document.getElementById('txtDay').value) > parseInt(document.getElementById('txtDay').value);
    let monthIsFloat = parseFloat(document.getElementById('txtMonth').value) > parseInt(document.getElementById('txtMonth').value);
    let yearIsFloat = parseFloat(document.getElementById('txtYear').value) > parseInt(document.getElementById('txtYear').value);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        document.getElementById('lblResult').innerHTML = 'Please fill all the fields.';
    } else if (dayIsFloat || monthIsFloat || yearIsFloat) {
        document.getElementById('lblResult').innerHTML = 'You can only input integer values.';
    } else if (year < 1000) {
        document.getElementById('lblResult').innerHTML = 'Year must be more than 999 and less than 3001.';
    } else {
        let date = `Date: ${day.toString().padStart(2, 0)}/${month.toString().padStart(2, 0)}/${year.toString().padStart(4, 0)}`;

        if (isValidDate(day, month, year)) {
            document.getElementById('lblResult').innerHTML = `${date} is valid.`;
        } else {
            document.getElementById('lblResult').innerHTML = `${date} is invalid.`;
        }
    }
}

function clearInputs() {
    document.getElementById("txtDay").value = "";
    document.getElementById("txtMonth").value = "";
    document.getElementById("txtYear").value = "";
}
