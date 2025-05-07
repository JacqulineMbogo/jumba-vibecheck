// components/JournalList.jsx
import React, { useEffect, useState } from 'react';
import {
  List,
  Card,
  Spin,
  Typography,
  Empty,
  Button,
  Space,
  message,
  Modal,
  Form,
  Input,
  Alert,
} from 'antd';

const { Title, Paragraph, Text } = Typography;

const JournalList = ({ userId, token, onEdit, onDelete }) => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editError, setEditError] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentJournal, setCurrentJournal] = useState(null);
  const [form] = Form.useForm();

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/journals/user/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log('Fetched journals:', data);
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch journals');
      setJournals(
        Array.isArray(data.journals) ? data.journals : [data.journals]
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchJournals();
  }, [userId]);

  const showEditModal = (journal) => {
    setEditError(null);
    setCurrentJournal(journal);
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    if (isEditModalVisible && currentJournal) {
      console.log('Current journal:', currentJournal.title);
      form.setFieldsValue({
        title: currentJournal.title || '',
        description: currentJournal.description || '',
      });
    }
  }, [isEditModalVisible, currentJournal, form]);

  const handleEditSubmit = async (values) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
      };
      const response = await fetch(
        `http://localhost:5001/api/journals/${currentJournal._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || 'Failed to update journal');
      message.success('Journal updated successfully');
      setIsEditModalVisible(false);
      fetchJournals();
    } catch (err) {
      setEditError(err.message);
    }
  };

  if (loading)
    return (
      <Spin
        tip="Loading your vibes..."
        style={{ display: 'block', marginTop: 100 }}
      />
    );
  if (error) return <Paragraph type="danger">{error}</Paragraph>;
  if (journals.length === 0)
    return <Empty description="No vibes yet" style={{ marginTop: 100 }} />;

  return (
    <>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={journals}
        renderItem={(item) =>
          item ? (
            <List.Item
              key={item.id || item._id}
              actions={[
                <Button type="link" onClick={() => showEditModal(item)}>
                  Edit
                </Button>,
                <Button type="link" danger onClick={() => onDelete(item._id)}>
                  Delete
                </Button>,
              ]}
            >
              <Card>
                <Title level={5}>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Text type="secondary">
                  {new Date(item.create_date).toLocaleDateString()}
                </Text>
              </Card>
            </List.Item>
          ) : null
        }
      />

      <Modal
        title="Edit Journal"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        {editError && (
          <Alert
            type="error"
            message={editError}
            showIcon
            style={{ marginBottom: '1rem' }}
          />
        )}

        {currentJournal && (
          <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, min: 5 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, max: 500 }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default JournalList;
