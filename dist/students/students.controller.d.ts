import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
