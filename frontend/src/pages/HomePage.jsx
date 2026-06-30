import Sidebar from '../components/sidebar/Sidebar';
import ChatContainer from '../components/chat/ChatContainer';
import NoChatSelected from '../components/chat/NoChatSelected';
import { useChat } from '../context/ChatContext';
import './HomePage.css';

export default function HomePage() {
  const { selectedUser } = useChat();

  return (
    <div className="home-layout">
      <Sidebar />
      <main className="home-main">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </main>
    </div>
  );
}
