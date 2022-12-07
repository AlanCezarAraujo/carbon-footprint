import React from 'react';
import 'antd/dist/reset.css';
import { ConfigProvider, Typography } from 'antd';
import { Layout } from 'antd';
import './App.css';
import FootprintForm from './components/FootprintForm';
import FootprintContext from './state/footprint.context';
import FootprintIcon from './icons/FootprintIcon';

const { Header, Content } = Layout;

const titleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '0.5em',
  margin: 0
}

const headerStyle = {
  backgroundColor: '#00b96b',
  color: 'white',
  fontWeight: 'bold',
  padding: '2em 0',
  height: '128px',
}

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
        fontFamily: 'Montserrat, sans-serif;',
      },
    }}
  >
    <FootprintContext>
      <Layout className="layout">
        <Header style={headerStyle}>
          <Typography.Title style={titleStyle}><FootprintIcon /> Carbon Footprint</Typography.Title>
        </Header>

        <Content className='content'>
          <FootprintForm />
        </Content>
      </Layout>
    </FootprintContext>
  </ConfigProvider>
  );
}

export default App;
