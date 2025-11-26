import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-widest mb-2">CONTACT</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">お問い合わせ</h3>
          <p className="text-xl text-slate-300 font-medium mb-8">新しい価値を、共に創りましょう。</p>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            現在、新規プロジェクトのご相談や技術的なお問い合わせを受け付けています。<br className="hidden md:block" />
            アイデアを実現するパートナーをお探しの際は、お気軽にご連絡ください。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email</h4>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
                <p className="text-xs text-slate-500 mt-1">※フォームからも送信可能です</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Location</h4>
                <p className="text-slate-400">Tokyo, Japan</p>
                <p className="text-xs text-slate-500 mt-1">日本全国対応可能</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>

        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mkgadgdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus('error');
        if (Object.hasOwn(data, 'errors')) {
          setErrorMessage(data.errors.map((error: any) => error.message).join(", "));
        } else {
          setErrorMessage('送信に失敗しました。');
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('ネットワークエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">お名前</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="山田 太郎"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">お問い合わせ内容</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          placeholder="ご相談内容をご記入ください..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${status === 'success'
            ? 'bg-green-600 text-white cursor-default'
            : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
          } ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
      >
        {status === 'sending' ? (
          <>送信中...</>
        ) : status === 'success' ? (
          <>送信完了しました</>
        ) : (
          <>送信する <Mail size={18} /></>
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2 bg-red-950/30 p-3 rounded border border-red-900/50">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default Contact;