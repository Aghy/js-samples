$('document').ready(function () {

    $('#submit').on("click", function () {
        var textBoxContent = $('#textBox').val();
        sendNote(textBoxContent);
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