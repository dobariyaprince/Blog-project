const nodemailer = require('nodemailer');

module.exports.sendOTPemail = async (toMailId,otp) => {
    
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'princedobariyamgp@gmail.com',
            pass : '12345'
        }
    })

    const mailoptions = {
        from : 'princedobariyamgp@gmail.com',
        to : toMailId,
        subject : 'Test App',
        text : `Your OTP is : ${otp}`  
    }

    transporter.sendMail(mailoptions,(err,success) => {
        if(err){
            console.info(err)
        }
        // console.info(success.response)
        return true
    })
}