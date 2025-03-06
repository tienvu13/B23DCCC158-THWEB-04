
import { Button, Form, Input, Select, Table, InputNumber, message } from 'antd';
import { useLocalStorage } from '../../../hooks/useLocalStorageExam';
import type { Subject } from './Subjects';
import type { Question } from './Questions';

export interface Exam {
  id: string;
  subjectId: string;
  name: string;
  questions: Question[];
}

const difficultyLevels = [
  { key: 'easy', label: 'Dễ' },
  { key: 'medium', label: 'Trung bình' },
  { key: 'hard', label: 'Khó' },
  { key: 'veryHard', label: 'Rất khó' },
];

const ExamGenerator = () => {
  const [exams, setExams] = useLocalStorage<Exam[]>('exams', []);
  const [questions] = useLocalStorage<Question[]>('questions', []);
  const [subjects] = useLocalStorage<Subject[]>('subjects', []);
  const [form] = Form.useForm();

  const handleCreateExam = (values: {
    name: string;
    subjectId: string;
    easy: number;
    medium: number;
    hard: number;
    veryHard: number;
  }) => {
    const filteredQuestions = questions.filter(q => q.subjectId === values.subjectId);

    const categorizedQuestions: Record<string, Question[]> = {
      easy: filteredQuestions.filter(q => q.level === 'Dễ'),
      medium: filteredQuestions.filter(q => q.level === 'Trung bình'),
      hard: filteredQuestions.filter(q => q.level === 'Khó'),
      veryHard: filteredQuestions.filter(q => q.level === 'Rất khó'),
    };

    for (const level of difficultyLevels) {
      const key = level.key as keyof typeof values;
      const questionCount = Number(values[key]);
      
      if (categorizedQuestions[key].length < questionCount) {
        message.error(`Không đủ câu hỏi mức "${level.label}". Cần ${questionCount} câu nhưng chỉ có ${categorizedQuestions[key].length}.`);
        return;
      }
    }

    const selectedQuestions = difficultyLevels.flatMap(level => {
      const key = level.key as keyof typeof values;
      return categorizedQuestions[key].sort(() => Math.random() - 0.5).slice(0, Number(values[key]));
    });

    const newExam: Exam = {
      id: Date.now().toString(),
      name: values.name,
      subjectId: values.subjectId,
      questions: selectedQuestions,
    };

    setExams([...exams, newExam]);
    form.resetFields();
  };

  return (
    <div>
      <h2>Quản lý Đề Thi</h2>

      <Form form={form} onFinish={handleCreateExam} layout='vertical'>
        <Form.Item name='name' label='Chủ đề' rules={[{ required: true, message: 'Nhập tên đề thi' }]}>
          <Input placeholder='Chủ đề' />
        </Form.Item>

        <Form.Item name='subjectId' label='Môn học' rules={[{ required: true, message: 'Chọn môn học' }]}>
          <Select placeholder='Môn học'>
            {subjects.map(sub => (
              <Select.Option key={sub.id} value={sub.id}>
                {sub.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <h3>Chọn số lượng câu hỏi theo mức độ</h3>
        {difficultyLevels.map(level => (
          <Form.Item
            key={level.key}
            name={level.key}
            label={level.label}
            rules={[{ required: true, message: `Nhập số câu hỏi ${level.label}` }]}
            initialValue={0}
          >
            <InputNumber min={0} max={50} />
          </Form.Item>
        ))}

        <Button type='primary' htmlType='submit'>
          Tạo Đề Thi
        </Button>
      </Form>

      <Table
        dataSource={exams}
        style={{ marginTop: '10px' }}
        pagination={{ position: ['bottomCenter'] }}
        columns={[
          { title: 'Tên đề thi', dataIndex: 'name', align: 'center' },
          {
            title: 'Môn học',
            dataIndex: 'subjectId',
            render: id => subjects.find(sub => sub.id === id)?.name || '---',
            align: 'center',
          },
          {
            title: 'Số câu hỏi',
            dataIndex: 'questions',
            render: qs => qs.length,
            align: 'center',
          },
        ]}
        rowKey='id'
      />
    </div>
  );
};

export default ExamGenerator;