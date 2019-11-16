import Mail from '../../lib/Mail';

class InformationMail {
  get key() {
    return 'InformationMail';
  }

  async handle({ data }) {
    const { student } = data;
    await Mail.sendMail({
      to: `${student.mail} <${student.mail}>`,
      subject: 'Plano cadastrado',
      html: '<p>primeiro email</p>',
    });
  }
}

export default new InformationMail();
