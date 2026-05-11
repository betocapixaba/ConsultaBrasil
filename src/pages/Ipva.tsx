import React from 'react';
import { ChevronLeft, ExternalLink, Info, ShieldCheck, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSpace from '../components/AdSpace';

const RegionSection = ({ title, emoji, color, bgColor, states }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{emoji}</span>
      <h2 className="text-xl font-bold border-b-4 pb-1" style={{ borderColor: color }}>Região {title}</h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {states.map((state, idx) => (
        <a
          key={idx}
          href={state.url}
          target="_blank"
          rel="noreferrer"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          style={{ borderTop: `4px solid ${color}` }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: color }}
              >
                {state.sigla}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-xs sm:text-sm">{state.nome}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">IPVA {state.sigla}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold text-primary-medium group-hover:text-primary transition-colors bg-gray-50 -mx-4 -mb-4 p-3 mt-4 border-t border-gray-50 group-hover:bg-primary-light">
              Acessar portal oficial <ExternalLink size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default function Ipva() {
  const regions = [
    {
      title: "Norte", emoji: "🌿", color: "#1A6B8A", bgColor: "#E3F2F8",
      states: [
        { sigla: "AC", nome: "Acre", url: "https://www.sefaz.ac.gov.br/" },
        { sigla: "AP", nome: "Amapá", url: "https://www.sefaz.ap.gov.br/" },
        { sigla: "AM", nome: "Amazonas", url: "https://online.sefaz.am.gov.br/ipva/ipva.asp" },
        { sigla: "PA", nome: "Pará", url: "https://www.sefa.pa.gov.br/" },
        { sigla: "RO", nome: "Rondônia", url: "https://www.sefin.ro.gov.br/" },
        { sigla: "RR", nome: "Roraima", url: "https://www.sefaz.rr.gov.br/" },
        { sigla: "TO", nome: "Tocantins", url: "https://www.to.gov.br/sefaz/" }
      ]
    },
    {
      title: "Nordeste", emoji: "☀️", color: "#8A4A1A", bgColor: "#F8EEE3",
      states: [
        { sigla: "AL", nome: "Alagoas", url: "https://ipvaonline.sefaz.al.gov.br/" },
        { sigla: "BA", nome: "Bahia", url: "https://www.sefaz.ba.gov.br/" },
        { sigla: "CE", nome: "Ceará", url: "https://www.sefaz.ce.gov.br/ipva/" },
        { sigla: "MA", nome: "Maranhão", url: "https://sistemas1.sefaz.ma.gov.br/portalsefaz/portalsid/" },
        { sigla: "PB", nome: "Paraíba", url: "https://www.sefaz.pb.gov.br/" },
        { sigla: "PE", nome: "Pernambuco", url: "https://www.sefaz.pe.gov.br/" },
        { sigla: "PI", nome: "Piauí", url: "https://webas.sefaz.pi.gov.br/" },
        { sigla: "RN", nome: "Rio Grande do Norte", url: "https://uvt2.set.rn.gov.br/#/services/ipva/consultar" },
        { sigla: "SE", nome: "Sergipe", url: "https://www.sefaz.se.gov.br/" }
      ]
    },
    {
      title: "Centro-Oeste", emoji: "🌾", color: "#4A1A8A", bgColor: "#EDE3F8",
      states: [
        { sigla: "DF", nome: "Distrito Federal", url: "https://ww1.receita.fazenda.df.gov.br/" },
        { sigla: "GO", nome: "Goiás", url: "https://goias.gov.br/economia/" },
        { sigla: "MT", nome: "Mato Grosso", url: "https://www.sefaz.mt.gov.br/" },
        { sigla: "MS", nome: "Mato Grosso do Sul", url: "https://servicos.efazenda.ms.gov.br/ipva/" }
      ]
    },
    {
      title: "Sudeste", emoji: "🏙️", color: "#1A8A4A", bgColor: "#E3F8EE",
      states: [
        { sigla: "ES", nome: "Espírito Santo", url: "https://internet.sefaz.es.gov.br/agenciavirtual/area_publica/ipva/consulta.php" },
        { sigla: "MG", nome: "Minas Gerais", url: "https://www2.fazenda.mg.gov.br/sol/ctrl/SOL/IPV/CONSULTA_001?ACAO=VISUALIZAR" },
        { sigla: "RJ", nome: "Rio de Janeiro", url: "https://www.fazenda.rj.gov.br/" },
        { sigla: "SP", nome: "São Paulo", url: "https://www.ipva.fazenda.sp.gov.br/ipvanet_consulta/Consulta.aspx" }
      ]
    },
    {
      title: "Sul", emoji: "🌲", color: "#8A1A4A", bgColor: "#F8E3EE",
      states: [
        { sigla: "PR", nome: "Paraná", url: "https://www.fazenda.pr.gov.br/Pagina/Consultar-debitos-do-veiculo" },
        { sigla: "RS", nome: "Rio Grande do Sul", url: "https://www.ipva.rs.gov.br/" },
        { sigla: "SC", nome: "Santa Catarina", url: "https://www.sef.sc.gov.br/" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <header className="bg-primary h-[60px] flex items-center px-4 sticky top-0 z-50">
        <div className="max-w-[1100px] w-full mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-7 bg-primary-medium rounded flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#F5C440] rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#1A4FA0] rounded-full"></div>
                  </div>
               </div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ConsultaBrasil</span>
          </Link>
          <Link to="/" className="text-white border border-white/30 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
             <ChevronLeft size={16} /> Voltar ao portal
          </Link>
        </div>
      </header>

      {/* Ad Space Top */}
      <AdSpace label="Anúncio Google AdSense — 728 × 90 Leaderboard" />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Car size={14} className="text-[#F5C440]" /> Consulta Oficial de IPVA · Todos os Estados
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Consulta de IPVA e Débitos do Veículo</h1>
          
          <p className="text-lg text-primary-light/80 max-w-3xl mb-10 leading-relaxed">
            Consulte gratuitamente a situação do IPVA do seu veículo em qualquer estado do Brasil. Através dos links oficiais dos governos estaduais, você pode verificar se o imposto está em dia, consultar débitos pendentes, emitir guias de pagamento e acessar informações do veículo de forma rápida e segura.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-black/10 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="md:col-span-4 mb-2">
              <h3 className="text-[#FFD93D] font-bold flex items-center gap-2 italic">
                <Info size={16} /> Como funciona
              </h3>
            </div>
            {[
              "Selecione o estado onde o veículo está registrado",
              "Acesse o portal oficial do governo estadual",
              "Informe a Placa e o Renavam do veículo",
              "Consulte a situação do IPVA em poucos minutos"
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-3xl font-serif font-bold text-white/20 italic">{idx + 1}</span>
                <p className="text-sm pt-2">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-accent-yellow-light/10 border border-accent-yellow/30 rounded-xl flex items-center gap-3 text-xs text-accent-yellow-light">
             <span className="text-lg">⚠</span>
             <ul className="flex flex-wrap gap-x-6 gap-y-1">
               <li>Este serviço utiliza somente links oficiais dos governos estaduais</li>
               <li>Alguns estados podem solicitar autenticação adicional</li>
               <li>O sistema pode passar por manutenção temporária</li>
             </ul>
          </div>
        </div>
      </section>

      {/* Ad Space Mid */}
      <AdSpace label="Anúncio Google AdSense — 728 × 90 In-content" />

      {/* Main Layout */}
      <main className="max-w-[1100px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Content Column */}
        <div className="flex-1">
          {regions.map((region, idx) => (
            <div key={idx}>
              <RegionSection {...region} />
              {idx === 1 && (
                <div className="mb-12">
                  <AdSpace label="Anúncio Google AdSense — 728 × 90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-[300px] flex flex-col gap-6">
          <AdSpace height="260px" label="300 × 250 Sidebar" />

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <Car size={16} className="text-primary" /> O que você precisa ter em mãos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-lg">🚗</span>
                <div>
                   <p className="text-xs font-bold text-gray-800">Placa do veículo</p>
                   <p className="text-[10px] text-gray-500">obrigatória na maioria dos estados</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📄</span>
                <div>
                   <p className="text-xs font-bold text-gray-800">Número do Renavam</p>
                   <p className="text-[10px] text-gray-500">consta no documento do carro</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🪪</span>
                <div>
                   <p className="text-xs font-bold text-gray-800">CPF/CNPJ do proprietário</p>
                   <p className="text-[10px] text-gray-500">alguns estados solicitam</p>
                </div>
              </li>
            </ul>
          </div>

          <AdSpace height="260px" label="300 × 250 Sidebar" />

          <div className="bg-primary-light border border-primary-medium/20 rounded-xl p-5 text-primary text-xs leading-relaxed font-medium">
             <ShieldCheck size={20} className="mb-2 shrink-0" />
             🔒 <strong>Segurança garantida</strong> — Todos os 27 links desta página redirecionam exclusivamente para portais oficiais dos governos estaduais.
          </div>

          <AdSpace height="300px" label="300 × 300 Sidebar inferior" />

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-sm mb-4 border-b border-gray-100 pb-2">Total de estados</h4>
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-gray-600 flex justify-between">
                <span>🌿 Norte</span>
                <span className="font-bold">7 estados</span>
              </p>
              <p className="text-[11px] font-medium text-gray-600 flex justify-between">
                <span>☀️ Nordeste</span>
                <span className="font-bold">9 estados</span>
              </p>
              <p className="text-[11px] font-medium text-gray-600 flex justify-between">
                <span>🌾 Centro-Oeste</span>
                <span className="font-bold">4 estados + DF</span>
              </p>
              <p className="text-[11px] font-medium text-gray-600 flex justify-between">
                <span>🏙️ Sudeste</span>
                <span className="font-bold">4 estados</span>
              </p>
              <p className="text-[11px] font-medium text-gray-600 flex justify-between">
                <span>🌲 Sul</span>
                <span className="font-bold">3 estados</span>
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white/50 py-10 px-4 text-center border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] md:text-xs mb-6 max-w-xl mx-auto leading-relaxed uppercase tracking-tighter">
            © 2026 ConsultaBrasil · Portal independente · Todos os links são oficiais dos governos estaduais e não coletamos seus dados.
          </p>
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#F5C440]">
             <Link to="/" className="hover:text-white transition-colors">Privacidade</Link>
             <Link to="/" className="hover:text-white transition-colors">Anuncie</Link>
             <Link to="/" className="hover:text-white transition-colors">Contato</Link>
             <Link to="/" className="hidden md:inline hover:text-white transition-colors">← Voltar ao portal principal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
