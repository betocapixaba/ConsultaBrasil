import React from 'react';
import { ExternalLink, Star, ShieldAlert, ChevronRight, Calendar, CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSpace from '../components/AdSpace';

const ServiceCard = ({ icon: Icon, iconColor, iconBg, title, description, links }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
    <div className="p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={20} style={{ color: iconColor }} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
    <div className="border-t border-gray-50">
      {links.map((link, idx) => {
        const className = "flex items-center justify-between px-4 py-2.5 text-[12.5px] text-[#4a4a4a] hover:text-primary transition-colors border-b last:border-b-0 border-gray-50";
        const content = (
          <>
            <span className="flex items-center gap-2">
              {link.label}
              <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold" style={{ backgroundColor: link.badgeBg, color: link.badgeColor }}>
                {link.badge}
              </span>
            </span>
            <ExternalLink size={12} className="text-gray-300" />
          </>
        );

        if (link.internal) {
          return (
            <Link key={idx} to={link.url} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {content}
          </a>
        );
      })}
    </div>
  </div>
);

export default function Home() {
  const [ratings, setRatings] = React.useState({ ease: 0, links: 0, overall: 0 });
  const [submitted, setSubmitted] = React.useState(false);
  const [weather, setWeather] = React.useState<{ temp: number | null; loading: boolean; label: string }>({ temp: null, loading: true, label: '' });
  const [currentDate, setCurrentDate] = React.useState('');

  React.useEffect(() => {
    // Set date
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now);
    setCurrentDate(formattedDate);

    // Fetch weather
    const fetchWeather = async (lat: number, lon: number, isFallback = false) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        setWeather({ 
          temp: Math.round(data.current_weather.temperature), 
          loading: false,
          label: isFallback ? 'Brasília (DF)' : 'Localização detectada'
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to Brasília
          fetchWeather(-15.7801, -47.9292, true);
        },
        { timeout: 5000 }
      );
    } else {
      // Fallback to Brasília
      fetchWeather(-15.7801, -47.9292, true);
    }
  }, []);

  const handleRating = (key, value) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const getRatingLabel = (val) => {
    if (val === 1) return 'Ruim';
    if (val === 2) return 'Regular';
    if (val === 3) return 'Bom';
    if (val === 4) return 'Ótimo';
    if (val === 5) return 'Excelente';
    return '';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary h-[60px] flex items-center px-4 sticky top-0 z-50">
        <div className="max-w-[1100px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-primary-medium rounded flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#F5C440] rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#1A4FA0] rounded-full"></div>
                  </div>
               </div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ConsultaBrasil</span>
          </div>
          <span className="text-white/70 text-xs hidden sm:block">🇧🇷 Portal de Serviços Públicos</span>
        </div>
      </header>

      {/* Ad Space Top */}
      <div className="bg-white border-b border-gray-200">
        <AdSpace label="Anúncio Google AdSense — 728 × 90 Leaderboard" />
      </div>

      {/* Hero */}
      <section className="bg-primary pt-12 pb-16 px-4">
        <div className="max-w-[1100px] mx-auto text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">Serviços Públicos Simples e Direto ao Ponto</h1>
          <p className="text-primary-light/80 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Links oficiais do governo federal para consultas, benefícios, documentos e muito mais
          </p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 text-white border-r border-white/10 pr-4 last:border-0 last:pr-0">
              <Calendar className="text-primary-light" size={24} />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Hoje é dia</p>
                <p className="text-sm font-semibold">{currentDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <CloudSun className="text-accent-yellow italic" size={28} />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">
                  {weather.loading ? 'Detectando temperatura...' : weather.label}
                </p>
                <p className="text-lg font-bold">
                  {weather.loading ? (
                    <span className="text-xs opacity-50 animate-pulse">Aguarde...</span>
                  ) : weather.temp !== null ? (
                    `${weather.temp}°C`
                  ) : (
                    <span className="text-xs opacity-50 italic">Não disponível</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-[1100px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Content Column */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>ID</div>}
              iconColor="#185FA5" iconBg="#E6F1FB"
              title="CPF e Receita Federal"
              description="Situação, IR e CNPJ"
              links={[
                { label: "Consultar situação do CPF", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp" },
                { label: "Emitir ou regularizar CPF", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://servicos.receita.fazenda.gov.br/servicos/cpf/regularizar/default.asp" },
                { label: "Imposto de Renda (IRPF)", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/irpf" },
                { label: "Consultar CNPJ", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/consultar-cadastro-nacional-de-pessoas-juridicas" },
              ]}
            />
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>💼</div>}
              iconColor="#0F6E56" iconBg="#E1F5EE"
              title="FGTS e Trabalho"
              description="Saldo, saque e emprego"
              links={[
                { label: "Consultar saldo FGTS", badge: "CAIXA", badgeBg: "#E1F5EE", badgeColor: "#0F6E56", url: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/extrato-fgts/paginas/default.aspx" },
                { label: "Seguro-desemprego", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/solicitar-o-seguro-desemprego" },
                { label: "Emprega Brasil — vagas", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://servicos.mte.gov.br/spme-v2/#/login" },
                { label: "Saque-Aniversário FGTS", badge: "CAIXA", badgeBg: "#E1F5EE", badgeColor: "#0F6E56", url: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/saque-FGTS/paginas/default.aspx" },
              ]}
            />
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>👥</div>}
              iconColor="#BA7517" iconBg="#FAEEDA"
              title="INSS e Previdência"
              description="Benefícios e aposentadoria"
              links={[
                { label: "Meu INSS — portal oficial", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://meu.inss.gov.br" },
                { label: "Consultar benefícios", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://portaldatransparencia.gov.br/beneficios/consulta?ordenarPor=mesAno&direcao=desc" },
                { label: "Agendar atendimento", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/inss/pt-br/canais_atendimento" },
                { label: "Simulador de aposentadoria", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/simular-aposentadoria" },
              ]}
            />
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>🏠</div>}
              iconColor="#993C1D" iconBg="#FAECE7"
              title="Bolsa Família e Auxílios"
              description="CadÚnico e calendário"
              links={[
                { label: "Portal Bolsa Família", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/mds/pt-br/acoes-e-programas/bolsa-familia" },
                { label: "Calendário de pagamentos", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/inss/pt-br/search?origem=form&SearchableText=calend%C3%A1rio%20dos%20pagamentos%20dos%20aux%C3%ADlios" },
                { label: "CadÚnico — consulta online", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/consultar-dados-do-cadastro-unico-cadunico" },
                { label: "App Caixa Tem", badge: "CAIXA", badgeBg: "#E1F5EE", badgeColor: "#0F6E56", url: "https://www.caixa.gov.br/caixatem/Paginas/default.aspx" },
              ]}
            />
          </div>

          <AdSpace height="250px" label="Anúncio Google AdSense — 728 × 250 In-content" />

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Mais serviços essenciais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>🚗</div>}
              iconColor="#3B6D11" iconBg="#EAF3DE"
              title="DETRAN e Trânsito"
              description="CNH, IPVA, multas e restrições"
              links={[
                { label: "Consultar CNH", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://portalservicos.senatran.serpro.gov.br/#/home" },
                { label: "🚗 Débitos de IPVA — por estado", badge: "27 estados", badgeBg: "#FAEEDA", badgeColor: "#BA7517", url: "/ipva", internal: true },
                { label: "Multas de trânsito", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/consultar-online-suas-infracoes-de-transito" },
                { label: "Restrições do veículo", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/consultar-informacoes-sobre-restricoes-e-indicadores-de-veiculos" },
              ]}
            />
            <ServiceCard 
              icon={({size, style}) => <div className="font-bold flex items-center justify-center" style={style}>📄</div>}
              iconColor="#534AB7" iconBg="#EEEDFE"
              title="Documentos e RG"
              description="Identidade, passaporte"
              links={[
                { label: "Nova Identidade (CIN)", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional" },
                { label: "Passaporte brasileiro", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.gov.br/pt-br/servicos/obter-passaporte-comum-para-brasileiro" },
                { label: "Certidão de nascimento 2ª via", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://idrc.registrocivil.org.br/realms/IDRC/protocol/openid-connect/auth?response_type=code&redirect_uri=https%3A%2F%2Fapi-rc.registrocivil.org.br%2Fapi%2Fusuarios%2Flogin-id-rc&client_id=registro-civil&nonce=ad887df8c48a3069d57fb48a605f2bfd&state=25700bab05a13965b7f15d839c32f1a0&scope=openid+acr+email+celular+phone+sexo+data_nascimento+profile+foto_de_perfil_url+openid" },
                { label: "Título eleitoral", badge: "GOV", badgeBg: "#E6F1FB", badgeColor: "#185FA5", url: "https://www.tse.jus.br/servicos-eleitorais/titulo-eleitoral/titulo-eleitoral-faq" },
              ]}
            />
          </div>

          {/* Security Alert Block */}
          <div className="relative overflow-hidden bg-linear-to-br from-[#8B0000] via-[#C0392B] to-[#E74C3C] border-2 border-[#FF6B6B] rounded-2xl p-6 mb-8 shadow-2xl text-white">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 to-red-500 animate-pulse-bar origin-center" />
            <div className="bg-black/25 -mx-6 -mt-6 px-6 py-2 mb-6 flex items-center justify-center gap-2 text-[#FFD93D] font-bold text-xs uppercase tracking-wider">
              <span className="animate-blink">🚨</span> ALERTA DE SEGURANÇA DIGITAL — LEIA ANTES DE CONTINUAR
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 animate-pulse-icon rounded-full bg-yellow-400 flex items-center justify-center text-[#8B0000]">
                <ShieldAlert size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">⚠ Atenção: golpes digitais aumentaram <span className="text-[#FFD93D]">340%</span> no Brasil em 2024</h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  Criminosos criam sites falsos que imitam portais do governo para roubar dados pessoais, senhas e dinheiro.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-black/15 rounded-lg p-3 text-xs flex items-center gap-3">
                    <span className="shrink-0 text-lg">🔍</span>
                    <span>Verifique sempre o endereço: sites oficiais terminam em <strong>.gov.br</strong></span>
                  </div>
                  <div className="bg-black/15 rounded-lg p-3 text-xs flex items-center gap-3">
                    <span className="shrink-0 text-lg">💬</span>
                    <span>Nunca pague taxas por WhatsApp ou Pix para desconhecidos</span>
                  </div>
                  <div className="bg-black/15 rounded-lg p-3 text-xs flex items-center gap-3">
                    <span className="shrink-0 text-lg">📞</span>
                    <span>INSS, Receita Federal e Caixa jamais pedem senha por telefone</span>
                  </div>
                  <div className="bg-black/15 rounded-lg p-3 text-xs flex items-center gap-3">
                    <span className="shrink-0 text-lg">📧</span>
                    <span>Não clique em links de e-mail ou SMS — acesse diretamente pelo navegador</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* satisfaction panel */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">⭐ Avalie sua experiência no ConsultaBrasil</h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">Sua opinião nos ajuda a melhorar o portal para todos os brasileiros</p>
            
            <div className="space-y-4 mb-8">
              {['ease', 'links', 'overall'].map((key) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="sm:w-32 text-sm text-gray-700 font-medium">
                    {key === 'ease' ? 'Facilidade de uso' : key === 'links' ? 'Links funcionando' : 'Satisfação geral'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onClick={() => handleRating(key, star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={24} 
                          className={ratings[key] >= star ? 'fill-[#F5C440] text-[#F5C440]' : 'text-gray-200'} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-gray-400 min-w-20">
                      {getRatingLabel(ratings[key])}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!submitted ? (
              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-primary hover:bg-primary-medium text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                Enviar avaliação <ChevronRight size={20} />
              </button>
            ) : (
              <div className="bg-primary-light text-primary font-bold py-4 px-6 rounded-xl text-center border border-primary-medium/20">
                ✓ Avaliação enviada! Obrigado por ajudar a melhorar o portal.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-[300px] flex flex-col gap-4">
           {/* Sidebar Ad Top */}
           <AdSpace height="260px" label="Anúncio Google AdSense — 300 × 250 Sidebar topo" />

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-bold text-sm mb-4 border-b border-gray-100 pb-2">Links mais acessados</h4>
            <div className="space-y-3">
              {[
                { label: "Portal Gov.br", color: "#22c55e", url: "https://www.gov.br/pt-br" },
                { label: "Meu INSS", color: "#eab308", url: "https://meu.inss.gov.br" },
                { label: "FGTS saldo", color: "#22c55e", url: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/extrato-fgts/paginas/default.aspx" },
                { label: "CadÚnico", color: "#3b82f6", url: "https://www.gov.br/pt-br/servicos/consultar-dados-do-cadastro-unico-cadunico" },
                { label: "Meu SUS Digital", color: "#a855f7", url: "https://meususdigital.saude.gov.br" },
                { label: "ENEM", color: "#a855f7", url: "https://enem.inep.gov.br" },
                { label: "🚗 IPVA por estado", color: "#eab308", url: "/ipva", internal: true }
              ].map((link, idx) => (
                link.internal ? (
                  <Link key={idx} to={link.url} className="flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: link.color }}></span>
                    <span className="text-[12.5px] text-gray-700 group-hover:text-primary transition-colors">{link.label}</span>
                  </Link>
                ) : (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: link.color }}></span>
                    <span className="text-[12.5px] text-gray-700 group-hover:text-primary transition-colors">{link.label}</span>
                  </a>
                )
              ))}
            </div>
          </div>

          <AdSpace height="260px" label="Anúncio Google AdSense — 300 × 250 Sidebar meio" />

          <div className="bg-primary-light border border-primary-medium/10 rounded-xl p-4">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔒</span>
                <span className="font-bold text-xs text-primary-medium">Segurança online</span>
             </div>
             <p className="text-[11px] text-primary/80 leading-relaxed">
               Todos os links deste portal redirecionam apenas para sites <strong>.gov.br</strong> e portais oficiais verificados.
             </p>
          </div>

          <AdSpace height="320px" label="Anúncio Google AdSense — 300 × 320 Sidebar inferior" />

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-bold text-sm mb-4 border-b border-gray-100 pb-2">Apps oficiais gratuitos</h4>
            <div className="space-y-3">
              {[
                { label: "Caixa Tem", url: "https://www.caixa.gov.br/atendimento/aplicativos/Paginas/default.aspx" },
                { label: "App Gov.br", url: "https://www.gov.br/governodigital/pt-br/conta-gov-br/conta-gov-br/aplicativo-govbr" },
                { label: "App Meu INSS", url: "https://www.gov.br/inss/pt-br/central-de-conteudos/aplicativos/meu-inss" },
                { label: "Meu SUS Digital", url: "https://meususdigital.saude.gov.br" }
              ].map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex flex-col group py-1">
                  <span className="text-[12.5px] text-gray-700 group-hover:text-primary font-medium transition-colors">{link.label}</span>
                  <span className="text-[10px] text-gray-400">Download oficial gratuito</span>
                </a>
              ))}
            </div>
          </div>

          <AdSpace height="260px" label="Anúncio Google AdSense — 300 × 250 Sidebar rodapé" />
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white/70 py-10 px-4 text-center border-t border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            © 2026 ConsultaBrasil · Portal independente de orientação a serviços públicos · Todos os links são oficiais (.gov.br) e seguros.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-primary-light/60">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Anuncie</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
