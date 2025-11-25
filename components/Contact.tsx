import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2">Get in Touch</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">新しい価値を、共に創りましょう。</h3>

        <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
          現在、新規プロジェクトのご相談や技術的なお問い合わせを受け付けています。<br className="hidden md:block" />
          アイデアを実現するパートナーをお探しの際は、お気軽にご連絡ください。
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/25">
            <Mail size={20} /> メールを送る
          </a>
          <div className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-full">
            <MapPin size={20} /> Tokyo, Japan
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;