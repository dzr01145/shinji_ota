import React from 'react';
import { PERSONAL_INFO, PERSONAL_PROFILE_DEEP } from '../constants';

const VISUALS = {
  hero: '/images/revise-industrial-decision-hero.png',
  quarry: '/images/revise-quarry-hero.png',
  factory: '/images/revise-factory-system.png',
  control: '/images/revise-control-room.png',
  occupational: '/images/revise-occupational-safety.png',
  management: '/images/revise-management-system.png',
  productRisk: '/images/revise-product-risk.png',
  miningDomain: '/images/revise-mining-domain.png'
};

const RevisedProfile: React.FC = () => {
  const domainImages = [
    VISUALS.occupational,
    VISUALS.management,
    VISUALS.miningDomain,
    VISUALS.productRisk
  ];
  const reportImages = [
    VISUALS.control,
    VISUALS.factory,
    VISUALS.quarry
  ];
  const sectionNav = [
    { href: '#top', label: 'Top', ja: 'トップ' },
    { href: '#profile-detail', label: 'Profile', ja: 'プロフィール' },
    { href: '#positioning', label: 'Positioning', ja: '視点' },
    { href: '#career', label: 'Career', ja: '経歴' },
    { href: '#domains', label: 'Domains', ja: '専門領域' },
    { href: '#projects', label: 'Work', ja: '実績' },
    { href: '#publications', label: 'Reports', ja: '発信' },
    { href: '#contact', label: 'Contact', ja: 'お問い合わせ' }
  ];

  return (
    <main className="min-h-screen bg-[#07080a] text-zinc-200 antialiased">
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block" aria-label="Section navigation">
        <div className="relative py-2">
          <div className="absolute left-[5px] top-0 h-full w-px bg-white/22 transition-colors hover:bg-cyan-300/45" />
          <div className="relative flex flex-col gap-5">
            {sectionNav.map((item) => (
              <a key={item.href} href={item.href} className="group flex items-center gap-3 focus-visible:outline-none">
                <span className="h-[11px] w-[11px] rounded-full border border-white/45 bg-[#07080a] transition-all group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:shadow-[0_0_0_4px_rgba(103,232,249,0.14)] group-focus-visible:border-cyan-300 group-focus-visible:bg-cyan-300" />
                <span className="flex translate-x-0.5 flex-col whitespace-nowrap font-light text-zinc-300/85 opacity-85 transition-all group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:text-white group-focus-visible:opacity-100">
                  <span className="text-[12px] tracking-[0.14em]">{item.ja}</span>
                  <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-zinc-500/95 group-hover:text-cyan-300 group-focus-visible:text-cyan-300">{item.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="top" className="relative min-h-screen overflow-hidden border-b border-white/10 bg-[#07080a] scroll-mt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(135deg,#07080a_0%,#0c1014_48%,#07080a_100%)]" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden border border-white/10 bg-black">
              <img
                src={VISUALS.hero}
                alt="Industrial workplace"
                className="aspect-[16/11] w-full object-cover opacity-95 brightness-[0.92] contrast-[0.94] saturate-[0.90]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/15 to-black/52" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/76 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-6">
            <p className="mb-7 text-[11px] font-light uppercase tracking-[0.48em] text-zinc-500">
              Casualty Consulting / Risk Engineering
            </p>
            <h1 className="max-w-3xl text-4xl font-light leading-[1.18] tracking-tight text-white md:text-5xl lg:text-[3.75rem]">
              現場のリアルを、
              <br />
              経営の意思決定へ
            </h1>
            <p className="mt-5 text-xl font-light leading-8 text-zinc-400 md:text-2xl">
              Field reality into executive decisions.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-sm">
              <a href="#profile-detail" className="border border-white/80 bg-white px-6 py-3 text-zinc-950 transition-colors hover:bg-zinc-200">
                View Profile
              </a>
              <a href="#projects" className="border border-white/20 bg-black/20 px-6 py-3 text-zinc-300 backdrop-blur transition-colors hover:border-white/60 hover:text-white">
                Selected Work
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="profile-detail" className="scroll-mt-28 bg-[#0b0c0f] py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="group relative overflow-hidden border border-white/10 bg-black">
            <div className="relative aspect-[4/3]">
              <img
                src="/profile_image.jpg"
                alt="Business profile"
                className="absolute inset-0 h-full w-full object-cover object-[50%_38%] brightness-[0.68] contrast-[0.92] saturate-[0.90] transition-opacity duration-700 group-hover:opacity-0"
              />
              <img
                src="/profile_image2.jpg"
                alt="Field profile"
                className="absolute inset-0 h-full w-full object-cover object-[50%_36%] brightness-[0.82] contrast-[0.94] saturate-[0.94] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-light uppercase tracking-[0.42em] text-zinc-500">Professional Profile</p>
            <h2 className="mt-5 text-3xl font-light tracking-tight text-white md:text-4xl">
              {PERSONAL_INFO.name}
            </h2>
            <p className="mt-2 text-3xl font-light tracking-tight text-white md:text-4xl">{PERSONAL_INFO.jaName}</p>
            <p className="mt-6 max-w-xl text-sm font-light leading-7 text-zinc-400">
              {PERSONAL_PROFILE_DEEP.currentRole.organization} / {PERSONAL_PROFILE_DEEP.currentRole.department}
              <br />
              <span className="text-zinc-200">{PERSONAL_PROFILE_DEEP.currentRole.position}</span>
            </p>
            <p className="mt-2 max-w-xl text-xs font-light leading-6 text-zinc-600">
              {PERSONAL_PROFILE_DEEP.currentRole.organizationEn} / {PERSONAL_PROFILE_DEEP.currentRole.departmentEn}
              <br />
              {PERSONAL_PROFILE_DEEP.currentRole.positionEn}
            </p>
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-zinc-300">
              {PERSONAL_PROFILE_DEEP.lead}
            </p>
            <p className="mt-3 max-w-2xl text-xs font-light leading-6 text-zinc-600">
              {PERSONAL_PROFILE_DEEP.leadEn}
            </p>

            <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-3">
              <ProfileFact label="学歴" labelEn="Education" value={PERSONAL_PROFILE_DEEP.education} valueEn={PERSONAL_PROFILE_DEEP.educationEn} />
              <ProfileFact label="現場経験" labelEn="Field" value={PERSONAL_PROFILE_DEEP.previousRole.organization} valueEn={PERSONAL_PROFILE_DEEP.previousRole.organizationEn} />
              <ProfileFact label="現在" labelEn="Current" value={PERSONAL_PROFILE_DEEP.currentRole.position} valueEn={PERSONAL_PROFILE_DEEP.currentRole.positionEn} />
            </div>
          </div>
        </div>
      </section>

      <section id="positioning" className="bg-[#07080a] py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="安全を支える三つの視点" subtitle="Three lenses for safer operations" />
          <div className="grid gap-6 md:grid-cols-3">
            {PERSONAL_PROFILE_DEEP.positioning.map((item, index) => (
              <ImagePanel
                key={item.title}
                image={[VISUALS.quarry, VISUALS.factory, VISUALS.control][index]}
                eyebrow={`0${index + 1}`}
                title={item.title}
                titleEn={item.titleEn}
                body={item.body}
                bodyEn={item.bodyEn}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="career" className="bg-[#0b0c0f] py-24 scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading title="現場経験から制度設計へ" subtitle="From field operations to governance design" />
            <img src={VISUALS.control} alt="Industrial governance environment" className="mt-10 aspect-[16/9] w-full object-cover opacity-82 brightness-[0.78] contrast-[0.92] saturate-[0.88]" />
          </div>

          <div className="space-y-px bg-white/10">
            {PERSONAL_PROFILE_DEEP.timeline.map((item) => (
              <div key={item.title} className="grid gap-5 bg-[#0b0c0f] p-6 md:grid-cols-[120px_1fr]">
                <p className="text-xs font-light uppercase tracking-[0.28em] text-zinc-500">{item.year}</p>
                <div>
                  <h3 className="text-xl font-light text-white">{item.title}</h3>
                  <p className="mt-1 text-xs font-light leading-5 text-zinc-500">{item.titleEn}</p>
                  <p className="mt-3 text-sm font-light leading-7 text-zinc-400">{item.body}</p>
                  <p className="mt-2 text-xs font-light leading-6 text-zinc-600">{item.bodyEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="domains" className="bg-[#07080a] py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="専門領域" subtitle="Domains" centered />
          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {PERSONAL_PROFILE_DEEP.domains.map((domain, index) => (
              <div key={domain.title} className="bg-[#07080a] p-6">
                <div className="mb-6 h-28 overflow-hidden">
                  <img src={domainImages[index]} alt="" className="h-full w-full object-cover opacity-74 brightness-[0.80] contrast-[0.92] saturate-[0.88]" />
                </div>
                <h3 className="text-lg font-light text-white">{domain.title}</h3>
                <p className="mt-1 text-xs font-light leading-5 text-zinc-500">{domain.titleEn}</p>
                <p className="mt-4 text-sm font-light leading-7 text-zinc-400">{domain.body}</p>
                <p className="mt-2 text-xs font-light leading-6 text-zinc-600">{domain.bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 bg-[#0b0c0f] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="主なプロジェクト" subtitle="Selected projects and assignments" />
          <div className="grid gap-px bg-white/10">
            {PERSONAL_PROFILE_DEEP.achievements.map((item, index) => (
              <div key={item.title} className="grid gap-6 bg-[#0b0c0f] p-6 md:grid-cols-[260px_1fr]">
                <p className="text-xs font-light uppercase tracking-[0.28em] text-zinc-500">Case {String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="text-xl font-light text-white">{item.title}</h3>
                  <p className="mt-1 text-xs font-light leading-5 text-zinc-500">{item.titleEn}</p>
                  <p className="mt-3 max-w-3xl text-sm font-light leading-7 text-zinc-400">{item.body}</p>
                  <p className="mt-2 max-w-3xl text-xs font-light leading-6 text-zinc-600">{item.bodyEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="scroll-mt-28 bg-[#07080a] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="執筆・発信テーマ" subtitle="Writing themes" centered />
          <div className="grid gap-6 md:grid-cols-3">
            {PERSONAL_PROFILE_DEEP.publications.map((item, index) => (
              <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="group block border border-white/10 bg-[#0b0c0f] transition-colors hover:border-white/35">
                <img src={reportImages[index]} alt="" className="aspect-[16/9] w-full object-cover opacity-76 brightness-[0.80] contrast-[0.92] saturate-[0.88] transition-opacity group-hover:opacity-90" />
                <div className="p-6">
                  <p className="text-xs font-light uppercase tracking-[0.28em] text-zinc-500">Source</p>
                  <h3 className="mt-4 text-xl font-light leading-8 text-white">{item.title}</h3>
                  <p className="mt-2 text-xs font-light leading-5 text-zinc-500">{item.titleEn}</p>
                  <p className="mt-4 text-sm font-light leading-7 text-zinc-500">{item.meta}</p>
                  <p className="mt-2 text-xs font-light leading-6 text-zinc-600">{item.metaEn}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-[#0b0c0f] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="ご相談・お問い合わせ" subtitle="Contact" centered />

          <div className="relative overflow-hidden border border-white/10">
            <img src={VISUALS.control} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 brightness-[0.72] contrast-[0.92] saturate-[0.88]" />
            <div className="absolute inset-0 bg-[#0b0c0f]/88" />
            <div className="relative z-10 grid gap-px bg-white/10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[#0b0c0f]/85 p-6 md:p-10">
                <h3 className="text-3xl font-light tracking-tight text-white">
                  新しい価値を、共に創りましょう。
                </h3>
                <p className="mt-3 text-sm font-light leading-6 text-zinc-500">
                  Let us create new value together.
                </p>
                <p className="mt-8 text-sm font-light leading-7 text-zinc-400">
                  現在、新規プロジェクトのご相談や技術的なお問い合わせを受け付けています。アイデアを実現するパートナーをお探しの際は、お気軽にご連絡ください。
                </p>
                <p className="mt-2 text-xs font-light leading-6 text-zinc-600">
                  Consultations for new projects and technical inquiries are currently welcome. Please get in touch when you are looking for a partner to turn ideas into practical outcomes.
                </p>

                <div className="mt-10 space-y-8">
                  <div>
                    <p className="text-sm font-light tracking-[0.16em] text-zinc-300">Email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-2 inline-block text-sm font-light text-zinc-400 transition-colors hover:text-white">
                      {PERSONAL_INFO.email}
                    </a>
                    <p className="mt-1 text-xs font-light text-zinc-600">フォームからも送信可能です</p>
                    <p className="mt-1 text-[11px] font-light text-zinc-700">You can also send a message through the form.</p>
                  </div>
                  <div>
                    <p className="text-sm font-light tracking-[0.16em] text-zinc-300">Location</p>
                    <p className="mt-2 text-sm font-light text-zinc-400">Tokyo, Japan</p>
                    <p className="mt-1 text-xs font-light text-zinc-600">日本全国対応可能</p>
                    <p className="mt-1 text-[11px] font-light text-zinc-700">Available for projects across Japan.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0c0f]/92 p-6 md:p-10">
                <RevisedContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const SectionHeading: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">{title}</h2>
    <p className="mt-3 text-sm font-light uppercase tracking-[0.28em] text-zinc-500 md:text-base">{subtitle}</p>
  </div>
);

const ProfileFact: React.FC<{ label: string; labelEn: string; value: string; valueEn: string }> = ({ label, labelEn, value, valueEn }) => (
  <div className="bg-[#0b0c0f] p-5">
    <p className="text-sm font-light tracking-[0.12em] text-zinc-300">{label}</p>
    <p className="mt-1 text-[10px] font-light uppercase tracking-[0.24em] text-zinc-600">{labelEn}</p>
    <p className="mt-4 text-sm font-light leading-6 text-zinc-300">{value}</p>
    <p className="mt-2 text-xs font-light leading-5 text-zinc-600">{valueEn}</p>
  </div>
);

const ImagePanel: React.FC<{ image: string; eyebrow: string; title: string; titleEn: string; body: string; bodyEn: string }> = ({ image, eyebrow, title, titleEn, body, bodyEn }) => (
  <article className="group border border-white/10 bg-[#0b0c0f]">
    <img src={image} alt="" className="aspect-[16/9] w-full object-cover opacity-78 brightness-[0.80] contrast-[0.92] saturate-[0.88] transition-opacity group-hover:opacity-95" />
    <div className="p-6">
      <p className="text-[11px] font-light uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
      <h3 className="mt-5 text-2xl font-light text-white">{title}</h3>
      <p className="mt-1 text-xs font-light leading-5 text-zinc-500">{titleEn}</p>
      <p className="mt-4 text-sm font-light leading-7 text-zinc-400">{body}</p>
      <p className="mt-2 text-xs font-light leading-6 text-zinc-600">{bodyEn}</p>
    </div>
  </article>
);

const RevisedContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
        return;
      }

      const data = await response.json();
      setStatus('error');
      setErrorMessage(Object.hasOwn(data, 'errors') ? data.errors.map((error: any) => error.message).join(', ') : '送信に失敗しました。');
    } catch (error) {
      setStatus('error');
      setErrorMessage('ネットワークエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="revise-name" className="block text-sm font-light tracking-[0.08em] text-zinc-300">
          お名前
        </label>
        <input
          id="revise-name"
          name="name"
          type="text"
          required
          placeholder="山田 太郎"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          className="mt-2 w-full border border-white/10 bg-black/35 px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/45"
        />
      </div>

      <div>
        <label htmlFor="revise-email" className="block text-sm font-light tracking-[0.08em] text-zinc-300">
          メールアドレス
        </label>
        <input
          id="revise-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          className="mt-2 w-full border border-white/10 bg-black/35 px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/45"
        />
      </div>

      <div>
        <label htmlFor="revise-message" className="block text-sm font-light tracking-[0.08em] text-zinc-300">
          お問い合わせ内容
        </label>
        <textarea
          id="revise-message"
          name="message"
          required
          rows={5}
          placeholder="ご相談内容をご記入ください..."
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="mt-2 w-full resize-none border border-white/10 bg-black/35 px-4 py-3 text-sm font-light leading-7 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-white/45"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className={`w-full border px-6 py-4 text-sm font-light tracking-[0.14em] transition-colors ${
          status === 'success'
            ? 'border-emerald-500/60 bg-emerald-500/12 text-emerald-200'
            : 'border-white/80 bg-white text-zinc-950 hover:bg-zinc-200'
        } ${status === 'sending' ? 'cursor-wait opacity-70' : ''}`}
      >
        {status === 'sending' ? '送信中...' : status === 'success' ? '送信完了しました' : '送信する'}
      </button>

      {status === 'error' && (
        <p className="border border-red-500/30 bg-red-950/20 p-3 text-sm font-light leading-6 text-red-300">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default RevisedProfile;
