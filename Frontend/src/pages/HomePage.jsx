// pages/HomePage.jsx
import React, { useState } from 'react';
import { Typography, Layout, Button, Card, List, Row, Col, Space, Modal, Form, Input, message } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;

const dummyUserJournals = [
  { id: 'j1', title: 'My Day', description: 'Shared my first vibe!', date: '2025-05-06' },
  { id: 'j2', title: 'React Thoughts', description: 'Learning React with AntD.', date: '2025-05-05' }
];

const dummyOthersJournals = [
  { id: 'o1', title: 'Inspiration', description: 'Never give up 💪', date: '2025-05-04' },
  { id: 'o2', title: 'Vibes Only', description: 'Feeling grateful today 🙏', date: '2025-05-03' }
];

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateJournal = (values) => {
    console.log('New Journal:', values);
    message.success('Journal created successfully!');
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>Welcome to VibeCheck</Title>
          <Text>Create your journals, explore what others are sharing, and stay connected through VibeCheck.</Text>

          <Row gutter={24} align="stretch">
            <Col span={12}>
              <Card
                title="Your Journals"
                extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>New Journal</Button>}
                style={{ height: '100%' }}
              >
                <List
                  itemLayout="vertical"
                  dataSource={dummyUserJournals}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={<Text strong>{item.title}</Text>}
                        description={<Text type="secondary">{item.date}</Text>}
                      />
                      <Text>{item.description}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Shared by Others" style={{ height: '100%' }}>
                <List
                  itemLayout="vertical"
                  dataSource={dummyOthersJournals}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={<Text strong>{item.title}</Text>}
                        description={<Text type="secondary">{item.date}</Text>}
                      />
                      <Text>{item.description}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

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
                  { min: 5, message: 'Title must be at least 5 characters' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: 'Please enter a description' },
                  { max: 500, message: 'Description cannot exceed 500 characters' }
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>Create</Button>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </Content>
    </Layout>
  );
};

export default HomePage;
