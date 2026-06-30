import { useState, useRef } from 'react';
import { Send, Image, X } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import './MessageInput.css';

export default function MessageInput() {
  const { sendMessage } = useChat();
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    setIsSending(true);
    try {
      await sendMessage(text.trim(), imagePreview || undefined);
      setText('');
      clearImage();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-area">
      {imagePreview && (
        <div className="image-preview-container">
          <div className="image-preview-wrap">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button className="image-preview-remove" onClick={clearImage} title="Remove image">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <form className="message-input-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="btn btn-icon attach-btn"
          onClick={() => fileRef.current?.click()}
          title="Attach image"
        >
          <Image size={18} />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <textarea
          className="message-textarea"
          placeholder="Type a message... (Enter to send)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isSending}
        />

        <button
          type="submit"
          className={`btn send-btn ${(text.trim() || imagePreview) && !isSending ? 'active' : ''}`}
          disabled={(!text.trim() && !imagePreview) || isSending}
          title="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
