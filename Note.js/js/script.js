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
        function (fileContent) {
            var jsonContent = JSON.parse(fileContent);
            for (var index in jsonContent.notes) {

                $('#list').append('<li  class="list-group-item" style="background-color: ' + jsonContent.notes[index].color + '">' +  jsonContent.notes[index].content + '</li>');
            }
        }
    );

});

function appendNote(){
    var typedNote = $('#textBox').val();
    if ( typedNote == "") {
        alert('note is empty!');
    } else {
        var checkedColors = $('#colorButtons :checked');
        var noteColor = checkedColors[0].id;
        var payload = {
            content: typedNote,
            color: noteColor
        };
        submitNote(payload);
    }
}

function submitNote(payload) {
    makePostAction(payload);
    $('#textBox').val('');
   location.reload(); //TODO change this ugly stuff
}

function makePostAction(payload) {
    $.post('http://notee.de/spaces/test/index.php',payload );
}