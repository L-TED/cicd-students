import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';

describe('StudentsController', () => {
  let controller: StudentsController;
  let mockRepo: any;

  // test 세팅
  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        { useValue: mockRepo, provide: getRepositoryToken(Student) },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  // it = test
  it('학생 findOne', () => {
    expect(controller.findOne('10')).toBe('학생 ID: #10');
  });
});
