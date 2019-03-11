var app = new Vue({
    el: "#app",
    data: {
        asanas: [],
        title: "",
    },
    methods: {
        showAsanaDetail: function (index) {
            this.asanas[index].showModal = !this.asanas[index].showModal;
        }
    }
})

function getData(url) {
    $.get(url, function (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].showModal = false;
            app.asanas.push(data[i]);
            var instructions = data[i].instructions.split("*");
            app.asanas.instructions.push(instructions)
            console.log(instructions);
        }
    })
}

var difficulty = location.pathname.split("/");
if (difficulty[2] === "beginner") {
    app.title = "Beginner";
    getData('/yoga/api/' + difficulty[2])
} else if (difficulty[2] === "intermediate") {
    app.title = "Intermediate";
    getData('/yoga/api/' + difficulty[2])
} else if (difficulty[2] === "advanced") {
    app.title = "Advanced";
    getData('/yoga/api/' + difficulty[2])
}