import { Button, Form, Input, InputNumber, Table, Modal } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorageExam';

export interface Subject {
  id: string;
  code: string;
  name: string;
  credit: number;
  knowledgeArea: string;
}

const Subjects = () => {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const handleAddOrUpdateSubject = (values: Omit<Subject, 'id'>) => {
    if (editingSubject) {
      setSubjects(subjects.map(sub => sub.id === editingSubject.id ? { ...editingSubject, ...values } : sub));
    } else {
      setSubjects([...subjects, { ...values, id: Date.now().toString() }]);
    }
    form.resetFields();
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  return (
    <div>
      <h2>Quản Lý Môn Học</h2>
      <Button type='primary' onClick={() => { setEditingSubject(null); setIsModalOpen(true); }}>Thêm môn học</Button>

      <Modal
        visible={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingSubject(null); }}
        footer={null}
        centered
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        destroyOnClose
      >
        <h3 style={{ textAlign: 'center' }}>{editingSubject ? 'Chỉnh Sửa Môn Học' : 'Thêm Môn Học'}</h3>
        <Form form={form} onFinish={handleAddOrUpdateSubject} layout='vertical' initialValues={editingSubject || {}}>
          <Form.Item name='code' rules={[{ required: true, message: 'Nhập mã môn học' }]} label='Mã môn học'>
            <Input placeholder='Mã môn học' />
          </Form.Item>
          <Form.Item name='name' rules={[{ required: true, message: 'Nhập tên môn học' }]} label='Tên môn học'>
            <Input placeholder='Tên môn học' />
          </Form.Item>
          <Form.Item name='credit' initialValue={1} rules={[{ required: true, type: 'number', min: 1, max: 10, message: 'Nhập số tín chỉ từ 1-10' }]} label='Số tín chỉ'>
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='knowledgeArea' label='Khối kiến thức'>
            <Input placeholder='Khối kiến thức' />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type='primary' htmlType='submit'>{editingSubject ? 'Lưu' : 'Thêm'}</Button>
          </div>
        </Form>
      </Modal>

      <Table
        dataSource={subjects}
        pagination={{ position: ['bottomCenter'] }}
        columns={[
          { title: 'ID', dataIndex: 'id', align: 'center' },
          { title: 'Mã môn', dataIndex: 'code', align: 'center' },
          { title: 'Tên môn', dataIndex: 'name', align: 'center' },
          { title: 'Tín chỉ', dataIndex: 'credit', align: 'center' },
          { title: 'Khối kiến thức', dataIndex: 'knowledgeArea', align: 'center' },
        ]}
        rowKey='id'
        onRow={(record) => ({
          onClick: () => {
            setEditingSubject(record);
            form.setFieldsValue(record);
            setIsModalOpen(true);
          },
        })}
      />
    </div>
  );
};

export default Subjects;