import logo from './logo.svg';
import './App.css';

import DateInput from './components/DateInput';
import TimeInput from './components/TimeInput';


import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    ReactDOM.render(
      <div className="App">
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>,
      mountNode,
    )
  )}
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <DateInput/>
    //     <TimeInput name={'me'} name2={'me2'}/>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React 2
    //     </a>
    //   </header>
    // </div>

export default App;
