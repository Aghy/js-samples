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

                $('#list').append('<li>' +  items.notes[index].content + '</li>');
            }
        }
    );

});

function appendNote(){
    var typedNote = $('#textBox').val();
    if ( typedNote == "") {
        alert('note is empty!');
    } else {
        submitNote(typedNote);
    }
}

function submitNote(typedNote) {
    sendNote(typedNote);
    $('#textBox').val('');
    location.reload(); //TODO change this ugly stuff
}

function sendNote(note) {
    $.post('http://notee.de/spaces/test/index.php',{content: note} );
}