$('document').ready(function () {
    $.get('notes.json').done(function(response){
        var notes = response.notes;
        for (var noteIndex in notes) {
            var listItem = "<li>" + notes[noteIndex].content + "</li>";
            $('#list').append(listItem);
        }
    });
});
