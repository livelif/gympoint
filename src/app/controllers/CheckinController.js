import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;
    const daysAgo = 7;

    if (!(await Checkin.studentLastCheckinWas(daysAgo, id))) {
      return res.status(400).json({ message: 'Last checkin must be 7 days' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });
    return res.json(checkin);
  }

  async index(req, res) {
    const studentId = req.params.id;
    const last = await Checkin.findAll({
      where: {
        student_id: studentId,
      },
    });

    return res.json(last);
  }
}

export default new CheckinController();
