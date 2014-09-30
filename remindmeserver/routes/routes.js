var Agenda = require('agenda');
var mandrill = require('mandrill-api/mandrill');

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('*');

// Create a function to log the response from the Mandrill API
function log(obj) {
    console.log(JSON.stringify(obj));
}

function sendTheMail(data) {
// Send the email!
    console.log('sending mail');
    m.messages.send(data, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}

module.exports = {
    createReminder: function(req, res) {
        var agenda = new Agenda({db: {address: 'localhost:27017/remindme'}});
        
        var text = req.body.what;
        var date = new Date(req.body.whendate);
        var time = req.body.whentime.split(':');
        date.setHours(time[0]);
        date.setMinutes(time[1]);
        var whom = req.body.whom;
        
        var params = {
            "message": {
                "from_email":"gaurav.sri87@gmail.com",
                "to":[{"email":whom}],
                "subject": "Reminder",
                "text": text
            }
        };
        
        agenda.define('send email', {priority: 'high', concurrency: 10}, function(job, done) {
            var data = job.attrs.data;
            console.log(data);
            sendTheMail(data);
            done();
        });

        agenda.schedule(date, 'send email', params);
        agenda.start();
        res.send(200);
    }
}