function getSuffixFromNumber(number) {
    switch (`${number}`) {
        case "":
            return "";
        case "1":
            return "st";
        case "2":
            return "nd";
        case "3":
            return "rd";
        default:
            return "th";
    }
}

export default getSuffixFromNumber
