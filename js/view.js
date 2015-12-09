function updateView(data) {
    var status = JobStatus[data.status];
    var template;
    
    if (data.status === 1) {
        template = 'template/jenkins-pending.html';
    } else {
        template = 'template/jenkins-build.html';
    }

    // Get template
    $.ajax(chrome.extension.getURL(template), {
        success: function (template) {
            var html = template.supplant({
                status: status,
                class: 'jenkins-build__' + status.toLowerCase(),
                buildUrl: 'http://jenkins.ssdm.bskyb.com:8080/jenkins/job/'
                    + window.location.pathname.split('/')[2] + '/' + data.job_number
                    + '/console'
            });

            // Append or update
            if ($('.jenkins-build').length > 0) {
                $('.jenkins-build').replaceWith(html);
            } else {
                $('.ui-box').eq(1).after(html);
            }
        }
    });
}