$('document').ready(function () {

    $('#submit').on("click", function () {
        appendNote();
    });

    $('#textBox').keyup( function (e)  {
        if (e.which == 13) {        // on release of the return key
            appendNote();
        }
    });

    $.get('http://notee.de/spaces/test/index.php').done(
        function listIt(fileContent) {
            var items = JSON.parse(fileContent);
            for (var index in items.notes) {

                $('#list').append('<li  class="list-group-item" style="background-color: ' + items.notes[index].color + '">' +  items.notes[index].content + '</li>');
            }
        }
    );

});

function appendNote(){
    var typedNote = $('#textBox').val();
    if ( typedNote == "") {
        alert('note is empty!');
    } else {
        var checkedColors = $(':checked');
        var noteColor = checkedColors[0].id;
        var payload = {
            content: typedNote,
            color: noteColor
        };
        submitNote(payload);
    }
}

function submitNote(payload) {
    sendNote(payload);
    $('#textBox').val('');
   location.reload(); //TODO change this ugly stuff
}

function sendNote(payload) {
    $.post('http://notee.de/spaces/test/index.php',payload );
}