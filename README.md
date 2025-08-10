# LinkedIn Auto Connect

Uma extensão do Chrome que automatiza o processo de envio de convites de conexão no LinkedIn.

## 🚀 Funcionalidades

- **Automação inteligente**: Conecta automaticamente com pessoas em páginas de busca do LinkedIn
- **Scroll automático**: Percorre toda a página procurando por botões "Conectar"
- **Navegação entre páginas**: Avança automaticamente para a próxima página quando termina a atual
- **Envio sem nota**: Envia convites sem mensagem personalizada automaticamente
- **Controle total**: Botões para iniciar/parar a automação a qualquer momento
- **Contador de conexões**: Acompanha quantas conexões foram enviadas
- **Status em tempo real**: Mostra o progresso da automação

## 📦 Instalação

### Método 1: Instalação Manual (Recomendado)

1. **Clone ou baixe este repositório**

   ```bash
   git clone https://github.com/seu-usuario/linkedin-auto-connect.git
   ```

2. **Abra o Chrome e vá para as extensões**

   - Digite `chrome://extensions/` na barra de endereços
   - Ou vá em Menu → Mais ferramentas → Extensões

3. **Ative o modo desenvolvedor**

   - Clique no botão "Modo do desenvolvedor" no canto superior direito

4. **Carregue a extensão**

   - Clique em "Carregar sem compactação"
   - Selecione a pasta do projeto baixado

5. **Pronto!** A extensão aparecerá na barra de ferramentas do Chrome

## 🎯 Como Usar

### Passo a Passo

1. **Vá para o LinkedIn**

   - Acesse uma página de busca de pessoas
   - Ou vá em "Minha rede" → "Crescer sua rede"
   - Ou use qualquer página com resultados de busca

2. **Abra a extensão**

   - Clique no ícone da extensão na barra de ferramentas
   - Ou clique no ícone de quebra-cabeça e encontre "LinkedIn Auto Connect"

3. **Inicie a automação**

   - Clique no botão "Iniciar Automação"
   - A extensão começará a trabalhar automaticamente

4. **Acompanhe o progresso**

   - Veja o status em tempo real no popup
   - Acompanhe o contador de conexões enviadas

5. **Pare quando quiser**
   - Clique em "Parar" para interromper a automação

### Como Funciona

A extensão segue esta lógica inteligente:

1. **Processa todos os botões "Conectar" visíveis** na tela atual
2. **Faz scroll para baixo** para encontrar mais pessoas
3. **Conecta com as novas pessoas encontradas**
4. **Repete o processo** até chegar no final da página
5. **Clica em "Avançar"** para ir para a próxima página
6. **Continua automaticamente** até não haver mais páginas

## ⚙️ Configurações

### Tempo de Espera

- **Entre conexões**: 3 segundos (para evitar detecção)
- **Entre páginas**: 5 segundos (para carregar completamente)
- **Para modais**: 2 segundos (para aparecer/desaparecer)

### Páginas Compatíveis

- Resultados de busca de pessoas
- Página "Pessoas que você pode conhecer"
- Qualquer página do LinkedIn com botões "Conectar"

## 🛡️ Segurança e Boas Práticas

### Limites Recomendados

- **Máximo por dia**: 100-200 conexões
- **Use com moderação**: Evite usar por muitas horas seguidas
- **Varie os horários**: Não use sempre no mesmo horário

### Dicas de Segurança

- ✅ Use em páginas de busca relevantes ao seu nicho
- ✅ Pare a automação periodicamente
- ✅ Monitore sua conta para evitar restrições
- ❌ Não use 24/7
- ❌ Não envie milhares de convites por dia

## 🔧 Solução de Problemas

### A extensão não inicia

1. **Recarregue a extensão**:

   - Vá em `chrome://extensions/`
   - Encontre "LinkedIn Auto Connect"
   - Clique no botão de reload ⟳

2. **Recarregue a página do LinkedIn** (F5)

3. **Verifique se está na página correta**:
   - Deve haver botões "Conectar" visíveis
   - Deve ser uma página de busca ou rede do LinkedIn

### Erro "Could not establish connection"

- **Solução**: Recarregue a extensão e a página do LinkedIn
- **Causa**: Content script não foi carregado corretamente

### Não encontra botões "Conectar"

- **Verifique**: Se você está em uma página com pessoas para conectar
- **Tente**: Ir para "Minha rede" → "Crescer sua rede"
- **Ou**: Fazer uma busca por pessoas na sua área

### A automação para sozinha

- **Normal**: Chegou ao final das páginas disponíveis
- **Solução**: Mude os filtros de busca para encontrar mais pessoas

## 📁 Estrutura do Projeto

```
linkedin-auto-connect/
├── manifest.json          # Configurações da extensão
├── popup.html            # Interface do usuário
├── popup.js              # Lógica da interface
├── content.js            # Script que roda no LinkedIn
└── README.md             # Este arquivo
```

## 🔄 Atualizações

### Versão 1.0

- ✅ Automação básica de conexões
- ✅ Scroll automático na página
- ✅ Navegação entre páginas
- ✅ Interface simples e intuitiva
- ✅ Contador de conexões
- ✅ Controle de início/parada

## ⚠️ Aviso Legal

Esta extensão é fornecida "como está" para fins educacionais e de automação pessoal.

**Importante:**

- Use por sua própria conta e risco
- Respeite os termos de uso do LinkedIn
- Não nos responsabilizamos por restrições em sua conta
- Use com moderação e bom senso

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. **Reportar bugs** abrindo uma issue
2. **Sugerir melhorias** nas discussions
3. **Enviar pull requests** com correções ou novas funcionalidades

### Como Contribuir

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. **Verifique as soluções de problemas** acima
2. **Abra uma issue** neste repositório
3. **Descreva o problema** com detalhes e screenshots se possível

---

**⭐ Se esta extensão foi útil para você, considere dar uma estrela no repositório!**

## 🏷️ Tags

`linkedin` `automation` `chrome-extension` `networking` `javascript` `web-scraping` `social-media` `productivity`
