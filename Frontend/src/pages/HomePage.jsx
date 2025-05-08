// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Layout,
  Button,
  Card,
  List,
  Row,
  Col,
  Space,
  Modal,
  Form,
  Input,
  message,
} from 'antd';

import JournalList from '../components/JournalList';

const { Title, Text } = Typography;
const { Content } = Layout;

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('vibecheckUser');
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  const handleCreateJournal = async (values) => {
    if (!auth?.token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ ...values, user_id: auth.userId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to create journal');
      message.success('Journal created successfully!');
      form.resetFields();
      setIsModalVisible(false);
      window.location.reload();
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleEdit = async (journalId) => {
    console.log('Edit journal with ID:', journalId);
  };

  const handleLogout = () => {
    localStorage.removeItem('vibecheckUser');
    setAuth(null);
    window.location.href = '/';
  };

  const handleDelete = async (journalId) => {
    if (!auth?.token) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/journals/${journalId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to delete journal');
      message.success('Journal deleted successfully!');
      window.location.reload();
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>Welcome to VibeCheck {auth?.username} </Title>
          <Text>
            Create your journals, explore what others are sharing, and stay
            connected through VibeCheck.
          </Text>
          <Col>
            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          </Col>
          <Card
            title="Your Journals"
            extra={
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                New Journal
              </Button>
            }
            style={{ height: '100%' }}
          >
            <JournalList
              userId={auth?.userId}
              token={auth?.token}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Card>

          <Modal
            title="Create New Journal"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form layout="vertical" onFinish={handleCreateJournal} form={form}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: 'Please enter a title' },
                  {
                    type: 'string',
                    min: 5,
                    max: 60,
                    message: 'Title must be between 5 and 60 characters',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: 'Please enter a description' },
                  {
                    type: 'string',
                    min: 10,
                    max: 500,
                    message:
                      'Description must be between 10 and 500 characters',
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Content>
    </Layout>
  );
};

export default HomePage;
