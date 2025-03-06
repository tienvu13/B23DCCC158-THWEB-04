import { Button, Form, Input, Select, Table, InputNumber, message, Modal } from 'antd';
import { useLocalStorage } from '../../../hooks/useLocalStorageExam';
import type { Subject } from './Subjects';
import type { Question } from './Questions';
import { useState } from 'react';

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
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      easy: [...filteredQuestions.filter(q => q.level === 'Dễ')],
      medium: [...filteredQuestions.filter(q => q.level === 'Trung bình')],
      hard: [...filteredQuestions.filter(q => q.level === 'Khó')],
      veryHard: [...filteredQuestions.filter(q => q.level === 'Rất khó')],
    };

    let selectedQuestions: Question[] = [];
    
    for (const level of difficultyLevels) {
      const key = level.key as keyof typeof values;
      const questionCount = Number(values[key]);
      
      if (categorizedQuestions[key].length < questionCount) {
        message.warning(
          `Không đủ câu hỏi mức "${level.label}". Chỉ có ${categorizedQuestions[key].length}/${questionCount} câu.`
        );
      }

      const shuffledQuestions = categorizedQuestions[key].sort(() => Math.random() - 0.5);
      selectedQuestions = selectedQuestions.concat(
        shuffledQuestions.splice(0, questionCount)
      );
    }

    if (selectedQuestions.length === 0) {
      message.error('Không có đủ câu hỏi để tạo đề thi!');
      return;
    }

    const newExam: Exam = {
      id: Date.now().toString(),
      name: values.name,
      subjectId: values.subjectId,
      questions: selectedQuestions,
    };

    setExams([...exams, newExam]);
    form.resetFields();
    setIsModalOpen(false);
    message.success('Đề thi đã được tạo thành công!');
  };

  return (
    <div>
      <h2>Quản lý Đề Thi</h2>
      <Button type='primary' onClick={() => setIsModalOpen(true)} style={{ marginBottom: '10px' }}>Tạo Đề Thi</Button>
      
      <Modal title='Tạo Đề Thi' visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} onFinish={handleCreateExam} layout='vertical'>
          <Form.Item name='name' label='Chủ đề' rules={[{ required: true, message: 'Nhập tên đề thi' }]}>  
            <Input placeholder='Chủ đề' />
          </Form.Item>
          <Form.Item name='subjectId' label='Môn học' rules={[{ required: true, message: 'Chọn môn học' }]}>  
            <Select placeholder='Môn học'>
              {subjects.map(sub => (
                <Select.Option key={sub.id} value={sub.id}>{sub.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {difficultyLevels.map(level => (
            <Form.Item key={level.key} name={level.key} label={level.label} initialValue={0}>
              <InputNumber min={0} max={50} />
            </Form.Item>
          ))}
          <Button type='primary' htmlType='submit'>Tạo Đề Thi</Button>
        </Form>
      </Modal>
      
      <Table
        dataSource={exams}
        pagination={{ position: ['bottomCenter'] }}
        columns={[
          { title: 'Tên đề thi', dataIndex: 'name', align: 'center' },
          { title: 'Môn học', dataIndex: 'subjectId', render: id => subjects.find(sub => sub.id === id)?.name || '---', align: 'center' },
          { title: 'Số câu hỏi', dataIndex: 'questions', render: qs => qs.length, align: 'center' },
          { title: 'Thao tác', align: 'center', render: (_, exam) => (
              <>
                <Button onClick={() => setSelectedExam(exam)}>Xem</Button>
              </>
            )
          }
        ]}
        rowKey='id'
      />
      
      <Modal title='Chi tiết Đề Thi' visible={!!selectedExam} onCancel={() => setSelectedExam(null)} footer={null}>
        {selectedExam && (
          <Table dataSource={selectedExam.questions} pagination={false} columns={[
            { title: '#', render: (_, __, index) => index + 1, align: 'center' },
            { title: 'Nội dung', dataIndex: 'content', align: 'center' },
            { title: 'Mức độ', dataIndex: 'level', align: 'center' },
          ]} rowKey='id' />
        )}
      </Modal>
    </div>
  );
};

export default ExamGenerator;
