import Mail from '../../lib/Mail';

class InformationMail {
  get key() {
    return 'InformationMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student.email} <${data.student.email}>`,
      subject: 'Plano cadastrado',
      html: '<p>primeiro email</p>',
    });
  }
}

export default new InformationMail();
