import { Request, Response } from 'express';
import { findCourseById } from '../src/db-data';


export function saveCourse(req: Request, res: Response) {
    const id = Number(req.params["id"]);
    const changes = req.body;

    console.log("Saving course", id, JSON.stringify(changes));

    const course = findCourseById(id);

    course.description = changes.description;

    res.status(200).json(course);
}
