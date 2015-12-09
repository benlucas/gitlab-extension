$(function() {
    contactServer();

    $('body').on('click', '.jenkins-build__trigger', function() {
        contactServer();
    });
});

function contactServer() {
    var socket = io('https://ut002924:3000');
    
    socket.emit('status_update', {
        repository: window.location.pathname.split('/')[2],
        branch: $('.label-branch').eq(0).text(),
        recent_hash: $('.commit:eq(0) .commit_short_id').text(),
        date: Date.now()
    });

    socket.on('status_change', function (data) {
        updateView(data);
    });
}