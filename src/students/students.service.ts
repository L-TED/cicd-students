import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepo.create(createStudentDto);
    return await this.studentRepo.save(student);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `학생 ID: #${id}`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
