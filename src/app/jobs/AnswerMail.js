import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student.email} <${data.student.email}>`,
      subject: 'Voce recebeu uma nova resposta',
      html: '<p>primeiro email</p>',
    });
  }
}

export default new AnswerMail();
