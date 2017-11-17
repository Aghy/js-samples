$('document').ready(function () {

    $('#submit').on("click", function () {
        submitNote();
    });

    $('#textBox').keyup( function (e) {
        if (e.which == 13) {        // on release of the return key
            submitNote();
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

function sendNote(note) {
    $.post('http://notee.de/spaces/test/index.php',{content: note} );
}

function submitNote() {
    var textBoxContent = $('#textBox').val();
    sendNote(textBoxContent);
    $('#textBox').val('');
    location.reload(); //TODO change this ugly stuff
}