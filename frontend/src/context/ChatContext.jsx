import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const socketRef = useRef(null);

  // Connect socket when authUser is available
  useEffect(() => {
    if (!authUser) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setOnlineUsers([]);
      return;
    }

    const socket = io('http://localhost:8080', {
      query: { userId: authUser._id },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('getOnlineUsers', (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [authUser]);

  // Listen for new messages from socket
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !selectedUser) return;

    const handleNewMessage = (message) => {
      // Only add if it's from the currently selected conversation
      if (message.senderId === selectedUser._id || message.receiverId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [selectedUser]);

  // Fetch all users for the sidebar
  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const res = await axiosInstance.get('/message/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async (userId) => {
    setIsLoadingMessages(true);
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  // Select a user to chat with
  const selectUser = useCallback((user) => {
    setSelectedUser(user);
    setMessages([]);
    if (user) fetchMessages(user._id);
  }, [fetchMessages]);

  // Send a message
  const sendMessage = useCallback(async (text, image) => {
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, { text, image });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  }, [selectedUser]);

  // Load users when auth user is ready
  useEffect(() => {
    if (authUser) fetchUsers();
    else setUsers([]);
  }, [authUser, fetchUsers]);

  return (
    <ChatContext.Provider value={{
      users,
      selectedUser,
      messages,
      onlineUsers,
      isLoadingUsers,
      isLoadingMessages,
      selectUser,
      sendMessage,
      fetchUsers,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
