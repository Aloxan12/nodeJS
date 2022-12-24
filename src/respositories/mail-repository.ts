import nodemailer from 'nodemailer'

const host: string = `${process.env.SMTP_HOST}`
const port: string = `${process.env.SMTP_PORT}`

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

export const mailRepository = {
    async sendActivationMail(to: string, link: string){
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккуанта на ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}