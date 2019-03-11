$("#save").on("click", function (e) {
    var name = $("#name").val();
    var englishName = $("#englishName").val();
    var img = $("#img").val();
    var difficulty = $("#difficulty").val();
    var benefits = $("#benefits").val();
    var contraindications = $("#contraindications").val();
    var instructions = $("#instructions").val();
    var introduction = $("#introduction").val();

    if (validate(name) &&
        validate(englishhName) &&
        validate(img) &&
        validate(difficulty) &&
        validate(benefits) &&
        validate(contraindications) &&
        validate(instructions) &&
        validate(introduction)) {
    } else { e.preventDefault() }
})

function validate(val) {
    if (val != "") {
        return true
    } else {
        return false
    }
}