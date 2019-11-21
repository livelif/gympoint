import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';
import Student from '../models/Student';
import Help from '../models/Help';

class HelpController {
  async store(req, res) {
    const studentId = req.params.id;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'JSON Invalid' });
    }

    if (!(await Student.studentExist(studentId))) {
      return res.status(400).json({ message: "Student don't exist" });
    }

    await Help.create({
      student_id: studentId,
      question,
    });

    return res.json({ message: 'Help created with sucess' });
  }

  async index(req, res) {
    const studentId = req.params.id;
    const helps = await Help.getQuestionsNotAnsweredOf(studentId);

    return res.json(helps);
  }

  async update(req, res) {
    const studentId = req.params.id;
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ message: 'Invalid answer' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(400).json({ message: "Student don't exist" });
    }

    Queue.add(AnswerMail.key, { student });

    await Help.update(
      { answer },
      {
        where: {
          student_id: studentId,
        },
      }
    );

    return res.json({ menssage: 'Sucessful answer' });
  }
}

export default new HelpController();
