import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';

interface ChatbotInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export const ChatbotInput = ({ onSubmit, isLoading }: ChatbotInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={28} style={{ color: 'hsl(210 80% 65%)' }} />
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'hsl(0 0% 95%)' }}>
          AI Assistant
        </h2>
      </div>

      <p style={{ color: 'hsl(220 15% 65%)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Describe your exoplanet observations in natural language, and our AI will help classify them.
      </p>

      <form onSubmit={handleSubmit}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: I observed a transit with depth of 0.5%, duration 3.2 hours, orbital period 12.4 days..."
          style={{
            minHeight: '150px',
            background: 'hsl(220 20% 14%)',
            border: '1px solid hsl(220 20% 25%)',
            color: 'hsl(0 0% 95%)',
            marginBottom: '1rem',
            resize: 'vertical'
          }}
          disabled={isLoading}
        />

        <Button 
          type="submit" 
          disabled={isLoading || !message.trim()}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Send size={16} />
          {isLoading ? 'Processing...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};
