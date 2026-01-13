import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import fc from 'fast-check';

describe('StudentsService', () => {
  let service: StudentsService;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { useValue: mockRepo, provide: getRepositoryToken(Student) },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });
  it('학생 생성 테스트(create)', async () => {
    const createStudentDto = {
      name: '홍길동',
      age: 20,
      email: 'honggildong@example.com',
    };

    // mockRepo.create가 호출될 때 createStudentDto를 반환하도록 설정
    mockRepo.create.mockReturnValue(createStudentDto);
    // promise 성공 시 반환
    mockRepo.save.mockResolvedValue({
      ...createStudentDto,
      id: 1,
      isActive: true,
    });

    const result = await service.create(createStudentDto);
    expect(result).toEqual({ ...createStudentDto, id: 1, isActive: true });
    expect(mockRepo.create).toHaveBeenCalledWith(createStudentDto);
  });

  it('학생 생성 테스트(fast-check)', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          age: fc.integer({ min: 1, max: 120 }),
          email: fc.emailAddress(),
        }),
        async (dto) => {
          mockRepo.create.mockReturnValue(dto);
          mockRepo.save.mockResolvedValue({
            ...dto,
            id: fc.integer({ min: 1, max: 1000 }),
            isActive: true,
          });
          const result = await service.create(dto);

          expect(result).toHaveProperty('id');
          expect(result).toHaveProperty('isActive');
          expect(result.name).toBe(dto.name);
          expect(result.age).toBe(dto.age);
          expect(result.email).toBe(dto.email);
          expect(mockRepo.create).toHaveBeenCalledWith(dto);
        },
      ),
    );
  });
});
