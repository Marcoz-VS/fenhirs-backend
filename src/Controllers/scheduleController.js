import { Op } from "sequelize";
import { Schedule } from "../Models/Schedule.js";
import { scheduleSchema } from "../Schemas/scheduleSchema.js";

export async function createSchedule(req, res) {
    try {
        const validatedData = scheduleSchema.parse(req.body);

        const {
            scheduleDate,
            scheduleHour,
            booth,
            observation
        } = validatedData;

        const existingSchedule =
            await Schedule.findOne({
                where: {
                    scheduleDate,
                    scheduleHour,
                    booth,

                    status: {
                        [Op.in]: [
                            "PENDING",
                            "APPROVED"
                        ]
                    }
                }
            });

        if (existingSchedule) {
            return res.status(400).json({
                error: "Horário indisponível"
            });

        }

        const schedule =
            await Schedule.create({
                scheduleDate,
                scheduleHour,
                booth,
                observation,
                clientId: req.user.id,
            });

        return res.status(201).json(schedule);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getMySchedules(req, res) {
    try {
        const schedules = await Schedule.findAll({
                where: {
                    clientId: req.user.id
                }
            });

        return res.json(schedules);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getAllSchedules(req, res) {
    try {
        const schedules = await Schedule.findAll();

        return res.json(schedules);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function updateScheduleStatus(req, res) {
    try {
        const {
            status,
            operatorMessage
        } = req.body;

        const schedule = await Schedule.findByPk(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                error: "Agendamento não encontrado"
            });

        }

        if (schedule.status !== "PENDING") {
            return res.status(400).json({
                error: "Agendamento já finalizado"
            });

        }

        schedule.status = status;

        schedule.operatorMessage = operatorMessage;

        schedule.operatorId = req.user.id;

        await schedule.save();

        return res.json(schedule);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}