import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
export declare class StudentsService {
    private studentRepo;
    constructor(studentRepo: Repository<Student>);
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
